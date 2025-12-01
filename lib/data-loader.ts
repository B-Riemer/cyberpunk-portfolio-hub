/**
 * Data Loader
 * Wandelt Daten aus der Datenbank in das DocumentChunk-Format für RAG um
 */

import { ContentDocument } from "@/lib/db";
import { DocumentChunk } from "@/lib/types/rag";

/**
 * Konvertiert ein ContentDocument aus der DB in das DocumentChunk-Format für RAG
 */
export function convertToDocumentChunk(
  doc: ContentDocument,
  embedding: number[]
): DocumentChunk {
  return {
    id: `${doc.id}-chunk-0`,
    content: doc.content,
    embedding,
    metadata: {
      documentId: doc.id,
      title: doc.title,
      section: doc.section,
      category: doc.category || undefined,
      tags: doc.tags ? doc.tags.split(",").map((t) => t.trim()) : undefined,
      chunkIndex: 0,
    },
  };
}

/**
 * Konvertiert mehrere ContentDocuments in DocumentChunks
 */
export function convertToDocumentChunks(
  documents: ContentDocument[],
  embeddings: number[][]
): DocumentChunk[] {
  if (documents.length !== embeddings.length) {
    throw new Error(
      "Anzahl der Dokumente stimmt nicht mit Anzahl der Embeddings überein"
    );
  }

  return documents.map((doc, index) =>
    convertToDocumentChunk(doc, embeddings[index])
  );
}

/**
 * Extrahiert Tags aus einem ContentDocument
 */
export function extractTags(doc: ContentDocument): string[] {
  if (!doc.tags) return [];
  return doc.tags.split(",").map((tag) => tag.trim()).filter(Boolean);
}

/**
 * Formatiert Metadaten für die Anzeige
 */
export function formatMetadata(doc: ContentDocument): {
  title: string;
  section: string;
  category?: string;
  tags?: string[];
} {
  return {
    title: doc.title,
    section: doc.section,
    category: doc.category || undefined,
    tags: extractTags(doc),
  };
}

