/**
 * TypeScript-Typen für RAG (Retrieval-Augmented Generation)
 */

export interface DocumentChunk {
  id: string;
  content: string;
  embedding: number[];
  metadata: {
    documentId: string;
    title: string;
    section: string;
    category?: string;
    tags?: string[];
    chunkIndex?: number;
  };
}

export interface SearchResult {
  chunk: DocumentChunk;
  score: number;
}

export interface RAGContext {
  relevantChunks: SearchResult[];
  query: string;
}

export interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

export interface ChatResponse {
  message: string;
  sources: SourceReference[];
}

export interface SourceReference {
  documentId: string;
  title: string;
  section: string;
  category?: string;
  excerpt?: string;
}

export interface RAGConfig {
  topK: number; // Anzahl der relevanten Dokumente
  similarityThreshold: number; // Mindest-Ähnlichkeitsscore
  chunkSize: number; // Größe der Text-Chunks
  chunkOverlap: number; // Überlappung zwischen Chunks
}

