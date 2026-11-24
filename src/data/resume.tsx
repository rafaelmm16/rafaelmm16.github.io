import { Icons } from "@/components/icons";
import { HomeIcon, NotebookIcon } from "lucide-react";

export const DATA = {
  name: "Rafael Merlo Mendes",
  initials: "RM",
  url: "https://rafaelmm16.github.io/",
  location: "São Mateus, ES, 29930-590",
  locationLink: "https://www.google.com/maps/place/São+Mateus,+ES",
  description:
    "Técnico em Informática com foco em Desenvolvimento Web e Mobile (React, Next.js, React Native, TypeScript) e Suporte/Infraestrutura de TI. Formando em Sistemas de Informação.",
  summary:
    "Atuo no desenvolvimento de aplicações **Web** e **Mobile** modernas, unindo engenharia de software no ecossistema TypeScript, React, Next.js e React Native (Expo) a uma base sólida em **Infraestrutura, Redes e Suporte de TI**. Durante minha trajetória, passei pelo suporte técnico no Polo UAB São Mateus, coordenação de núcleo na Prefeitura Municipal, administração de redes e Active Directory no IFES (onde também desenvolvi ferramentas de automação e monitoramento em Python/PowerShell) e atuação administrativa na Plena Benefícios.",
  avatarUrl: "/me.png",
  skillsByCategory: [
    {
      category: "Front-end & Mobile",
      skills: [
        "TypeScript",
        "JavaScript",
        "React",
        "Next.js",
        "React Native",
        "Expo",
        "Tailwind CSS",
        "NativeWind",
        "TanStack Query",
        "Zustand",
        "HTML/CSS",
      ],
    },
    {
      category: "Back-end, Automação & Dados",
      skills: [
        "Node.js",
        "Express",
        "Python",
        "Java",
        "C / C++",
        "Go",
        "MongoDB",
        "SQLite",
        "TypeORM",
        "Zod",
        "PowerShell / WinRM",
      ],
    },
    {
      category: "Infraestrutura, Ferramentas & Competências",
      skills: [
        "Active Directory (AD)",
        "Rede de Computadores",
        "Infraestrutura de TI",
        "Suporte Técnico",
        "Manutenção de Computadores",
        "Git & GitHub",
        "Linux",
        "Figma",
        "Liderança e Organização",
      ],
    },
  ],
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    { href: "/blog", icon: NotebookIcon, label: "Blog" },
  ],
  contact: {
    email: "rafael.merlomendes@gmail.com",
    tel: "(27) 99843-8980",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/rafaelmm16",
        icon: Icons.github,
        navbar: true,
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/rafael-merlo-mendes-b0427a142/",
        icon: Icons.linkedin,
        navbar: true,
      },
      email: {
        name: "Send Email",
        url: "mailto:rafael.merlomendes@gmail.com",
        icon: Icons.email,
        navbar: true,
      },
    },
  },
  work: [
    {
      company: "Plena - Administradora de Benefícios",
      href: "https://plenabeneficios.com.br/",
      badges: [],
      location: "Presencial",
      title: "Auxiliar Administrativo",
      logoUrl: "/plena.png",
      start: "05/2026",
      end: "Atualmente",
      description:
        "Atuação em rotinas administrativas, elaboração e organização de documentos, processos internos e suporte operacional.",
    },
    {
      company: "IFES",
      href: "https://www.saomateus.ifes.edu.br/",
      badges: [],
      location: "São Mateus, ES",
      title: "Estagiário CTI",
      logoUrl: "/sao-mateus-vertical-cor.png",
      start: "05/2024",
      end: "05/2026",
      description:
        "Manutenção de computadores, instalação de rede, controle de Active Directory (AD), automação de monitoramento de máquinas e suporte técnico aos usuários.",
    },
    {
      company: "Polo UAB",
      href: "",
      badges: [],
      location: "São Mateus, ES",
      title: "Estagiário de TI",
      logoUrl: "",
      start: "09/2022",
      end: "01/2024",
      description:
        "Manutenção de computadores, instalação de rede, criação de artes e suporte técnico aos usuários.",
    },
    {
      company: "Prefeitura Municipal de São Mateus",
      badges: [],
      href: "https://www.saomateus.es.gov.br",
      location: "São Mateus, ES",
      title: "Coordenador de Núcleo",
      logoUrl: "/prefeitura-sao-mateus.png",
      start: "01/2022",
      end: "05/2022",
      description:
        "Coordenação de equipe e núcleo, desenvolvimento de liderança e organização, manutenção de computadores, instalação de rede e atendimento ao cliente.",
    },
    {
      company: "Prefeitura Municipal de São Mateus",
      badges: [],
      href: "https://www.saomateus.es.gov.br",
      location: "São Mateus, ES",
      title: "Estagiário de TI",
      logoUrl: "/prefeitura-sao-mateus.png",
      start: "01/2021",
      end: "01/2022",
      description:
        "Manutenção de computadores, instalação de rede e atendimento ao cliente.",
    },
  ],
  education: [
    {
      school: "FAESA",
      href: "https://www.faesa.br",
      degree: "Bacharelado em Sistemas de Informação (Formando)",
      logoUrl: "/faesa.svg",
      start: "2023",
      end: "2026",
    },
    {
      school: "E.E.E.F.M. Antonio dos Santos Neves",
      href: "",
      degree:
        "Ensino Médio e Integral em Montagem e Manutenção de Computadores pelo IFES",
      logoUrl: "/sao-mateus-vertical-cor.png",
      start: "2012",
      end: "2015",
    },
  ],
  certificates: [
    {
      title: "React na Prática & Next Level Week (Unite / Expert)",
      issuer: "Rocketseat",
      dates: "2024",
      location: "Online",
      description:
        "Desenvolvimento de aplicações Web e Mobile com React, React Native (Expo), TypeScript, Tailwind CSS, NativeWind, TanStack React Query e Zod.",
      image: "",
      links: [
        {
          title: "React na Prática",
          href: "https://github.com/rafaelmm16/Rocketseat/tree/main/projects/React-na-Pratica",
          icon: <Icons.github className="size-3" />,
        },
        {
          title: "NLW Unite",
          href: "https://github.com/rafaelmm16/Rocketseat/tree/main/projects/NLW-Unite",
          icon: <Icons.github className="size-3" />,
        },
        {
          title: "NLW Expert RN",
          href: "https://github.com/rafaelmm16/Rocketseat/tree/main/projects/NLW-Expert_React-Native",
          icon: <Icons.github className="size-3" />,
        },
      ],
    },
    {
      title: "Curso de Java",
      issuer: "Rocketseat",
      dates: "2023",
      location: "Online",
      description:
        "Fundamentos de desenvolvimento Java, programação orientada a objetos, APIs e boas práticas de código.",
      image: "",
      links: [
        {
          title: "Repositório",
          href: "https://github.com/rafaelmm16/Rocketseat/tree/main/projects/Curso-de-Java",
          icon: <Icons.github className="size-3" />,
        },
      ],
    },
    {
      title: "Next Level Week (NLW) - Edições 1 e 2",
      issuer: "Rocketseat",
      dates: "2020",
      location: "Online",
      description:
        "Imersão prática em desenvolvimento Full-Stack com HTML, CSS, JavaScript, Node.js e SQLite.",
      image: "",
      links: [
        {
          title: "NLW #1",
          href: "https://github.com/rafaelmm16/Rocketseat/tree/main/projects/NLW",
          icon: <Icons.github className="size-3" />,
        },
        {
          title: "NLW #2",
          href: "https://github.com/rafaelmm16/Rocketseat/tree/main/projects/NLW-2",
          icon: <Icons.github className="size-3" />,
        },
      ],
    },
    {
      title: "Técnico em Manutenção e Suporte em Informática",
      issuer: "EEEFM Antonio dos Santos Neves",
      dates: "2013 - 2015",
      location: "São Mateus, ES",
      description:
        "Formação técnica em arquitetura de computadores, redes locais, manutenção de hardware e suporte ao usuário.",
      image: "/sao-mateus-vertical-cor.png",
      links: [],
    },
  ],
  projects: [
    {
      title: "Rocketseat Hub — Portfólio Unificado",
      href: "https://rafaelmm16.github.io/Rocketseat/",
      dates: "Nov 2026",
      active: true,
      description:
        "Monorepositório e portal unificado reunindo 8 projetos de cursos e eventos da Rocketseat: pass.in, Cook App, My Goals, nivo.video, Orders, To-Do List API, Proffy e Ecoleta.",
      technologies: [
        "Next.js",
        "TypeScript",
        "React Native",
        "Tailwind CSS",
        "Node.js",
        "Java",
      ],
      links: [
        {
          type: "Website",
          href: "https://rafaelmm16.github.io/Rocketseat/",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "GitHub",
          href: "https://github.com/rafaelmm16/Rocketseat",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "",
      video: "",
    },
    {
      title: "College — Disciplinas da Faculdade",
      href: "https://rafaelmm16.github.io/College/",
      dates: "Nov 2026",
      active: true,
      description:
        "Monorepositório e vitrine interativa reunindo códigos e projetos de 19 disciplinas da graduação em Sistemas de Informação, incluindo SGBus, Recicla Capixaba, Delivery Web App e jogos em Godot.",
      technologies: [
        "Next.js",
        "TypeScript",
        "Tailwind CSS",
        "C / C++",
        "Python",
        "Java",
      ],
      links: [
        {
          type: "Website",
          href: "https://rafaelmm16.github.io/College/",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "GitHub",
          href: "https://github.com/rafaelmm16/College",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "",
      video: "",
    },
    {
      title: "Florescer — Controle de Hábitos",
      href: "https://github.com/rafaelmm16/Florescer",
      dates: "Out 2026",
      active: true,
      description:
        "Aplicativo mobile offline-first para acompanhamento de hábitos diários, com sistema de ofensivas (streaks), heatmap de constância estilo GitHub, notificações locais e sincronização em nuvem.",
      technologies: [
        "React Native",
        "Expo",
        "TypeScript",
        "Zustand",
        "Node.js",
        "MongoDB",
      ],
      links: [
        {
          type: "GitHub",
          href: "https://github.com/rafaelmm16/Florescer",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "",
      video: "",
    },
    {
      title: "Idlewatch Agent Server",
      href: "https://github.com/rafaelmm16/Idlewatch-Agent-Server",
      dates: "Mar 2026",
      active: true,
      description:
        "Sistema de monitoramento remoto em tempo real que coleta métricas de uso de CPU, memória, processos e tempo ocioso de computadores integrados ao Active Directory (AD) via WinRM/PowerShell, exportando diagnósticos para o Google Sheets.",
      technologies: [
        "Python",
        "Active Directory",
        "PowerShell",
        "WinRM",
        "Google Sheets API",
      ],
      links: [
        {
          type: "GitHub",
          href: "https://github.com/rafaelmm16/Idlewatch-Agent-Server",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "",
      video: "",
    },
    {
      title: "Web Development — Diretório Front-End",
      href: "https://rafaelmm16.github.io/Web-Development/",
      dates: "Nov 2026",
      active: true,
      description:
        "Diretório interativo com 22 projetos front-end: clones de interfaces (Spotify, Netflix, YouTube, Pinterest, Apple), landing pages, telas de login, componentes UI e laboratórios de JavaScript.",
      technologies: [
        "HTML5",
        "CSS3",
        "JavaScript",
        "Tailwind CSS",
        "Bootstrap",
        "Next.js",
      ],
      links: [
        {
          type: "Website",
          href: "https://rafaelmm16.github.io/Web-Development/",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "GitHub",
          href: "https://github.com/rafaelmm16/Web-Development",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/LP.png",
      video: "",
    },
    {
      title: "Clicker Project",
      href: "https://rafaelmm16.github.io/Clicker-Project/",
      dates: "Nov 2026",
      active: true,
      description:
        "Jogo incremental de clicker em duas versões: aplicação web em Next.js com estética Retro Terminal/Cyberpunk e versão original em C para terminal, com loja de upgrades, sistema de ascensão/prestígio, conquistas e save persistente.",
      technologies: ["Next.js", "TypeScript", "Tailwind CSS", "C"],
      links: [
        {
          type: "Website",
          href: "https://rafaelmm16.github.io/Clicker-Project/",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "GitHub",
          href: "https://github.com/rafaelmm16/Clicker-Project",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "",
      video: "",
    },
  ],
} as const;

export type PortfolioData = typeof DATA;
