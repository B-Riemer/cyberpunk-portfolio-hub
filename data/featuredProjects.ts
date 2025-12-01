/**
 * Manuell gepflegte Liste von ausgewählten Projekten
 * Diese Projekte werden auf /home/projects angezeigt
 * Titel und Beschreibung werden zur Build-Zeit von GitHub API geladen
 */
export interface FeaturedProjectConfig {
  repoUrl: string; // Vollständiger GitHub URL (z.B. https://github.com/user/repo)
  tech: string[]; // Manuell definierter Tech-Stack
}

export const featuredProjects: FeaturedProjectConfig[] = [
  {
    repoUrl: "https://github.com/B-Riemer/HTML-Portfolio",
    tech: ["HTML", "CSS", "JavaScript"],
  },
  {
    repoUrl: "https://github.com/B-Riemer/React-Chatbot-Project",
    tech: ["React", "TypeScript", "OpenAI"],
  },
  {
    repoUrl: "https://github.com/B-Riemer/my-page",
    tech: ["Next.js", "React", "TypeScript", "Tailwind"],
  },
  // Weitere Projekte hier hinzufügen...
];

