/**
 * Database Access Layer
 * Modulare Datenbank-Funktionen für den RAG-Chatbot
 * 
 * Diese Datei kapselt alle DB-spezifischen Operationen, damit später
 * ein einfacher Umstieg auf PostgreSQL/MySQL möglich ist.
 */

import { PrismaClient } from "@prisma/client";
import path from "path";

// Funktion zum Setzen der DATABASE_URL
function ensureDatabaseUrl() {
  if (!process.env.DATABASE_URL) {
    // Fallback: Verwende absoluten Pfad wenn nicht gesetzt
    const dbPath = path.resolve(process.cwd(), "prisma", "local.db");
    process.env.DATABASE_URL = `file:${dbPath}`;
    console.log(`⚠️ DATABASE_URL nicht in .env.local gefunden`);
    console.log(`📁 process.cwd(): ${process.cwd()}`);
    console.log(`📁 Verwende Fallback: ${process.env.DATABASE_URL}`);
  } else {
    // Wenn DATABASE_URL relativ ist, mache sie absolut
    if (process.env.DATABASE_URL.startsWith("file:./")) {
      const relativePath = process.env.DATABASE_URL.replace("file:./", "");
      const absolutePath = path.resolve(process.cwd(), relativePath);
      process.env.DATABASE_URL = `file:${absolutePath}`;
      console.log(`📁 Relativen Pfad zu absolut konvertiert: ${process.env.DATABASE_URL}`);
    }
  }
}

// Stelle sicher, dass DATABASE_URL gesetzt ist
ensureDatabaseUrl();

// Singleton-Pattern für Prisma Client
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Erstelle PrismaClient mit expliziter DATABASE_URL
function createPrismaClient() {
  ensureDatabaseUrl(); // Stelle sicher, dass URL gesetzt ist
  
  return new PrismaClient({
    datasources: {
      db: {
        url: process.env.DATABASE_URL!,
      },
    },
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });
}

export const prisma =
  globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

/**
 * Content-Dokument Interface (kompatibel mit ContentDocument aus Prisma)
 */
export interface ContentDocument {
  id: string;
  title: string;
  section: string;
  content: string;
  category?: string | null;
  tags?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Hole alle Content-Dokumente aus der Datenbank
 */
export async function getAllContentDocuments(): Promise<ContentDocument[]> {
  try {
    // Prüfe ob DATABASE_URL gesetzt ist
    if (!process.env.DATABASE_URL) {
      console.error("DATABASE_URL ist nicht gesetzt!");
      throw new Error("DATABASE_URL Umgebungsvariable fehlt. Bitte setze DATABASE_URL in .env.local");
    }

    const documents = await prisma.contentDocument.findMany({
      orderBy: [
        { section: "asc" },
        { title: "asc" },
      ],
    });
    
    console.log(`✅ ${documents.length} Dokumente aus Datenbank geladen`);
    return documents;
  } catch (error: any) {
    console.error("Fehler beim Laden der Content-Dokumente:", error);
    if (error.message.includes("DATABASE_URL")) {
      throw error;
    }
    throw new Error(`Fehler beim Laden der Datenbank-Inhalte: ${error.message}`);
  }
}

/**
 * Hole Content-Dokumente nach Sektion
 */
export async function getContentDocumentsBySection(
  section: string
): Promise<ContentDocument[]> {
  try {
    const documents = await prisma.contentDocument.findMany({
      where: {
        section: section,
      },
      orderBy: {
        title: "asc",
      },
    });
    return documents;
  } catch (error) {
    console.error(`Fehler beim Laden der Dokumente für Sektion ${section}:`, error);
    throw new Error(`Fehler beim Laden der Dokumente für Sektion ${section}`);
  }
}

/**
 * Hole Content-Dokumente nach Kategorie
 */
export async function getContentDocumentsByCategory(
  category: string
): Promise<ContentDocument[]> {
  try {
    const documents = await prisma.contentDocument.findMany({
      where: {
        category: category,
      },
      orderBy: {
        title: "asc",
      },
    });
    return documents;
  } catch (error) {
    console.error(`Fehler beim Laden der Dokumente für Kategorie ${category}:`, error);
    throw new Error(`Fehler beim Laden der Dokumente für Kategorie ${category}`);
  }
}

/**
 * Suche Content-Dokumente nach Text (einfache Textsuche)
 */
export async function searchContentDocuments(
  searchTerm: string
): Promise<ContentDocument[]> {
  try {
    const documents = await prisma.contentDocument.findMany({
      where: {
        OR: [
          { title: { contains: searchTerm, mode: "insensitive" } },
          { content: { contains: searchTerm, mode: "insensitive" } },
          { tags: { contains: searchTerm, mode: "insensitive" } },
        ],
      },
      orderBy: {
        title: "asc",
      },
    });
    return documents;
  } catch (error) {
    console.error(`Fehler bei der Suche nach "${searchTerm}":`, error);
    // SQLite unterstützt kein "insensitive", daher Fallback
    const allDocs = await getAllContentDocuments();
    const searchLower = searchTerm.toLowerCase();
    return allDocs.filter(
      (doc) =>
        doc.title.toLowerCase().includes(searchLower) ||
        doc.content.toLowerCase().includes(searchLower) ||
        doc.tags?.toLowerCase().includes(searchLower)
    );
  }
}

/**
 * Erstelle ein neues Content-Dokument
 */
export async function createContentDocument(
  data: {
    title: string;
    section: string;
    content: string;
    category?: string;
    tags?: string;
  }
): Promise<ContentDocument> {
  try {
    const document = await prisma.contentDocument.create({
      data,
    });
    return document;
  } catch (error) {
    console.error("Fehler beim Erstellen des Content-Dokuments:", error);
    throw new Error("Fehler beim Erstellen des Content-Dokuments");
  }
}

/**
 * Aktualisiere ein Content-Dokument
 */
export async function updateContentDocument(
  id: string,
  data: {
    title?: string;
    section?: string;
    content?: string;
    category?: string;
    tags?: string;
  }
): Promise<ContentDocument> {
  try {
    const document = await prisma.contentDocument.update({
      where: { id },
      data,
    });
    return document;
  } catch (error) {
    console.error(`Fehler beim Aktualisieren des Content-Dokuments ${id}:`, error);
    throw new Error(`Fehler beim Aktualisieren des Content-Dokuments`);
  }
}

/**
 * Lösche ein Content-Dokument
 */
export async function deleteContentDocument(id: string): Promise<void> {
  try {
    await prisma.contentDocument.delete({
      where: { id },
    });
  } catch (error) {
    console.error(`Fehler beim Löschen des Content-Dokuments ${id}:`, error);
    throw new Error(`Fehler beim Löschen des Content-Dokuments`);
  }
}

/**
 * Prüfe die Datenbankverbindung
 */
export async function checkDatabaseConnection(): Promise<boolean> {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return true;
  } catch (error) {
    console.error("Datenbankverbindung fehlgeschlagen:", error);
    return false;
  }
}

