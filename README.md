# 🚀 Rafael Merlo — Portfolio & Blog

[![Deploy to GitHub Pages](https://github.com/rafaelmm16/rafaelmm16.github.io/actions/workflows/deploy.yml/badge.svg)](https://github.com/rafaelmm16/rafaelmm16.github.io/actions/workflows/deploy.yml)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?style=flat&logo=react)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5+-3178c6?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

Portfólio moderno, responsivo e interativo com **Blog** e **Painel Administrativo integrado (CMS sem backend)**, desenvolvido com Next.js 16 (Turbopack + Static Export) e hospedado gratuitamente no GitHub Pages.

🔗 **Acesse online:** [rafaelmm16.github.io](https://rafaelmm16.github.io/)

---

## ✨ Principais Funcionalidades

- **⚡ Performance & Static Export:** Desenvolvido em Next.js 16 com Turbopack gerando build 100% estático (`output: 'export'`), ideal para o GitHub Pages.
- **🎨 Design Moderno & Acessível:** Interface limpa construída com Tailwind CSS v4, componentes Radix UI e ícones Lucide.
- **🌓 Suporte a Dark/Light Mode:** Alternância suave de temas claro e escuro persistida via `next-themes`.
- **✨ Microinterações & Animações:** Efeitos e transições fluidas criadas com Framer Motion.
- **🛠️ Painel Admin Integrado (`/admin`):**
  - Autenticação por PIN seguro com hash criptográfico SHA-256 e Salt.
  - Edição em tempo real de informações de perfil, experiências de trabalho, formação acadêmica, habilidades e projetos.
  - Sincronização local (`localStorage`) e ferramentas de backup (exportar e importar JSON).
  - **Publicação Direta via GitHub API:** Permite salvar alterações e commitar diretamente no repositório com um clique (usando Personal Access Token), acionando o deploy contínuo automaticamente.
- **📝 Blog com Suporte a Markdown/MDX:** Syntax highlighting elegante de códigos (Shiki + Rehype Pretty Code) nos modos claro e escuro.
- **🚀 CI/CD Automatizado:** Pipeline no GitHub Actions que compila e publica automaticamente a branch `main` no GitHub Pages.

---

## 🛠️ Tecnologias Utilizadas

- **Core:** [Next.js 16](https://nextjs.org/) (App Router), [React 19](https://react.dev/), [TypeScript](https://www.typescriptlang.org/)
- **Estilização:** [Tailwind CSS v4](https://tailwindcss.com/), `@tailwindcss/typography`, `tailwindcss-animate`
- **Componentes:** [Radix UI](https://www.radix-ui.com/), [Lucide React](https://lucide.dev/)
- **Animações:** [Framer Motion](https://www.framer.com/motion/)
- **Markdown & Conteúdo:** `unified`, `remark-parse`, `remark-rehype`, `rehype-pretty-code`, `shiki`, `gray-matter`
- **Gerenciador de Pacotes:** [pnpm](https://pnpm.io/)
- **Deploy:** [GitHub Pages](https://pages.github.com/) & [GitHub Actions](https://github.com/features/actions)

---

## 📂 Estrutura do Projeto

```plaintext
├── .github/
│   └── workflows/
│       └── deploy.yml          # Pipeline de build e deploy no GitHub Pages
├── content/                     # Artigos e postagens do blog em Markdown (.mdx)
├── public/                      # Imagens estáticas, logos e assets
├── src/
│   ├── app/
│   │   ├── admin/page.tsx      # Painel de controle / CMS do portfólio
│   │   ├── blog/               # Rotas e páginas do blog
│   │   ├── globals.css         # Configurações do Tailwind CSS v4 e temas
│   │   ├── layout.tsx          # Layout raiz da aplicação
│   │   └── page.tsx            # Página inicial (Portfólio)
│   ├── components/             # Componentes de UI e blocos reutilizáveis
│   ├── context/
│   │   └── portfolio-context.tsx # Gerenciamento de estado, admin e integração GitHub
│   ├── data/
│   │   ├── initial-data.json   # Dados padrão do portfólio (experiências, projetos, etc.)
│   │   └── resume.tsx          # Configurações e exportações de dados
│   └── lib/                    # Funções utilitárias (cn, formatação, etc.)
├── next.config.mjs             # Configurações do Next.js (Static Export)
└── package.json
```

---

## 💻 Como Executar Localmente

### Pré-requisitos

- **Node.js** >= 20.9.0
- **pnpm** (recomendado) ou **npm** / **yarn**

### Passo a Passo

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/rafaelmm16/rafaelmm16.github.io.git
   cd rafaelmm16.github.io
   ```

2. **Instale as dependências:**
   ```bash
   pnpm install
   ```

3. **Inicie o servidor de desenvolvimento:**
   ```bash
   pnpm dev
   ```

4. **Acesse no navegador:**
   - Portfólio: [http://localhost:3000](http://localhost:3000)
   - Painel Admin: [http://localhost:3000/admin](http://localhost:3000/admin)

---

## 🔒 Painel Administrativo (`/admin`)

O painel administrativo permite atualizar qualquer conteúdo exibido no site diretamente pelo navegador:

1. Acesse `/admin`.
2. Insira o **PIN de Acesso** (o PIN inicial padrão é `1602`).
3. Modifique suas informações nas abas (Perfil, Experiência, Educação, Habilidades, Projetos).
4. **Opções para salvar:**
   - **Salvar Localmente:** Persiste as alterações no `localStorage` do seu navegador.
   - **Exportar JSON:** Baixa uma cópia de backup do arquivo de dados.
   - **Publicar no GitHub:** Configure um GitHub Personal Access Token (PAT) com escopo `repo` para commitar as alterações diretamente em `src/data/initial-data.json`. Assim que o commit for realizado, a GitHub Action de deploy atualizará o site em produção automaticamente.
5. No painel, você também pode alterar seu PIN de segurança a qualquer momento.

---

## 🏗️ Build e Deploy

Para gerar o build de produção estático localmente:

```bash
pnpm build
```

Os arquivos estáticos otimizados serão gerados na pasta `/out`.

### Deploy Contínuo (GitHub Pages)

O deploy é acionado automaticamente a cada `push` na branch `main` pelo workflow [.github/workflows/deploy.yml](.github/workflows/deploy.yml).

Para configurar no repositório do GitHub:
1. Acesse **Settings** > **Pages** no repositório.
2. Em **Build and deployment** > **Source**, selecione **Deploy from a branch**.
3. Selecione a branch `gh-pages` e a pasta `/ (root)`.

---

## 📄 Licença

Este projeto está sob a licença [MIT](./LICENSE). Sinta-se à vontade para utilizá-lo como base para seu próprio portfólio!

---

Desenvolvido por [Rafael Merlo](https://github.com/rafaelmm16).
