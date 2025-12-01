/**
 * In-Memory Vector Store
 * Einfacher Vektorspeicher für RAG ohne externe Datenbank
 */

import { DocumentChunk, SearchResult, RAGConfig } from "@/lib/types/rag";

class InMemoryVectorStore {
  private chunks: DocumentChunk[] = [];
  private initialized = false;

  /**
   * Fügt einen Chunk zum Speicher hinzu
   */
  addChunk(chunk: DocumentChunk): void {
    this.chunks.push(chunk);
  }

  /**
   * Fügt mehrere Chunks zum Speicher hinzu
   */
  addChunks(chunks: DocumentChunk[]): void {
    this.chunks.push(...chunks);
  }

  /**
   * Berechnet die Cosinus-Ähnlichkeit zwischen zwei Vektoren
   */
  private cosineSimilarity(vec1: number[], vec2: number[]): number {
    if (vec1.length !== vec2.length) {
      throw new Error("Vektoren müssen die gleiche Länge haben");
    }

    let dotProduct = 0;
    let norm1 = 0;
    let norm2 = 0;

    for (let i = 0; i < vec1.length; i++) {
      dotProduct += vec1[i] * vec2[i];
      norm1 += vec1[i] * vec1[i];
      norm2 += vec2[i] * vec2[i];
    }

    const denominator = Math.sqrt(norm1) * Math.sqrt(norm2);
    if (denominator === 0) return 0;

    return dotProduct / denominator;
  }

  /**
   * Sucht nach ähnlichen Chunks basierend auf einem Query-Embedding
   */
  search(
    queryEmbedding: number[],
    config: RAGConfig = {
      topK: 5,
      similarityThreshold: 0.5,
      chunkSize: 500,
      chunkOverlap: 50,
    }
  ): SearchResult[] {
    const results: SearchResult[] = [];

    for (const chunk of this.chunks) {
      const similarity = this.cosineSimilarity(queryEmbedding, chunk.embedding);

      if (similarity >= config.similarityThreshold) {
        results.push({
          chunk,
          score: similarity,
        });
      }
    }

    // Sortiere nach Score (höchste zuerst) und nehme topK
    results.sort((a, b) => b.score - a.score);
    return results.slice(0, config.topK);
  }

  /**
   * Gibt alle Chunks zurück
   */
  getAllChunks(): DocumentChunk[] {
    return [...this.chunks];
  }

  /**
   * Löscht alle Chunks
   */
  clear(): void {
    this.chunks = [];
    this.initialized = false;
  }

  /**
   * Prüft, ob der Store initialisiert ist
   */
  isInitialized(): boolean {
    return this.initialized;
  }

  /**
   * Markiert den Store als initialisiert
   */
  setInitialized(value: boolean): void {
    this.initialized = value;
  }

  /**
   * Gibt die Anzahl der Chunks zurück
   */
  getSize(): number {
    return this.chunks.length;
  }
}

// Singleton-Instanz
let vectorStore: InMemoryVectorStore | null = null;

export function getVectorStore(): InMemoryVectorStore {
  if (!vectorStore) {
    vectorStore = new InMemoryVectorStore();
  }
  return vectorStore;
}

