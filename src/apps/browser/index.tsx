"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAtom, useSetAtom } from "jotai";
import { customToolbarAtom } from "@/system/atoms/toolbar";
import {
  currentUrlAtom,
  urlInputAtom,
  browserHistoryAtom,
  historyIndexAtom,
  isLoadingAtom,
  canGoBackAtom,
  canGoForwardAtom,
} from "./atoms";
import { CloseIcon } from "@/components/ui/Icons";
import { ActionBar } from "@/components/ui";

/**
 * Kindle-style Browser Icons
 */
const ArrowBackIcon: React.FC<{ size?: number; className?: string }> = ({
  size = 20,
  className = "",
}) => (
  <svg
    className={className}
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

const ArrowForwardIcon: React.FC<{ size?: number; className?: string }> = ({
  size = 20,
  className = "",
}) => (
  <svg
    className={className}
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

const RefreshIcon: React.FC<{ size?: number; className?: string }> = ({
  size = 20,
  className = "",
}) => (
  <svg
    className={className}
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2" />
  </svg>
);

const ExternalLinkIcon: React.FC<{ size?: number; className?: string }> = ({
  size = 20,
  className = "",
}) => (
  <svg
    className={className}
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

/**
 * Browser Toolbar Button
 */
interface ToolbarButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  title?: string;
}

const ToolbarButton: React.FC<ToolbarButtonProps> = ({
  children,
  onClick,
  disabled = false,
  title,
}) => {
  const [isPressed, setIsPressed] = useState(false);

  const normalStyles = {
    color: disabled ? "var(--eink-ink-muted)" : "var(--eink-ink-secondary)",
    backgroundColor: "transparent",
  };

  const pressedStyles = {
    color: "var(--eink-paper)",
    backgroundColor: "var(--eink-ink)",
  };

  const currentStyles = isPressed && !disabled ? pressedStyles : normalStyles;

  return (
    <button
      className="flex items-center justify-center p-2 select-none disabled:cursor-not-allowed"
      style={currentStyles}
      onClick={onClick}
      disabled={disabled}
      title={title}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
      onTouchStart={() => setIsPressed(true)}
      onTouchEnd={() => setIsPressed(false)}
    >
      {children}
    </button>
  );
};

/**
 * Browser Toolbar Component
 */
interface BrowserToolbarProps {
  url: string;
  inputValue: string;
  onInputChange: (value: string) => void;
  onNavigate: (url: string) => void;
  onBack: () => void;
  onForward: () => void;
  onRefresh: () => void;
  onOpenExternal: () => void;
  onClose: () => void;
  canGoBack: boolean;
  canGoForward: boolean;
}

const BrowserToolbar: React.FC<BrowserToolbarProps> = ({
  url,
  inputValue,
  onInputChange,
  onNavigate,
  onBack,
  onForward,
  onRefresh,
  onOpenExternal,
  onClose,
  canGoBack,
  canGoForward,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNavigate(inputValue);
    inputRef.current?.blur();
  };

  const handleInputFocus = () => {
    inputRef.current?.select();
  };

  return (
    <ActionBar>
      <ToolbarButton onClick={onBack} disabled={!canGoBack} title="Go back">
        <ArrowBackIcon size={18} />
      </ToolbarButton>

      <ToolbarButton onClick={onForward} disabled={!canGoForward} title="Go forward">
        <ArrowForwardIcon size={18} />
      </ToolbarButton>

      <ToolbarButton onClick={onRefresh} title="Refresh">
        <RefreshIcon size={16} />
      </ToolbarButton>

      <form onSubmit={handleSubmit} className="flex-1 mx-2">
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => onInputChange(e.target.value)}
          onFocus={handleInputFocus}
          placeholder="Enter URL..."
          className="w-full px-3 py-1.5 text-sm font-sans rounded"
          style={{
            backgroundColor: "var(--eink-paper-warm)",
            border: "1px solid var(--eink-border)",
            color: "var(--eink-ink)",
            outline: "none",
          }}
        />
      </form>

      <ToolbarButton onClick={onOpenExternal} disabled={!url} title="Open in new tab">
        <ExternalLinkIcon size={16} />
      </ToolbarButton>

      <ToolbarButton onClick={onClose} title="Close browser">
        <CloseIcon size={18} />
      </ToolbarButton>
    </ActionBar>
  );
};

/**
 * Helper to normalize URL
 */
function normalizeUrl(url: string): string {
  if (!url) return "";
  const trimmed = url.trim();
  if (!trimmed) return "";

  if (!trimmed.match(/^https?:\/\//)) {
    return "https://" + trimmed;
  }
  return trimmed;
}

/**
 * Main Browser App Component
 */
interface BrowserAppProps {
  locale: string;
}

export default function BrowserApp({ locale }: BrowserAppProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const setCustomToolbar = useSetAtom(customToolbarAtom);

  const [currentUrl, setCurrentUrl] = useAtom(currentUrlAtom);
  const [inputValue, setInputValue] = useAtom(urlInputAtom);
  const [history, setHistory] = useAtom(browserHistoryAtom);
  const [historyIndex, setHistoryIndex] = useAtom(historyIndexAtom);
  const [isLoading, setIsLoading] = useAtom(isLoadingAtom);
  const [canGoBack] = useAtom(canGoBackAtom);
  const [canGoForward] = useAtom(canGoForwardAtom);

  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Initialize from URL params
  useEffect(() => {
    const rawUrl = searchParams.get("url") || "";
    const initialUrl = normalizeUrl(rawUrl);
    if (initialUrl && currentUrl !== initialUrl) {
      setCurrentUrl(initialUrl);
      setInputValue(rawUrl);
      setHistory([initialUrl]);
      setHistoryIndex(0);
    }
  }, [searchParams]);

  const navigateTo = (url: string) => {
    if (!url) return;

    const normalizedUrl = normalizeUrl(url);
    if (!normalizedUrl) return;

    setIsLoading(true);
    setCurrentUrl(normalizedUrl);
    setInputValue(normalizedUrl);

    const newHistory = [...history.slice(0, historyIndex + 1), normalizedUrl];
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);

    const params = new URLSearchParams(searchParams.toString());
    params.set("url", normalizedUrl);
    router.replace(`/${locale}/browser?${params.toString()}`, { scroll: false });
  };

  const goBack = () => {
    if (canGoBack) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      const url = history[newIndex];
      setCurrentUrl(url);
      setInputValue(url);

      const params = new URLSearchParams(searchParams.toString());
      params.set("url", url);
      router.replace(`/${locale}/browser?${params.toString()}`, { scroll: false });
    }
  };

  const goForward = () => {
    if (canGoForward) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      const url = history[newIndex];
      setCurrentUrl(url);
      setInputValue(url);

      const params = new URLSearchParams(searchParams.toString());
      params.set("url", url);
      router.replace(`/${locale}/browser?${params.toString()}`, { scroll: false });
    }
  };

  const refresh = () => {
    if (iframeRef.current && currentUrl) {
      setIsLoading(true);
      iframeRef.current.src = currentUrl;
    }
  };

  const handleClose = () => {
    router.back();
  };

  const handleOpenExternal = () => {
    if (currentUrl) {
      window.open(currentUrl, "_blank", "noopener,noreferrer");
    }
  };

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  // Set up custom toolbar
  useEffect(() => {
    setCustomToolbar(
      <BrowserToolbar
        url={currentUrl}
        inputValue={inputValue}
        onInputChange={setInputValue}
        onNavigate={navigateTo}
        onBack={goBack}
        onForward={goForward}
        onRefresh={refresh}
        onOpenExternal={handleOpenExternal}
        onClose={handleClose}
        canGoBack={canGoBack}
        canGoForward={canGoForward}
      />
    );

    return () => {
      setCustomToolbar(null);
      // Reset browser state on unmount
      setCurrentUrl('');
      setInputValue('');
      setHistory([]);
      setHistoryIndex(-1);
      setIsLoading(false);
    };
  }, [currentUrl, inputValue, historyIndex, history.length, canGoBack, canGoForward]);

  return (
    <div
      className="absolute inset-0"
      style={{
        backgroundColor: "var(--eink-paper)",
      }}
    >
      {isLoading && (
        <div
          className="absolute top-0 left-0 right-0 h-0.5 z-10"
          style={{ backgroundColor: "var(--eink-ink-muted)" }}
        >
          <div
            className="h-full"
            style={{
              backgroundColor: "var(--eink-ink)",
              width: "30%",
              animation: "pulse 1.5s ease-in-out infinite",
            }}
          />
        </div>
      )}

      {!currentUrl && (
        <div
          className="flex flex-col items-center justify-center h-full p-8 text-center"
          style={{ color: "var(--eink-ink-muted)" }}
        >
          <div className="text-6xl mb-4 opacity-20">🌐</div>
          <p className="text-sm font-sans mb-2">
            Enter a URL in the address bar to start browsing
          </p>
          <p className="text-xs font-sans opacity-70">
            Note: Some websites may not load due to security restrictions
          </p>
        </div>
      )}

      {currentUrl && (
        <iframe
          ref={iframeRef}
          src={currentUrl}
          onLoad={handleIframeLoad}
          className="absolute inset-0 w-full h-full border-0"
          style={{
            backgroundColor: "var(--eink-paper)",
          }}
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
          title="Browser content"
        />
      )}
    </div>
  );
}
