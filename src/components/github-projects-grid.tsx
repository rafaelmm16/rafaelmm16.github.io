"use client";

import { useEffect, useState } from "react";
import BlurFade from "@/components/magicui/blur-fade";
import { Icons } from "@/components/icons";
import { ProjectCard } from "@/components/project-card";
import {
  GitHubRepo,
  mapReposToProjects,
  ProjectItem,
} from "@/data/github";

interface GitHubProjectsGridProps {
  initialProjects: ProjectItem[];
  username?: string;
  limit?: number;
  blurFadeDelay?: number;
}

const CACHE_TTL_MS = 2 * 60 * 1000; // 2 minutos

export function GitHubProjectsGrid({
  initialProjects,
  username = "rafaelmm16",
  limit = 10,
  blurFadeDelay = 0.04,
}: GitHubProjectsGridProps) {
  const [projects, setProjects] = useState<ProjectItem[]>(initialProjects);

  useEffect(() => {
    const controller = new AbortController();
    const cacheKey = `gh_projects_${username}_${limit}`;

    async function syncGithubProjects() {
      try {
        const cachedRaw = sessionStorage.getItem(cacheKey);
        if (cachedRaw) {
          const cached = JSON.parse(cachedRaw) as {
            timestamp: number;
            items: ProjectItem[];
          };
          if (
            Date.now() - cached.timestamp < CACHE_TTL_MS &&
            Array.isArray(cached.items) &&
            cached.items.length > 0
          ) {
            setProjects(cached.items);
            return;
          }
        }
      } catch {
        // Ignora erros de acesso ao sessionStorage
      }

      try {
        const res = await fetch(
          `https://api.github.com/users/${username}/repos?sort=pushed&per_page=100`,
          {
            headers: {
              Accept: "application/vnd.github.v3+json",
            },
            signal: controller.signal,
          }
        );

        if (!res.ok) return;

        const repos: GitHubRepo[] = await res.json();
        const freshProjects = mapReposToProjects(repos, username, limit);

        if (freshProjects.length > 0) {
          setProjects(freshProjects);
          try {
            sessionStorage.setItem(
              cacheKey,
              JSON.stringify({
                timestamp: Date.now(),
                items: freshProjects,
              })
            );
          } catch {
            // Ignora erro de quota/storage
          }
        }
      } catch {
        // Mantém silenciosamente os projetos do build estático em caso de falha ou abort
      }
    }

    syncGithubProjects();

    return () => controller.abort();
  }, [username, limit]);

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 max-w-200 mx-auto">
      {projects?.map((project, id) => (
        <BlurFade
          key={`${project.title}-${id}`}
          delay={blurFadeDelay * 12 + id * 0.05}
        >
          <ProjectCard
            href={project.href}
            title={project.title}
            description={project.description}
            dates={project.dates}
            tags={project.technologies}
            image={project.image}
            video={project.video}
            links={project.links.map((link) => ({
              type: link.type,
              href: link.href,
              icon:
                link.iconType === "github" ? (
                  <Icons.github className="size-3" />
                ) : (
                  <Icons.globe className="size-3" />
                ),
            }))}
          />
        </BlurFade>
      ))}
    </div>
  );
}
