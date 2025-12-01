import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || undefined,
});

// System prompt mit Informationen über die Person und die Seite
const SYSTEM_PROMPT = `Du bist ein freundlicher, witziger Roboter-Assistent auf einer persönlichen Portfolio-Website. 

Über den Website-Besitzer:
- Name: Björn Riemer
- Aktuell in einer zweijährigen Umschulung zum Fachinformatiker für Anwendungsentwicklung (IHK)
- Schwerpunkt: Moderne Softwareentwicklung, KI, Cloud-Lösungen, Webentwicklung
- Spezialisierung: AI Solution Engineering
- Hintergrund: Über 27 Jahre Führungserfahrung beim Militär und Sicherheitsdienst, Fitness- und Sportmanagement
- Leidenschaft: Innovative Technologien einsetzen, um reale Probleme zu lösen

Über die Website:
- Neurales MindHub mit Yggdrasil-Baum als Hintergrund
- Verschiedene Bereiche: About Me, Projects, Resume, Hobbies, Contact
- Futuristisches Design mit neon-farbenen Elementen
- Interaktive Knotenpunkte zum Navigieren

Deine Aufgabe:
- Sei freundlich, hilfsbereit und etwas witzig
- Beantworte Fragen über Björn Riemer, seine Projekte, Erfahrung und die Website
- Hilf bei der Navigation auf der Website
- Verwende die richtige Anrede basierend auf den Benutzerdaten (Du/Sie)
- Antworte auf Deutsch, es sei denn, der Benutzer fragt auf Englisch

Wichtig: Sei präzise, aber freundlich. Wenn du etwas nicht weißt, gib das ehrlich zu.`;

export async function POST(request: NextRequest) {
  try {
    // Prüfe ob API Key gesetzt ist
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      console.error("OPENAI_API_KEY is not set");
      console.error("Available env vars:", Object.keys(process.env).filter(k => k.includes('OPENAI')));
      return NextResponse.json(
        { error: "OpenAI API Key ist nicht konfiguriert. Bitte setze OPENAI_API_KEY in der .env.local Datei und starte den Dev-Server neu." },
        { status: 500 }
      );
    }
    
    // Log für Debugging (nur ersten und letzten Teil des Keys zeigen)
    console.log("API Key geladen:", apiKey.substring(0, 7) + "..." + apiKey.substring(apiKey.length - 4));

    const { messages, vorname, nachname, geschlecht } = await request.json();

    // Bestimme die Anrede basierend auf den Benutzerdaten
    let userContext = "";
    if (nachname && geschlecht === "f") {
      userContext = `WICHTIG: Der Benutzer heißt Frau ${nachname}. Verwende IMMER und durchgehend die Sie-Form (Sie, Ihnen, Ihr, Ihre). Verwende NIEMALS die Du-Form (du, dir, dein, deine).`;
    } else if (vorname) {
      userContext = `Der Benutzer heißt ${vorname}. Verwende die Du-Form (du, dir, dein, deine).`;
    }

    const systemMessage = {
      role: "system" as const,
      content: SYSTEM_PROMPT + (userContext ? `\n\n${userContext}` : ""),
    };

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [systemMessage, ...messages],
      temperature: 0.7,
      max_tokens: 500,
    });

    const assistantMessage = completion.choices[0]?.message?.content || "Entschuldigung, ich konnte keine Antwort generieren.";

    return NextResponse.json({ message: assistantMessage });
  } catch (error: any) {
    console.error("OpenAI API Error:", error);
    
    // Spezifische Fehlermeldungen
    let errorMessage = "Fehler bei der Kommunikation mit dem Assistenten.";
    
    if (error?.status === 401 || error?.message?.includes("API key")) {
      errorMessage = "Ungültiger API-Schlüssel. Bitte überprüfe die Konfiguration.";
    } else if (error?.status === 429) {
      errorMessage = "Zu viele Anfragen. Bitte warte einen Moment und versuche es erneut.";
    } else if (error?.message) {
      errorMessage = error.message;
    }
    
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}

