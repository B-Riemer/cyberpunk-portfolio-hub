# Datenbank-Integration für RAG-Chatbot

## Übersicht

Der RAG-Chatbot verwendet jetzt eine SQLite-Datenbank als Datenquelle statt statischer Dateien. Die Struktur ist modular aufgebaut, sodass später ein einfacher Umstieg auf PostgreSQL oder MySQL möglich ist.

## Struktur

```
prisma/
  ├── schema.prisma      # Datenbankschema (Prisma)
  └── seed.ts            # Seed-Script für Beispieldaten

lib/
  ├── db.ts              # Datenbank-Zugriffsfunktionen (modular)
  ├── data-loader.ts     # Konvertierung DB → DocumentChunk
  └── rag/
      └── rag-service.ts # RAG-Service (lädt aus DB)
```

## Setup

### 1. Umgebungsvariablen

Die `.env.local` sollte enthalten:
```env
DATABASE_URL="file:./prisma/local.db"
OPENAI_API_KEY=dein-api-schlüssel
```

### 2. Datenbank initialisieren

```bash
# Prisma Client generieren
npm run db:generate

# Datenbankschema erstellen
npm run db:push

# Beispieldaten einfügen
npm run db:seed
```

## Verwendung

### Datenbank-Operationen

Alle DB-Operationen sind in `lib/db.ts` gekapselt:

```typescript
import { 
  getAllContentDocuments,
  getContentDocumentsBySection,
  createContentDocument,
  updateContentDocument,
  deleteContentDocument
} from "@/lib/db";

// Alle Dokumente laden
const docs = await getAllContentDocuments();

// Nach Sektion filtern
const aboutDocs = await getContentDocumentsBySection("About");

// Neues Dokument erstellen
await createContentDocument({
  title: "Neuer Titel",
  section: "About",
  content: "Inhalt...",
  category: "Kategorie",
  tags: "tag1, tag2"
});
```

### Prisma Studio (GUI)

```bash
npm run db:studio
```

Öffnet eine Web-GUI zum Verwalten der Datenbank.

## Umstieg auf PostgreSQL/MySQL

### Schritt 1: Schema anpassen

In `prisma/schema.prisma` den `datasource` ändern:

```prisma
datasource db {
  provider = "postgresql"  // oder "mysql"
  url      = env("DATABASE_URL")
}
```

### Schritt 2: DATABASE_URL anpassen

In `.env.local`:
```env
# PostgreSQL
DATABASE_URL="postgresql://user:password@localhost:5432/mydb?schema=public"

# MySQL
DATABASE_URL="mysql://user:password@localhost:3306/mydb"
```

### Schritt 3: Migration erstellen

```bash
npx prisma migrate dev --name init
```

### Schritt 4: Code bleibt gleich!

Die Funktionen in `lib/db.ts` funktionieren weiterhin ohne Änderungen, da Prisma die Abstraktion bereitstellt.

## Datenmodell

### ContentDocument

```typescript
{
  id: string              // CUID (automatisch)
  title: string          // Titel des Dokuments
  section: string        // About, Resume, Projects, Hobbies, etc.
  content: string        // Volltext-Inhalt
  category?: string      // Optional: Kategorie
  tags?: string          // Optional: Komma-getrennte Tags
  createdAt: Date       // Automatisch
  updatedAt: Date        // Automatisch
}
```

## Seed-Daten

Das Seed-Script (`prisma/seed.ts`) fügt Beispieldaten ein:
- 3 About-Dokumente
- 3 Resume-Dokumente
- 2 Project-Dokumente
- 2 Hobby-Dokumente
- 1 License-Dokument
- 1 Contact-Dokument

**Gesamt: 12 Dokumente**

## RAG-Integration

Der RAG-Service lädt Inhalte automatisch aus der Datenbank:

1. `initializeVectorStore()` lädt alle Dokumente aus der DB
2. Erstellt Embeddings für alle Dokumente (Batch-Verarbeitung)
3. Konvertiert zu DocumentChunks
4. Speichert im In-Memory Vector Store

Bei jeder Anfrage:
- Vektorsuche findet relevante Dokumente
- Quellenangaben zeigen DB-Dokumente an

## Vorteile der modularen Struktur

✅ **Einfacher Umstieg**: Nur Schema und DATABASE_URL ändern  
✅ **Wartbarkeit**: Alle DB-Operationen an einem Ort (`lib/db.ts`)  
✅ **Testbarkeit**: Einfach Mock-Datenbanken für Tests  
✅ **Skalierbarkeit**: Einfach auf produktive Datenbanken umstellen  

## Nächste Schritte

- [ ] Admin-Interface zum Verwalten der Inhalte
- [ ] Automatische Synchronisation mit externen Datenquellen
- [ ] Caching-Layer für bessere Performance
- [ ] Volltext-Suche in der Datenbank (z.B. mit PostgreSQL)

