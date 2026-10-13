import { Icons } from "@/components/icons";
import { HomeIcon, NotebookIcon } from "lucide-react";

export const DATA = {
  name: "Rafael Merlo Mendes",
  initials: "RM",
  url: "https://rafaelmm16.github.io/",
  location: "São Mateus, ES, 29930-590",
  locationLink: "https://www.google.com/maps/place/São+Mateus,+ES",
  description:
    "Técnico em Informática com foco em Desenvolvimento Web, React Native, TypeScript e Suporte/Infraestrutura de TI. Formando em Sistemas de Informação.",
  summary:
    "Durante minha trajetória, atuei em diferentes frentes: desde o suporte técnico direto no Polo UAB São Mateus até a coordenação de núcleo na Prefeitura, onde desenvolvi habilidades de liderança e organização. No IFES, combinei atividades técnicas, como configuração de redes e sistemas, com a responsabilidade administrativa de gerir processos do setor de TI, oferecendo um atendimento de qualidade aos usuários.",
  avatarUrl: "/me.png",
  skills: [
    "Desenvolvimento Web",
    "React Native",
    "TypeScript",
    "React",
    "Next.js",
    "Node.js",
    "Active Directory (AD)",
    "Rede de Computadores",
    "Suporte Técnico",
    "Infraestrutura TI",
    "Github",
    "Resolução de Problemas",
    "Trabalho em equipe",
  ],
  skillsByCategory: [
    {
      category: "Desenvolvimento & Programação",
      skills: [
        "Desenvolvimento Web",
        "React Native",
        "TypeScript",
        "JavaScript",
        "React",
        "Next.js",
        "Node.js",
        "Python",
        "HTML/CSS",
        "Tailwind CSS",
      ],
    },
    {
      category: "Infraestrutura & Suporte",
      skills: [
        "Suporte Técnico",
        "Manutenção e Suporte de Computadores",
        "Rede de Computadores",
        "Active Directory (AD)",
        "Infraestrutura TI",
        "Configuração de Redes e Sistemas",
      ],
    },
    {
      category: "Ferramentas & Competências",
      skills: [
        "Git",
        "Github",
        "SQLite",
        "TypeORM",
        "Resolução de Problemas",
        "Trabalho em equipe",
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
      end: "Present",
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
        "Manutenção de computadores, instalação de rede, controle de Active Directory (AD), suporte a usuários e suporte técnico.",
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
      logoUrl: "/05 - Ciência, Tecnologia, Inovação, Educação Profissional e Trabalho - Fonte Preta RGB.png",
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
      logoUrl: "/05 - Ciência, Tecnologia, Inovação, Educação Profissional e Trabalho - Fonte Preta RGB.png",
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
      degree: "Ensino Médio e Integral em Montagem e Manutenção de Computadores pelo IFES",
      logoUrl: "/ib.png",
      start: "2012",
      end: "2015",
    },
  ],
  certificates: [
    {
      title: "Next Level Week (NLW) - Edições 1 e 2",
      issuer: "Rocketseat",
      dates: "2024",
      location: "Online",
      description:
        "Desenvolvimento de aplicações completas no ecossistema TypeScript, Node.js e React.",
      image: "",
      links: [
        {
          title: "GitHub",
          href: "https://github.com/rafaelmm16/NLW",
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
        "Fundamentos de desenvolvimento Java, programação orientada a objetos e boas práticas de código.",
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
      title: "Técnico em Manutenção e Suporte em Informática",
      issuer: "EEEFM Antonio dos Santos Neves",
      dates: "2013 - 2015",
      location: "São Mateus, ES",
      description:
        "Formação técnica em arquitetura de computadores, redes locais, manutenção de hardware e suporte ao usuário.",
      image: "/ib.png",
      links: [],
    },
  ],
  projects: [
    {
      title: "Repositório de Estudo sobre HTML, CSS e JavaScript",
      href: "https://github.com/rafaelmm16/Web-development",
      dates: "Jan 2024 - Feb 2024",
      active: true,
      description:
        "Um repositório contendo materiais de estudo relacionados a HTML, CSS e JavaScript. Contendo LPs, Websites e mais.",
      technologies: [
        "HTML",
        "CSS",
        "JavaScript",
        "Tailwind",
      ],
      links: [
        {
          type: "Website",
          href: "https://github.com/rafaelmm16/Web-development",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "/LP.png",
      video: "",
    },
    {
      title: "Cook-App",
      href: "https://github.com/rafaelmm16/Cook-App",
      dates: "March 2024",
      active: true,
      description:
        "Aplicativo que sugere receitas baseadas nos ingredientes selecionados.",
      technologies: [
        "Typescript",
        "javaScript",
        "Expo",
      ],
      links: [
        {
          type: "APP",
          href: "https://github.com/rafaelmm16/Cook-App",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/rafaelmm16/Cook-App",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "",
      video: "/Cook-App.mp4",
    },
    {
      title: "SGBus",
      href: "https://github.com/rafaelmm16/Projeto-de-Sistemas",
      dates: "January 2023 - January 2023",
      active: true,
      description:
        "O projeto foi pensado para facilitar a vida do estudante, onde no app pode encontrar os pontos e rotas de ônibus assim como fazer a recarga do seu cartão de passagem.",
      technologies: [
        "Node.js",
        "Typescript",
        "Expo",
        "Javascript",
        "Sqlite",
        "TypeORM",
        "Express",
      ],
      links: [
        {
          type: "APP",
          href: "https://github.com/rafaelmm16/Projeto-de-Sistemas",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/rafaelmm16/Projeto-de-Sistemas",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/Portfolio_page-0011.jpg",
      video: "",
    },
    {
      title: "Projeto final da disciplina de Sistemas Multimídia",
      href: "https://github.com/rafaelmm16/Projeto-Final_SM",
      dates: "February 2022 - March 2022",
      active: true,
      description:
        "Jogo estilo Flappy Bird desenvolvido na plataforma Godot.",
      technologies: [
        "Godot",
        "Java",
        "GDScript",
      ],
      links: [
        {
          type: "Website",
          href: "https://github.com/rafaelmm16/Projeto-Final_SM",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "/Portfolio_page-0010.jpg",
      video: "",
    },
  ],
} as const;

export type PortfolioData = typeof DATA;
