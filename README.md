# NoxCoreDev — Othman Portfolio

A bilingual portfolio for Othman, also known as **NoxCoreDev**. This is a public repository, and the project’s code is released under the MIT License. You can clone it, customize it, and use it as the starting point for your own portfolio, as long as you keep the relevant license and attribution notices.

<p align="center">
  <a href="https://noxcoredev-portfolio.vercel.app"><strong>View the live portfolio</strong></a>
  ·
  <a href="https://github.com/NoxCoreDev/NoxCoreDev-Profile/fork"><strong>Fork this repository</strong></a>
</p>

<p align="center">
  <a href="LICENSE"><img alt="MIT License" src="https://img.shields.io/badge/License-MIT-blue.svg"></a>
  <a href="https://react.dev"><img alt="React" src="https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black"></a>
  <a href="https://vite.dev"><img alt="Vite" src="https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white"></a>
</p>

## Preview

These screenshots show actual pages from the portfolio. They are included in the repository so developers can preview the site before cloning it.

| Full-Stack introduction | Technical blog |
|:--:|:--:|
| ![NoxCoreDev portfolio homepage](docs/screenshots/home.png) | ![NoxCoreDev portfolio blog page](docs/screenshots/blog.png) |

## Features

<table>
  <tbody>
    <tr>
      <td align="center" width="48"><img src="https://api.iconify.design/lucide/code-2.svg?height=24&amp;color=%235B5DF5" alt="" width="24" height="24"></td>
      <td><strong>Full-Stack portfolio</strong> presenting frontend and backend skills, the developer journey, and projects.</td>
    </tr>
    <tr>
      <td align="center" width="48"><img src="https://api.iconify.design/lucide/mouse-pointer-2.svg?height=24&amp;color=%235B5DF5" alt="" width="24" height="24"></td>
      <td><strong>Existing animations</strong>: scroll reveals with ScrollReveal and hover transitions on cards, buttons, and links.</td>
    </tr>
    <tr>
      <td align="center" width="48"><img src="https://api.iconify.design/lucide/languages.svg?height=24&amp;color=%235B5DF5" alt="" width="24" height="24"></td>
      <td><strong>French and English</strong>, with language and light/dark theme preferences saved in the browser.</td>
    </tr>
    <tr>
      <td align="center" width="48"><img src="https://api.iconify.design/lucide/layers.svg?height=24&amp;color=%235B5DF5" alt="" width="24" height="24"></td>
      <td><strong>Project and blog pages</strong> with localized articles, build-generated social preview images, native sharing, likes, and view counts.</td>
    </tr>
    <tr>
      <td align="center" width="48"><img src="https://api.iconify.design/lucide/server.svg?height=24&amp;color=%235B5DF5" alt="" width="24" height="24"></td>
      <td><strong>Serverless API</strong> for article statistics, designed for Vercel or a host that supports Node.js functions.</td>
    </tr>
    <tr>
      <td align="center" width="48"><img src="https://api.iconify.design/lucide/contact.svg?height=24&amp;color=%235B5DF5" alt="" width="24" height="24"></td>
      <td><strong>Contact and legal pages</strong>, including a privacy policy and terms of use.</td>
    </tr>
    <tr>
      <td align="center" width="48"><img src="https://api.iconify.design/lucide/search-check.svg?height=24&amp;color=%235B5DF5" alt="" width="24" height="24"></td>
      <td><strong>SEO essentials</strong>: canonical URL, Open Graph metadata, X/Twitter card, sitemap, and structured data.</td>
    </tr>
    <tr>
      <td align="center" width="48"><img src="https://api.iconify.design/lucide/smartphone.svg?height=24&amp;color=%235B5DF5" alt="" width="24" height="24"></td>
      <td><strong>Responsive layout</strong> for phones and larger screens.</td>
    </tr>
  </tbody>
</table>

<p><em>Feature icons are SVGs from <a href="https://github.com/lucide-icons/lucide">Lucide</a> (ISC License), served through the <a href="https://iconify.design/">Iconify API</a>.</em></p>

## Tech stack

**Frontend:** React 18, Vite 5, React Router, Tailwind CSS, Lucide, React Icons, and ScrollReveal.

**Optional server-side feature:** a Node.js function in `api/` and Upstash Redis REST counters. The site remains usable without this configuration; statistics are simply unavailable rather than shown as fabricated numbers.

