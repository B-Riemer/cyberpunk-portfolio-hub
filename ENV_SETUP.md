# Umgebungsvariablen Setup

## Datei: `.env.local`

Die `.env.local` Datei muss im **Projektroot** (gleicher Ordner wie `package.json`) erstellt werden.

### Erforderliche Variablen

```env
OPENAI_API_KEY=sk-proj-dein-api-schlüssel-hier
```

### Überprüfung

1. **Dateipfad**: Die Datei muss hier liegen:
   ```
   /Users/bjorvik/.cursor/worktrees/my-page/Uk88W/.env.local
   ```

2. **Format**: 
   - Keine Leerzeichen um das `=`
   - Keine Anführungszeichen um den Wert
   - Keine Zeilenumbrüche im Wert

3. **Beispiel (korrekt)**:
   ```env
   OPENAI_API_KEY=sk-proj-abc123xyz789
   ```

4. **Beispiel (falsch)**:
   ```env
   OPENAI_API_KEY = "sk-proj-abc123xyz789"  ❌ Leerzeichen und Anführungszeichen
   ```

### API-Schlüssel erhalten

1. Gehe zu https://platform.openai.com/api-keys
2. Erstelle einen neuen API-Schlüssel
3. Kopiere den Schlüssel (beginnt mit `sk-proj-` oder `sk-`)
4. Füge ihn in die `.env.local` Datei ein

### Nach dem Erstellen

1. **Development-Server neu starten** (wichtig!)
2. Die Umgebungsvariablen werden nur beim Start geladen

### Verwendung im Code

Die Variable wird verwendet in:
- `app/api/chat/route.ts` - Für Chat-Completions
- `lib/embeddings/openai-embeddings.ts` - Für Embeddings

### Sicherheit

- Die `.env.local` Datei ist bereits in `.gitignore` enthalten
- **NIEMALS** den API-Schlüssel committen oder teilen
- Für Production: Verwende Umgebungsvariablen in deinem Hosting-Service (z.B. Vercel)

