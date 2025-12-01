/**
 * RAG Service
 * Retrieval-Augmented Generation Service für den Chatbot
 * 
 * Lädt Inhalte dynamisch aus der Datenbank statt aus statischen Dateien
 */

import { getAllContentDocuments } from "@/lib/db";
import { convertToDocumentChunk } from "@/lib/data-loader";
import { createEmbeddings } from "@/lib/embeddings/openai-embeddings";
import { getVectorStore } from "@/lib/vector-store/in-memory-store";
import {
  DocumentChunk,
  RAGContext,
  RAGConfig,
  SourceReference,
} from "@/lib/types/rag";

const DEFAULT_CONFIG: RAGConfig = {
  topK: 5,
  similarityThreshold: 0.3, // Niedrigerer Threshold für bessere Trefferquote
  chunkSize: 500,
  chunkOverlap: 50,
};

/**
 * Initialisiert den Vektorspeicher mit den Website-Inhalten aus der Datenbank
 */
export async function initializeVectorStore(): Promise<void> {
  const store = getVectorStore();

  // Wenn bereits initialisiert, überspringe
  if (store.isInitialized()) {
    return;
  }

  console.log("Initialisiere Vektorspeicher aus Datenbank...");

  try {
    // Prüfe DATABASE_URL
    if (!process.env.DATABASE_URL) {
      console.error("❌ DATABASE_URL ist nicht gesetzt!");
      throw new Error("DATABASE_URL Umgebungsvariable fehlt. Bitte setze DATABASE_URL in .env.local und starte den Server neu.");
    }
    
    console.log(`📊 DATABASE_URL: ${process.env.DATABASE_URL}`);

    // Lade alle Dokumente aus der Datenbank
    const documents = await getAllContentDocuments();

    if (documents.length === 0) {
      console.warn("⚠️ Keine Dokumente in der Datenbank gefunden. Bitte führe das Seed-Script aus: npm run db:seed");
      return;
    }

    console.log(`📚 ${documents.length} Dokumente geladen, erstelle Embeddings...`);

    // Erstelle Embeddings für alle Dokumente (Batch-Verarbeitung)
    const contents = documents.map((doc) => doc.content);
    console.log(`📊 Erstelle Embeddings für ${contents.length} Dokumente...`);
    const embeddings = await createEmbeddings(contents);
    console.log(`✅ ${embeddings.length} Embeddings erstellt`);

    // Konvertiere zu DocumentChunks
    const chunks: DocumentChunk[] = documents.map((doc, index) =>
      convertToDocumentChunk(doc, embeddings[index])
    );

    // Füge Chunks zum Store hinzu
    store.addChunks(chunks);
    store.setInitialized(true);

    console.log(`✅ Vektorspeicher initialisiert mit ${chunks.length} Chunks aus der Datenbank`);
    console.log(`📚 Sektionen: ${[...new Set(documents.map(d => d.section))].join(", ")}`);
  } catch (error: any) {
    console.error("❌ Fehler beim Initialisieren des Vektorspeichers:", error);
    const errorMessage = error?.message || "Unbekannter Fehler";
    throw new Error(`Fehler beim Laden der Datenbank-Inhalte für RAG: ${errorMessage}`);
  }
}

/**
 * Sucht nach relevanten Dokumenten für eine Query
 */
