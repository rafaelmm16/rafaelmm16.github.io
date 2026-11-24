import { DATA } from "@/data/resume";

export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  topics?: string[];
  fork: boolean;
  archived: boolean;
  stargazers_count: number;
  forks_count: number;
  pushed_at: string;
  created_at: string;
}

export interface ProjectLinkItem {
  iconType: "globe" | "github";
  type: string;
  href: string;
}

export interface ProjectItem {
  title: string;
  href: string;
  dates: string;
  active: boolean;
  description: string;
  technologies: readonly string[];
  links: readonly ProjectLinkItem[];
  image?: string;
  video?: string;
}

function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    const formatted = date.toLocaleDateString("pt-BR", {
      month: "short",
      year: "numeric",
    });
    return formatted.charAt(0).toUpperCase() + formatted.slice(1);
  } catch {
    return dateString;
  }
}

function findCuratedProject(repo: GitHubRepo) {
  const repoName = repo.name.toLowerCase();
  const repoUrl = repo.html_url.toLowerCase();
  const homepageUrl = repo.homepage?.trim().toLowerCase();

  return DATA.projects.find((p) => {
    const pHref = p.href.toLowerCase();
    if (
      pHref === repoUrl ||
      pHref.endsWith(`/${repoName}`) ||
      (homepageUrl && pHref === homepageUrl) ||
      p.title.toLowerCase() === repoName
    ) {
      return true;
    }
    return p.links.some((link) => {
      const lHref = link.href.toLowerCase();
      return lHref === repoUrl || lHref.endsWith(`/${repoName}`);
    });
  });
}

function getFallbackProjects(limit: number): ProjectItem[] {
  return DATA.projects.slice(0, limit).map((p) => ({
    title: p.title,
    href: p.href,
    dates: p.dates,
    active: p.active,
    description: p.description,
    technologies: p.technologies,
    links: p.links.map((link) => ({
      iconType: link.type.toLowerCase() === "github" ? "github" : "globe",
      type: link.type,
      href: link.href,
    })),
    image: p.image,
    video: p.video,
  }));
}

export function mapReposToProjects(
  repos: GitHubRepo[],
  username: string = "rafaelmm16",
  limit: number = 10
): ProjectItem[] {
  // Filtra repositórios que não devem aparecer na vitrine de projetos
  // (forks, arquivados, repo de perfil e próprio portfólio)
  const ignoredRepos = new Set([
    username.toLowerCase(),
    `${username.toLowerCase()}.github.io`,
  ]);

  const candidateRepos = repos.filter(
    (repo) =>
      !repo.fork &&
      !repo.archived &&
      !ignoredRepos.has(repo.name.toLowerCase())
  );

  const mapped = candidateRepos.map((repo) => {
    const existingMatch = findCuratedProject(repo);
    const curatedIndex = existingMatch
      ? DATA.projects.indexOf(existingMatch)
      : -1;

    const rawTags = [repo.language, ...(repo.topics || [])]
      .filter(Boolean)
      .map((t) => (t === "tyepscript" ? "TypeScript" : t!));
    const githubTechnologies = Array.from(new Set(rawTags));

    const links: ProjectLinkItem[] = [];

    if (repo.homepage && repo.homepage.trim().startsWith("http")) {
      links.push({
        type: "Website",
        href: repo.homepage.trim(),
        iconType: "globe",
      });
    }

    links.push({
      type: "GitHub",
      href: repo.html_url,
      iconType: "github",
    });

    const formattedTitle = repo.name.replace(/[-_]/g, " ");

    // Prioriza as tecnologias curadas em DATA.projects (que são mais completas),
    // mesclando com os tópicos do GitHub se necessário
    const technologies =
      existingMatch && existingMatch.technologies.length > 0
        ? existingMatch.technologies
        : githubTechnologies.length > 0
          ? githubTechnologies
          : ["GitHub"];

    const item: ProjectItem = {
      title: existingMatch?.title || formattedTitle,
      href:
        repo.homepage && repo.homepage.trim().startsWith("http")
          ? repo.homepage.trim()
          : existingMatch?.href || repo.html_url,
      dates: formatDate(repo.pushed_at),
      active: true,
      description:
        existingMatch?.description ||
        repo.description ||
        "Projeto desenvolvido e disponível no GitHub.",
      technologies,
      links,
      image: existingMatch?.image || "",
      video: existingMatch?.video || "",
    };

    return {
      item,
      curatedIndex,
      pushedAt: new Date(repo.pushed_at).getTime(),
    };
  });

  // Ordena priorizando os projetos em destaque (na ordem definida em DATA.projects)
  // seguidos pelos demais repositórios mais recentes do GitHub
  mapped.sort((a, b) => {
    if (a.curatedIndex !== -1 && b.curatedIndex !== -1) {
      return a.curatedIndex - b.curatedIndex;
    }
    if (a.curatedIndex !== -1) return -1;
    if (b.curatedIndex !== -1) return 1;
    return b.pushedAt - a.pushedAt;
  });

  return mapped.slice(0, limit).map((entry) => entry.item);
}

export async function getGithubProjects(
  username: string = "rafaelmm16",
  limit: number = 8
): Promise<ProjectItem[]> {
  try {
    const res = await fetch(
      `https://api.github.com/users/${username}/repos?sort=pushed&per_page=100`,
      {
        headers: {
          Accept: "application/vnd.github.v3+json",
        },
        next: { revalidate: 3600 },
      }
    );

    if (!res.ok) {
      console.warn(
        `GitHub API retornou status ${res.status}. Usando projetos estáticos de reserva.`
      );
      return getFallbackProjects(limit);
    }

    const repos: GitHubRepo[] = await res.json();
    return mapReposToProjects(repos, username, limit);
  } catch (error) {
    console.error("Erro ao buscar projetos do GitHub:", error);
    return getFallbackProjects(limit);
  }
}
