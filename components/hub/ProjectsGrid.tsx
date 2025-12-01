"use client";

import { useEffect, useState } from "react";
import { projects } from "@/data/projects";

interface GitHubRepo {
  name: string;
  description: string | null;
  html_url: string;
  updated_at: string;
  private?: boolean;
}

const GITHUB_USERNAME = "B-Riemer"; // Bitte durch deinen GitHub-Username ersetzen

export default function ProjectsGrid() {
  const [githubRepos, setGithubRepos] = useState<GitHubRepo[]>([]);
  const [isLoadingRepos, setIsLoadingRepos] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchGitHubRepos = async () => {
      try {
        const response = await fetch(
          `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=10&direction=desc`
        );
        
        if (!response.ok) {
          const errorText = `HTTP ${response.status}: ${response.statusText}`;
          console.error("Failed to fetch GitHub repos:", errorText);
          setErrorMessage(errorText);
          setIsLoadingRepos(false);
          return;
        }

        const data = await response.json();
        console.log("GitHub API Response:", data); // Debug-Log
        
        // Prüfe ob data ein Array ist
        if (!Array.isArray(data)) {
          console.error("GitHub API returned non-array:", data);
          setErrorMessage("Invalid API response format");
          setIsLoadingRepos(false);
          return;
        }

        if (data.length === 0) {
          console.log("No repositories found for user:", GITHUB_USERNAME);
          setErrorMessage(null); // Kein Fehler, einfach keine Repos
        }

        // Filtere nur öffentliche Repositories
        const publicRepos = data.filter((repo: GitHubRepo) => !repo.private);
        
        // Sortiere nach updated_at (neueste zuerst) als Fallback
        const sorted = publicRepos.sort((a: GitHubRepo, b: GitHubRepo) => 
          new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
        );
        
        // Optional: Filtere nach bestimmten Keywords (z.B. "portfolio", "project")
        // const filtered = sorted.filter((repo: GitHubRepo) => 
        //   repo.name.toLowerCase().includes("portfolio") || 
        //   repo.name.toLowerCase().includes("project")
        // );
        
        const reposToShow = sorted.slice(0, 5);
        console.log("Total repos:", data.length, "Public repos:", publicRepos.length, "Repos to show:", reposToShow.length);
        console.log("Repos to show:", reposToShow); // Debug-Log
        setGithubRepos(reposToShow);
      } catch (error) {
        const errorMsg = error instanceof Error ? error.message : "Unknown error";
        console.error("Failed to fetch GitHub repos:", error);
        setErrorMessage(errorMsg);
      } finally {
        setIsLoadingRepos(false);
      }
    };

    if (GITHUB_USERNAME) {
      fetchGitHubRepos();
    } else {
      setIsLoadingRepos(false);
    }
  }, []);

  return (
    <div className="space-y-6">
      {/* Hauptprojekte */}
      <div className="space-y-4">
        {projects.map((project, index) => (
          <div
            key={index}
            className="relative group bg-white/5 border border-cyan-400/30 rounded-lg p-4 hover:bg-white/10 transition-colors"
          >
            {/* Optional: Hover-Vorschaubild (aktuell auskommentiert) */}
            {/* {project.image && (
              <img
                src={project.image}
                alt={`${project.title} preview`}
                className="absolute top-2 right-2 w-24 h-16 object-cover rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 border border-cyan-400/30"
              />
            )} */}

            <div className="flex items-start justify-between mb-2">
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline text-cyan-300 font-semibold text-lg hover:text-cyan-200 transition-colors"
              >
                {project.title}
              </a>
            </div>
            <p className="text-sm text-cyan-200/80 mb-3">{project.description}</p>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((tech, techIndex) => (
                <span
                  key={techIndex}
                  className="px-2 py-1 text-xs bg-cyan-400/10 border border-cyan-400/30 rounded text-cyan-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* GitHub-Feed */}
      {GITHUB_USERNAME && (
        <div className="pt-4 border-t border-cyan-400/30">
          <h3 className="text-cyan-300 font-semibold text-lg mb-3">
            Recent GitHub Repositories
          </h3>
          {isLoadingRepos ? (
            <p className="text-sm text-cyan-200/70">Loading repositories...</p>
          ) : errorMessage ? (
            <div className="text-sm text-red-400">
              <p>Error loading repositories: {errorMessage}</p>
              <p className="text-xs text-cyan-200/70 mt-1">
                Check console for details.
              </p>
            </div>
          ) : githubRepos.length > 0 ? (
            <div className="space-y-3">
              {githubRepos.map((repo) => (
                <div
                  key={repo.name}
                  className="bg-white/5 border border-cyan-400/20 rounded-lg p-3 hover:bg-white/10 transition-colors"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <a
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-cyan-300 font-semibold hover:text-cyan-200 hover:underline transition-colors flex items-center gap-2"
                      >
                        {repo.name}
                        <svg
                          className="w-4 h-4 flex-shrink-0"
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
                      </a>
                      {repo.description && (
                        <p className="text-xs text-cyan-200/70 mt-1 line-clamp-2">
                          {repo.description}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-cyan-200/70">No repositories found.</p>
          )}
        </div>
      )}
    </div>
  );
}

