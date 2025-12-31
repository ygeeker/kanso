import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import {
  getMessages,
  setRequestLocale,
  getTranslations,
} from "next-intl/server";
import { routing } from "../../i18n/routing";
import { notFound } from "next/navigation";
import { Analytics } from '@vercel/analytics/next';
import { Provider as JotaiProvider } from 'jotai';

import "./global.css";
import SystemLayout from "src/system/components/SystemLayout";

type Locale = (typeof routing.locales)[number];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const validLocale = routing.locales.includes(locale as Locale)
    ? (locale as Locale)
    : routing.defaultLocale;

  const t = await getTranslations({
    locale: validLocale,
    namespace: "metadata",
  });

  return {
    title: t("title"),
    description: t("description"),
    authors: [{ name: "Rene Wang" }],
    openGraph: {
      title: t("title"),
      description: t("description"),
      locale: validLocale,
      type: "website",
      images: [
        {
          url: "/og.png",
          width: 2514,
          height: 1606,
          alt: "Rene Wang",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      images: ["/og.png"],
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function RootLayout({ children, params }: LayoutProps) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  // Providing all messages to the client
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body>
        <JotaiProvider>
          <NextIntlClientProvider messages={messages}>
            <SystemLayout locale={locale}>{children}</SystemLayout>
          </NextIntlClientProvider>
        </JotaiProvider>
        <Analytics />
      </body>
    </html>
  );
}