## Run locally

Requirements: Node.js 18 or later and npm.

```bash
git clone https://github.com/NoxCoreDev/NoxCoreDev-Profile.git
cd NoxCoreDev-Profile
npm install
npm run dev
```

Open the URL printed by Vite, usually `http://localhost:5173`.

To test a production build:

```bash
npm run build
npm run preview
```

## Enable article counters (optional)

To use the view and like buttons, create an Upstash database with a REST API, then configure these variables in your deployment’s **server-side** environment:

```env
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
SITE_URL=https://your-domain.example
```

An example is provided in `.env.example`. Never put the Redis token in a `VITE_*` variable: those values are included in public browser files. Without both Upstash variables, counters remain unavailable instead of displaying made-up figures. Views are deduplicated per browser and article for 24 hours; likes can be removed.

## Make it your own

1. **Fork** this repository, then clone your fork.
2. Replace the logo and images in `public/` with your own work or resources you are allowed to use.
3. Edit `src/data/projects.js` to add your projects, descriptions, images, demos, and repositories.
4. Customize `src/i18n/translations.js`, `src/components/Hero.jsx`, and `src/components/Parcours.jsx` for your profile. French and English text is managed separately.
5. Update social links in `src/components/Footer.jsx`, metadata and the canonical URL in `index.html`, and `public/og-image.png`, `public/sitemap.xml`, and `public/robot.txt` for your domain.
6. If you keep the blog, add articles in `src/data/articles.jsx` and their slugs in `src/data/article-slugs.json`. The build generates the associated pages and previews.
7. Run `npm run build`, check the result with `npm run preview`, then deploy your fork to a static hosting platform. Vercel is already configured; counters additionally require its Node.js functions and the Upstash variables.

### Replace the README screenshots

The images used in this README are in `docs/screenshots/`. If you make major design changes, replace them with screenshots of your own site and avoid including private information.

## Repository structure

```text
api/
  article-stats.js           Article views and likes API (optional Redis REST)
docs/screenshots/            Homepage and blog screenshots
public/
  blog/                      Article cover images
  icons/skills/              Devicon icons and their license
  logo.svg                   Main logo
  og/                        Article social preview images
scripts/
  generate-article-previews.mjs
src/
  components/                Navigation, hero, skills, projects, and footer
  data/                      Projects, articles, and slugs
  i18n/translations.js       French and English text
  pages/                     Home, projects, blog, articles, and legal pages
  context/                   Theme and language preferences
```

## Public links

- **Portfolio:** [noxcoredev-portfolio.vercel.app](https://noxcoredev-portfolio.vercel.app)
- **GitHub:** [github.com/NoxCoreDev](https://github.com/NoxCoreDev)
- **Email:** [devnoxinc@gmail.com](mailto:devnoxinc@gmail.com)
- **Telegram:** [@Noxmodai](https://t.me/Noxmodai)
- **WhatsApp:** [+224 623 75 29 38](https://wa.me/224623752938)
- **LinkedIn:** [NoxCoreDev](https://www.linkedin.com/in/NoxCoreDev)
- **X:** [@NoxPrimeeeinc](https://www.x.com/NoxPrimeeeinc)
- **Instagram:** [@noxprimeeeinc](https://www.instagram.com/noxprimeeeinc?vrfl=NmM3ZWFsd2t3cXdm)
- **YouTube:** [@noxcoredev](https://youtube.com/@noxcoredev?si=YGqUJHTXHkSHr8lm)
- **Facebook:** [Facebook profile](https://www.facebook.com/share/1VZrh6qJQD)

## License and attributions

The code in this repository is released under the **MIT License** (see [`LICENSE`](LICENSE)). You may create and redistribute your own version by retaining the copyright notice and license text. This project reuses a starter structure credited to **JeanStephTech** under MIT; the skill icons come from **Devicon** under MIT. Full credits are in [`NOTICE.md`](NOTICE.md) and must remain with the relevant files.

Technology names and logos remain the property of their respective owners. Replace photos, project screenshots, and content you do not own before publishing your own portfolio; a software license does not automatically grant rights to third-party media. The `"private": true` setting in `package.json` only prevents accidental publishing of the package to npm; it does not make this GitHub repository private.
