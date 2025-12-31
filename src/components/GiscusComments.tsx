"use client";

import Giscus from "@giscus/react";

interface GiscusCommentsProps {
  locale: string;
}

export default function GiscusComments({ locale }: GiscusCommentsProps) {
  // Determine theme based on reader settings if available
  const theme = "light"; // You can make this dynamic based on your color scheme context

  return (
    <div className="mt-8 pt-8">
      <Giscus
        repo="ygeeker/kanso"
        repoId={process.env.NEXT_PUBLIC_GISCUS_REPO_ID || ""}
        category={process.env.NEXT_PUBLIC_GISCUS_CATEGORY || "General"}
        categoryId={process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID || ""}
        mapping="pathname"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="top"
        theme={theme}
        lang={locale}
        loading="lazy"
      />
    </div>
  );
}
