# Daten-Migration Dokumentation

## Überblick

Dieses Dokument beschreibt die Migration aller persönlichen Inhalte aus verschiedenen Projektdateien in die SQLite-Datenbank für den RAG-Chatbot.

## Verarbeitete Dateien

### ✅ Erfolgreich importiert:

1. **data/projects.ts**
   - **Inhalt**: 4 Projekte (HTML-Portfolio, TinDog, RadioList, React-Chatbot-Project)
   - **Felder**: Titel, Beschreibung, Technologien, GitHub-Links
   - **Status**: ✅ Vollständig übertragen

2. **components/hub/AboutCard.tsx**
   - **Inhalt**: Persönliche Informationen, beruflicher Hintergrund, Spezialisierung
   - **Felder**: Text-Inhalte aus den `<p>`-Tags
   - **Status**: ✅ Vollständig übertragen (4 Dokumente)

3. **components/hub/ResumeCard.tsx**
   - **Inhalt**: Profile, Qualifikationen, Skills, Projekte, Erfahrung, Kompetenzen, Sprachen
   - **Felder**: Alle Text-Inhalte aus den verschiedenen Sektionen
   - **Status**: ✅ Vollständig übertragen (7 Dokumente)

4. **components/hub/HobbiesCard.tsx**
   - **Inhalt**: Hobbies strukturiert nach Kategorien (Mentale Interessen, Körper & Bewegung, Mensch & Verbindung, Natur & Reisen)
   - **Felder**: Titel, Beschreibung, Kategorie
   - **Status**: ✅ Vollständig übertragen (12 Dokumente)

5. **components/hub/LicensesCard.tsx**
   - **Inhalt**: Lizenzen und Zertifizierungen nach Kategorien (Sport, Sicherheit, IT)
   - **Felder**: Lizenz-Namen, Kategorien
   - **Status**: ✅ Vollständig übertragen (3 Dokumente)

6. **components/hub/ContactCard.tsx**
   - **Inhalt**: Kontaktinformationen (E-Mail, LinkedIn, GitHub, Discord)
   - **Felder**: Kontaktdaten, Beschreibungstext
   - **Status**: ✅ Vollständig übertragen (2 Dokumente)

## Nicht übertragene Felder

### ⚠️ Visuelle/UI-Elemente (bewusst ausgeschlossen):

1. **Project.image** (`data/projects.ts`)
   - **Grund**: Optionales Feld für Vorschaubilder
   - **Status**: Nicht relevant für RAG, kann später hinzugefügt werden

2. **Hobby-Icons** (`components/hub/HobbiesCard.tsx`)
   - **Grund**: Emojis/Icons sind nur visuelle Elemente
   - **Status**: Nicht inhaltlich relevant für Textsuche

3. **License-Icons** (`components/hub/LicensesCard.tsx`)
   - **Grund**: Emojis/Icons sind nur visuelle Elemente
   - **Status**: Nicht inhaltlich relevant für Textsuche

4. **UI-Formatierungen**
   - **Grund**: CSS-Klassen, Tailwind-Utilities, Styling-Informationen
   - **Status**: Nicht relevant für RAG-Inhalte

5. **Formular-Logik** (`components/hub/ContactCard.tsx`)
   - **Grund**: React-State und Event-Handler
   - **Status**: Nicht relevant für Inhalte

## Datenbank-Struktur

### ContentDocument Schema:

```typescript
{
  id: string              // CUID (automatisch generiert)
  title: string          // Titel des Dokuments
  section: string        // About, Resume, Projects, Hobbies, Licenses, Contact
  content: string        // Volltext-Inhalt
  category?: string      // Optional: Unterkategorie
  tags?: string          // Optional: Komma-getrennte Tags
  createdAt: Date        // Automatisch
  updatedAt: Date        // Automatisch
}
```

## Statistik

- **Gesamt-Dokumente**: 30
  - About: 4
  - Resume: 7
  - Projects: 4
  - Hobbies: 12
  - Licenses: 3
  - Contact: 2

## Modularität für zukünftige Migration

### ✅ Abstraktionsebene:

1. **lib/db.ts** - Kapselt alle DB-Operationen
   - `getAllContentDocuments()`
   - `getContentDocumentsBySection()`
   - `createContentDocument()`
   - etc.

2. **lib/data-loader.ts** - Konvertierung DB → RAG-Format
   - `convertToDocumentChunk()`
   - `convertToDocumentChunks()`

3. **lib/rag/rag-service.ts** - RAG-Logik (unabhängig von DB-Typ)
   - `initializeVectorStore()` - Lädt aus DB
   - `retrieveRelevantContext()` - Nutzt DB-Daten

### 🔄 Umstieg auf PostgreSQL/MySQL:

**Nur 2 Änderungen nötig:**

1. `prisma/schema.prisma`: `provider = "postgresql"` oder `"mysql"`
2. `.env.local`: `DATABASE_URL` anpassen

**Keine Code-Änderungen nötig!** Die Funktionen in `lib/db.ts` funktionieren weiterhin identisch.

## Seed-Script Ausführung

```bash
# Datenbank zurücksetzen und neu befüllen
npm run db:seed
```

Das Script:
1. Löscht alle vorhandenen Daten
2. Importiert alle Inhalte aus den Projektdateien
3. Erstellt strukturierte Dokumente für RAG

## Nächste Schritte

- [ ] Regelmäßige Synchronisation mit Quell-Dateien
- [ ] Admin-Interface zum Verwalten der Inhalte
- [ ] Validierung der Datenintegrität
- [ ] Backup-Strategie für Produktions-DB