export async function retrieveRelevantContext(
  query: string,
  config: RAGConfig = DEFAULT_CONFIG
): Promise<RAGContext> {
  const store = getVectorStore();

  // Stelle sicher, dass der Store initialisiert ist
  if (!store.isInitialized()) {
    await initializeVectorStore();
  }

  // Erstelle Embedding für die Query
  console.log(`🔍 Suche nach: "${query}"`);
  const queryEmbedding = await createEmbedding(query);

  // Suche nach ähnlichen Chunks
  const searchResults = store.search(queryEmbedding, config);
  
  console.log(`📊 Gefunden: ${searchResults.length} relevante Dokumente`);
  if (searchResults.length > 0) {
    searchResults.forEach((result, index) => {
      console.log(`  ${index + 1}. ${result.chunk.metadata.title} (Score: ${result.score.toFixed(3)})`);
    });
  } else {
    console.warn(`⚠️ Keine Dokumente gefunden für Query: "${query}"`);
    console.warn(`   Versuche mit niedrigerem Threshold...`);
    
    // Fallback 1: Suche mit niedrigerem Threshold
    const fallbackConfig = { ...config, similarityThreshold: 0.1 };
    const fallbackResults = store.search(queryEmbedding, fallbackConfig);
    
    if (fallbackResults.length > 0) {
      console.log(`📊 Fallback-Suche: ${fallbackResults.length} Dokumente gefunden`);
      return {
        relevantChunks: fallbackResults.slice(0, config.topK),
        query,
      };
    }
    
    // Fallback 2: Wenn immer noch nichts gefunden, suche nach Keywords in der Query
    console.warn(`⚠️ Auch Fallback-Suche ohne Erfolg, verwende Keyword-Suche...`);
    const queryLower = query.toLowerCase();
    const allChunks = store.getAllChunks();
    
    // Suche nach Keywords in Titel, Content oder Tags
    const keywordMatches = allChunks
      .map((chunk) => {
        const titleLower = chunk.metadata.title.toLowerCase();
        const contentLower = chunk.content.toLowerCase();
        const tagsLower = chunk.metadata.tags?.join(" ").toLowerCase() || "";
        const sectionLower = chunk.metadata.section.toLowerCase();
        
        // Zähle Treffer
        let score = 0;
        const keywords = queryLower.split(/\s+/).filter((w) => w.length > 2);
        
        keywords.forEach((keyword) => {
          if (titleLower.includes(keyword)) score += 3;
          if (sectionLower.includes(keyword)) score += 2;
          if (contentLower.includes(keyword)) score += 1;
          if (tagsLower.includes(keyword)) score += 1;
        });
        
        return { chunk, score };
      })
      .filter((r) => r.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, config.topK)
      .map((r) => ({
        chunk: r.chunk,
        score: r.score / 10, // Normalisiere Score
      }));
    
    if (keywordMatches.length > 0) {
      console.log(`📊 Keyword-Suche: ${keywordMatches.length} Dokumente gefunden`);
      return {
        relevantChunks: keywordMatches,
        query,
      };
    }
    
    console.warn(`⚠️ Keine Dokumente mit Keyword-Suche gefunden`);
  }

  return {
    relevantChunks: searchResults,
    query,
  };
}

/**
 * Formatiert den Kontext für das LLM
 */
export function formatContextForLLM(context: RAGContext): string {
  if (context.relevantChunks.length === 0) {
    console.warn("⚠️ Keine relevanten Chunks zum Formatieren");
    return "Keine relevanten Informationen in der Wissensbasis gefunden.";
  }

  console.log(`📝 Formatiere ${context.relevantChunks.length} Chunks für LLM...`);

  let formattedContext = "Relevante Informationen aus der Wissensbasis:\n\n";

  for (let i = 0; i < context.relevantChunks.length; i++) {
    const result = context.relevantChunks[i];
    const chunk = result.chunk;
    formattedContext += `[${i + 1}] ${chunk.metadata.title} (${chunk.metadata.section}`;
    if (chunk.metadata.category) {
      formattedContext += `, ${chunk.metadata.category}`;
    }
    formattedContext += `)\n`;
    formattedContext += `Inhalt: ${chunk.content}\n\n`;
  }

  console.log(`✅ Kontext formatiert (${formattedContext.length} Zeichen)`);
  return formattedContext;
}

/**
 * Extrahiert Quellenangaben aus dem Kontext
 */
export function extractSources(context: RAGContext): SourceReference[] {
  const sources: SourceReference[] = [];
  const seenIds = new Set<string>();

  for (const result of context.relevantChunks) {
    const chunk = result.chunk;
    const docId = chunk.metadata.documentId;

    // Vermeide Duplikate
    if (seenIds.has(docId)) {
      continue;
    }
    seenIds.add(docId);

    sources.push({
      documentId: docId,
      title: chunk.metadata.title,
      section: chunk.metadata.section,
      category: chunk.metadata.category,
      excerpt: chunk.content.substring(0, 150) + "...",
    });
  }

  return sources;
}

/**
 * Erkennt die Sprache einer Query
 */
export function detectLanguage(query: string): "de" | "en" {
  // Einfache Heuristik: Zähle deutsche vs. englische Wörter
  const germanWords = [
    "der",
    "die",
    "das",
    "und",
    "ist",
    "sind",
    "für",
    "mit",
    "auf",
    "zu",
    "von",
    "über",
    "was",
    "wie",
    "wo",
    "wann",
    "warum",
  ];
  const englishWords = [
    "the",
    "is",
    "are",
    "and",
    "for",
    "with",
    "what",
    "how",
    "where",
    "when",
    "why",
    "can",
    "will",
    "would",
  ];

  const lowerQuery = query.toLowerCase();
  let germanCount = 0;
  let englishCount = 0;

  for (const word of germanWords) {
    if (lowerQuery.includes(word)) {
      germanCount++;
    }
  }

  for (const word of englishWords) {
    if (lowerQuery.includes(word)) {
      englishCount++;
    }
  }

  return germanCount >= englishCount ? "de" : "en";
}

