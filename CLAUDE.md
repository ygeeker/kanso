# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Kanso is a static blogging system built with Next.js that supports dual content sources: Markdown files and Notion database synchronization. It features a unique Kindle-inspired e-ink design aesthetic with full internationalization support.

## Commands

### Development
- `npm run dev` - Start Next.js development server (runs on default port 3000)
- `npm run build` - Build production bundle
- `npm start` - Start production server on port 4000

### Testing
- `npm run test:notion` - Test Notion integration by running the Notion sync script

### Package Management
This project uses `pnpm` as the package manager. Use `pnpm install` to install dependencies.

## Architecture

### Content Management System

**Dual Content Sources:**
1. **Markdown Files** (`/posts` directory):
   - Structured as `/posts/{locale}/{slug}.mdx`
   - Supported locales: `en`, `zh`
   - Required frontmatter: `title`, `date`
   - Optional frontmatter: `tag` (category), `summary`, `pin`, `cover`, `keywords`

2. **Notion Database** (optional):
   - Configured via `NOTION_API_KEY` and `NOTION_DATABASE_ID` environment variables
   - Auto-syncs on push to master branch and daily at 13:00 UTC via GitHub Actions
   - Sync script: `src/utils/notion.js`
   - Converts Notion blocks to Markdown and saves to `/posts/{locale}/` directory
   - Downloads and stores images in `/public/image/post/`

### Internationalization (i18n)

**Setup:**
- Uses `next-intl` for internationalization
- Configuration: `src/i18n/routing.ts` and `src/i18n/request.ts`
- Default locale: `zh`
- Supported locales: `en`, `zh`
- Translations stored in: `src/dictionaries/{locale}.json`

**URL Structure:**
- All routes are prefixed with locale: `/{locale}/...`
- Middleware handles locale detection and routing: `src/middleware.ts`
- Legacy locale redirects (`zh-CN` → `zh`, `en-US` → `en`) configured in `next.config.ts`

### Next.js App Router Structure

```
src/app/
  [locale]/              # Locale-based routing
    layout.tsx           # Root layout with NextIntlClientProvider
    page.tsx             # Homepage
    p/[slug]/            # Blog post detail pages
      page.tsx
    archive/             # Archive/list view
    browser/             # Category browser
    settings/            # Reader settings
  rss.xml/route.ts       # RSS feed generation
  feed.xml/route.ts      # Alternative feed endpoint
  sitemap.ts             # Sitemap generation
```

### Key Utilities

- `src/utils/getAllPosts.ts` - Core post retrieval logic
  - `getAllPosts(options)` - Get all posts with filtering and sorting
  - `getPostBySlug(slug, locale)` - Get single post by slug
  - `getAllPostSlugs(locale?)` - Get all post slugs for static generation

- `src/utils/notion.js` - Notion to Markdown converter
  - Converts Notion blocks (paragraphs, headings, lists, code, tables, images, equations) to Markdown
  - Downloads and stores Notion-hosted images locally

- `src/utils/getCategories.ts` - Extract categories from posts
- `src/utils/sortPosts.ts` - Sort posts by date

### Component Architecture

**Layout Components:**
- `src/components/Layout.tsx` - Main layout wrapper with Kindle bezel design
- `src/components/Header/` - Site header with navigation
- `src/components/Footer.tsx` - Site footer

**Content Components:**
- `src/components/CodeBlock.tsx` - Syntax-highlighted code blocks
- `src/components/ImageBlock.tsx` - Optimized image rendering
- `src/components/TableBlock.tsx` - Table rendering
- `src/components/HeadingBlock.tsx` - Heading with anchor links

**Reader Experience:**
- `src/components/KindleBezel.tsx` - Kindle device frame wrapper
- `src/components/ReaderToolbar.tsx` - Reading controls toolbar
- `src/components/ReaderSettingsSheet.tsx` - Reader customization settings

**Context Providers:**
- `src/contexts/colorScheme.ts` - Theme management (light/dark/e-ink modes)
- `src/contexts/readerSettings.tsx` - Reader preferences (font, spacing)
- `src/contexts/deviceSettings.tsx` - Device display settings

### Styling

**Tailwind Configuration:**
- Custom e-ink paper color palette (`eink-*` colors)
- Kindle bezel colors (`bezel-*` colors)
- Custom shadows for Kindle aesthetic
- Dark mode via `class` strategy

**CSS Variables:**
- Defined in `src/app/[locale]/global.css`
- Theme colors use CSS custom properties for easy switching

### Type Definitions

Key types in `src/types/index.d.ts`:
- `IPost` - Blog post structure
- `ISiteConfig` - Site configuration
- `TLocale` - Locale type (`"zh" | "en"`)
- `ICurrentPage` - Page metadata

## Important Notes

### Build Configuration
- TypeScript build errors are ignored in production (`ignoreBuildErrors: true` in next.config.ts) - **fix type errors when possible**
- Images are unoptimized (`unoptimized: true`) for static export compatibility
- All remote image hostnames are allowed in Next.js image config

### Post Structure
- Posts are flat within each locale directory (no nested categories in file structure)
- Categories are derived from the `tag` frontmatter field
- Posts without a `tag` are categorized as "Uncategorized"
- Date parsing is handled by `src/utils/parseDateStr.ts`

### Notion Integration
- Notion sync requires two environment variables in GitHub Secrets
- Sync workflow runs automatically on push to master and daily
- Images from Notion are downloaded to `/public/image/post/` with filename format: `{block_id}_{original_name}`
- Notion equations are converted to KaTeX-compatible `$$` syntax

### Reader Features
- Multiple reading modes (standard, e-ink simulation, dark mode)
- Customizable typography settings stored in context
- Kindle-inspired bezel design can be toggled via device settings
