"use client";

import { Github } from "lucide-react";

interface ProjectCard {
  label: string;
  headline: string;
  description: string;
  stack: string[];
  githubUrl?: string;
  isHighlight?: boolean;
}

const projects: ProjectCard[] = [
  {
    label: "Frontend & Logic",
    headline: "React AI Chatbot",
    description: "Interaktiver Chatbot basierend auf React & Vite. Fokus auf State-Management und moderne Frontend-Architektur.",
    stack: ["React", "JavaScript", "Vite", "CSS"],
    isHighlight: true,
  },
  {
    label: "UI/UX Design Study",
    headline: "TinDog",
    description: "'Tinder for Dogs' – Ein humorvolles Landing-Page-Konzept zur Demonstration von Responsive Design und CSS-Styling.",
    stack: ["HTML", "CSS", "Bootstrap"],
  },
  {
    label: "Web Basics",
    headline: "HTML Portfolio",
    description: "Eine Sammlung früher Web-Experimente und Layout-Übungen. Der Grundstein meiner Entwicklung.",
    stack: ["HTML", "CSS", "JS"],
  },
  {
    label: "Utility Tool",
    headline: "RadioList",
    description: "Persönliche Favoritenliste für Radiosender. Minimalistischer Ansatz.",
    stack: ["HTML"],
  },
];

export default function DeploymentsModal() {
  return (
    <div className="space-y-4">
      {projects.map((project, index) => (
        <div
          key={index}
          className="bg-white/5 border border-white/10 rounded-xl p-4 relative overflow-hidden hover:border-cyan-500/50 transition-colors"
        >
          {/* Label */}
          <div className="text-[10px] text-cyan-400 uppercase tracking-widest mb-1">
            {project.label}
          </div>

          {/* Headline */}
          <h3 className="font-orbitron text-white text-lg mb-2">
            {project.headline}
          </h3>

          {/* Description */}
          <p className="text-gray-300 text-sm mb-3 leading-relaxed">
            {project.description}
          </p>

          {/* Stack Badges */}
          <div className="flex flex-wrap gap-2 mb-3">
            {project.stack.map((tech, techIndex) => (
              <span
                key={techIndex}
                className="bg-cyan-900/40 text-cyan-200 text-[10px] px-2 py-0.5 rounded-full"
              >
                #{tech}
              </span>
            ))}
          </div>

          {/* Action Button */}
          <div className="flex justify-end">
            <button
              className="text-xs bg-white/10 hover:bg-white/20 px-3 py-1 rounded-md text-white flex items-center gap-1.5 transition-colors"
              onClick={() => {
                if (project.githubUrl) {
                  window.open(project.githubUrl, '_blank');
                }
              }}
            >
              <Github className="w-3 h-3" />
              View Code
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

