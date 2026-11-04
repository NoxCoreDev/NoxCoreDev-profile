# NoxCoreDev — Portfolio

Portfolio basé sur la structure open source **JeanStephTech** (MIT License),
réécrit avec le contenu, la marque et les projets de NoxCoreDev (Othman).
Stack : Vite + React + React Router + Tailwind CSS.

Voir `NOTICE.md` pour l'attribution de la base open source, et `LICENSE`
(à conserver si vous redistribuez ce code).

## Installation

```bash
npm install
npm run dev
```

Ouvrez http://localhost:5173

## Déploiement

```bash
npm run build
```

Le dossier `dist/` est prêt pour Vercel, Netlify, ou tout hébergeur statique.

## Structure

```
src/
  App.jsx              → routes (Accueil, Projets, Blog, Contact, pages légales)
  components/
    Navbar.jsx          → navigation + logo
    Hero.jsx             → accroche
    Parcours.jsx          → timeline 2024 → aujourd'hui
    Skills.jsx             → compétences techniques
    Projects.jsx            → carte projet (image, tags, liens)
    Footer.jsx                → réseaux sociaux + liens légaux
  pages/
    Home.jsx                   → assemble la page d'accueil
    ProjectsPage.jsx            → tous les projets
    Blog.jsx                     → liste des articles (vide pour l'instant)
    Article.jsx                   → détail d'un article
    legal/                         → Contact, Privacy, Terms, Legal
  data/
    projects.js                    → vos 4 projets réels
    articles.jsx                    → vos articles de blog (à remplir)
public/
  logo.svg                          → votre monogramme
```

## Ajouter un article de blog

Éditez `src/data/articles.jsx` et ajoutez un objet au tableau `articles`
(voir l'exemple commenté dans le fichier).

## Ajouter/modifier un projet

Éditez `src/data/projects.js`.

## Couleur principale

Définie dans `tailwind.config.js` sous `colors.primary` (actuellement
`#4F5DF5`). Changez cette valeur pour ajuster toute la teinte du site.
