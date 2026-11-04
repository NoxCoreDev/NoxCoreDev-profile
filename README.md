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

Le front est généré dans `dist/`. Les compteurs sociaux utilisent aussi une
fonction Node dans `api/` : pour activer toutes les fonctions, choisissez Vercel
ou un hébergeur qui prend en charge ces fonctions serverless.

Pour que les compteurs sociaux fonctionnent, déployez sur Vercel (ou une plateforme
qui exécute les fonctions Node du dossier `api/`) et configurez les variables
`UPSTASH_REDIS_REST_URL` et `UPSTASH_REDIS_REST_TOKEN` dans l’environnement du
projet. Créez une base Redis compatible REST dans Upstash, puis ajoutez ses deux
valeurs dans les variables d’environnement Vercel (Production et, si souhaité,
Preview). Ne préfixez pas ces secrets avec `VITE_` : ils doivent rester côté serveur.
`SITE_URL` est facultative et peut indiquer l’origine publique canonique du site.

Sans ces variables, le site n’affiche aucun faux compteur : les interactions de
statistiques restent indisponibles jusqu’à la configuration. Les vues sont
dédoublonnées par navigateur et par article sur 24 heures ; un J’aime actif par
navigateur peut être retiré avec « Je n’aime plus ». Le bouton Partager utilise
le partage natif du téléphone, la copie du lien ou un partage web de secours.

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
(voir l'exemple commenté dans le fichier). Ajoutez également son slug à
`src/data/article-slugs.json` ; le build génère automatiquement son HTML avec
un titre, une description, une URL canonique et une image de partage propres à
l’article. Le build échoue si les deux listes ne correspondent pas.

## Ajouter/modifier un projet

Éditez `src/data/projects.js`.

## Couleur principale

Définie dans `tailwind.config.js` sous `colors.primary` (actuellement
`#4F5DF5`). Changez cette valeur pour ajuster toute la teinte du site.
