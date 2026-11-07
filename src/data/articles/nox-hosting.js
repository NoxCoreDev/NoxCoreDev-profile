const INSTALLATION_CODE_BLOCKS = [
  {
    label: { fr: "1. Paquets système", en: "1. System packages" },
    language: "bash",
    code: `sudo apt update
sudo apt upgrade -y
sudo apt install -y \
  ca-certificates curl git tar unzip composer nginx mariadb-server redis-server \
  php8.3 php8.3-cli php8.3-common php8.3-gd php8.3-mysql php8.3-mbstring \
  php8.3-bcmath php8.3-xml php8.3-curl php8.3-zip php8.3-fpm php8.3-opcache

sudo systemctl enable --now mariadb redis-server nginx php8.3-fpm
php -v
composer --version`,
  },
  {
    label: { fr: "2. Ouvrir MariaDB", en: "2. Open MariaDB" },
    language: "bash",
    code: "sudo mariadb",
  },
  {
    label: { fr: "3. Base et utilisateur SQL", en: "3. Database and SQL user" },
    language: "sql",
    code: `CREATE DATABASE panel;
CREATE USER 'pterodactyl'@'127.0.0.1' IDENTIFIED BY 'REPLACE_WITH_A_LONG_RANDOM_PASSWORD';
GRANT ALL PRIVILEGES ON panel.* TO 'pterodactyl'@'127.0.0.1';
FLUSH PRIVILEGES;
EXIT;`,
  },
  {
    label: { fr: "4. Cloner NOX HOSTING", en: "4. Clone NOX HOSTING" },
    language: "bash",
    code: `sudo mkdir -p /var/www/pterodactyl
sudo chown "$USER":"$USER" /var/www/pterodactyl
git clone https://github.com/NoxCoreDev/Noxhostingtheme.git /var/www/pterodactyl
cd /var/www/pterodactyl

cp .env.example .env
composer install --no-dev --optimize-autoloader
chmod -R 755 storage/* bootstrap/cache/`,
  },
  {
    label: { fr: "5. Configurer le Panel", en: "5. Configure the Panel" },
    language: "bash",
    code: `php artisan key:generate --force
php artisan p:environment:setup
php artisan p:environment:database
php artisan p:environment:mail`,
  },
  {
    label: { fr: "6. Créer les tables et l’administrateur", en: "6. Create tables and administrator" },
    language: "bash",
    code: `php artisan migrate --seed --force
php artisan p:user:make`,
  },
  {
    label: { fr: "7. Permissions des fichiers", en: "7. File permissions" },
    language: "bash",
    code: "sudo chown -R www-data:www-data /var/www/pterodactyl",
  },
  {
    label: { fr: "8. Ouvrir le crontab root", en: "8. Open the root crontab" },
    language: "bash",
    code: "sudo crontab -e",
  },
  {
    label: { fr: "9. Ligne de tâche planifiée", en: "9. Scheduled task line" },
    language: "cron",
    code: "* * * * * php /var/www/pterodactyl/artisan schedule:run >> /dev/null 2>&1",
  },
  {
    label: { fr: "10. Créer le fichier du worker", en: "10. Create the worker service file" },
    language: "bash",
    code: "sudo nano /etc/systemd/system/pteroq.service",
  },
  {
    label: { fr: "11. Contenu du service du worker", en: "11. Queue worker service contents" },
    language: "ini",
    code: `[Unit]
Description=NOX HOSTING Panel Queue Worker
After=redis-server.service

[Service]
User=www-data
Group=www-data
Restart=always
ExecStart=/usr/bin/php /var/www/pterodactyl/artisan queue:work --queue=high,standard,low --sleep=3 --tries=3
RestartSec=5s

[Install]
WantedBy=multi-user.target`,
  },
  {
    label: { fr: "12. Activer le worker", en: "12. Enable the worker" },
    language: "bash",
    code: `sudo systemctl daemon-reload
sudo systemctl enable --now pteroq.service`,
  },
];

