import { setRequestLocale } from "next-intl/server";
import { Suspense } from "react";
import BrowserApp from "@/apps/browser";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function BrowserPage({ params }: PageProps) {
  const { locale } = await params;

  // Enable static rendering
  setRequestLocale(locale);

  return (
    <Suspense fallback={<BrowserLoading />}>
      <BrowserApp locale={locale} />
    </Suspense>
  );
}

function BrowserLoading() {
  return (
    <div 
      className="flex items-center justify-center min-h-screen"
      style={{ backgroundColor: "var(--device-bg)" }}
    >
      <div 
        className="text-sm font-sans"
        style={{ color: "var(--eink-ink-muted)" }}
      >
        Loading browser...
      </div>
    </div>
  );
}

