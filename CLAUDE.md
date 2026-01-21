# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server at localhost:4321
npm run build     # Production build to ./dist/
npm run preview   # Preview production build locally
npm run check     # Run all checks (astro, eslint, prettier)
npm run fix       # Auto-fix eslint and prettier issues
```

## Architecture

This is an **AstroWind** site built with Astro 5 + Tailwind CSS, using static output mode.

### Configuration System

- **`src/config.yaml`**: Central site configuration (SEO, blog settings, analytics, theme)
- **`vendor/integration/`**: Custom Astro integration that loads `config.yaml` and exposes it as a virtual module `astrowind:config`
- **`src/navigation.ts`**: Header and footer navigation data

Import config values using:

```typescript
import { SITE, APP_BLOG, METADATA, UI, ANALYTICS } from 'astrowind:config';
```

### Content

- Blog posts are stored in `src/data/post/` as `.md` or `.mdx` files
- Content schema is defined in `src/content/config.ts`
- Post frontmatter supports: `title`, `publishDate`, `excerpt`, `image`, `category`, `tags`, `author`, `draft`

### Key Utilities

- **`src/utils/permalinks.ts`**: URL generation (`getPermalink`, `getBlogPermalink`, `getCanonical`)
- **`src/utils/blog.ts`**: Blog post fetching and static path generation for pagination

### Component Structure

- **`src/components/widgets/`**: Page section components (Hero, Features, FAQs, CallToAction, etc.)
- **`src/components/ui/`**: Reusable UI primitives (Button, Form, Timeline, ItemGrid)
- **`src/components/blog/`**: Blog-specific components (List, Grid, SinglePost, Pagination)
- **`src/components/common/`**: Shared components (Metadata, Image, Analytics)

### Layouts

- **`Layout.astro`**: Base HTML structure
- **`PageLayout.astro`**: Standard page with header/footer
- **`MarkdownLayout.astro`**: For markdown content pages

### Routing

Dynamic blog routes use rest parameters in `src/pages/[...blog]/`:

- `[...page].astro`: Individual posts
- `[category]/[...page].astro`: Category listings
- `[tag]/[...page].astro`: Tag listings

### Path Alias

Use `~` to reference `src/` directory:

```typescript
import Component from '~/components/Component.astro';
```

### Styling

- Tailwind configured in `src/assets/styles/tailwind.css`
- Custom styles and fonts in `src/components/CustomStyles.astro`
- Dark mode supported via `ui.theme` in config.yaml

Always use Context7 MCP when I need library/API documentation, code generation, setup or configuration steps without me having to explicitly ask.