const article = {
  id: 5,
  slug: "nox-hosting-theme-pterodactyl",
  publishedAt: "2026-11-07",
  cover: "/blog/nox-hosting-cover.png",
  ogImage: "/blog/nox-hosting-cover.png",
  ogImageType: "image/png",
  ogImageWidth: 1200,
  ogImageHeight: 630,
  illustrations: [
    {
      src: "/blog/nox-hosting-login.jpg",
      alt: {
        fr: "Capture mobile de la page de connexion NOX HOSTING, avec le formulaire vide et le logo de la marque.",
        en: "Mobile screenshot of the NOX HOSTING sign-in page, showing the blank form and brand logo.",
      },
      caption: {
        fr: "Capture fournie pour l’article : les champs sont vides et l’attribution visible au pied de page est conservée.",
        en: "Screenshot supplied for this article: the fields are blank and the visible footer attribution is preserved.",
      },
    },
  ],
  fr: {
    category: "Hébergement & DevOps",
    title: "NOX HOSTING : donner une identité claire à un panel Pterodactyl",
    excerpt: "Dans les coulisses du thème NOX HOSTING : l’écran de connexion, le rôle du Panel et de Wings, les prérequis d’installation et la frontière entre créations NOX et code amont.",
    intro: "NOX HOSTING est le thème et l’identité visuelle que je construis autour d’un panneau de gestion de serveurs de jeu basé sur Pterodactyl. Je présente ici ce que le dépôt contient, comment le Panel se relie aux nœuds de jeu et quelles parties relèvent des créations NOX — sans attribuer à moi-même le code hérité de Pterodactyl ou de Laravel.",
    tags: ["NOX HOSTING", "Pterodactyl", "Hébergement de jeux", "PHP", "DevOps"],
    sections: [
      {
        heading: "Un panneau de gestion, pas une promesse d’hébergement automatique",
        paragraphs: [
          "Le dépôt présente NOX HOSTING comme un panneau web pour configurer et gérer des serveurs de jeu sur une infrastructure Linux. L’administrateur gère notamment les nœuds et les comptes depuis le Panel ; les personnes auxquelles un serveur est attribué peuvent ensuite le gérer dans l’interface web.",
          "Cette séparation est importante : installer le Panel seul n’installe pas Wings et ne lance pas de serveur de jeu. Le Panel est l’interface de contrôle. Les processus de jeu tournent sur des nœuds Linux, dans des conteneurs Docker, avec Wings installé et configuré sur ces nœuds. La capacité réelle dépend donc aussi de l’infrastructure, de sa configuration et des services nécessaires autour du Panel.",
        ],
        bullets: [
          "Panel : interface web pour les administrateurs et les utilisateurs des serveurs.",
          "Nœud Linux : machine qui exécute les conteneurs de serveurs de jeu.",
          "Wings et Docker : composants à installer sur le nœud pour faire tourner les serveurs.",
        ],
      },
      {
        heading: "Une identité NOX visible dès l’écran de connexion",
        paragraphs: [
          "La capture jointe à cet article montre la page de connexion NOX HOSTING telle qu’elle a été fournie : fond sombre, logo de la marque, champs de connexion et bouton d’action bleu. C’est un aperçu concret de l’identité appliquée à l’interface, et non une démonstration d’une session authentifiée ou de fonctions d’administration.",
          "Pour moi, le travail de thème consiste à rendre l’interface reconnaissable sans brouiller son rôle. Les personnes savent qu’elles arrivent sur le panneau NOX HOSTING, tandis que les éléments de navigation et le parcours de connexion restent ceux d’un outil de gestion. Le crédit du pied de page visible sur la capture est gardé tel quel.",
        ],
      },
      {
        heading: "Distinguer les personnalisations du socle Pterodactyl",
        paragraphs: [
          "Le README du dépôt indique que le projet est construit sur la base de Pterodactyl Panel 1.15.2. Le code de l’application comprend le socle Pterodactyl et Laravel ; le thème NOX y ajoute son identité, ses ressources graphiques et les changements qui lui sont propres. Le dépôt contient également les ressources frontend compilées, ce qui permet une installation standard sans lancer Node.js pour reconstruire les assets.",
          "Cette distinction n’est pas qu’une formule : elle dit précisément ce que je revendique et ce que je ne revendique pas. Je peux parler du design, de l’illustration, du logo et des changements de thème NOX identifiés dans le projet. Je ne présente pas l’ensemble du code du Panel, de Laravel ou de ses dépendances comme ayant été écrit par moi.",
        ],
      },
      {
        heading: "Les prérequis techniques à comprendre avant l’installation",
        paragraphs: [
          "Le guide du dépôt décrit une installation sur une nouvelle machine Linux, avec un domaine pointant vers le serveur et HTTPS configuré avant l’exposition publique. Il demande notamment PHP 8.2 ou 8.3, Composer 2, MariaDB ou MySQL, Redis et un serveur web tel que Nginx. Une installation destinée à faire tourner des jeux demande aussi Docker et Wings sur chaque nœud concerné.",
          "La configuration ne se résume pas à copier les fichiers. Il faut créer la base de données, préparer le fichier d’environnement, exécuter les commandes d’installation et de migration, créer le compte administrateur, puis mettre en place le scheduler et le worker de tâches. Les secrets et la clé d’application doivent être protégés et sauvegardés : le README rappelle notamment qu’il ne faut pas régénérer la clé d’une installation existante.",
        ],
      },
      {
        heading: "Installation complète du Panel sur Ubuntu 24.04",
        paragraphs: [
          "Cette séquence reprend le guide du dépôt pour une nouvelle installation. Avant de copier les commandes, vérifie que le VPS est neuf, que le domaine pointe vers lui et remplace le mot de passe SQL d’exemple par un mot de passe long et aléatoire. Dans l’assistant interactif, configure l’URL du Panel en `https://panel.example.com` et reporte le même nom de base, le nom d’utilisateur et le mot de passe SQL.",
          "Après les permissions, configure Nginx pour servir `/var/www/pterodactyl/public` avec PHP-FPM 8.3 et installe un certificat HTTPS valide avant toute exposition publique. Le dépôt renvoie au guide Pterodactyl pour le bloc Nginx exact : le nom de domaine, les certificats et les règles réseau varient selon le serveur.",
          "Pour le scheduler, lance `sudo crontab -e` et ajoute la ligne cron copiée dans le crontab de root. Pour le worker, crée le fichier systemd, colle le contenu INI du bloc suivant, puis lance les commandes d’activation.",
        ],
        callout: {
          title: "Important — nouvelle installation uniquement",
          body: "`php artisan key:generate --force` ne s’exécute qu’une seule fois, sur un Panel tout neuf. Ne le relance jamais sur une installation existante : la clé APP_KEY protège des données chiffrées. Sauvegarde-la avec la base de données.",
        },
        codeBlocks: INSTALLATION_CODE_BLOCKS,
        sources: [
          {
            label: {
              fr: "Configuration Nginx officielle de Pterodactyl Panel",
              en: "Official Pterodactyl Panel Nginx configuration guide",
            },
            href: "https://pterodactyl.io/panel/1.0/webserver_configuration.html",
          },
        ],
        ending: "Ces étapes installent le Panel NOX HOSTING complet, mais pas les serveurs de jeu. Pour en démarrer, installe Docker et Wings 1.x séparément sur chaque nœud Linux, crée le nœud dans l’administration du Panel et configure Wings avec le fichier généré par celui-ci.",
      },
      {
        heading: "Garder les crédits et les licences lisibles",
        paragraphs: [
          "La licence NOX HOSTING couvre les créations originales NOX décrites dans le dépôt : design, artwork, logo, thème et modifications de thème attribuées à NOX. Elle autorise l’utilisation gratuite du thème sur son propre panneau Pterodactyl à condition de conserver le crédit « NOX HOSTING by NoxCoreDev ». Elle interdit notamment de vendre le thème ou le logo, de retirer ou modifier ce crédit, ou de présenter la marque comme la sienne.",
          "Cette licence ne remplace pas celles des projets tiers. Le dépôt conserve la licence MIT de Pterodactyl Panel, les notices concernant Laravel et les attributions applicables aux autres composants. La notice précise aussi que les changements NOX ne sont pas affiliés à Pterodactyl Software ni à Laravel. C’est la bonne manière de montrer un travail de personnalisation sans effacer l’origine du socle logiciel.",
        ],
        sources: [
          {
            label: {
              fr: "Dépôt source et guide d’installation NOX HOSTING",
              en: "NOX HOSTING source repository and installation guide",
            },
            href: "https://github.com/NoxCoreDev/Noxhostingtheme",
          },
          {
            label: {
              fr: "Documentation officielle de démarrage Pterodactyl Panel",
              en: "Official Pterodactyl Panel getting-started guide",
            },
            href: "https://pterodactyl.io/panel/1.0/getting_started.html",
          },
          {
            label: {
              fr: "Documentation officielle d’installation de Wings",
              en: "Official Wings installation guide",
            },
            href: "https://pterodactyl.io/wings/1.0/installing.html",
          },
          {
            label: {
              fr: "Documentation Laravel 12",
              en: "Laravel 12 documentation",
            },
            href: "https://laravel.com/docs/12.x",
          },
        ],
      },
      {
        heading: "La suite : faire évoluer le thème sans perdre la clarté",
        paragraphs: [
          "Je veux continuer à améliorer l’identité visuelle et l’expérience de navigation tout en restant attentif aux mises à jour du Panel sur lequel le projet s’appuie. Une modification de thème doit pouvoir être relue, testée et comparée au socle amont, plutôt que présentée comme une réécriture complète de l’application.",
          "Le dépôt ne propose pas actuellement de release GitHub publiée ; son README recommande de relire le code et de fixer le commit choisi avant l’installation. C’est une précaution utile pour suivre précisément la version utilisée, planifier les mises à jour et savoir ce qui relève de NOX ou des composants amont.",
        ],
        ending: "NOX HOSTING est donc à la fois une identité visuelle originale et un travail d’intégration autour d’un panneau open source existant. Garder ces deux niveaux visibles rend le projet plus honnête, plus compréhensible et plus simple à faire évoluer.",
      },
    ],
    takeaways: [
      "Le Panel gère l’interface ; Wings et Docker font tourner les serveurs sur les nœuds.",
      "Les créations de thème NOX sont distinguées du code amont Pterodactyl et Laravel.",
      "Les crédits, les licences et le commit utilisé doivent rester vérifiables.",
    ],
  },
  en: {
    category: "Hosting & DevOps",
    title: "NOX HOSTING: giving a Pterodactyl panel a clear identity",
    excerpt: "A look inside the NOX HOSTING theme: its sign-in screen, the roles of Panel and Wings, installation requirements, and the boundary between NOX originals and upstream code.",
    intro: "NOX HOSTING is the theme and visual identity I am building around a game-server management panel based on Pterodactyl. This article explains what the repository contains, how the Panel connects to game nodes, and which parts are NOX creations—without claiming the inherited Pterodactyl or Laravel code as my own.",
    tags: ["NOX HOSTING", "Pterodactyl", "Game hosting", "PHP", "DevOps"],
    sections: [
      {
        heading: "A management panel, not automatic game hosting",
        paragraphs: [
          "The repository describes NOX HOSTING as a web panel for configuring and managing game servers on Linux infrastructure. Administrators manage nodes and accounts from the Panel; people assigned a server can then manage it through the web interface.",
          "That distinction matters: installing the Panel alone does not install Wings or start a game server. The Panel is the control interface. Game processes run on Linux nodes, inside Docker containers, with Wings installed and configured on those nodes. Actual capacity therefore also depends on the infrastructure, its configuration, and the services required around the Panel.",
        ],
        bullets: [
          "Panel: the web interface for administrators and server users.",
          "Linux node: the machine that runs game-server containers.",
          "Wings and Docker: components installed on a node to run the servers.",
        ],
      },
      {
        heading: "A NOX identity visible from the sign-in screen",
        paragraphs: [
          "The screenshot supplied with this article shows the NOX HOSTING sign-in page as provided: a dark background, the brand logo, sign-in fields, and a blue action button. It is a concrete look at the identity applied to the interface—not a demonstration of an authenticated session or administration features.",
          "For me, theme work means making the interface recognizable without obscuring its purpose. People can see that they are entering the NOX HOSTING panel, while the navigation and sign-in journey remain those of a management tool. The footer credit visible in the supplied screenshot is preserved as-is.",
        ],
      },
      {
        heading: "Separate NOX customizations from the Pterodactyl foundation",
        paragraphs: [
          "The repository README says the project is built on the Pterodactyl Panel 1.15.2 application base. The application code includes the Pterodactyl and Laravel foundation; the NOX theme adds its identity, artwork, and project-specific changes. Compiled frontend assets are included too, so a standard installation does not need Node.js to rebuild those assets.",
          "This distinction is more than wording: it states exactly what I am claiming and what I am not. I can describe the NOX design, artwork, logo, and theme changes identified in the project. I do not present the entire Panel, Laravel, or its dependencies as code I wrote.",
        ],
      },
      {
        heading: "Technical requirements to understand before installation",
        paragraphs: [
          "The repository guide describes a fresh Linux installation, with a domain pointed at the server and HTTPS configured before public exposure. It calls for PHP 8.2 or 8.3, Composer 2, MariaDB or MySQL, Redis, and a web server such as Nginx. A setup that will run games also needs Docker and Wings on each relevant node.",
          "Setup is more than copying files. It includes creating the database, preparing the environment file, running installation and migration commands, creating the administrator account, and configuring the scheduler and queue worker. Secrets and the application key must be protected and backed up; the README specifically warns against regenerating the key for an existing installation.",
        ],
      },
      {
        heading: "Complete Panel installation on Ubuntu 24.04",
        paragraphs: [
          "This sequence follows the repository guide for a fresh installation. Before copying the commands, confirm that the VPS is new, the domain points to it, and replace the example SQL password with a long random password. In the interactive setup, set the Panel URL to `https://panel.example.com` and enter the same database name, username, and SQL password.",
          "After setting file permissions, configure Nginx to serve `/var/www/pterodactyl/public` through PHP-FPM 8.3 and install a valid HTTPS certificate before exposing the Panel publicly. The repository points to Pterodactyl’s guide for the exact Nginx block: domain names, certificates, and network rules depend on the server.",
          "For the scheduler, run `sudo crontab -e` and add the copied cron line to root’s crontab. For the worker, create the systemd service file, paste the INI block, and then run the enable commands.",
        ],
        callout: {
          title: "Important — fresh installation only",
          body: "Run `php artisan key:generate --force` only once, on a brand-new Panel. Never rerun it on an existing installation: APP_KEY protects encrypted data. Back it up with the database.",
        },
        codeBlocks: INSTALLATION_CODE_BLOCKS,
        sources: [
          {
            label: {
              fr: "Configuration Nginx officielle de Pterodactyl Panel",
              en: "Official Pterodactyl Panel Nginx configuration guide",
            },
            href: "https://pterodactyl.io/panel/1.0/webserver_configuration.html",
          },
        ],
        ending: "These steps install the full NOX HOSTING Panel, not game servers. To run them, install Docker and Wings 1.x separately on each Linux node, create the node in the Panel administration area, and configure Wings with the file generated by the Panel.",
      },
      {
        heading: "Keep credits and licenses clear",
        paragraphs: [
          "The NOX HOSTING license covers the original NOX creations described in the repository: design, artwork, logo, theme, and NOX-attributed theme changes. It allows people to use the theme on their own Pterodactyl panel free of charge as long as they retain the “NOX HOSTING by NoxCoreDev” credit. It also prohibits selling the theme or logo, removing or changing that credit, or presenting the brand as their own.",
          "That license does not replace the terms for third-party projects. The repository keeps Pterodactyl Panel’s MIT license, notices for Laravel, and applicable attribution for other components. Its notice also states that the NOX changes are not affiliated with Pterodactyl Software or Laravel. That is how a customization can be presented without erasing the origin of its software foundation.",
        ],
        sources: [
          {
            label: {
              fr: "Dépôt source et guide d’installation NOX HOSTING",
              en: "NOX HOSTING source repository and installation guide",
            },
            href: "https://github.com/NoxCoreDev/Noxhostingtheme",
          },
          {
            label: {
              fr: "Documentation officielle de démarrage Pterodactyl Panel",
              en: "Official Pterodactyl Panel getting-started guide",
            },
            href: "https://pterodactyl.io/panel/1.0/getting_started.html",
          },
          {
            label: {
              fr: "Documentation officielle d’installation de Wings",
              en: "Official Wings installation guide",
            },
            href: "https://pterodactyl.io/wings/1.0/installing.html",
          },
          {
            label: {
              fr: "Documentation Laravel 12",
              en: "Laravel 12 documentation",
            },
            href: "https://laravel.com/docs/12.x",
          },
        ],
      },
      {
        heading: "What comes next: evolve the theme without losing clarity",
        paragraphs: [
          "I want to keep improving the visual identity and navigation while staying attentive to updates in the Panel this project builds on. A theme change should be reviewable, testable, and comparable with the upstream foundation—not presented as a complete rewrite of the application.",
          "The repository does not currently have a published GitHub release; its README recommends reviewing the source and pinning the chosen commit before installation. That is a useful way to track the exact version in use, plan updates, and understand which parts belong to NOX or to upstream components.",
        ],
        ending: "NOX HOSTING is both an original visual identity and an integration project around an existing open-source panel. Keeping those two layers visible makes the project more honest, easier to understand, and easier to maintain.",
      },
    ],
    takeaways: [
      "The Panel manages the interface; Wings and Docker run servers on the nodes.",
      "NOX theme creations are distinguished from upstream Pterodactyl and Laravel code.",
      "Credits, licenses, and the deployed commit should remain verifiable.",
    ],
  },
};

export default article;
