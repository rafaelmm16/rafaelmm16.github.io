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
          href: "https://github.com/rafaelmm16/React-na-Pratica",
          icon: <Icons.github className="size-3" />,
        },
        {
          title: "NLW Unite",
          href: "https://github.com/rafaelmm16/NLW-Unite",
          icon: <Icons.github className="size-3" />,
        },
        {
          title: "NLW Expert RN",
          href: "https://github.com/rafaelmm16/NLW-Expert_React-Native",
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
          href: "https://github.com/rafaelmm16/Curso-de-Java",
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
          href: "https://github.com/rafaelmm16/NLW",
          icon: <Icons.github className="size-3" />,
        },
        {
          title: "NLW #2",
          href: "https://github.com/rafaelmm16/NLW-2",
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
      title: "Cook-App — Sugestão de Receitas",
      href: "https://github.com/rafaelmm16/Cook-App",
      dates: "Mar 2024",
      active: true,
      description:
        "Aplicativo mobile que sugere receitas personalizadas com base nos ingredientes selecionados pelo usuário.",
      technologies: ["React Native", "Expo", "TypeScript"],
      links: [
        {
          type: "GitHub",
          href: "https://github.com/rafaelmm16/Cook-App",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "",
      video: "/Cook-App.mp4",
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
      title: "Spotify Cover",
      href: "https://rafaelmm16.github.io/Spotify-Cover/",
      dates: "Out 2026",
      active: true,
      description:
        "Interface web inspirada no Spotify com reprodutor de áudio interativo via Web Audio API, componentização moderna e layout responsivo.",
      technologies: ["React", "TypeScript", "Tailwind CSS", "Web Audio API"],
      links: [
        {
          type: "Website",
          href: "https://rafaelmm16.github.io/Spotify-Cover/",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "GitHub",
          href: "https://github.com/rafaelmm16/Spotify-Cover",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "",
      video: "",
    },
    {
      title: "Recicla Capixaba — Jogos Educativos",
      href: "https://rafaelmm16.github.io/Projeto-Integrador-VIII-B/",
      dates: "Out 2025",
      active: true,
      description:
        "Plataforma web interativa de jogos educativos sobre reciclagem e sustentabilidade (classificação de resíduos, quiz ambiental e ranking de pontuação).",
      technologies: ["React", "TypeScript", "Tailwind CSS"],
      links: [
        {
          type: "Website",
          href: "https://rafaelmm16.github.io/Projeto-Integrador-VIII-B/",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "GitHub",
          href: "https://github.com/rafaelmm16/Projeto-Integrador-VIII-B",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "",
      video: "",
    },
    {
      title: "Gerenciador de Tags — React na Prática",
      href: "https://rafaelmm16.github.io/React-na-Pratica/",
      dates: "Nov 2026",
      active: true,
      description:
        "Aplicação web para gerenciamento, filtragem e paginação de tags de vídeo com estado sincronizado na URL (Search Params) e cache assíncrono.",
      technologies: [
        "React",
        "TypeScript",
        "Vite",
        "Tailwind CSS",
        "TanStack Query",
      ],
      links: [
        {
          type: "Website",
          href: "https://rafaelmm16.github.io/React-na-Pratica/",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "GitHub",
          href: "https://github.com/rafaelmm16/React-na-Pratica",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "",
      video: "",
    },
    {
      title: "Delivery Web App (IHC)",
      href: "https://rafaelmm16.github.io/Interface-Humano-Computador/",
      dates: "Out 2025",
      active: true,
      description:
        "Protótipo funcional de uma plataforma de delivery de comida com autenticação, busca por categorias, carrinho de compras e fluxo completo de checkout.",
      technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
      links: [
        {
          type: "Website",
          href: "https://rafaelmm16.github.io/Interface-Humano-Computador/",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "GitHub",
          href: "https://github.com/rafaelmm16/Interface-Humano-Computador",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "",
      video: "",
    },
    {
      title: "SGBus — Mobilidade Universitária",
      href: "https://github.com/rafaelmm16/Projeto-de-Sistemas",
      dates: "Jan 2023",
      active: true,
      description:
        "Aplicativo pensado para facilitar a rotina do estudante na consulta de pontos e rotas de ônibus, além de recarga do cartão de passagem.",
      technologies: [
        "React Native",
        "Expo",
        "TypeScript",
        "Node.js",
        "TypeORM",
        "SQLite",
      ],
      links: [
        {
          type: "GitHub",
          href: "https://github.com/rafaelmm16/Projeto-de-Sistemas",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/Portfolio_page-0011.jpg",
      video: "",
    },
    {
      title: "Web Development — Landing Pages & UI",
      href: "https://rafaelmm16.github.io/Web-Development/",
      dates: "Out 2026",
      active: true,
      description:
        "Coleção de páginas web, landing pages e experimentos práticos desenvolvidos com HTML, CSS, JavaScript e Bootstrap.",
      technologies: ["HTML", "CSS", "JavaScript", "Bootstrap"],
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
      title: "Flappy Bird Clone (Godot)",
      href: "https://github.com/rafaelmm16/Projeto-Final-SM",
      dates: "Mar 2022",
      active: true,
      description:
        "Jogo 2D estilo Flappy Bird desenvolvido na engine Godot como projeto final da disciplina de Sistemas Multimídia.",
      technologies: ["Godot", "GDScript"],
      links: [
        {
          type: "GitHub",
          href: "https://github.com/rafaelmm16/Projeto-Final-SM",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/Portfolio_page-0010.jpg",
      video: "",
    },
  ],
} as const;

export type PortfolioData = typeof DATA;
