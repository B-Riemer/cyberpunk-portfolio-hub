"use client";

interface ProjectCardProps {
  title: string;
  description: string | null;
  githubUrl: string;
  tech: string[];
}

export default function ProjectCard({
  title,
  description,
  githubUrl,
  tech,
}: ProjectCardProps) {
  return (
    <div className="group relative bg-white/5 border border-cyan-400/30 rounded-lg p-6 hover:bg-white/10 transition-all duration-300 hover:border-cyan-400/50">
      {/* Titel als Link */}
      <a
        href={githubUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block mb-3"
      >
        <h3 className="text-cyan-300 font-semibold text-xl hover:text-cyan-200 hover:underline transition-colors flex items-center gap-2">
          {title}
          <svg
            className="w-5 h-5 flex-shrink-0 opacity-70 group-hover:opacity-100 transition-opacity"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
        </h3>
      </a>

      {/* Beschreibung */}
      {description && (
        <p className="text-sm text-cyan-200/80 mb-4 leading-relaxed">
          {description}
        </p>
      )}

      {/* Tech-Stack Labels */}
      <div className="flex flex-wrap gap-2">
        {tech.map((technology, index) => (
          <span
            key={index}
            className="px-3 py-1 text-xs bg-cyan-400/10 border border-cyan-400/30 rounded text-cyan-300 font-medium"
          >
            {technology}
          </span>
        ))}
      </div>

      {/* Subtle Glow Effect on Hover */}
      <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-cyan-400/5 to-transparent" />
      </div>
    </div>
  );
}

