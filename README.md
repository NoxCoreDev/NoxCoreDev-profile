# NoxCoreDev — Portfolio

Portfolio Next.js (App Router) + TypeScript + Tailwind CSS.

## Installation

```bash
npm install
npm run dev
```

Ouvrez http://localhost:3000

## Déploiement

Le plus simple : [Vercel](https://vercel.com) (créateur de Next.js, gratuit pour les projets persos).

```bash
npm install -g vercel
vercel
```

## Structure

```
app/
  layout.tsx      → polices, metadata SEO
  page.tsx         → assemble toutes les sections
  globals.css      → styles globaux, animations
components/
  Nav.tsx          → barre de navigation
  Hero.tsx         → accroche + terminal animé
  Journey.tsx       → timeline de parcours (2024 → aujourd'hui)
  Projects.tsx      → vos 4 projets (NOXFREEPANELBOT, NOX-NX, SPIDER NX, ANIMEFLIX)
  Services.tsx      → 4 services proposés
  Blog.tsx          → section blog (vide pour l'instant)
  Contact.tsx       → email, Telegram, WhatsApp
```

## Pour ajouter un article de blog

Ouvrez `components/Blog.tsx` et ajoutez un objet dans le tableau `posts` :

```ts
const posts: Post[] = [
  {
    title: "Automatiser un bot WhatsApp avec Baileys",
    date: "2026-11-01",
    url: "/blog/baileys-automation",
    excerpt: "Comment j'ai construit un système de sessions multiples...",
  },
];
```

(Pour de vraies pages d'articles, créez un dossier `app/blog/[slug]/page.tsx` plus tard.)

## Pour ajouter/modifier un projet

Ouvrez `components/Projects.tsx` et éditez le tableau `projects`.

## Couleurs & polices

Définies dans `tailwind.config.ts` :
- `ink` / `surface` / `surface2` : fonds
- `accent` / `accent2` : violet (liens, boutons)
- `ok` : vert (statuts "en ligne")
- `signal` : ambre (statuts "bêta")
- Polices : Space Grotesk (titres), Inter (texte), JetBrains Mono (code/labels)
