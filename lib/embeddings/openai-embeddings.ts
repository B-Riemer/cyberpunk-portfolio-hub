/**
 * OpenAI Embeddings Service
 * Erstellt Embeddings für Texte mit der OpenAI API
 */

import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Erstellt ein Embedding für einen Text
 */
export async function createEmbedding(text: string): Promise<number[]> {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error("OPENAI_API_KEY ist nicht gesetzt");
  }

  try {
    const response = await openai.embeddings.create({
      model: "text-embedding-3-small",
      input: text,
    });

    return response.data[0].embedding;
  } catch (error: any) {
    console.error("Fehler beim Erstellen des Embeddings:", error);
    
    // Spezifische Fehlerbehandlung
    if (error?.status === 429) {
      if (error?.message?.includes("quota") || error?.message?.includes("billing")) {
        throw new Error("QUOTA_EXCEEDED: Das OpenAI-Konto hat kein Guthaben mehr. Bitte überprüfe dein Billing auf https://platform.openai.com/account/billing");
      }
      throw new Error("RATE_LIMIT: Zu viele Anfragen. Bitte warte einen Moment.");
    }
    
    if (error?.status === 401) {
      throw new Error("AUTH_ERROR: Ungültiger API-Schlüssel.");
    }
    
    throw new Error(`Embedding-Fehler: ${error.message}`);
  }
}

/**
 * Erstellt Embeddings für mehrere Texte
 */
export async function createEmbeddings(texts: string[]): Promise<number[][]> {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error("OPENAI_API_KEY ist nicht gesetzt");
  }

  try {
    const response = await openai.embeddings.create({
      model: "text-embedding-3-small",
      input: texts,
    });

    return response.data.map((item) => item.embedding);
  } catch (error: any) {
    console.error("Fehler beim Erstellen der Embeddings:", error);
    
    // Spezifische Fehlerbehandlung
    if (error?.status === 429) {
      if (error?.message?.includes("quota") || error?.message?.includes("billing")) {
        throw new Error("QUOTA_EXCEEDED: Das OpenAI-Konto hat kein Guthaben mehr. Bitte überprüfe dein Billing auf https://platform.openai.com/account/billing");
      }
      throw new Error("RATE_LIMIT: Zu viele Anfragen. Bitte warte einen Moment.");
    }
    
    if (error?.status === 401) {
      throw new Error("AUTH_ERROR: Ungültiger API-Schlüssel.");
    }
    
    throw new Error(`Embedding-Fehler: ${error.message}`);
  }
}

