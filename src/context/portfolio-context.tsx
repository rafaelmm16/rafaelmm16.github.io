"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import initialData from "@/data/initial-data.json";

export type PortfolioData = typeof initialData;

export interface GitHubConfig {
  token: string;
  owner: string;
  repo: string;
}

interface PortfolioContextType {
  data: PortfolioData;
  updateData: (updater: (prev: PortfolioData) => PortfolioData) => void;
  setDataDirect: (newData: PortfolioData) => void;
  saveData: (dataToSave?: PortfolioData) => boolean;
  resetData: () => void;
  hasUnsavedChanges: boolean;
  exportJson: () => void;
  importJson: (jsonString: string) => { success: boolean; message?: string };
  githubConfig: GitHubConfig;
  saveGitHubConfig: (config: GitHubConfig) => void;
  publishToGitHub: (customMessage?: string) => Promise<{ success: boolean; message: string; url?: string }>;
  verifyGitHubToken: (tokenToTest?: string) => Promise<{ success: boolean; user?: string; message: string; repoAccess?: boolean }>;
  isPublishing: boolean;
  isAuthenticated: boolean;
  hasPinConfigured: boolean;
  setupPin: (newPin: string) => Promise<{ success: boolean; message?: string }>;
  login: (pin: string) => Promise<boolean>;
  logout: () => void;
  changePin: (currentPin: string, newPin: string) => Promise<{ success: boolean; message: string; newHash?: string }>;
  hashPinString: (pin: string) => Promise<string>;
  isLoaded: boolean;
}

const STORAGE_DATA_KEY = "rafael_portfolio_custom_data_v1";
const STORAGE_GH_KEY = "rafael_portfolio_github_config_v1";
const STORAGE_PIN_HASH_KEY = "rafael_portfolio_admin_pin_hash_v1";
const STORAGE_AUTH_KEY = "rafael_portfolio_admin_auth_v1";

// Hash SHA-256 criptográfico para o PIN Mestre (PIN padrão inicial: "1602")
// Pode ser sobrescrito via variável de ambiente NEXT_PUBLIC_ADMIN_PIN_HASH
export const DEFAULT_MASTER_PIN_HASH = "0688a32219dd81d43ebf939d0f2da7f9ee0eee91aa2decff3637e85e1ff91ee0";

