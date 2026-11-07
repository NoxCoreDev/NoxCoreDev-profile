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
    code: `CREATE DATABASE noxhosting;
CREATE USER 'noxhosting'@'127.0.0.1' IDENTIFIED BY 'REPLACE_WITH_A_LONG_RANDOM_PASSWORD';
GRANT ALL PRIVILEGES ON noxhosting.* TO 'noxhosting'@'127.0.0.1';
FLUSH PRIVILEGES;
EXIT;`,
  },
  {
    label: { fr: "4. Installer les fichiers NOX HOSTING", en: "4. Install NOX HOSTING files" },
    language: "bash",
    code: `sudo mkdir -p /var/www/noxhosting
sudo chown "$USER":"$USER" /var/www/noxhosting
git clone https://github.com/NoxCoreDev/Noxhostingtheme.git /var/www/noxhosting
cd /var/www/noxhosting

cp .env.example .env
composer install --no-dev --optimize-autoloader
chmod -R 755 storage/* bootstrap/cache/`,
  },
  {
    label: { fr: "5. Configurer le panneau", en: "5. Configure the panel" },
    language: "bash",
    code: `php artisan key:generate --force
php artisan p:environment:setup
php artisan p:environment:database
php artisan p:environment:mail`,
  },
  {
    label: { fr: "6. Créer les tables et le compte admin", en: "6. Create tables and admin account" },
    language: "bash",
    code: `php artisan migrate --seed --force
php artisan p:user:make`,
  },
  {
    label: { fr: "7. Permissions des fichiers", en: "7. File permissions" },
    language: "bash",
    code: "sudo chown -R www-data:www-data /var/www/noxhosting",
  },
  {
    label: { fr: "8. Ouvrir le crontab root", en: "8. Open the root crontab" },
    language: "bash",
    code: "sudo crontab -e",
  },
  {
    label: { fr: "9. Ligne de tâche planifiée", en: "9. Scheduled task line" },
    language: "cron",
    code: "* * * * * php /var/www/noxhosting/artisan schedule:run >> /dev/null 2>&1",
  },
  {
    label: { fr: "10. Créer le service du worker", en: "10. Create the worker service" },
    language: "bash",
    code: "sudo nano /etc/systemd/system/noxhosting-worker.service",
  },
  {
    label: { fr: "11. Contenu du service du worker", en: "11. Worker service contents" },
    language: "ini",
    code: `[Unit]
Description=NOX HOSTING Queue Worker
After=redis-server.service

[Service]
User=www-data
Group=www-data
Restart=always
ExecStart=/usr/bin/php /var/www/noxhosting/artisan queue:work --queue=high,standard,low --sleep=3 --tries=3
RestartSec=5s

[Install]
WantedBy=multi-user.target`,
  },
  {
    label: { fr: "12. Activer le worker", en: "12. Enable the worker" },
    language: "bash",
    code: `sudo systemctl daemon-reload
sudo systemctl enable --now noxhosting-worker.service`,
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
        fr: "Page de connexion NOX HOSTING sur mobile.",
        en: "NOX HOSTING sign-in page on mobile.",
      },
      caption: {
        fr: "Page de connexion NOX HOSTING sur mobile.",
        en: "NOX HOSTING sign-in page on mobile.",
      },
    },
  ],
  fr: {
    category: "Projets & Hébergement",
    title: "NOX HOSTING : mon panneau de gestion pour serveurs de jeux",
    excerpt: "Découvre NOX HOSTING : une interface de gestion à l’identité sombre et bleue, un espace pour les administrateurs et les utilisateurs, et une installation complète sur Ubuntu 24.04.",
    forkCta: { label: "Forker ce dépôt", href: "https://github.com/NoxCoreDev/Noxhostingtheme/fork" },
    intro: "NOX HOSTING est mon projet de panneau web pour organiser et gérer des serveurs de jeux. J’ai donné à l’interface une identité visuelle propre à la marque et pensé le parcours pour réunir au même endroit les outils de gestion, du côté administrateur comme du côté utilisateur.",
    tags: ["NOX HOSTING", "Serveurs de jeux", "Hébergement", "Ubuntu 24.04", "Panel de gestion"],
    sections: [
      {
        heading: "NOX HOSTING, le projet",
        paragraphs: [
          "L’objectif de NOX HOSTING est simple : offrir une porte d’entrée web claire pour administrer une activité d’hébergement de jeux. L’administrateur retrouve dans le panneau les éléments d’organisation de son infrastructure, notamment les nœuds et les comptes utilisateurs. Il peut ensuite attribuer des serveurs aux personnes qui vont les utiliser.",
          "Chaque utilisateur se connecte à son espace et gère le serveur qui lui a été confié depuis l’interface web. Le panneau rassemble ainsi l’accès et les opérations courantes dans une expérience identifiable sous le nom NOX HOSTING, plutôt que de demander à chacun de manipuler directement la machine qui héberge le jeu.",
        ],
        bullets: [
          "Administrer les nœuds et les comptes depuis une interface web.",
          "Attribuer les serveurs aux utilisateurs concernés.",
          "Donner à chaque utilisateur un espace web pour gérer son serveur.",
        ],
      },
      {
        heading: "Une identité NOX visible dès la connexion",
        paragraphs: [
          "J’ai choisi une direction graphique sombre, avec le logo NOX HOSTING au premier plan et le bleu pour mettre en évidence l’action principale. La page de connexion reste lisible : le formulaire, les champs de compte et le bouton d’entrée sont faciles à repérer.",
          "Cette page ouvre l’espace de gestion NOX HOSTING. Après connexion, les utilisateurs retrouvent les serveurs qui leur sont attribués, tandis que l’administration gère les nœuds et les comptes.",
        ],
      },
      {
        heading: "Les rôles côté administration et côté utilisateur",
        paragraphs: [
          "NOX HOSTING distingue deux usages complémentaires. L’administration prépare l’infrastructure et les comptes, puis organise l’accès aux serveurs. L’utilisateur rejoint son espace web et pilote le serveur qui lui a été attribué. Cette séparation rend le parcours plus simple à comprendre, que l’on configure l’hébergement ou que l’on utilise un serveur au quotidien.",
          "Le panneau sert à gérer l’activité; les processus de jeu ont besoin de machines Linux configurées pour les exécuter. Pour cela, les nœuds utilisent Docker et Wings. Installer l’interface seule ne démarre donc pas automatiquement des serveurs de jeu : il faut aussi préparer les nœuds et les relier au panneau.",
        ],
      },
      {
        heading: "Installer NOX HOSTING sur Ubuntu 24.04",
        paragraphs: [
          "Les blocs ci-dessous donnent le parcours d’installation sur un nouveau VPS : paquets nécessaires, base de données, fichiers du projet, configuration interactive, compte administrateur, droits, tâche planifiée et worker. Chaque bloc a son bouton de copie. Avant de commencer, prépare un nom de domaine qui pointe vers le VPS et remplace le mot de passe SQL d’exemple par une valeur longue et aléatoire.",
          "Dans l’assistant, indique l’adresse de ton panneau, par exemple `https://nox.example.com`, puis les identifiants de la base créée à l’étape 3. Configure Nginx pour servir `/var/www/noxhosting/public` avec PHP-FPM 8.3 et active un certificat HTTPS valide avant d’ouvrir le panneau au public. L’accès web utilise les ports 80 et 443; n’ouvre les ports de jeu nécessaires qu’au niveau des nœuds concernés.",
          "Pour le scheduler, lance `sudo crontab -e` et colle la ligne cron dans le crontab de root. Pour le worker, crée le fichier de service indiqué, colle son contenu INI, puis exécute les commandes d’activation.",
        ],
        callout: {
          title: "Important : nouvelle installation uniquement",
          body: "`php artisan key:generate --force` ne s’exécute qu’une fois, sur un panneau tout neuf. Ne relance pas cette commande sur une installation existante : la clé APP_KEY protège les données chiffrées. Conserve-la avec tes sauvegardes de la base de données.",
        },
        codeBlocks: INSTALLATION_CODE_BLOCKS,
        ending: "Cette installation met en place le panneau de gestion. Pour lancer les serveurs de jeu, prépare séparément Docker et Wings sur chaque nœud Linux, crée le nœud dans l’administration NOX HOSTING et configure le service avec le fichier généré par le panneau.",
      },
      {
        heading: "Un projet conçu autour de la gestion au quotidien",
        paragraphs: [
          "NOX HOSTING associe une identité graphique reconnaissable à un parcours de gestion concret : se connecter, organiser l’infrastructure, attribuer les accès et retrouver son serveur dans l’espace web. L’installation Ubuntu documentée donne une base pour mettre le panneau en place sur son propre domaine.",
          "Mon objectif est de faire évoluer le projet en gardant cette idée au centre : une interface NOX claire, un accès simple pour les utilisateurs et les outils nécessaires à l’administration des serveurs de jeux.",
        ],
      },
    ],
    takeaways: [
      "NOX HOSTING centralise l’accès web à la gestion des serveurs de jeux.",
      "Les administrateurs organisent les nœuds et les comptes; les utilisateurs gèrent les serveurs qui leur sont attribués.",
      "L’interface et les serveurs de jeu ont des rôles distincts : les nœuds Linux, Docker et Wings font aussi partie du déploiement.",
    ],
  },
  en: {
    category: "Projects & Hosting",
    title: "NOX HOSTING: my game-server management panel",
    excerpt: "Meet NOX HOSTING: a dark-and-blue management interface, spaces for administrators and users, and a complete Ubuntu 24.04 installation path.",
    forkCta: { label: "Fork this repo", href: "https://github.com/NoxCoreDev/Noxhostingtheme/fork" },
    intro: "NOX HOSTING is my web-panel project for organizing and managing game servers. I gave the interface a visual identity of its own and shaped the journey to bring management tools together for both administrators and users.",
    tags: ["NOX HOSTING", "Game servers", "Hosting", "Ubuntu 24.04", "Management panel"],
    sections: [
      {
        heading: "The NOX HOSTING project",
        paragraphs: [
          "The goal of NOX HOSTING is simple: provide a clear web entry point for managing a game-hosting operation. Administrators find the organization tools for their infrastructure in the panel, including nodes and user accounts. They can then assign servers to the people who will use them.",
          "Each user signs in to their own space and manages the server assigned to them through the web interface. The panel brings access and everyday management together under the NOX HOSTING name, instead of asking everyone to work directly on the machine running a game.",
        ],
        bullets: [
          "Manage nodes and accounts from a web interface.",
          "Assign servers to the people who need them.",
          "Give each user a web space to manage their server.",
        ],
      },
      {
        heading: "A NOX identity from the sign-in screen",
        paragraphs: [
          "I chose a dark visual direction, with the NOX HOSTING logo up front and blue to highlight the primary action. The sign-in page stays easy to scan: the form, account fields, and entry button are easy to find.",
          "This page opens the NOX HOSTING management area. After signing in, users can find their assigned servers, while administrators manage nodes and user accounts.",
        ],
      },
      {
        heading: "Administrator and user roles",
        paragraphs: [
          "NOX HOSTING serves two complementary roles. Administrators prepare the infrastructure and accounts, then organize access to servers. Users enter their web space and manage the server assigned to them. This separation keeps the journey easier to understand, whether someone is setting up hosting or using a server day to day.",
          "The panel manages the operation; game processes need Linux machines configured to run them. The nodes use Docker and Wings for that purpose. Installing the interface alone does not automatically start game servers: the nodes must also be prepared and connected to the panel.",
        ],
      },
      {
        heading: "Install NOX HOSTING on Ubuntu 24.04",
        paragraphs: [
          "The blocks below lay out the installation on a new VPS: required packages, database, project files, interactive setup, administrator account, permissions, scheduled task, and queue worker. Each block has a copy button. Before starting, point a domain at the VPS and replace the example SQL password with a long, random value.",
          "In the setup prompts, enter your panel address, for example `https://nox.example.com`, followed by the database credentials created in step 3. Configure Nginx to serve `/var/www/noxhosting/public` through PHP-FPM 8.3 and enable a valid HTTPS certificate before exposing the panel publicly. Web access uses ports 80 and 443; only open the game ports needed by the relevant nodes.",
          "For the scheduler, run `sudo crontab -e` and paste the cron line into root’s crontab. For the worker, create the specified service file, paste in its INI contents, and then run the enable commands.",
        ],
        callout: {
          title: "Important: fresh installation only",
          body: "Run `php artisan key:generate --force` only once, on a brand-new panel. Do not run it again on an existing installation: the APP_KEY protects encrypted data. Keep it with your database backups.",
        },
        codeBlocks: INSTALLATION_CODE_BLOCKS,
        ending: "This installs the management panel. To run game servers, separately prepare Docker and Wings on each Linux node, create the node in NOX HOSTING administration, and configure the service with the file generated by the panel.",
      },
      {
        heading: "Built around everyday management",
        paragraphs: [
          "NOX HOSTING pairs a recognizable visual identity with a practical management journey: sign in, organize the infrastructure, assign access, and find your server in the web space. The Ubuntu installation guide provides a starting point for setting up the panel on your own domain.",
          "My goal is to keep that idea at the center as the project grows: a clear NOX interface, straightforward access for users, and the tools needed to manage game servers.",
        ],
      },
    ],
    takeaways: [
      "NOX HOSTING centralizes web access to game-server management.",
      "Administrators organize nodes and accounts; users manage the servers assigned to them.",
      "The interface and game-server processes have separate roles: Linux nodes, Docker, and Wings are also part of deployment.",
    ],
  },
};

export default article;
