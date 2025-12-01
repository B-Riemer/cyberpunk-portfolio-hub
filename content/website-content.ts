/**
 * Website Content - Wissensbasis für den RAG-Chatbot
 * Diese Datei enthält alle Informationen über Björn Riemer und seine Website
 */

export interface ContentDocument {
  id: string;
  title: string;
  section: string;
  content: string;
  metadata?: {
    category?: string;
    tags?: string[];
  };
}

export const websiteContent: ContentDocument[] = [
  // About Section
  {
    id: "about-1",
    title: "Über Björn Riemer",
    section: "About",
    content: `Björn Riemer ist ein Experte für smarte Softwarelösungen mit KI-Fokus. Er befindet sich aktuell in einer zweijährigen Umschulung zum Fachinformatiker für Anwendungsentwicklung (IHK) mit Schwerpunkt auf moderner Softwareentwicklung und zukunftsorientierten Technologien.`,
    metadata: {
      category: "Persönlich",
      tags: ["Umschulung", "Fachinformatiker", "IHK"],
    },
  },
  {
    id: "about-2",
    title: "Beruflicher Hintergrund",
    section: "About",
    content: `Mit Führungserfahrung aus über 27 Jahren in sicherheitsrelevanten und organisatorischen Positionen beim Militär und Sicherheitsdienst sowie einem starken Hintergrund in Fitness- und Sportmanagement verbindet Björn Disziplin, strategisches Denken und technisches Interesse.`,
    metadata: {
      category: "Beruflich",
      tags: ["Führung", "Militär", "Sicherheitsdienst", "Fitness"],
    },
  },
  {
    id: "about-3",
    title: "Spezialisierung",
    section: "About",
    content: `Björns Spezialisierung liegt im AI Solution Engineering – der Entwicklung intelligenter, lernfähiger Systeme, die echten Mehrwert schaffen. Seine Leidenschaft: innovative Technologien einsetzen, um reale Probleme zu lösen und Prozesse auf das nächste Level zu heben.`,
    metadata: {
      category: "Technologie",
      tags: ["KI", "AI Solution Engineering", "Automatisierung"],
    },
  },

  // Resume Section
  {
    id: "resume-1",
    title: "Aktuelle Qualifikation",
    section: "Resume",
    content: `Björn absolviert aktuell eine FIAE-Umschulung (Fachinformatiker für Anwendungsentwicklung) bei CBW Hamburg von 2025 bis 2027. Schwerpunkte: #Python, #Java, #SQL, Webentwicklung, #Cloud (#AWS), #Scrum.`,
    metadata: {
      category: "Ausbildung",
      tags: ["FIAE", "CBW Hamburg", "Python", "Java", "SQL", "AWS"],
    },
  },
  {
    id: "resume-2",
    title: "IT-Fokusbereiche",
    section: "Resume",
    content: `Technologien und Skills: #Python, #Java, #JavaScript, #Next.js, #React, #Tailwind, #SQL, #APIs, Automatisierung, #KI-Agenten, #n8n, Cloud (#AWS).`,
    metadata: {
      category: "Technologie",
      tags: ["Python", "Java", "JavaScript", "React", "Next.js", "AWS", "KI"],
    },
  },
  {
    id: "resume-3",
    title: "Relevante Projekte",
    section: "Resume",
    content: `Vertragslaufzeiterkennung (#NER + PDF-Pipeline), IT-Chatbot (#RAG), Use-Case-Matcher für Beratungsfirmen, KI-Automatisierungs-Agentur (#n8n + #GPT-Agents).`,
    metadata: {
      category: "Projekte",
      tags: ["NER", "RAG", "Chatbot", "n8n", "GPT"],
    },
  },
  {
    id: "resume-4",
    title: "Berufserfahrung",
    section: "Resume",
    content: `Über 20 Jahre #Führung, #Prozessoptimierung & #Organisation in sicherheitskritischen Bereichen. Starker Background in Strukturarbeit, digitaler Prozessmodernisierung und Teamkoordination.`,
    metadata: {
      category: "Beruflich",
      tags: ["Führung", "Prozessoptimierung", "Organisation"],
    },
  },
  {
    id: "resume-5",
    title: "Zusätzliche Kompetenzen",
    section: "Resume",
    content: `Projektorganisation & Prozessdesign, Strukturierte Problemlösung, Agiles Arbeiten (#Scrum).`,
    metadata: {
      category: "Skills",
      tags: ["Projektmanagement", "Scrum", "Problemlösung"],
    },
  },
  {
    id: "resume-6",
    title: "Sprachen",
    section: "Resume",
    content: `#Deutsch (C2), #Englisch (B2).`,
    metadata: {
      category: "Sprachen",
      tags: ["Deutsch", "Englisch"],
    },
  },

  // Projects Section
  {
    id: "projects-1",
    title: "HTML-Portfolio",
    section: "Projects",
    content: `HTML-Portfolio mit verschiedenen Web-Projekten und Übungen. Technologien: HTML, CSS, JavaScript. GitHub: https://github.com/B-Riemer/HTML-Portfolio`,
    metadata: {
      category: "Webentwicklung",
      tags: ["HTML", "CSS", "JavaScript"],
    },
  },
  {
    id: "projects-2",
    title: "TinDog",
    section: "Projects",
    content: `Tinder for dogs - Ein Dating-App-Konzept für Hunde. Technologien: HTML, CSS. GitHub: https://github.com/B-Riemer/TinDog`,
    metadata: {
      category: "Webentwicklung",
      tags: ["HTML", "CSS"],
    },
  },
  {
    id: "projects-3",
    title: "RadioList",
    section: "Projects",
    content: `Favorite Radio List - Meine favorisierten Radio Sender. Technologien: HTML. GitHub: https://github.com/B-Riemer/RadioList`,
    metadata: {
      category: "Webentwicklung",
      tags: ["HTML"],
    },
  },
  {
    id: "projects-4",
    title: "React-Chatbot-Project",
    section: "Projects",
    content: `Interaktiver Chatbot entwickelt mit React und Vite - Praktische Anwendung moderner Frontend-Technologien. Technologien: React, JavaScript, Vite, CSS. GitHub: https://github.com/B-Riemer/React-Chatbot-Project`,
    metadata: {
      category: "Frontend",
      tags: ["React", "JavaScript", "Vite"],
    },
  },

  // Hobbies Section
  {
    id: "hobbies-1",
    title: "Mentale Interessen & Weiterbildung",
    section: "Hobbies",
    content: `AI & Automatisierung: Künstliche Intelligenz, Automatisierungstechnologien, Prompt-Engineering. Tech-Weiterbildung: Selbststudium, moderne Tools & Frameworks.`,
    metadata: {
      category: "Interessen",
      tags: ["KI", "Automatisierung", "Weiterbildung"],
    },
  },
  {
    id: "hobbies-2",
    title: "Körper & Bewegung",
    section: "Hobbies",
    content: `Fitness & Bodybuilding: Kraftsport, Trainingsroutinen, Regeneration. Calisthenics: Eigengewichtstraining, funktionelle Kraft. Boxen / UCC: Kampfsport, Fokus & Technik. Motorradfahren: Harley Davidson Road Glide - Freiheit auf zwei Rädern, Technik & Erlebnis.`,
    metadata: {
      category: "Sport",
      tags: ["Fitness", "Bodybuilding", "Calisthenics", "Boxen", "Motorrad"],
    },
  },
  {
    id: "hobbies-3",
    title: "Mensch & Verbindung",
    section: "Hobbies",
    content: `Zeit mit Familie: Partnerschaft, Lebensbalance. Zeit mit Hund: Natur, Ruhe, Bindung. Freunde & Gemeinschaft: Sozialleben, gemeinsame Erlebnisse.`,
    metadata: {
      category: "Sozial",
      tags: ["Familie", "Freunde", "Gemeinschaft"],
    },
  },
  {
    id: "hobbies-4",
    title: "Natur & Reisen",
    section: "Hobbies",
    content: `Tauchen (Leidenschaft): Unterwasserwelt, Entdeckung, Ruhe. Landschaften & Natur erleben: Strände, Safari, Jungle, Wasser. Tiere & Kultur: Tierbeobachtungen, Begegnung mit Kulturen. Reise-Erlebnisse: Erkundung, Perspektivwechsel, Inspiration.`,
    metadata: {
      category: "Reisen",
      tags: ["Tauchen", "Natur", "Reisen", "Kultur"],
    },
  },

  // Licenses Section
  {
    id: "licenses-1",
    title: "Sport-Lizenzen",
    section: "Licenses",
    content: `Fitness-Trainer A-Lizenz, Personal Trainer, Sport- und Bewegungstherapeut.`,
    metadata: {
      category: "Sport",
      tags: ["Fitness", "Training", "Lizenz"],
    },
  },
  {
    id: "licenses-2",
    title: "Sicherheits-Lizenzen",
    section: "Licenses",
    content: `Sicherheitsfachkraft (nach §34a GewO), Sachkundeprüfung Bewachungsgewerbe, Erste-Hilfe-Ausbildung.`,
    metadata: {
      category: "Sicherheit",
      tags: ["Sicherheit", "GewO", "Erste Hilfe"],
    },
  },
  {
    id: "licenses-3",
    title: "IT-Zertifizierungen",
    section: "Licenses",
    content: `Fachinformatiker für Anwendungsentwicklung (IHK), Cloud-Zertifizierungen, KI & Machine Learning Kurse.`,
    metadata: {
      category: "IT",
      tags: ["IHK", "Cloud", "KI", "Machine Learning"],
    },
  },

  // Contact Section
  {
    id: "contact-1",
    title: "Kontaktinformationen",
    section: "Contact",
    content: `E-Mail: ai@b-riemer.dev. LinkedIn: https://linkedin.com/in/björn-riemer-97a136163. GitHub: https://github.com/b-riemer. Discord: bjorvik_roughneck.`,
    metadata: {
      category: "Kontakt",
      tags: ["E-Mail", "LinkedIn", "GitHub", "Discord"],
    },
  },
  {
    id: "contact-2",
    title: "Kontaktmöglichkeiten",
    section: "Contact",
    content: `Interesse an gemeinsamen Projekten, Beratung oder Workshops im Bereich KI und Softwareentwicklung? Kontakt über E-Mail oder Social Media möglich.`,
    metadata: {
      category: "Kontakt",
      tags: ["Projekte", "Beratung", "Workshops"],
    },
  },

  // Website Section
  {
    id: "website-1",
    title: "Website-Design",
    section: "Website",
    content: `Die Website verwendet ein Neurales MindHub mit Yggdrasil-Baum als Hintergrund. Futuristisches Design mit neon-farbenen Elementen und interaktiven Knotenpunkten zum Navigieren.`,
    metadata: {
      category: "Website",
      tags: ["Design", "UI", "UX"],
    },
  },
  {
    id: "website-2",
    title: "Website-Bereiche",
    section: "Website",
    content: `Die Website bietet verschiedene Bereiche: About Me, Projects, Resume, Hobbies, Contact, Licenses. Jeder Bereich kann über interaktive Knotenpunkte erreicht werden.`,
    metadata: {
      category: "Website",
      tags: ["Navigation", "Bereiche"],
    },
  },
];

