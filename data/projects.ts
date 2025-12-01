export interface Project {
  title: string;
  description: string;
  tech: string[];
  link: string;
  image?: string; // Optional für Hover-Vorschaubild
}

export const projects: Project[] = [
  {
    title: "HTML-Portfolio",
    description: "Mein HTML Portfolio mit verschiedenen Web-Projekten und Übungen",
    tech: ["HTML", "CSS", "JavaScript"],
    link: "https://github.com/B-Riemer/HTML-Portfolio",
    // image: "/previews/html-portfolio.png", // Optional: später aktivieren
  },
  {
    title: "TinDog",
    description: "Tinder for dogs",
    tech: ["HTML", "CSS"],
    link: "https://github.com/B-Riemer/TinDog",
    // image: "/previews/tindog.png", // Optional: später aktivieren
  },
  {
    title: "RadioList",
    description: "Favorite Radio List - Meine favorisierten Radio Sender",
    tech: ["HTML"],
    link: "https://github.com/B-Riemer/RadioList",
    // image: "/previews/radiolist.png", // Optional: später aktivieren
  },
  {
    title: "React-Chatbot-Project",
    description: "Interaktiver Chatbot entwickelt mit React und Vite - Praktische Anwendung moderner Frontend-Technologien",
    tech: ["React", "JavaScript", "Vite", "CSS"],
    link: "https://github.com/B-Riemer/React-Chatbot-Project",
    // image: "/previews/react-chatbot.png", // Optional: später aktivieren
  },
];

