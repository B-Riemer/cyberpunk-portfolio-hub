import { featuredProjects } from "@/data/featuredProjects";
import { fetchGitHubRepo, parseGitHubUrl } from "@/lib/github";
import ProjectCard from "@/components/projects/ProjectCard";

interface ProjectWithData {
  title: string;
  description: string | null;
  githubUrl: string;
  tech: string[];
}

export const metadata = {
  title: "Projects | Björn Riemer",
  description: "Ausgewählte Projekte und GitHub Repositories",
};

export default async function ProjectsPage() {
  // GitHub Token aus Umgebungsvariablen (optional)
  const githubToken = process.env.GITHUB_TOKEN;

  // Hole Daten für alle Projekte zur Build-Zeit
  const projectsWithData: ProjectWithData[] = await Promise.all(
    featuredProjects.map(async (project) => {
      const parsed = parseGitHubUrl(project.repoUrl);
      
      if (!parsed) {
        // Fallback falls URL nicht geparst werden kann
        return {
          title: project.repoUrl.split("/").pop() || "Unknown Project",
          description: null,
          githubUrl: project.repoUrl,
          tech: project.tech,
        };
      }

      const repoData = await fetchGitHubRepo(
        parsed.owner,
        parsed.repo,
        githubToken
      );

      return {
        title: repoData?.name || parsed.repo,
        description: repoData?.description || null,
        githubUrl: repoData?.html_url || project.repoUrl,
        tech: project.tech,
      };
    })
  );

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-black via-gray-900 to-black font-orbitron">
      <div className="container mx-auto px-4 py-16 max-w-6xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 neon-cyan">
            Featured Projects
          </h1>
          <p className="text-cyan-200/70 text-lg">
            Ausgewählte Projekte aus meinem GitHub Portfolio
          </p>
        </div>

        {/* Projekte Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projectsWithData.map((project, index) => (
            <ProjectCard
              key={index}
              title={project.title}
              description={project.description}
              githubUrl={project.githubUrl}
              tech={project.tech}
            />
          ))}
        </div>

        {/* Footer Info */}
        <div className="mt-12 pt-8 border-t border-cyan-400/30 text-center">
          <p className="text-sm text-cyan-200/60">
            Daten werden zur Build-Zeit von der GitHub API geladen
          </p>
        </div>
      </div>
    </div>
  );
}

