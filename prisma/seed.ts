/**
 * Seed Script - Importiert alle persönlichen Inhalte aus dem Projekt
 * 
 * Verarbeitete Dateien:
 * - data/projects.ts
 * - components/hub/AboutCard.tsx
 * - components/hub/ResumeCard.tsx
 * - components/hub/HobbiesCard.tsx
 * - components/hub/LicensesCard.tsx
 * - components/hub/ContactCard.tsx
 * - content/website-content.ts (als Fallback)
 */

import { PrismaClient } from "@prisma/client";
import { projects } from "../data/projects";

const prisma = new PrismaClient();

async function main() {
  console.log("Starte Seed-Prozess - Importiere alle persönlichen Inhalte...");

  // Lösche vorhandene Daten
  await prisma.contentDocument.deleteMany({});
  console.log("✅ Vorhandene Daten gelöscht");

  let totalCount = 0;

  // ============================================
  // ABOUT SECTION
  // Quelle: components/hub/AboutCard.tsx
  // ============================================
  console.log("\n📝 Importiere About-Daten...");
  const aboutData = [
    {
      title: "Über Björn Riemer - Experte für smarte Softwarelösungen",
      section: "About",
      content:
        "Ich befinde mich aktuell in einer zweijährigen Umschulung zum Fachinformatiker für Anwendungsentwicklung (IHK) mit Schwerpunkt auf moderner Softwareentwicklung und zukunftsorientierten Technologien.",
      category: "Persönlich",
      tags: "Umschulung, Fachinformatiker, IHK, Softwareentwicklung",
    },
    {
      title: "Beruflicher Hintergrund",
      section: "About",
      content:
        "Mit Führungserfahrung aus über 27 Jahren in sicherheitsrelevanten und organisatorischen Positionen beim Militär und Sicherheitsdienst sowie einem starken Hintergrund in Fitness- und Sportmanagement verbinde ich Disziplin, strategisches Denken und technisches Interesse.",
      category: "Beruflich",
      tags: "Führung, Militär, Sicherheitsdienst, Fitness, Sportmanagement",
    },
    {
      title: "Ziele und Weiterentwicklung",
      section: "About",
      content:
        "Mein Ziel: mich kontinuierlich weiterzuentwickeln und mein Wissen in praxisnahen Projekten einzusetzen – mit einem besonderen Interesse an den Bereichen Künstliche Intelligenz, Cloud-Lösungen und moderner Webentwicklung.",
      category: "Ziele",
      tags: "KI, Cloud, Webentwicklung, Weiterentwicklung",
    },
    {
      title: "Spezialisierung - AI Solution Engineering",
      section: "About",
      content:
        "Meine Spezialisierung liegt im AI Solution Engineering – der Entwicklung intelligenter, lernfähiger Systeme, die echten Mehrwert schaffen. Meine Leidenschaft: innovative Technologien einsetzen, um reale Probleme zu lösen und Prozesse auf das nächste Level zu heben.",
      category: "Technologie",
      tags: "KI, AI Solution Engineering, Automatisierung, Innovation",
    },
  ];

  await prisma.contentDocument.createMany({ data: aboutData });
  totalCount += aboutData.length;
  console.log(`✅ ${aboutData.length} About-Dokumente erstellt`);

  // ============================================
  // RESUME SECTION
  // Quelle: components/hub/ResumeCard.tsx
  // ============================================
  console.log("\n📄 Importiere Resume-Daten...");
  const resumeData = [
    {
      title: "Profile - Quereinsteiger Softwareentwicklung",
      section: "Resume",
      content:
        "Quereinsteiger in der Softwareentwicklung mit Fokus auf KI-Automatisierung, Python und moderne Webtechnologien. Kombiniert technische Ausbildung mit langjähriger Führungs- und Strukturierungserfahrung. Ziel: AI-Solution-Engineer.",
      category: "Profile",
      tags: "Quereinsteiger, KI-Automatisierung, Python, Webtechnologien",
    },
    {
      title: "FIAE-Umschulung",
      section: "Resume",
      content:
        "FIAE-Umschulung (Fachinformatiker für Anwendungsentwicklung) bei CBW Hamburg von 2025 bis 2027. Schwerpunkte: Python, Java, SQL, Webentwicklung, Cloud (AWS), Scrum.",
      category: "Ausbildung",
      tags: "FIAE, CBW Hamburg, Python, Java, SQL, AWS, Scrum",
    },
    {
      title: "IT Focus Areas - Technologien und Skills",
      section: "Resume",
      content:
        "Technologien und Skills: Python, Java, JavaScript, Next.js, React, Tailwind, SQL, APIs, Automatisierung, KI-Agenten, n8n, Cloud (AWS).",
      category: "Technologie",
      tags: "Python, Java, JavaScript, React, Next.js, Tailwind, SQL, APIs, Automatisierung, KI-Agenten, n8n, AWS",
    },
    {
      title: "Relevante Projekte - Berufliche Projekte",
      section: "Resume",
      content:
        "Vertragslaufzeiterkennung (NER + PDF-Pipeline), IT-Chatbot (RAG), Use-Case-Matcher für Beratungsfirmen, KI-Automatisierungs-Agentur (n8n + GPT-Agents).",
      category: "Projekte",
      tags: "NER, RAG, Chatbot, Use-Case-Matcher, n8n, GPT-Agents",
    },
    {
      title: "Professional Experience",
      section: "Resume",
      content:
        "Über 20 Jahre Führung, Prozessoptimierung & Organisation in sicherheitskritischen Bereichen. Starker Background in Strukturarbeit, digitaler Prozessmodernisierung und Teamkoordination.",
      category: "Beruflich",
      tags: "Führung, Prozessoptimierung, Organisation, Teamkoordination",
    },
    {
      title: "Additional Competencies",
      section: "Resume",
      content:
        "Projektorganisation & Prozessdesign, Strukturierte Problemlösung, Agiles Arbeiten (Scrum).",
      category: "Skills",
      tags: "Projektmanagement, Prozessdesign, Problemlösung, Scrum",
    },
    {
      title: "Languages - Sprachen",
      section: "Resume",
      content: "Deutsch (C2), Englisch (B2).",
      category: "Sprachen",
      tags: "Deutsch, Englisch",
    },
  ];

  await prisma.contentDocument.createMany({ data: resumeData });
  totalCount += resumeData.length;
  console.log(`✅ ${resumeData.length} Resume-Dokumente erstellt`);

  // ============================================
  // PROJECTS SECTION
  // Quelle: data/projects.ts
  // ============================================
  console.log("\n💻 Importiere Projects-Daten...");
  const projectsData = projects.map((project) => ({
    title: project.title,
    section: "Projects",
    content: `${project.description}. Technologien: ${project.tech.join(", ")}. GitHub: ${project.link}`,
    category: project.tech.includes("React") || project.tech.includes("JavaScript")
      ? "Frontend"
      : "Webentwicklung",
    tags: project.tech.join(", "),
  }));

  await prisma.contentDocument.createMany({ data: projectsData });
  totalCount += projectsData.length;
  console.log(`✅ ${projectsData.length} Project-Dokumente erstellt`);

  // ============================================
  // HOBBIES SECTION
  // Quelle: components/hub/HobbiesCard.tsx
  // ============================================
  console.log("\n🎨 Importiere Hobbies-Daten...");
  const hobbiesData = [
    {
      title: "Mentale Interessen & Weiterbildung",
      section: "Hobbies",
      content:
        "AI & Automatisierung: Künstliche Intelligenz, Automatisierungstechnologien, Prompt-Engineering. Tech-Weiterbildung: Selbststudium, moderne Tools & Frameworks.",
      category: "Interessen",
      tags: "KI, Automatisierung, Prompt-Engineering, Weiterbildung",
    },
    {
      title: "Körper & Bewegung - Fitness & Bodybuilding",
      section: "Hobbies",
      content:
        "Fitness & Bodybuilding: Kraftsport, Trainingsroutinen, Regeneration.",
      category: "Sport",
      tags: "Fitness, Bodybuilding, Kraftsport",
    },
    {
      title: "Körper & Bewegung - Calisthenics",
      section: "Hobbies",
      content: "Calisthenics: Eigengewichtstraining, funktionelle Kraft.",
      category: "Sport",
      tags: "Calisthenics, Eigengewichtstraining",
    },
    {
      title: "Körper & Bewegung - Boxen / UCC",
      section: "Hobbies",
      content: "Boxen / UCC: Kampfsport, Fokus & Technik.",
      category: "Sport",
      tags: "Boxen, UCC, Kampfsport",
    },
    {
      title: "Körper & Bewegung - Motorradfahren",
      section: "Hobbies",
      content:
        "Motorradfahren - Harley Davidson Road Glide: Freiheit auf zwei Rädern, Technik & Erlebnis.",
      category: "Sport",
      tags: "Motorrad, Harley Davidson, Road Glide",
    },
    {
      title: "Mensch & Verbindung - Familie",
      section: "Hobbies",
      content: "Zeit mit Familie: Partnerschaft, Lebensbalance.",
      category: "Sozial",
      tags: "Familie, Partnerschaft, Lebensbalance",
    },
    {
      title: "Mensch & Verbindung - Hund",
      section: "Hobbies",
      content: "Zeit mit Hund: Natur, Ruhe, Bindung.",
      category: "Sozial",
      tags: "Hund, Natur, Bindung",
    },
    {
      title: "Mensch & Verbindung - Freunde & Gemeinschaft",
      section: "Hobbies",
      content: "Freunde & Gemeinschaft: Sozialleben, gemeinsame Erlebnisse.",
      category: "Sozial",
      tags: "Freunde, Gemeinschaft, Sozialleben",
    },
    {
      title: "Natur & Reisen - Tauchen",
      section: "Hobbies",
      content:
        "Tauchen (Leidenschaft): Unterwasserwelt, Entdeckung, Ruhe.",
      category: "Reisen",
      tags: "Tauchen, Unterwasserwelt, Entdeckung",
    },
    {
      title: "Natur & Reisen - Landschaften & Natur",
      section: "Hobbies",
      content:
        "Landschaften & Natur erleben: Strände, Safari, Jungle, Wasser.",
      category: "Reisen",
      tags: "Natur, Strände, Safari, Jungle",
    },
    {
      title: "Natur & Reisen - Tiere & Kultur",
      section: "Hobbies",
      content:
        "Tiere & Kultur: Tierbeobachtungen, Begegnung mit Kulturen.",
      category: "Reisen",
      tags: "Tiere, Kultur, Tierbeobachtungen",
    },
    {
      title: "Natur & Reisen - Reise-Erlebnisse",
      section: "Hobbies",
      content:
        "Reise-Erlebnisse: Erkundung, Perspektivwechsel, Inspiration.",
      category: "Reisen",
      tags: "Reisen, Erkundung, Inspiration",
    },
  ];

  await prisma.contentDocument.createMany({ data: hobbiesData });
  totalCount += hobbiesData.length;
  console.log(`✅ ${hobbiesData.length} Hobby-Dokumente erstellt`);

  // ============================================
  // LICENSES SECTION
  // Quelle: components/hub/LicensesCard.tsx
  // ============================================
  console.log("\n🎓 Importiere Licenses-Daten...");
  const licensesData = [
    {
      title: "Sport-Lizenzen",
      section: "Licenses",
      content:
        "Fitness-Trainer A-Lizenz, Personal Trainer, Sport- und Bewegungstherapeut.",
      category: "Sport",
      tags: "Fitness, Training, Lizenz, Personal Trainer, Bewegungstherapeut",
    },
    {
      title: "Sicherheits-Lizenzen",
      section: "Licenses",
      content:
        "Sicherheitsfachkraft (nach §34a GewO), Sachkundeprüfung Bewachungsgewerbe, Erste-Hilfe-Ausbildung.",
      category: "Sicherheit",
      tags: "Sicherheit, GewO, Bewachungsgewerbe, Erste Hilfe",
    },
    {
      title: "IT-Zertifizierungen",
      section: "Licenses",
      content:
        "Fachinformatiker für Anwendungsentwicklung (IHK), Cloud-Zertifizierungen, KI & Machine Learning Kurse.",
      category: "IT",
      tags: "IHK, Cloud, KI, Machine Learning, Zertifizierung",
    },
  ];

  await prisma.contentDocument.createMany({ data: licensesData });
  totalCount += licensesData.length;
  console.log(`✅ ${licensesData.length} License-Dokumente erstellt`);

  // ============================================
  // CONTACT SECTION
  // Quelle: components/hub/ContactCard.tsx
  // ============================================
  console.log("\n📧 Importiere Contact-Daten...");
  const contactData = [
    {
      title: "Kontaktinformationen",
      section: "Contact",
      content:
        "E-Mail: ai@b-riemer.dev. LinkedIn: https://linkedin.com/in/björn-riemer-97a136163. GitHub: https://github.com/b-riemer. Discord: bjorvik_roughneck.",
      category: "Kontakt",
      tags: "E-Mail, LinkedIn, GitHub, Discord",
    },
    {
      title: "Kontaktmöglichkeiten",
      section: "Contact",
      content:
        "Haben Sie Interesse an gemeinsamen Projekten, Beratung oder Workshops im Bereich KI und Softwareentwicklung? Ich freue mich auf Ihre Nachricht und neue spannende Herausforderungen!",
      category: "Kontakt",
      tags: "Projekte, Beratung, Workshops, KI, Softwareentwicklung",
    },
  ];

  await prisma.contentDocument.createMany({ data: contactData });
  totalCount += contactData.length;
  console.log(`✅ ${contactData.length} Contact-Dokumente erstellt`);

  // ============================================
  // ZUSAMMENFASSUNG
  // ============================================
  console.log("\n" + "=".repeat(50));
  console.log(`✅ Seed abgeschlossen: ${totalCount} Dokumente erstellt`);
  console.log("=".repeat(50));
  console.log("\nVerarbeitete Dateien:");
  console.log("  ✓ data/projects.ts");
  console.log("  ✓ components/hub/AboutCard.tsx");
  console.log("  ✓ components/hub/ResumeCard.tsx");
  console.log("  ✓ components/hub/HobbiesCard.tsx");
  console.log("  ✓ components/hub/LicensesCard.tsx");
  console.log("  ✓ components/hub/ContactCard.tsx");
  console.log("\nNicht übertragene Felder:");
  console.log("  ⚠️  Project.image (optionales Bildfeld)");
  console.log("  ⚠️  Hobby-Icons (nur visuell, nicht inhaltlich relevant)");
  console.log("  ⚠️  License-Icons (nur visuell, nicht inhaltlich relevant)");
  console.log("  ⚠️  UI-spezifische Formatierungen (CSS-Klassen, Styling)");
}

main()
  .catch((e) => {
    console.error("Fehler beim Seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
