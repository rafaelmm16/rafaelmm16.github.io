import { Icons } from "@/components/icons";
import { DATA } from "@/data/resume";
import React from "react";

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
  stargazers_count: number;
  forks_count: number;
  pushed_at: string;
  created_at: string;
}

export interface ProjectItem {
  title: string;
  href: string;
  dates: string;
  active: boolean;
  description: string;
  technologies: readonly string[];
  links: readonly {
    icon?: React.ReactNode;
    type: string;
    href: string;
  }[];
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

export async function getGithubProjects(
  username: string = "rafaelmm16",
  limit: number = 8
): Promise<ProjectItem[]> {
  try {
    const res = await fetch(
      `https://api.github.com/users/${username}/repos?sort=pushed&per_page=30`,
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
      return [...DATA.projects];
    }

    const repos: GitHubRepo[] = await res.json();

    // Filtra repositórios que não devem aparecer (forks, perfil e o próprio portfólio)
    const ignoredRepos = new Set([
      username.toLowerCase(),
      `${username.toLowerCase()}.github.io`,
    ]);

    const filtered = repos
      .filter((repo) => !repo.fork && !ignoredRepos.has(repo.name.toLowerCase()))
      .slice(0, limit);

    return filtered.map((repo) => {
      // Verifica se há dados pré-existentes em DATA.projects para reaproveitar mídias (imagem/vídeo)
      const existingMatch = DATA.projects.find((p) => {
        const repoName = repo.name.toLowerCase();
        return (
          p.href.toLowerCase().endsWith(`/${repoName}`) ||
          p.title.toLowerCase() === repoName
        );
      });

      // Tags combinando linguagem principal e tópicos do GitHub
      const rawTags = [repo.language, ...(repo.topics || [])].filter(
        Boolean
      ) as string[];
      const technologies = Array.from(new Set(rawTags));

      const links: { icon: React.ReactNode; type: string; href: string }[] = [];

      // Link para o código no GitHub
      links.push({
        type: "GitHub",
        href: repo.html_url,
        icon: <Icons.github className="size-3" />,
      });

      // Se tiver site/deploy no ar (homepage)
      if (repo.homepage && repo.homepage.trim().startsWith("http")) {
        links.push({
          type: "Website",
          href: repo.homepage,
          icon: <Icons.globe className="size-3" />,
        });
      }

      const formattedTitle = repo.name.replace(/[-_]/g, " ");

      return {
        title: existingMatch?.title || formattedTitle,
        href: repo.homepage && repo.homepage.startsWith("http") ? repo.homepage : repo.html_url,
        dates: formatDate(repo.pushed_at),
        active: true,
        description:
          existingMatch?.description ||
          repo.description ||
          "Projeto desenvolvido e disponível no GitHub.",
        technologies:
          technologies.length > 0
            ? technologies
            : existingMatch?.technologies || ["GitHub"],
        links,
        image: existingMatch?.image || "",
        video: existingMatch?.video || "",
      };
    });
  } catch (error) {
    console.error("Erro ao buscar projetos do GitHub:", error);
    return [...DATA.projects];
  }
}
