import { Icons } from "@/components/icons";
import initialData from "./initial-data.json";
import { HomeIcon, NotebookIcon } from "lucide-react";

export type PortfolioData = typeof initialData;

export const DATA = {
  ...initialData,
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    { href: "/blog", icon: NotebookIcon, label: "Blog" },
  ],
  contact: {
    ...initialData.contact,
    social: {
      GitHub: {
        ...initialData.contact.social.GitHub,
        icon: Icons.github,
      },
      LinkedIn: {
        ...initialData.contact.social.LinkedIn,
        icon: Icons.linkedin,
      },
      email: {
        ...initialData.contact.social.email,
        icon: Icons.email,
      },
    },
  },
  projects: initialData.projects.map((project) => ({
    ...project,
    links: project.links.map((link) => ({
      ...link,
      icon:
        link.type.toLowerCase().includes("source") ||
        link.type.toLowerCase().includes("github") ? (
          <Icons.github className="size-3" />
        ) : (
          <Icons.globe className="size-3" />
        ),
    })),
  })),
};

