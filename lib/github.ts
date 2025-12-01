/**
 * GitHub API Helper Functions
 */

export interface GitHubRepoData {
  name: string;
  description: string | null;
  html_url: string;
  full_name: string;
}

/**
 * Extrahiert Owner und Repo-Name aus einer GitHub URL
 * @param repoUrl Vollständige GitHub URL (z.B. https://github.com/user/repo)
 * @returns {owner, repo} oder null bei ungültiger URL
 */
export function parseGitHubUrl(repoUrl: string): { owner: string; repo: string } | null {
  try {
    const url = new URL(repoUrl);
    const pathParts = url.pathname.split("/").filter(Boolean);
    
    if (pathParts.length >= 2) {
      return {
        owner: pathParts[0],
        repo: pathParts[1],
      };
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * Holt Repository-Daten von der GitHub API
 * @param owner Repository Owner
 * @param repo Repository Name
 * @param token Optional: GitHub Token für höhere Rate Limits
 * @returns Repository-Daten oder null bei Fehler
 */
export async function fetchGitHubRepo(
  owner: string,
  repo: string,
  token?: string
): Promise<GitHubRepoData | null> {
  try {
    const headers: HeadersInit = {
      Accept: "application/vnd.github.v3+json",
    };

    // Füge Token hinzu falls vorhanden
    if (token) {
      headers.Authorization = `token ${token}`;
    }

    const response = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
      headers,
      next: { revalidate: 3600 }, // Cache für 1 Stunde
    });

    if (!response.ok) {
      console.error(`GitHub API Error: ${response.status} for ${owner}/${repo}`);
      return null;
    }

    const data = await response.json();
    return {
      name: data.name,
      description: data.description,
      html_url: data.html_url,
      full_name: data.full_name,
    };
  } catch (error) {
    console.error(`Error fetching GitHub repo ${owner}/${repo}:`, error);
    return null;
  }
}

