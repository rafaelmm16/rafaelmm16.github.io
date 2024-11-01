import { Icons } from "@/components/icons";
import { HomeIcon, NotebookIcon } from "lucide-react";

export const DATA = {
  name: "Rafael Merlo",
  initials: "DV",
  url: "https://rafaelmm16.github.io/",
  location: "São Mateus, ES",
  locationLink: "https://www.google.com/maps/place/saonateus",
  description:
    "Desenvolvo softwares e aplicativos móveis, de nível médio, capaz de construir pequenos projetos desde o escopo inicial, layout e programação.",
  summary:
    "O crescimento profissional é um dos meus objetivos dentro da empresa. Desenvolvo softwares e aplicativos móveis, de nível médio, capaz de construir pequenos projetos desde o escopo inicial, layout e programação. Habilidades em escrever códigos bem estruturados, testáveis e eficientes usando as melhores práticas atuais do mercado de desenvolvimento. Aprendizagem rápida, trabalho em equipe, proficiente em variedades de linguagens e ferramentas de desenvolvimento.",
  avatarUrl: "/me.png",
  skills: [
    "React",
    "Next.js",
    "Typescript",
    "Node.js",
    "Python",
  ],
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    { href: "/blog", icon: NotebookIcon, label: "Blog" },
  ],
  contact: {
    email: "hello@example.com",
    tel: "+123456789",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://dub.sh/rafaelmm16-github",
        icon: Icons.github,

        navbar: true,
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "https://dub.sh/rafael-linkedin",
        icon: Icons.linkedin,

        navbar: true,
      },
      email: {
        name: "Send Email",
        url: "#",
        icon: Icons.email,

        navbar: false,
      },
    },
  },

  work: [
    {
      company: "IFES - SM",
      href: "https://www.saomateus.ifes.edu.br/",
      badges: [],
      location: "Presencial",
      title: "Estagiario de TI",
      logoUrl: "/sao-mateus-vertical-cor.png",
      start: "May 2024",
      end: "****",
      description:
        "Atividades práticas gerais de TI (configuração de rede, confecção de cabos de rede, utilização de sistemas operacionais e softwares) - Atividades administrativas relacionadas a TI como elaboração de documentos e movimentação de processos eletrônicos utilizando o sistema do Ifes.",
    },
    {
      company: "Prefeitura Municipal de São Mateus",
      badges: [],
      href: "https://www.saomateus.es.gov.br",
      location: "Presencial",
      title: "Estagiario de TI",
      logoUrl: "/05 - Ciência, Tecnologia, Inovação, Educação Profissional e Trabalho - Fonte Preta RGB.png",
      start: "January 2021",
      end: "January 2024",
      description:
        "Solução de problemas técnicos, Coordenação de equipe, Rede de computadores, Atendimento ao cliente, Manutenção de computadores",
    },
  ],
  education: [
    {
      school: "FAESA",
      href: "https://www.faesa.br",
      degree: "Bacharelado, Tecnologia em Sistemas da Informação",
      logoUrl: "/faesa.svg",
      start: "2023",
      end: "2025",
    },
    {
      school: "EEEFM Antonio dos Santos Neves",
      href: "",
      degree: "Técnico em Manutenção e Suporte em Informática , Manutenção e Suporte em Informática",
      logoUrl: "/ib.png",
      start: "2013",
      end: "2015",
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
      video:
        "",
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
      video:
        "",
    },
  ],
} as const;
