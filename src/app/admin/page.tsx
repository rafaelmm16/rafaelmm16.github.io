"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePortfolio, PortfolioData } from "@/context/portfolio-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LockIcon,
  UnlockIcon,
  SaveIcon,
  ExternalLinkIcon,
  PlusIcon,
  Trash2Icon,
  MoveUpIcon,
  MoveDownIcon,
  DownloadIcon,
  UploadIcon,
  RotateCcwIcon,
  SendIcon,
  UserIcon,
  BriefcaseIcon,
  GraduationCapIcon,
  FolderGit2Icon,
  WrenchIcon,
  Share2Icon,
  SettingsIcon,
  CheckCircle2Icon,
  AlertCircleIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  KeyIcon,
  EyeIcon,
  SparklesIcon,
} from "lucide-react";
import { Icons } from "@/components/icons";

export default function AdminPage() {
  const {
    data,
    updateData,
    setDataDirect,
    saveData,
    resetData,
    hasUnsavedChanges,
    exportJson,
    importJson,
    githubConfig,
    saveGitHubConfig,
    publishToGitHub,
    verifyGitHubToken,
    isPublishing,
    isAuthenticated,
    login,
    logout,
    changePin,
    isLoaded,
  } = usePortfolio();

  // Estados locais
  const [pinInput, setPinInput] = useState("");
  const [pinError, setPinError] = useState("");

  const [activeTab, setActiveTab] = useState<
    "perfil" | "skills" | "experiencias" | "educacao" | "projetos" | "contato" | "publicacao"
  >("perfil");
  const [saveToast, setSaveToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const [newSkillInput, setNewSkillInput] = useState("");

  // Expansão de itens individuais
  const [expandedWork, setExpandedWork] = useState<number | null>(0);
  const [expandedEdu, setExpandedEdu] = useState<number | null>(0);
  const [expandedProj, setExpandedProj] = useState<number | null>(0);

  // Modal / Alterar PIN
  const [currentPinInput, setCurrentPinInput] = useState("");
  const [newPinInput, setNewPinInput] = useState("");
  const [pinChangeMsg, setPinChangeMsg] = useState<{ message: string; success: boolean; newHash?: string } | null>(null);

  // Publicação GitHub e Teste de Conexão (Camada 2)
  const [ghToken, setGhToken] = useState(githubConfig.token);
  const [ghRepo, setGhRepo] = useState(githubConfig.repo);
  const [ghOwner, setGhOwner] = useState(githubConfig.owner);
  const [commitMessage, setCommitMessage] = useState("");
  const [publishResult, setPublishResult] = useState<{ success: boolean; message: string; url?: string } | null>(null);
  const [isTestingToken, setIsTestingToken] = useState(false);
  const [tokenTestResult, setTokenTestResult] = useState<{ success: boolean; message: string; repoAccess?: boolean } | null>(null);

  // Sincronizar dados do githubConfig quando carregados
  React.useEffect(() => {
    if (githubConfig.token && !ghToken) setGhToken(githubConfig.token);
    if (githubConfig.repo && !ghRepo) setGhRepo(githubConfig.repo);
    if (githubConfig.owner && !ghOwner) setGhOwner(githubConfig.owner);
  }, [githubConfig]);

  const showToast = (message: string, type: "success" | "error" = "success") => {
    setSaveToast({ message, type });
    setTimeout(() => {
      setSaveToast(null);
    }, 4000);
  };

  const handleTestToken = async () => {
    if (!ghToken.trim()) {
      setTokenTestResult({ success: false, message: "Digite um token antes de testar." });
      return;
    }
    setIsTestingToken(true);
    setTokenTestResult(null);
    try {
      const res = await verifyGitHubToken(ghToken);
      setTokenTestResult(res);
      if (res.success) {
        showToast("Token verificado com sucesso no GitHub!");
      } else {
        showToast(res.message, "error");
      }
    } finally {
      setIsTestingToken(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pinInput.trim()) {
      setPinError("Digite seu PIN de acesso.");
      return;
    }
    try {
      const ok = await login(pinInput);
      if (ok) {
        setPinError("");
        setPinInput("");
      } else {
        setPinError("PIN incorreto. Acesso restrito apenas ao administrador.");
      }
    } catch {
      setPinError("Erro ao processar autenticação.");
    }
  };

  const handleSave = () => {
    const success = saveData();
    if (success) {
      showToast("Alterações salvas com sucesso no navegador! A página principal já está atualizada.");
    } else {
      showToast("Erro ao salvar alterações no navegador.", "error");
    }
  };

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    const skill = newSkillInput.trim();
    if (!skill) return;
    if (data.skills.includes(skill)) {
      showToast("Esta habilidade já foi adicionada.", "error");
      return;
    }
    updateData((prev) => ({
      ...prev,
      skills: [...prev.skills, skill],
    }));
    setNewSkillInput("");
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    updateData((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s !== skillToRemove),
    }));
  };

  // Funções de Trabalho
  const handleAddWork = () => {
    const newWork = {
      company: "Nova Empresa",
      href: "https://",
      badges: [],
      location: "Presencial",
      title: "Seu Cargo",
      logoUrl: "/sao-mateus-vertical-cor.png",
      start: "Jan 2024",
      end: "Present",
      description: "Descreva suas responsabilidades e conquistas aqui...",
    };
    updateData((prev) => ({
      ...prev,
      work: [newWork, ...prev.work],
    }));
    setExpandedWork(0);
  };

  const handleRemoveWork = (index: number) => {
    updateData((prev) => ({
      ...prev,
      work: prev.work.filter((_, i) => i !== index),
    }));
  };

  const handleMoveWork = (index: number, direction: "up" | "down") => {
    const newWork = [...data.work];
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newWork.length) return;
    const temp = newWork[index];
    newWork[index] = newWork[targetIndex];
    newWork[targetIndex] = temp;
    updateData((prev) => ({ ...prev, work: newWork }));
    setExpandedWork(targetIndex);
  };

  // Funções de Educação
  const handleAddEducation = () => {
    const newEdu = {
      school: "Nome da Instituição",
      href: "https://",
      degree: "Curso / Grau de Formação",
      logoUrl: "/faesa.svg",
      start: "2023",
      end: "2025",
    };
    updateData((prev) => ({
      ...prev,
      education: [newEdu, ...prev.education],
    }));
    setExpandedEdu(0);
  };

  const handleRemoveEducation = (index: number) => {
    updateData((prev) => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index),
    }));
  };

  // Funções de Projetos
  const handleAddProject = () => {
    const newProj = {
      title: "Novo Projeto Incrível",
      href: "https://",
      dates: "2024",
      active: true,
      description: "Uma breve descrição sobre o que este projeto faz e quais problemas ele resolve.",
      technologies: ["React", "TypeScript", "Tailwind"],
      links: [
        { type: "Website", href: "https://" },
        { type: "Source", href: "https://github.com/" },
      ],
      image: "/LP.png",
      video: "",
    };
    updateData((prev) => ({
      ...prev,
      projects: [newProj, ...prev.projects],
    }));
    setExpandedProj(0);
  };

  const handleRemoveProject = (index: number) => {
    updateData((prev) => ({
      ...prev,
      projects: prev.projects.filter((_, i) => i !== index),
    }));
  };

  const handleMoveProject = (index: number, direction: "up" | "down") => {
    const newProjects = [...data.projects];
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newProjects.length) return;
    const temp = newProjects[index];
    newProjects[index] = newProjects[targetIndex];
    newProjects[targetIndex] = temp;
    updateData((prev) => ({ ...prev, projects: newProjects }));
    setExpandedProj(targetIndex);
  };

  // Importar arquivo JSON
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const res = importJson(content);
      if (res.success) {
        showToast("Dados importados com sucesso!");
      } else {
        showToast(res.message || "Erro ao importar arquivo.", "error");
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  // Publicar no GitHub
  const handlePublishGitHub = async () => {
    saveGitHubConfig({
      token: ghToken.trim(),
      owner: ghOwner.trim(),
      repo: ghRepo.trim(),
    });

    setPublishResult(null);
    const res = await publishToGitHub(commitMessage.trim() || undefined);
    setPublishResult(res);
    if (res.success) {
      showToast("Publicado com sucesso no GitHub!");
      setCommitMessage("");
    } else {
      showToast(res.message, "error");
    }
  };

  if (!isLoaded) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <div className="size-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          <p className="text-sm text-muted-foreground">Carregando painel de administração...</p>
        </div>
      </div>
    );
  }

  // TELA DE BLOQUEIO / LOGIN (ACESSO RESTRITO AO ADMINISTRADOR)
  if (!isAuthenticated) {
    return (
      <div className="flex min-h-[80vh] items-center justify-center px-4">
        <Card className="w-full max-w-md shadow-2xl border-border/60 backdrop-blur-md">
          <CardHeader className="text-center space-y-2">
            <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <LockIcon className="size-7" />
            </div>
            <CardTitle className="text-2xl font-bold tracking-tight">Área do Administrador</CardTitle>
            <CardDescription>
              Acesso exclusivo para gerenciamento do portfólio de <strong>Rafael Morais</strong>.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="pin">PIN de Acesso</Label>
                <Input
                  id="pin"
                  type="password"
                  placeholder="Digite o PIN de segurança"
                  value={pinInput}
                  onChange={(e) => {
                    setPinInput(e.target.value);
                    setPinError("");
                  }}
                  autoFocus
                />
                {pinError && (
                  <p className="text-xs text-destructive font-medium flex items-center gap-1 mt-1">
                    <AlertCircleIcon className="size-3.5" /> {pinError}
                  </p>
                )}
              </div>

              <div className="rounded-lg border bg-muted/40 p-3 text-xs text-muted-foreground space-y-1">
                <div className="flex items-center gap-1.5 font-medium text-foreground">
                  <SparklesIcon className="size-3.5 text-primary" /> Camada Dupla de Proteção
                </div>
                <p className="text-[11px] leading-relaxed">
                  • <strong>Camada 1:</strong> PIN Mestre Criptografado (SHA-256)<br />
                  • <strong>Camada 2:</strong> GitHub Personal Access Token para deploys
                </p>
              </div>

              <Button type="submit" className="w-full gap-2">
                <UnlockIcon className="size-4" /> Entrar no Painel
              </Button>

              <div className="text-center pt-2">
                <Link href="/" className="text-xs text-muted-foreground hover:text-foreground inline-flex items-center gap-1">
                  ← Voltar ao Portfólio Público
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  // TELA PRINCIPAL DO PAINEL ADMIN
  return (
    <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 space-y-8">
      {/* Toast flutuante de notificação */}
      {saveToast && (
        <div
          className={`fixed top-4 right-4 z-50 flex items-center gap-2 rounded-lg px-4 py-3 text-sm font-medium shadow-xl border animate-in slide-in-from-top-3 ${
            saveToast.type === "success"
              ? "bg-emerald-950/90 border-emerald-700/60 text-emerald-100 dark:bg-emerald-900/90"
              : "bg-destructive/90 border-destructive text-destructive-foreground"
          }`}
        >
          {saveToast.type === "success" ? (
            <CheckCircle2Icon className="size-5 text-emerald-400 shrink-0" />
          ) : (
            <AlertCircleIcon className="size-5 shrink-0" />
          )}
          <span>{saveToast.message}</span>
        </div>
      )}

      {/* HEADER SUPERIOR DO PAINEL */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Painel de Controle</h1>
            <Badge variant="secondary" className="gap-1 font-mono text-xs">
              <SparklesIcon className="size-3 text-amber-500" /> CMS Portfólio
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            Altere qualquer informação do seu site em tempo real sem precisar mexer em uma linha de código.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          <Link href="/" target="_blank" rel="noopener noreferrer">
            <Button variant="outline" size="sm" className="gap-1.5">
              <EyeIcon className="size-3.5" /> Ver Site
            </Button>
          </Link>

          <Button
            onClick={handleSave}
            size="sm"
            className={`gap-1.5 ${hasUnsavedChanges ? "bg-amber-600 hover:bg-amber-700 text-white" : ""}`}
          >
            <SaveIcon className="size-3.5" />
            {hasUnsavedChanges ? "Salvar Alterações *" : "Salvo"}
          </Button>

          <Button
            onClick={() => setActiveTab("publicacao")}
            size="sm"
            variant="secondary"
            className="gap-1.5 hidden sm:inline-flex"
          >
            <SendIcon className="size-3.5 text-blue-500" /> Publicar no GitHub
          </Button>

          <Button onClick={logout} variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
            Sair
          </Button>
        </div>
      </div>

      {/* AVISO DE ALTERAÇÕES PENDENTES */}
      {hasUnsavedChanges && (
        <div className="flex items-center justify-between p-3 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 text-xs sm:text-sm">
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-amber-500 animate-pulse"></span>
            <span>Você possui alterações não salvas no navegador. Clique em <strong>Salvar Alterações</strong> para aplicá-las.</span>
          </div>
          <Button size="sm" onClick={handleSave} className="h-7 text-xs bg-amber-600 hover:bg-amber-700 text-white">
            Salvar Agora
          </Button>
        </div>
      )}

      {/* BARRA DE NAVEGAÇÃO DE ABAS */}
      <div className="flex overflow-x-auto pb-2 gap-1.5 border-b scrollbar-none">
        <button
          onClick={() => setActiveTab("perfil")}
          className={`flex items-center gap-2 px-3.5 py-2 text-sm font-medium rounded-lg transition-colors shrink-0 ${
            activeTab === "perfil" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted"
          }`}
        >
          <UserIcon className="size-4" /> Perfil & Bio
        </button>

        <button
          onClick={() => setActiveTab("skills")}
          className={`flex items-center gap-2 px-3.5 py-2 text-sm font-medium rounded-lg transition-colors shrink-0 ${
            activeTab === "skills" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted"
          }`}
        >
          <WrenchIcon className="size-4" /> Habilidades ({data.skills.length})
        </button>

        <button
          onClick={() => setActiveTab("experiencias")}
          className={`flex items-center gap-2 px-3.5 py-2 text-sm font-medium rounded-lg transition-colors shrink-0 ${
            activeTab === "experiencias" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted"
          }`}
        >
          <BriefcaseIcon className="size-4" /> Experiências ({data.work.length})
        </button>

        <button
          onClick={() => setActiveTab("educacao")}
          className={`flex items-center gap-2 px-3.5 py-2 text-sm font-medium rounded-lg transition-colors shrink-0 ${
            activeTab === "educacao" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted"
          }`}
        >
          <GraduationCapIcon className="size-4" /> Educação ({data.education.length})
        </button>

        <button
          onClick={() => setActiveTab("projetos")}
          className={`flex items-center gap-2 px-3.5 py-2 text-sm font-medium rounded-lg transition-colors shrink-0 ${
            activeTab === "projetos" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted"
          }`}
        >
          <FolderGit2Icon className="size-4" /> Projetos ({data.projects.length})
        </button>

        <button
          onClick={() => setActiveTab("contato")}
          className={`flex items-center gap-2 px-3.5 py-2 text-sm font-medium rounded-lg transition-colors shrink-0 ${
            activeTab === "contato" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted"
          }`}
        >
          <Share2Icon className="size-4" /> Redes & Contato
        </button>

        <button
          onClick={() => setActiveTab("publicacao")}
          className={`flex items-center gap-2 px-3.5 py-2 text-sm font-medium rounded-lg transition-colors shrink-0 ${
            activeTab === "publicacao" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted"
          }`}
        >
          <SettingsIcon className="size-4" /> Publicação & Backup
        </button>
      </div>

      {/* CONTEÚDO DAS ABAS */}

      {/* 1. ABA PERFIL */}
      {activeTab === "perfil" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Informações Principais</CardTitle>
              <CardDescription>Configure seu nome, títulos e resumo que aparecem na página inicial.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome Completo</Label>
                  <Input
                    id="name"
                    value={data.name}
                    onChange={(e) => updateData((prev) => ({ ...prev, name: e.target.value }))}
                    placeholder="Seu nome completo"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="initials">Iniciais (Avatar fallback)</Label>
                  <Input
                    id="initials"
                    value={data.initials}
                    onChange={(e) => updateData((prev) => ({ ...prev, initials: e.target.value }))}
                    placeholder="RM"
                    maxLength={3}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Descrição Curta (Headline Hero)</Label>
                <Textarea
                  id="description"
                  value={data.description}
                  onChange={(e) => updateData((prev) => ({ ...prev, description: e.target.value }))}
                  placeholder="Frase de apresentação profissional"
                  rows={2}
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="summary">Sobre Você (Biografia Completa)</Label>
                  <span className="text-[11px] text-muted-foreground">Suporta Markdown</span>
                </div>
                <Textarea
                  id="summary"
                  value={data.summary}
                  onChange={(e) => updateData((prev) => ({ ...prev, summary: e.target.value }))}
                  placeholder="Conte sua trajetória, objetivos e competências..."
                  rows={6}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="location">Localização</Label>
                  <Input
                    id="location"
                    value={data.location}
                    onChange={(e) => updateData((prev) => ({ ...prev, location: e.target.value }))}
                    placeholder="São Mateus, ES"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="url">URL do Portfólio</Label>
                  <Input
                    id="url"
                    value={data.url}
                    onChange={(e) => updateData((prev) => ({ ...prev, url: e.target.value }))}
                    placeholder="https://rafaelmm16.github.io/"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Card de Imagem de Perfil */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Foto de Perfil</CardTitle>
                <CardDescription>URL da imagem ou caminho relativo em /public.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-center">
                  <div className="relative size-32 rounded-full overflow-hidden border-2 border-border shadow-md bg-muted">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={data.avatarUrl}
                      alt={data.name}
                      className="size-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=300&fit=crop";
                      }}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="avatarUrl">Caminho / URL da Foto</Label>
                  <Input
                    id="avatarUrl"
                    value={data.avatarUrl}
                    onChange={(e) => updateData((prev) => ({ ...prev, avatarUrl: e.target.value }))}
                    placeholder="/me.png ou https://..."
                  />
                </div>

                <div className="space-y-1">
                  <Label className="text-[11px] text-muted-foreground">Ou escolha uma imagem local:</Label>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = (ev) => {
                          if (ev.target?.result) {
                            updateData((prev) => ({ ...prev, avatarUrl: ev.target!.result as string }));
                            showToast("Foto atualizada localmente!");
                          }
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                    className="text-xs"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Ações Rápidas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button onClick={handleSave} className="w-full gap-2">
                  <SaveIcon className="size-4" /> Salvar Tudo
                </Button>
                <Button onClick={resetData} variant="outline" className="w-full gap-2 text-destructive hover:bg-destructive/10">
                  <RotateCcwIcon className="size-4" /> Restaurar Padrões
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* 2. ABA SKILLS */}
      {activeTab === "skills" && (
        <Card>
          <CardHeader>
            <CardTitle>Habilidades & Tecnologias</CardTitle>
            <CardDescription>
              Adicione ou remova as tecnologias que aparecem na seção &quot;Skills&quot; da sua página.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handleAddSkill} className="flex gap-2 max-w-md">
              <Input
                placeholder="Ex: Docker, Next.js, Node.js..."
                value={newSkillInput}
                onChange={(e) => setNewSkillInput(e.target.value)}
              />
              <Button type="submit" className="gap-1.5 shrink-0">
                <PlusIcon className="size-4" /> Adicionar
              </Button>
            </form>

            <div className="space-y-2">
              <Label>Habilidades Atuais ({data.skills.length})</Label>
              <div className="flex flex-wrap gap-2 p-4 rounded-lg border bg-muted/20 min-h-25">
                {data.skills.map((skill) => (
                  <Badge
                    key={skill}
                    variant="secondary"
                    className="gap-1.5 py-1.5 px-3 text-xs font-medium hover:bg-secondary/80 transition-colors"
                  >
                    <span>{skill}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveSkill(skill)}
                      className="ml-1 text-muted-foreground hover:text-destructive transition-colors"
                      title={`Remover ${skill}`}
                    >
                      ×
                    </button>
                  </Badge>
                ))}
              </div>
            </div>

            <div className="pt-2">
              <Button onClick={handleSave} className="gap-2">
                <SaveIcon className="size-4" /> Salvar Habilidades
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* 3. ABA EXPERIÊNCIAS */}
      {activeTab === "experiencias" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold">Experiências Profissionais</h2>
              <p className="text-sm text-muted-foreground">Gerencie sua trajetória profissional e cargos exercidos.</p>
            </div>
            <Button onClick={handleAddWork} className="gap-1.5">
              <PlusIcon className="size-4" /> Adicionar Experiência
            </Button>
          </div>

          <div className="space-y-4">
            {data.work.map((item, index) => {
              const isExpanded = expandedWork === index;
              return (
                <Card key={index} className="overflow-hidden transition-all border-border/80">
                  <div
                    className="flex items-center justify-between p-4 cursor-pointer hover:bg-muted/40 transition-colors"
                    onClick={() => setExpandedWork(isExpanded ? null : index)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="size-10 rounded-md overflow-hidden bg-muted flex items-center justify-center border shrink-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={item.logoUrl} alt={item.company} className="size-full object-contain p-1" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-base">{item.company || "Empresa sem nome"}</h3>
                        <p className="text-xs text-muted-foreground">
                          {item.title} • {item.start} - {item.end}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="size-8"
                        disabled={index === 0}
                        onClick={() => handleMoveWork(index, "up")}
                        title="Subir posição"
                      >
                        <MoveUpIcon className="size-3.5" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="size-8"
                        disabled={index === data.work.length - 1}
                        onClick={() => handleMoveWork(index, "down")}
                        title="Descer posição"
                      >
                        <MoveDownIcon className="size-3.5" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="size-8 text-destructive hover:bg-destructive/10"
                        onClick={() => handleRemoveWork(index)}
                        title="Excluir experiência"
                      >
                        <Trash2Icon className="size-3.5" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="size-8"
                        onClick={() => setExpandedWork(isExpanded ? null : index)}
                      >
                        {isExpanded ? <ChevronUpIcon className="size-4" /> : <ChevronDownIcon className="size-4" />}
                      </Button>
                    </div>
                  </div>

                  {isExpanded && (
                    <CardContent className="pt-4 border-t space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Nome da Empresa</Label>
                          <Input
                            value={item.company}
                            onChange={(e) => {
                              const val = e.target.value;
                              updateData((prev) => {
                                const nextWork = [...prev.work];
                                nextWork[index] = { ...nextWork[index], company: val };
                                return { ...prev, work: nextWork };
                              });
                            }}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Cargo / Título</Label>
                          <Input
                            value={item.title}
                            onChange={(e) => {
                              const val = e.target.value;
                              updateData((prev) => {
                                const nextWork = [...prev.work];
                                nextWork[index] = { ...nextWork[index], title: val };
                                return { ...prev, work: nextWork };
                              });
                            }}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label>Data de Início</Label>
                          <Input
                            value={item.start}
                            placeholder="Ex: May 2024"
                            onChange={(e) => {
                              const val = e.target.value;
                              updateData((prev) => {
                                const nextWork = [...prev.work];
                                nextWork[index] = { ...nextWork[index], start: val };
                                return { ...prev, work: nextWork };
                              });
                            }}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Data de Término</Label>
                          <Input
                            value={item.end}
                            placeholder="Ex: Present ou Dez 2024"
                            onChange={(e) => {
                              const val = e.target.value;
                              updateData((prev) => {
                                const nextWork = [...prev.work];
                                nextWork[index] = { ...nextWork[index], end: val };
                                return { ...prev, work: nextWork };
                              });
                            }}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Localização</Label>
                          <Input
                            value={item.location}
                            placeholder="Presencial / Remoto / Híbrido"
                            onChange={(e) => {
                              const val = e.target.value;
                              updateData((prev) => {
                                const nextWork = [...prev.work];
                                nextWork[index] = { ...nextWork[index], location: val };
                                return { ...prev, work: nextWork };
                              });
                            }}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>URL do Logo da Empresa</Label>
                          <Input
                            value={item.logoUrl}
                            placeholder="/sao-mateus-vertical-cor.png ou https://..."
                            onChange={(e) => {
                              const val = e.target.value;
                              updateData((prev) => {
                                const nextWork = [...prev.work];
                                nextWork[index] = { ...nextWork[index], logoUrl: val };
                                return { ...prev, work: nextWork };
                              });
                            }}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Link do Site da Empresa</Label>
                          <Input
                            value={item.href}
                            placeholder="https://..."
                            onChange={(e) => {
                              const val = e.target.value;
                              updateData((prev) => {
                                const nextWork = [...prev.work];
                                nextWork[index] = { ...nextWork[index], href: val };
                                return { ...prev, work: nextWork };
                              });
                            }}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Descrição das Atividades</Label>
                        <Textarea
                          value={item.description}
                          rows={3}
                          placeholder="Descreva suas funções, projetos desenvolvidos e tecnologias usadas..."
                          onChange={(e) => {
                            const val = e.target.value;
                            updateData((prev) => {
                              const nextWork = [...prev.work];
                              nextWork[index] = { ...nextWork[index], description: val };
                              return { ...prev, work: nextWork };
                            });
                          }}
                        />
                      </div>
                    </CardContent>
                  )}
                </Card>
              );
            })}
          </div>

          <Button onClick={handleSave} className="gap-2">
            <SaveIcon className="size-4" /> Salvar Experiências
          </Button>
        </div>
      )}

      {/* 4. ABA EDUCAÇÃO */}
      {activeTab === "educacao" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold">Formação Acadêmica</h2>
              <p className="text-sm text-muted-foreground">Adicione suas faculdades, cursos técnicos e certificações.</p>
            </div>
            <Button onClick={handleAddEducation} className="gap-1.5">
              <PlusIcon className="size-4" /> Adicionar Formação
            </Button>
          </div>

          <div className="space-y-4">
            {data.education.map((item, index) => {
              const isExpanded = expandedEdu === index;
              return (
                <Card key={index} className="overflow-hidden border-border/80">
                  <div
                    className="flex items-center justify-between p-4 cursor-pointer hover:bg-muted/40 transition-colors"
                    onClick={() => setExpandedEdu(isExpanded ? null : index)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="size-10 rounded-md overflow-hidden bg-muted flex items-center justify-center border shrink-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={item.logoUrl} alt={item.school} className="size-full object-contain p-1" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-base">{item.school || "Instituição sem nome"}</h3>
                        <p className="text-xs text-muted-foreground">
                          {item.degree} • {item.start} - {item.end}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="size-8 text-destructive hover:bg-destructive/10"
                        onClick={() => handleRemoveEducation(index)}
                        title="Excluir formação"
                      >
                        <Trash2Icon className="size-3.5" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="size-8"
                        onClick={() => setExpandedEdu(isExpanded ? null : index)}
                      >
                        {isExpanded ? <ChevronUpIcon className="size-4" /> : <ChevronDownIcon className="size-4" />}
                      </Button>
                    </div>
                  </div>

                  {isExpanded && (
                    <CardContent className="pt-4 border-t space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Nome da Escola / Faculdade</Label>
                          <Input
                            value={item.school}
                            onChange={(e) => {
                              const val = e.target.value;
                              updateData((prev) => {
                                const nextEdu = [...prev.education];
                                nextEdu[index] = { ...nextEdu[index], school: val };
                                return { ...prev, education: nextEdu };
                              });
                            }}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Curso / Grau de Formação</Label>
                          <Input
                            value={item.degree}
                            onChange={(e) => {
                              const val = e.target.value;
                              updateData((prev) => {
                                const nextEdu = [...prev.education];
                                nextEdu[index] = { ...nextEdu[index], degree: val };
                                return { ...prev, education: nextEdu };
                              });
                            }}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Ano de Início</Label>
                          <Input
                            value={item.start}
                            placeholder="2023"
                            onChange={(e) => {
                              const val = e.target.value;
                              updateData((prev) => {
                                const nextEdu = [...prev.education];
                                nextEdu[index] = { ...nextEdu[index], start: val };
                                return { ...prev, education: nextEdu };
                              });
                            }}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Ano de Término</Label>
                          <Input
                            value={item.end}
                            placeholder="2025"
                            onChange={(e) => {
                              const val = e.target.value;
                              updateData((prev) => {
                                const nextEdu = [...prev.education];
                                nextEdu[index] = { ...nextEdu[index], end: val };
                                return { ...prev, education: nextEdu };
                              });
                            }}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>URL do Logo</Label>
                          <Input
                            value={item.logoUrl}
                            placeholder="/faesa.svg ou https://..."
                            onChange={(e) => {
                              const val = e.target.value;
                              updateData((prev) => {
                                const nextEdu = [...prev.education];
                                nextEdu[index] = { ...nextEdu[index], logoUrl: val };
                                return { ...prev, education: nextEdu };
                              });
                            }}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Link do Site da Instituição</Label>
                          <Input
                            value={item.href}
                            placeholder="https://..."
                            onChange={(e) => {
                              const val = e.target.value;
                              updateData((prev) => {
                                const nextEdu = [...prev.education];
                                nextEdu[index] = { ...nextEdu[index], href: val };
                                return { ...prev, education: nextEdu };
                              });
                            }}
                          />
                        </div>
                      </div>
                    </CardContent>
                  )}
                </Card>
              );
            })}
          </div>

          <Button onClick={handleSave} className="gap-2">
            <SaveIcon className="size-4" /> Salvar Educação
          </Button>
        </div>
      )}

      {/* 5. ABA PROJETOS */}
      {activeTab === "projetos" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold">Projetos em Destaque</h2>
              <p className="text-sm text-muted-foreground">Mostre suas criações, repositórios e aplicativos no portfólio.</p>
            </div>
            <Button onClick={handleAddProject} className="gap-1.5">
              <PlusIcon className="size-4" /> Adicionar Projeto
            </Button>
          </div>

          <div className="space-y-4">
            {data.projects.map((project, index) => {
              const isExpanded = expandedProj === index;
              return (
                <Card key={index} className="overflow-hidden border-border/80">
                  <div
                    className="flex items-center justify-between p-4 cursor-pointer hover:bg-muted/40 transition-colors"
                    onClick={() => setExpandedProj(isExpanded ? null : index)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="size-12 rounded-md overflow-hidden bg-muted flex items-center justify-center border shrink-0">
                        {project.image ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={project.image} alt={project.title} className="size-full object-cover" />
                        ) : (
                          <FolderGit2Icon className="size-5 text-muted-foreground" />
                        )}
                      </div>
                      <div>
                        <h3 className="font-semibold text-base">{project.title || "Projeto sem título"}</h3>
                        <div className="flex flex-wrap items-center gap-1.5 mt-1">
                          <span className="text-xs text-muted-foreground">{project.dates}</span>
                          <span className="text-xs text-muted-foreground">•</span>
                          {project.technologies.slice(0, 3).map((t) => (
                            <Badge key={t} variant="secondary" className="text-[10px] py-0 px-1.5">
                              {t}
                            </Badge>
                          ))}
                          {project.technologies.length > 3 && (
                            <span className="text-[10px] text-muted-foreground">+{project.technologies.length - 3}</span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="size-8"
                        disabled={index === 0}
                        onClick={() => handleMoveProject(index, "up")}
                        title="Subir projeto"
                      >
                        <MoveUpIcon className="size-3.5" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="size-8"
                        disabled={index === data.projects.length - 1}
                        onClick={() => handleMoveProject(index, "down")}
                        title="Descer projeto"
                      >
                        <MoveDownIcon className="size-3.5" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="size-8 text-destructive hover:bg-destructive/10"
                        onClick={() => handleRemoveProject(index)}
                        title="Excluir projeto"
                      >
                        <Trash2Icon className="size-3.5" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="size-8"
                        onClick={() => setExpandedProj(isExpanded ? null : index)}
                      >
                        {isExpanded ? <ChevronUpIcon className="size-4" /> : <ChevronDownIcon className="size-4" />}
                      </Button>
                    </div>
                  </div>

                  {isExpanded && (
                    <CardContent className="pt-4 border-t space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Título do Projeto</Label>
                          <Input
                            value={project.title}
                            onChange={(e) => {
                              const val = e.target.value;
                              updateData((prev) => {
                                const nextProj = [...prev.projects];
                                nextProj[index] = { ...nextProj[index], title: val };
                                return { ...prev, projects: nextProj };
                              });
                            }}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Datas / Período</Label>
                          <Input
                            value={project.dates}
                            placeholder="Jan 2024 - Feb 2024"
                            onChange={(e) => {
                              const val = e.target.value;
                              updateData((prev) => {
                                const nextProj = [...prev.projects];
                                nextProj[index] = { ...nextProj[index], dates: val };
                                return { ...prev, projects: nextProj };
                              });
                            }}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Descrição do Projeto</Label>
                        <Textarea
                          value={project.description}
                          rows={3}
                          placeholder="O que este projeto faz, objetivos e destaques..."
                          onChange={(e) => {
                            const val = e.target.value;
                            updateData((prev) => {
                              const nextProj = [...prev.projects];
                              nextProj[index] = { ...nextProj[index], description: val };
                              return { ...prev, projects: nextProj };
                            });
                          }}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Tecnologias Usadas (separadas por vírgula)</Label>
                        <Input
                          value={project.technologies.join(", ")}
                          placeholder="React, Next.js, Tailwind, TypeScript"
                          onChange={(e) => {
                            const val = e.target.value
                              .split(",")
                              .map((s) => s.trim())
                              .filter(Boolean);
                            updateData((prev) => {
                              const nextProj = [...prev.projects];
                              nextProj[index] = { ...nextProj[index], technologies: val };
                              return { ...prev, projects: nextProj };
                            });
                          }}
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Caminho da Imagem Preview</Label>
                          <Input
                            value={project.image}
                            placeholder="/LP.png ou https://..."
                            onChange={(e) => {
                              const val = e.target.value;
                              updateData((prev) => {
                                const nextProj = [...prev.projects];
                                nextProj[index] = { ...nextProj[index], image: val };
                                return { ...prev, projects: nextProj };
                              });
                            }}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Vídeo Preview (Opcional, formato .mp4)</Label>
                          <Input
                            value={project.video || ""}
                            placeholder="/Cook-App.mp4"
                            onChange={(e) => {
                              const val = e.target.value;
                              updateData((prev) => {
                                const nextProj = [...prev.projects];
                                nextProj[index] = { ...nextProj[index], video: val };
                                return { ...prev, projects: nextProj };
                              });
                            }}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Link do Projeto Principal (URL)</Label>
                          <Input
                            value={project.href}
                            placeholder="https://..."
                            onChange={(e) => {
                              const val = e.target.value;
                              updateData((prev) => {
                                const nextProj = [...prev.projects];
                                nextProj[index] = { ...nextProj[index], href: val };
                                return { ...prev, projects: nextProj };
                              });
                            }}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Links de Ação (Website / GitHub)</Label>
                          <div className="space-y-2">
                            {project.links.map((linkItem, linkIdx) => (
                              <div key={linkIdx} className="flex gap-2">
                                <Input
                                  className="w-1/3"
                                  value={linkItem.type}
                                  placeholder="Tipo (Website, Source...)"
                                  onChange={(e) => {
                                    const val = e.target.value;
                                    updateData((prev) => {
                                      const nextProj = [...prev.projects];
                                      const nextLinks = [...nextProj[index].links];
                                      nextLinks[linkIdx] = { ...nextLinks[linkIdx], type: val };
                                      nextProj[index] = { ...nextProj[index], links: nextLinks };
                                      return { ...prev, projects: nextProj };
                                    });
                                  }}
                                />
                                <Input
                                  className="flex-1"
                                  value={linkItem.href}
                                  placeholder="URL do link"
                                  onChange={(e) => {
                                    const val = e.target.value;
                                    updateData((prev) => {
                                      const nextProj = [...prev.projects];
                                      const nextLinks = [...nextProj[index].links];
                                      nextLinks[linkIdx] = { ...nextLinks[linkIdx], href: val };
                                      nextProj[index] = { ...nextProj[index], links: nextLinks };
                                      return { ...prev, projects: nextProj };
                                    });
                                  }}
                                />
                                <Button
                                  size="icon"
                                  variant="ghost"
                                  className="text-destructive shrink-0"
                                  onClick={() => {
                                    updateData((prev) => {
                                      const nextProj = [...prev.projects];
                                      nextProj[index] = {
                                        ...nextProj[index],
                                        links: nextProj[index].links.filter((_, i) => i !== linkIdx),
                                      };
                                      return { ...prev, projects: nextProj };
                                    });
                                  }}
                                >
                                  ×
                                </Button>
                              </div>
                            ))}
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              className="text-xs gap-1"
                              onClick={() => {
                                updateData((prev) => {
                                  const nextProj = [...prev.projects];
                                  nextProj[index] = {
                                    ...nextProj[index],
                                    links: [...nextProj[index].links, { type: "Website", href: "https://" }],
                                  };
                                  return { ...prev, projects: nextProj };
                                });
                              }}
                            >
                              + Adicionar Link
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  )}
                </Card>
              );
            })}
          </div>

          <Button onClick={handleSave} className="gap-2">
            <SaveIcon className="size-4" /> Salvar Projetos
          </Button>
        </div>
      )}

      {/* 6. ABA CONTATO & REDES SOCIAIS */}
      {activeTab === "contato" && (
        <Card>
          <CardHeader>
            <CardTitle>Canais de Contato & Redes Sociais</CardTitle>
            <CardDescription>Configure como as pessoas podem entrar em contato com você.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Principal</Label>
                <Input
                  id="email"
                  value={data.contact.email}
                  onChange={(e) =>
                    updateData((prev) => ({
                      ...prev,
                      contact: { ...prev.contact, email: e.target.value },
                    }))
                  }
                  placeholder="seuemail@exemplo.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tel">Telefone / WhatsApp</Label>
                <Input
                  id="tel"
                  value={data.contact.tel}
                  onChange={(e) =>
                    updateData((prev) => ({
                      ...prev,
                      contact: { ...prev.contact, tel: e.target.value },
                    }))
                  }
                  placeholder="+55 27 99999-9999"
                />
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t">
              <h3 className="font-semibold text-base">Redes Sociais</h3>

              {data.contact?.social &&
                Object.entries(data.contact.social).map(([key, social]) => (
                  <div key={key} className="p-4 rounded-lg border bg-muted/20 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-sm">{social.name || key}</span>
                      <label className="flex items-center gap-2 text-xs text-muted-foreground cursor-pointer">
                        <input
                          type="checkbox"
                          checked={social.navbar}
                          onChange={(e) => {
                            const checked = e.target.checked;
                            updateData((prev) => {
                              const socialRecord = prev.contact.social as Record<string, any>;
                              return {
                                ...prev,
                                contact: {
                                  ...prev.contact,
                                  social: {
                                    ...prev.contact.social,
                                    [key]: { ...socialRecord[key], navbar: checked },
                                  },
                                },
                              };
                            });
                          }}
                          className="rounded text-primary focus:ring-primary"
                        />
                        Exibir na barra inferior (Navbar)
                      </label>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-xs">URL do Perfil</Label>
                      <Input
                        value={social.url}
                        onChange={(e) => {
                          const val = e.target.value;
                          updateData((prev) => {
                            const socialRecord = prev.contact.social as Record<string, any>;
                            return {
                              ...prev,
                              contact: {
                                ...prev.contact,
                                social: {
                                  ...prev.contact.social,
                                  [key]: { ...socialRecord[key], url: val },
                                },
                              },
                            };
                          });
                        }}
                        placeholder="https://..."
                      />
                    </div>
                  </div>
                ))}
            </div>

            <Button onClick={handleSave} className="gap-2">
              <SaveIcon className="size-4" /> Salvar Contatos
            </Button>
          </CardContent>
        </Card>
      )}

      {/* 7. ABA PUBLICAÇÃO & BACKUP */}
      {activeTab === "publicacao" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Publicação Direta no GitHub */}
          <Card className="border-blue-500/30">
            <CardHeader className="bg-blue-500/5 pb-4">
              <div className="flex items-center gap-2">
                <Icons.github className="size-5 text-blue-500" />
                <CardTitle className="text-lg">Publicar no GitHub (Deploy Automático)</CardTitle>
              </div>
              <CardDescription>
                Atualize o site oficial na internet com 1 clique direto deste painel, sem abrir terminal ou VS Code!
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pt-4">
              <div className="text-xs text-muted-foreground bg-muted/60 p-3 rounded-lg space-y-1.5 leading-relaxed">
                <p>
                  <strong>Como funciona:</strong> Ao clicar em &quot;Publicar&quot;, o painel salva o arquivo de dados
                  diretamente no seu repositório no GitHub. O <strong>GitHub Actions</strong> detecta o commit e faz o build e deploy
                  automático em ~1 minuto para todo mundo ver na internet!
                </p>
                <p>
                  Para habilitar isso, você precisa de um <strong>Personal Access Token (PAT)</strong> do GitHub com permissão
                  de escrita (escopo <code>repo</code> ou <code>contents: write</code>).
                </p>
                <a
                  href="https://github.com/settings/tokens"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline inline-flex items-center gap-1 font-medium"
                >
                  Gerar Token no GitHub <ExternalLinkIcon className="size-3" />
                </a>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="ghToken">GitHub Personal Access Token (PAT)</Label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleTestToken}
                    disabled={isTestingToken || !ghToken.trim()}
                    className="h-7 text-xs gap-1.5"
                  >
                    {isTestingToken ? (
                      <>
                        <div className="size-3 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                        Testando...
                      </>
                    ) : (
                      <>
                        <KeyIcon className="size-3" /> Testar Conexão
                      </>
                    )}
                  </Button>
                </div>
                <Input
                  id="ghToken"
                  type="password"
                  placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
                  value={ghToken}
                  onChange={(e) => {
                    setGhToken(e.target.value);
                    setTokenTestResult(null);
                  }}
                />
                {tokenTestResult && (
                  <div
                    className={`p-2.5 rounded-md text-xs font-medium flex items-start gap-2 border ${
                      tokenTestResult.success
                        ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400"
                        : "bg-destructive/10 border-destructive/30 text-destructive"
                    }`}
                  >
                    {tokenTestResult.success ? (
                      <CheckCircle2Icon className="size-4 shrink-0 mt-0.5" />
                    ) : (
                      <AlertCircleIcon className="size-4 shrink-0 mt-0.5" />
                    )}
                    <span>{tokenTestResult.message}</span>
                  </div>
                )}
                <p className="text-[11px] text-muted-foreground">
                  🔒 <strong>Camada 2 de Segurança:</strong> Este token é armazenado estritamente no seu navegador local. Sem ele, nenhuma alteração é aplicada ao GitHub.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label className="text-xs">Usuário / Owner</Label>
                  <Input value={ghOwner} onChange={(e) => setGhOwner(e.target.value)} placeholder="rafaelmm16" />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">Repositório</Label>
                  <Input
                    value={ghRepo}
                    onChange={(e) => setGhRepo(e.target.value)}
                    placeholder="rafaelmm16.github.io"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="commitMessage">Mensagem do Commit (Opcional)</Label>
                <Input
                  id="commitMessage"
                  placeholder="Atualizando portfólio via painel admin"
                  value={commitMessage}
                  onChange={(e) => setCommitMessage(e.target.value)}
                />
              </div>

              {publishResult && (
                <div
                  className={`p-3 rounded-lg text-xs font-medium flex flex-col gap-1 ${
                    publishResult.success
                      ? "bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400"
                      : "bg-destructive/10 border border-destructive/30 text-destructive"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {publishResult.success ? (
                      <CheckCircle2Icon className="size-4 shrink-0" />
                    ) : (
                      <AlertCircleIcon className="size-4 shrink-0" />
                    )}
                    <span>{publishResult.message}</span>
                  </div>
                  {publishResult.url && (
                    <a
                      href={publishResult.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline ml-6"
                    >
                      Ver commit no GitHub →
                    </a>
                  )}
                </div>
              )}

              <Button
                onClick={handlePublishGitHub}
                disabled={isPublishing}
                className="w-full gap-2 bg-blue-600 hover:bg-blue-700 text-white"
              >
                {isPublishing ? (
                  <>
                    <div className="size-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                    Publicando no repositório...
                  </>
                ) : (
                  <>
                    <SendIcon className="size-4" /> 🚀 Publicar no GitHub Agora
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Backup e Segurança */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Backup e Restauração</CardTitle>
                <CardDescription>Exporte seus dados em JSON ou restaure um backup anterior.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button onClick={exportJson} variant="outline" className="flex-1 gap-2">
                    <DownloadIcon className="size-4" /> Baixar Backup JSON
                  </Button>

                  <label className="flex-1">
                    <span className="flex items-center justify-center gap-2 h-9 px-4 rounded-md border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground cursor-pointer text-sm font-medium">
                      <UploadIcon className="size-4" /> Importar JSON
                    </span>
                    <input type="file" accept=".json" onChange={handleFileUpload} className="hidden" />
                  </label>
                </div>

                <div className="pt-2 border-t">
                  <Button
                    onClick={() => {
                      if (confirm("Tem certeza que deseja restaurar as informações padrões do site? Quaisquer alterações locais não salvas no GitHub serão desfeitas.")) {
                        resetData();
                        showToast("Dados resetados para o padrão inicial.");
                      }
                    }}
                    variant="ghost"
                    className="w-full text-destructive hover:bg-destructive/10 gap-2 text-xs"
                  >
                    <RotateCcwIcon className="size-3.5" /> Restaurar Informações de Fábrica
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <KeyIcon className="size-4 text-primary" />
                  <CardTitle className="text-lg">Alterar PIN de Acesso</CardTitle>
                </div>
                <CardDescription>Mude a senha usada para entrar neste painel de administração.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-1">
                  <Label className="text-xs">PIN Atual</Label>
                  <Input
                    type="password"
                    placeholder="PIN atual"
                    value={currentPinInput}
                    onChange={(e) => setCurrentPinInput(e.target.value)}
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">Novo PIN</Label>
                  <Input
                    type="password"
                    placeholder="Novo PIN (mínimo 4 dígitos)"
                    value={newPinInput}
                    onChange={(e) => setNewPinInput(e.target.value)}
                  />
                </div>

                {pinChangeMsg && (
                  <div
                    className={`text-xs font-medium space-y-1.5 p-2.5 rounded-md border ${
                      pinChangeMsg.success
                        ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400"
                        : "bg-destructive/10 border-destructive/30 text-destructive"
                    }`}
                  >
                    <p>{pinChangeMsg.message}</p>
                    {pinChangeMsg.newHash && (
                      <p className="text-[10px] text-muted-foreground leading-relaxed pt-1 border-t border-border/50 font-normal">
                        💡 <strong>Hash SHA-256:</strong> <code className="font-mono select-all">{pinChangeMsg.newHash}</code><br />
                        Para fixar esse PIN como padrão em qualquer dispositivo, configure a variável <code>NEXT_PUBLIC_ADMIN_PIN_HASH</code> no repositório.
                      </p>
                    )}
                  </div>
                )}

                <Button
                  onClick={async () => {
                    const res = await changePin(currentPinInput, newPinInput);
                    setPinChangeMsg(res);
                    if (res.success) {
                      setCurrentPinInput("");
                      setNewPinInput("");
                    }
                  }}
                  variant="outline"
                  size="sm"
                  className="w-full mt-2"
                >
                  Salvar Novo PIN
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