// Função de Hash criptográfico SHA-256 com Salt seguro
export async function hashPin(pin: string): Promise<string> {
  const encoder = new TextEncoder();
  const salt = "rafael_portfolio_secure_salt_2026_x9k2";
  const data = encoder.encode(pin.trim() + salt);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

const PortfolioContext = createContext<PortfolioContextType>({
  data: initialData,
  updateData: () => {},
  setDataDirect: () => {},
  saveData: () => false,
  resetData: () => {},
  hasUnsavedChanges: false,
  exportJson: () => {},
  importJson: () => ({ success: false }),
  githubConfig: { token: "", owner: "rafaelmm16", repo: "rafaelmm16.github.io" },
  saveGitHubConfig: () => {},
  publishToGitHub: async () => ({ success: false, message: "" }),
  verifyGitHubToken: async () => ({ success: false, message: "" }),
  isPublishing: false,
  isAuthenticated: false,
  hasPinConfigured: true,
  setupPin: async () => ({ success: false }),
  login: async () => false,
  logout: () => {},
  changePin: async () => ({ success: false, message: "" }),
  hashPinString: async () => "",
  isLoaded: false,
});

export function PortfolioProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<PortfolioData>(initialData);
  const [savedData, setSavedData] = useState<PortfolioData>(initialData);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hasPinConfigured] = useState(true);
  const [githubConfig, setGithubConfig] = useState<GitHubConfig>({
    token: "",
    owner: "rafaelmm16",
    repo: "rafaelmm16.github.io",
  });

  // Hydrate on client mount
  useEffect(() => {
    try {
      const storedData = localStorage.getItem(STORAGE_DATA_KEY);
      if (storedData) {
        const parsed = JSON.parse(storedData);
        const merged = { ...initialData, ...parsed };
        setData(merged);
        setSavedData(merged);
      }

      const storedGh = localStorage.getItem(STORAGE_GH_KEY);
      if (storedGh) {
        setGithubConfig((prev) => ({ ...prev, ...JSON.parse(storedGh) }));
      }

      const authStatus = sessionStorage.getItem(STORAGE_AUTH_KEY);
      if (authStatus === "authenticated") {
        setIsAuthenticated(true);
      }
    } catch (err) {
      console.error("Erro ao carregar dados do LocalStorage:", err);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  const hasUnsavedChanges = JSON.stringify(data) !== JSON.stringify(savedData);

  const updateData = (updater: (prev: PortfolioData) => PortfolioData) => {
    setData((prev) => updater(prev));
  };

  const setDataDirect = (newData: PortfolioData) => {
    setData(newData);
  };

  const saveData = (dataToSave?: PortfolioData): boolean => {
    const toSave = dataToSave || data;
    try {
      localStorage.setItem(STORAGE_DATA_KEY, JSON.stringify(toSave, null, 2));
      setData(toSave);
      setSavedData(toSave);
      return true;
    } catch (err) {
      console.error("Falha ao salvar no localStorage:", err);
      return false;
    }
  };

  const resetData = () => {
    try {
      localStorage.removeItem(STORAGE_DATA_KEY);
      setData(initialData);
      setSavedData(initialData);
    } catch (err) {
      console.error("Falha ao resetar dados:", err);
    }
  };

  const exportJson = () => {
    try {
      const blob = new Blob([JSON.stringify(data, null, 2)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `portfolio-data-${new Date().toISOString().slice(0, 10)}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Erro ao exportar JSON:", err);
    }
  };

  const importJson = (jsonString: string): { success: boolean; message?: string } => {
    try {
      const parsed = JSON.parse(jsonString);
      if (!parsed.name || !Array.isArray(parsed.skills)) {
        return { success: false, message: "Arquivo JSON inválido ou incompatível com o formato do portfólio." };
      }
      const merged = { ...initialData, ...parsed };
      saveData(merged);
      return { success: true };
    } catch {
      return { success: false, message: "Erro ao processar JSON. Certifique-se de que o arquivo está bem formatado." };
    }
  };

  const saveGitHubConfig = (newConfig: GitHubConfig) => {
    setGithubConfig(newConfig);
    try {
      localStorage.setItem(STORAGE_GH_KEY, JSON.stringify(newConfig));
    } catch (err) {
      console.error("Falha ao salvar configuração GitHub:", err);
    }
  };

  const publishToGitHub = async (
    customMessage?: string
  ): Promise<{ success: boolean; message: string; url?: string }> => {
    if (!githubConfig.token.trim()) {
      return {
        success: false,
        message: "Token do GitHub não configurado. Adicione seu token na aba 'Publicação / Configurações'.",
      };
    }

    setIsPublishing(true);
    const owner = githubConfig.owner || "rafaelmm16";
    const repo = githubConfig.repo || "rafaelmm16.github.io";
    const path = "src/data/initial-data.json";

    try {
      const getRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`, {
        headers: {
          Authorization: `Bearer ${githubConfig.token.trim()}`,
          Accept: "application/vnd.github.v3+json",
        },
      });

      let sha: string | undefined;
      if (getRes.ok) {
        const fileInfo = await getRes.json();
        sha = fileInfo.sha;
      } else if (getRes.status === 401 || getRes.status === 403) {
        throw new Error("Token do GitHub sem permissão ou inválido. Verifique se o token tem escopo 'repo' ou permissão de conteúdo.");
      } else if (getRes.status !== 404) {
        const errorData = await getRes.json().catch(() => ({}));
        throw new Error(errorData.message || `Erro ao consultar repositório (${getRes.status})`);
      }

      const jsonContent = JSON.stringify(data, null, 2);
      const utf8Bytes = new TextEncoder().encode(jsonContent);
      let binary = "";
      for (let i = 0; i < utf8Bytes.length; i++) {
        binary += String.fromCharCode(utf8Bytes[i]);
      }
      const base64Content = btoa(binary);

      const putRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${githubConfig.token.trim()}`,
          Accept: "application/vnd.github.v3+json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: customMessage || `Atualização de conteúdo via Painel Admin [${new Date().toLocaleDateString("pt-BR")}]`,
          content: base64Content,
          sha: sha,
          branch: "main",
        }),
      });

      if (!putRes.ok) {
        const errJson = await putRes.json().catch(() => ({}));
        throw new Error(errJson.message || `Falha no commit (${putRes.status})`);
      }

      const putResult = await putRes.json();
      saveData(data);

      return {
        success: true,
        message: "Publicado com sucesso no GitHub! O GitHub Actions iniciará o deploy do site em instantes.",
        url: putResult?.commit?.html_url,
      };
    } catch (err: any) {
      return {
        success: false,
        message: err?.message || "Ocorreu um erro ao comunicar com a API do GitHub.",
      };
    } finally {
      setIsPublishing(false);
    }
  };

  // Camada 2: Validação do GitHub Token e permissão de escrita no repositório
  const verifyGitHubToken = async (
    tokenToTest?: string
  ): Promise<{ success: boolean; user?: string; message: string; repoAccess?: boolean }> => {
    const token = (tokenToTest !== undefined ? tokenToTest : githubConfig.token).trim();
    if (!token) {
      return { success: false, message: "Token do GitHub não informado." };
    }
    try {
      const userRes = await fetch("https://api.github.com/user", {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/vnd.github.v3+json",
        },
      });
      if (!userRes.ok) {
        if (userRes.status === 401) {
          return { success: false, message: "Token inválido ou expirado no GitHub." };
        }
        return { success: false, message: `Erro ao validar token (${userRes.status})` };
      }
      const userData = await userRes.json();
      const loginUser = userData.login;

      const owner = githubConfig.owner || "rafaelmm16";
      const repo = githubConfig.repo || "rafaelmm16.github.io";
      const repoRes = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/vnd.github.v3+json",
        },
      });

      let hasPush = false;
      if (repoRes.ok) {
        const repoData = await repoRes.json();
        hasPush = !!repoData?.permissions?.push;
      }

      return {
        success: true,
        user: loginUser,
        repoAccess: hasPush,
        message: hasPush
          ? `Conectado como @${loginUser} com permissão de publicação no repositório ${owner}/${repo}!`
          : `Conectado como @${loginUser}, mas sem permissão de escrita no repositório ${owner}/${repo}.`,
      };
    } catch (err: any) {
      return { success: false, message: err?.message || "Erro ao conectar com a API do GitHub." };
    }
  };

  // Cadastrar ou redefinir PIN manualmente
  const setupPin = async (newPin: string): Promise<{ success: boolean; message?: string }> => {
    if (newPin.trim().length < 4) {
      return { success: false, message: "O PIN deve ter no mínimo 4 dígitos ou caracteres." };
    }
    const hash = await hashPin(newPin);
    localStorage.setItem(STORAGE_PIN_HASH_KEY, hash);
    setIsAuthenticated(true);
    sessionStorage.setItem(STORAGE_AUTH_KEY, "authenticated");
    return { success: true };
  };

  // Camada 1: Efetuar Login comparando com o PIN Mestre ou PIN customizado do dispositivo
  const login = async (pinInput: string): Promise<boolean> => {
    const inputHash = await hashPin(pinInput);
    const configuredMasterHash = process.env.NEXT_PUBLIC_ADMIN_PIN_HASH || DEFAULT_MASTER_PIN_HASH;
    const localHash = typeof window !== "undefined" ? localStorage.getItem(STORAGE_PIN_HASH_KEY) : null;

    if (inputHash === configuredMasterHash || (localHash && inputHash === localHash)) {
      setIsAuthenticated(true);
      if (typeof window !== "undefined") {
        sessionStorage.setItem(STORAGE_AUTH_KEY, "authenticated");
      }
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem(STORAGE_AUTH_KEY);
  };

  // Alterar PIN para este dispositivo
  const changePin = async (
    currentPin: string,
    newPin: string
  ): Promise<{ success: boolean; message: string; newHash?: string }> => {
    const configuredMasterHash = process.env.NEXT_PUBLIC_ADMIN_PIN_HASH || DEFAULT_MASTER_PIN_HASH;
    const localHash = typeof window !== "undefined" ? localStorage.getItem(STORAGE_PIN_HASH_KEY) : null;
    const activeExpectedHash = localHash || configuredMasterHash;

    const currentHash = await hashPin(currentPin);
    if (currentHash !== activeExpectedHash) {
      return { success: false, message: "O PIN atual digitado está incorreto." };
    }
    if (newPin.trim().length < 4) {
      return { success: false, message: "O novo PIN deve ter pelo menos 4 dígitos ou caracteres." };
    }
    const newHash = await hashPin(newPin);
    localStorage.setItem(STORAGE_PIN_HASH_KEY, newHash);
    return {
      success: true,
      message: "PIN alterado com sucesso para este dispositivo!",
      newHash,
    };
  };

  return (
    <PortfolioContext.Provider
      value={{
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
        hasPinConfigured: true,
        setupPin,
        login,
        logout,
        changePin,
        hashPinString: hashPin,
        isLoaded,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error("usePortfolio deve ser utilizado dentro de um PortfolioProvider");
  }
  return context;
}
