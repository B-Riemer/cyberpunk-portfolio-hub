/**
 * Test-Endpoint für RAG-Debugging
 * GET /api/test-rag - Zeigt Status der RAG-Initialisierung
 */

import { NextResponse } from "next/server";
import { getAllContentDocuments } from "@/lib/db";
import { getVectorStore } from "@/lib/vector-store/in-memory-store";
import { initializeVectorStore, retrieveRelevantContext } from "@/lib/rag/rag-service";

export async function GET() {
  try {
    const results: any = {
      timestamp: new Date().toISOString(),
      database: {},
      vectorStore: {},
      testQuery: {},
    };

    // 1. Prüfe Datenbank-Verbindung
    try {
      const dbDocs = await getAllContentDocuments();
      results.database = {
        status: "✅ Verbunden",
        documentCount: dbDocs.length,
        sections: [...new Set(dbDocs.map((d) => d.section))],
        sampleDocuments: dbDocs.slice(0, 3).map((d) => ({
          title: d.title,
          section: d.section,
          contentLength: d.content.length,
        })),
      };
    } catch (dbError: any) {
      results.database = {
        status: "❌ Fehler",
        error: dbError.message,
      };
    }

    // 2. Prüfe Vektorspeicher
    const store = getVectorStore();
    results.vectorStore = {
      initialized: store.isInitialized(),
      chunkCount: store.getSize(),
    };

    // 3. Versuche Initialisierung
    if (!store.isInitialized()) {
      try {
        await initializeVectorStore();
        results.vectorStore.initialization = "✅ Erfolgreich";
        results.vectorStore.chunkCount = store.getSize();
      } catch (initError: any) {
        results.vectorStore.initialization = "❌ Fehler";
        results.vectorStore.error = initError.message;
      }
    }

    // 4. Teste Suche
    if (store.isInitialized()) {
      try {
        const testQuery = "Welche Hobbies hat Björn Riemer?";
        const context = await retrieveRelevantContext(testQuery);
        results.testQuery = {
          query: testQuery,
          foundDocuments: context.relevantChunks.length,
          documents: context.relevantChunks.map((r) => ({
            title: r.chunk.metadata.title,
            section: r.chunk.metadata.section,
            score: r.score.toFixed(3),
            contentPreview: r.chunk.content.substring(0, 100) + "...",
          })),
        };
      } catch (searchError: any) {
        results.testQuery = {
          status: "❌ Fehler",
          error: searchError.message,
        };
      }
    }

    return NextResponse.json(results, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      {
        error: "Test fehlgeschlagen",
        message: error.message,
        stack: error.stack,
      },
      { status: 500 }
    );
  }
}

