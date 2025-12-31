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
   - Required frontmatter: `title`, `createAt`
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

### App-Based Architecture

Kanso follows an Android-inspired "everything is an app" philosophy where each major section is implemented as an independent app with its own state and components.

**Core Philosophy:**
- Every page is conceptually an independent "app"
- Apps share system-level state (theme, device settings, reader preferences)
- Apps maintain their own app-specific state in isolation
- Clean separation between shared system concerns and app-specific logic

**Directory Structure:**

```
src/
├── system/                        # System-level shared code
│   ├── atoms/                     # Shared jotai state atoms
│   │   ├── colorScheme.ts        # Theme state (light/dark)
│   │   ├── deviceSettings.ts     # Wireless, device config
│   │   ├── readerSettings.ts     # Typography, reading preferences
│   │   └── toolbar.ts            # Custom toolbar state
│   ├── components/
│   │   ├── SystemLayout.tsx      # Root layout with jotai Provider
│   │   ├── KindleBezel.tsx       # Kindle device frame wrapper
│   │   ├── AppToolbar.tsx        # Declarative toolbar component
│   │   └── StandardToolbar.tsx   # Standard Android-style toolbar
│   └── contexts/
│       └── dialogPortal.tsx      # Dialog portal context
│
├── apps/                          # Independent app implementations
│   ├── launcher/                 # Home page app ("/" route)
│   │   ├── index.tsx            # App entry point
│   │   ├── atoms.ts             # Category filter state
│   │   └── components/          # App-specific components
│   │
│   ├── book-reader/             # Article reader app ("/p/[slug]")
│   │   ├── index.tsx
│   │   ├── atoms.ts             # Scroll position, TOC state
│   │   └── components/
│   │       ├── ReaderToolbar.tsx
│   │       └── ReaderSettingsSheet.tsx
│   │
│   ├── catalog/                 # Archive app ("/archive")
│   │   ├── index.tsx
│   │   └── components/
│   │
│   ├── browser/                 # Web browser app ("/browser")
│   │   ├── index.tsx
│   │   ├── atoms.ts             # URL history, navigation state
│   │   └── components/
│   │       └── BrowserToolbar.tsx
│   │
│   └── settings/                # Settings app ("/settings")
│       ├── index.tsx
│       └── components/
│
└── app/[locale]/                # Next.js routes (minimal, render apps)
    ├── layout.tsx               # Root layout with SystemLayout
    ├── page.tsx                 # Renders LauncherApp
    ├── p/[slug]/page.tsx        # Renders BookReaderApp
    ├── archive/page.tsx         # Renders CatalogApp
    ├── browser/page.tsx         # Renders BrowserApp
    └── settings/page.tsx        # Renders SettingsApp
```

**App Inventory:**

1. **LauncherApp** (`/src/apps/launcher/`) - Home page with category filtering
   - Uses default search toolbar
   - Manages active category state

2. **BookReaderApp** (`/src/apps/book-reader/`) - Article reading experience
   - Custom reader toolbar with TOC and settings
   - Reader-specific typography controls
   - Manages scroll position and TOC visibility

3. **CatalogApp** (`/src/apps/catalog/`) - Archive/list view
   - Standard toolbar with back button
   - Groups posts by year

4. **BrowserApp** (`/src/apps/browser/`) - Embedded web browser
   - Custom browser toolbar with address bar
   - URL history and navigation state

5. **SettingsApp** (`/src/apps/settings/`) - System settings
   - Standard toolbar
   - Manages wireless settings, device options, reading preferences

### Next.js App Router Structure

```
src/app/
  [locale]/              # Locale-based routing
    layout.tsx           # Root layout with jotai Provider + SystemLayout
    page.tsx             # Renders LauncherApp
    p/[slug]/            # Blog post detail pages
      page.tsx           # Renders BookReaderApp
    archive/page.tsx     # Renders CatalogApp
    browser/page.tsx     # Renders BrowserApp
    settings/page.tsx    # Renders SettingsApp
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

### State Management with Jotai

Kanso uses [jotai](https://jotai.org/) for atomic state management, replacing the previous React Context API.

**System-Level Atoms** (`/src/system/atoms/`):

1. **`colorScheme.ts`** - Theme state
   ```typescript
   export const colorSchemeAtom = atom<'light' | 'dark'>('light');
   ```

2. **`deviceSettings.ts`** - Wireless and device configuration
   - `wirelessSettingsAtom` - Airplane mode, WiFi, Bluetooth state
   - Action atoms: `setAirplaneModeAtom`, `setWifiEnabledAtom`, `setBluetoothEnabledAtom`

3. **`readerSettings.ts`** - Typography and reading preferences
   - `readerSettingsAtom` - Persisted to localStorage via `atomWithStorage`
   - Theme presets: compact, comfortable, spacious
   - Action atoms: `updateReaderSettingsAtom`, `applyThemePresetAtom`, `resetReaderSettingsAtom`

4. **`toolbar.ts`** - Custom toolbar state
   - `customToolbarAtom` - Manages which toolbar is displayed

**App-Specific Atoms:**
- Each app maintains its own state in `{app}/atoms.ts`
- Examples: category filters (Launcher), scroll position (BookReader), URL history (Browser)

### Component Architecture

**System Components** (`/src/system/components/`):
- `SystemLayout.tsx` - Root layout with jotai Provider, KindleBezel integration, toolbar management
- `KindleBezel.tsx` - Kindle device frame wrapper
- `AppToolbar.tsx` - Declarative toolbar component with type-based rendering
- `StandardToolbar.tsx` - Android-style standard toolbar (back button, title, menu)

**Shared UI Components** (`/src/components/ui/`):
- `Navbar/` - Navigation bar with StatusBar and Header components
- `Dialog.tsx` - Modal dialog system
- `Button.tsx`, `Switch.tsx`, `List.tsx` - Reusable UI primitives

**Content Components** (`/src/components/`):
- `CodeBlock.tsx` - Syntax-highlighted code blocks
- `ImageBlock.tsx` - Optimized image rendering with Next.js Image
- `TableBlock.tsx` - Table rendering
- `HeadingBlock.tsx` - Heading with anchor links
- `GiscusComments.tsx` - Comment integration
- `Header/` - Site header with search and navigation
- `Typography.tsx` - Consistent typography wrapper

**App-Specific Components:**
- Each app has its own `components/` directory for isolated UI components
- Examples: `ReaderToolbar` (BookReader), `CategoryLabel` (Launcher), `BrowserToolbar` (Browser)

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
- Customizable typography settings persisted to localStorage via jotai atoms
- Kindle-inspired bezel design can be toggled via device settings
- Declarative toolbar system with app-specific customization

### Toolbar System

Apps declare their toolbar using the `AppToolbar` component:

```typescript
// Standard toolbar (Settings, Catalog)
<AppToolbar type="standard" title="Settings" onMenuClick={() => {}} />

// Reader toolbar (BookReader)
<AppToolbar type="reader" title={articleTitle} onMenuClick={() => {}} />

// No custom toolbar - use default search (Launcher)
<AppToolbar type="none" />

// Browser manages its own toolbar internally
<AppToolbar type="browser" />
```

The `AppToolbar` component internally manages the `customToolbarAtom` to switch between different toolbar types based on the active app.
