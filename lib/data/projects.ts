import type { Project } from './types'

export const projects: Project[] = [
  {
    slug: 'sandy',
    title: 'Sandy',
    colorKey: 'indigo',
    image: '/sandy.png',
    shortDescription:
      'Application web de gestion automobile personnelle et familiale  suivi des dépenses, de la consommation, des documents et de l\'entretien, en un seul endroit.',
    context:
      'Projet 100% personnel, conçu et développé seul de A à Z. L\'idée est née du manque d\'un outil simple pour centraliser tout ce qui concerne ses véhicules : consommation, dépenses, assurance, documents administratifs... les informations sont habituellement éparpillées entre des fichiers Excel, des boîtes mail et des tiroirs.',
    problem:
      'Aucune application existante ne couvrait l\'ensemble des besoins de manière fluide et personnalisable : suivi de la consommation, historique des dépenses par catégorie (carburant, entretien, assurance), stockage de documents, et partage des informations au sein d\'un foyer. Les solutions disponibles étaient soit trop simplistes, soit réservées à des usages professionnels.',
    solution:
      'Développement d\'une application fullstack Next.js avec un back-end Node.js, une base PostgreSQL, et un déploiement sur Vercel. L\'interface propose un dashboard analytics avec graphiques de tendances, une gestion multi-véhicules, le stockage de documents (carte grise, assurance...), et un système de préférences familiales pour contrôler ce qui est visible par chaque membre. Le mode dark/light est géré avec soin pour éviter le flash au chargement. Framer Motion apporte des animations fluides et des skeletons de chargement.',
    result:
      'Site entièrement fonctionnel, déployé en production sur Vercel.',
    techStack: ['Next.js', 'TypeScript', 'TailwindCSS', 'Framer Motion', 'Node.js', 'PostgreSQL', 'Vercel'],
    category: 'fullstack',
    featured: true,
    demoUrl: 'https://ma-voiture-sandy.vercel.app/',
    tagline: 'Toute la vie de votre voiture, en un seul endroit.',
    features: [
      {
        title: 'Suivi des dépenses',
        description: 'Catégorisez carburant, entretien, assurance et visualisez vos tendances sur des graphiques interactifs.',
      },
      {
        title: 'Gestion multi-véhicules',
        description: 'Ajoutez autant de véhicules que vous souhaitez et basculez entre eux en un clic.',
      },
      {
        title: 'Coffre-fort de documents',
        description: 'Stockez carte grise, attestation d\'assurance et contrôle technique  accessibles partout.',
      },
      {
        title: 'Partage familial',
        description: 'Invitez les membres de votre foyer et contrôlez précisément ce que chacun peut voir ou modifier.',
      },
      {
        title: 'Dashboard analytics',
        description: 'Tendances de consommation, coût au kilomètre, comparaisons inter-périodes.',
      },
      {
        title: 'Dark / Light mode',
        description: 'Thème soigné sans flash au chargement grâce à une détection côté serveur.',
      },
    ],
    screenshots: [
      '/sandy.png',
      // Add more paths here when screenshots are ready, e.g. '/sandy-dashboard.png'
    ],
  },
  {
    slug: 'tempo',
    title: 'Tempo',
    colorKey: 'amber',
    shortDescription:
      'Outil interne de gestion du temps de travail pour Weinmann Technologies  déclarations d\'activités, validation managériale et synchronisation RH.',
    context:
      'Partie de la suite d\'outils internes développée chez Weinmann Technologies. Avant Tempo, les déclarations de temps se faisaient sur des tableurs Excel peu fiables, sans validation formelle et sans vue globale pour les managers. Le projet fait partie de l\'Espace Client Weinmann, un ensemble d\'applications internes pensées pour moderniser les processus métier de l\'entreprise.',
    problem:
      'Les tableurs Excel ne permettaient pas de gérer les droits (collaborateur vs manager), de valider les déclarations de manière traçable, ni de synchroniser automatiquement les absences depuis l\'outil RH Silae. Les cadres au forfait n\'avaient pas de système dédié pour leurs forfaits jours mensuels.',
    solution:
      'Application web fullstack développée seul (frontend + backend). Les utilisateurs déclarent leurs activités quotidiennes, consultent leur historique et leurs absences  synchronisées automatiquement avec Silae via un script Python. Les managers disposent d\'un accès dédié pour valider ou corriger les déclarations. Gestion des rôles (collaborateur, manager, admin), protection des routes, et interface TailwindCSS modulaire.',
    result:
      'Outil utilisé quotidiennement en production par l\'ensemble de l\'entreprise. Suppression complète des tableurs Excel. Gain de temps significatif pour les managers sur la validation. L\'outil continue d\'évoluer au fil des retours utilisateurs  preuve qu\'il a trouvé sa place dans leur quotidien.',
    techStack: ['HTML', 'TailwindCSS', 'Node.js', 'Express', 'MySQL', 'PM2', 'Nginx'],
    category: 'fullstack',
    featured: true,
  },
  {
    slug: 'bolero',
    title: 'Boléro',
    colorKey: 'green',
    shortDescription:
      'Planning interactif des interventions SAV pour Weinmann Technologies  visualisation en temps réel des techniciens, clients et tournées.',
    context:
      'Outil interne de la suite Weinmann Technologies. Le service SAV gérait les plannings d\'interventions sur des fichiers Excel, sans vue claire de qui intervient où et quand. Ce projet fait partie de l\'Espace Client Weinmann, l\'ensemble des applications internes de l\'entreprise.',
    problem:
      'Les fichiers Excel étaient sources d\'erreurs, de versions obsolètes et de perte de temps. Le service SAV manquait d\'une vue planning lisible pour organiser les tournées des techniciens, répartir les ressources et savoir en un coup d\'œil où se trouve chaque collaborateur.',
    solution:
      'Application React avec DayPilot Scheduler pour une vue "ressource" en colonnes (techniciens) et échelle horaire en lignes, avec glisser-déposer. Back-end Express avec API REST optimisée pour des requêtes rapides sur plusieurs jours. Schéma MySQL structuré, scripts de migration depuis les exports Excel. Déploiement en production avec PM2 et reverse-proxy Nginx pour SSL et gestion des sous-domaines.',
    result:
      'V1 mise en ligne et adoptée par l\'équipe SAV complète, accessible sur desktop et tablette. Disparition des risques d\'erreurs liés aux formules Excel. Base de code documentée et solide pour la Phase 2 : édition des interventions directement dans l\'interface, nouvelles vues hebdomadaires et mensuelles.',
    techStack: ['React Native', 'DayPilot Scheduler', 'TailwindCSS', 'Node.js', 'Express', 'MySQL', 'PM2', 'Nginx'],
    category: 'fullstack',
    featured: false,
  },
  {
    slug: 'swing',
    title: 'Swing',
    colorKey: 'emerald',
    shortDescription:
      'Interface mobile de préparation des commandes pour les magasiniers de Weinmann Technologies  remplacement des feuilles papier par une app connectée à l\'ERP.',
    context:
      'Outil interne de la suite Weinmann Technologies. Les magasiniers préparaient les commandes avec des feuilles papier et des tableurs Excel, sujets aux erreurs de transcription et impossibles à synchroniser en temps réel avec l\'ERP. Ce projet s\'inscrit dans l\'Espace Client Weinmann, la suite d\'outils internes de l\'entreprise.',
    problem:
      'Les feuilles de commandes papier et les tableurs généraient des erreurs de lecture, des pertes d\'informations et des délais dans la remontée des statuts vers l\'ERP. Les magasiniers n\'avaient pas d\'outil adapté à leur usage terrain : debout, en mouvement, sur smartphone.',
    solution:
      'Application web mobile-first développée avec HTML, TailwindCSS et Express. Interface ergonomique pensée pour les écrans tactiles après observation terrain des magasiniers. Intégration ERP via micro-services Python pour formater et transmettre les mises à jour de stock en temps réel. Gestion des connexions instables (retry, cache local léger), schéma MySQL avec index optimisés, et accès bureau pour le contrôle qualité et le suivi des expéditions.',
    result:
      'Adoption complète : les feuilles papier et tableurs sont définitivement remplacés. Quasi-disparition des erreurs de lecture et de transcription. Outil disponible en mobilité pour les magasiniers et sur postes fixes pour l\'équipe bureau. Évolutif : ajout ultérieur prévu de la capture de codes-barres et de l\'export PDF.',
    techStack: ['HTML', 'TailwindCSS', 'Node.js', 'Express', 'Python', 'MySQL', 'PM2', 'Nginx', 'Mobile-first'],
    category: 'fullstack',
    featured: false,
  },
  {
    slug: 'espace-client-weinmann',
    title: 'Espace Client Weinmann',
    colorKey: 'amber',
    shortDescription:
      'Portail web client pour visualiser en temps réel les consommations et l\'état des cabines de peinture connectées  projet de fin d\'études.',
    context:
      'Projet de fin d\'études réalisé en alternance chez Weinmann Technologies. L\'entreprise fabrique des cabines de peinture industrielles connectées. Les clients n\'avaient pas de moyen simple de consulter l\'état de leurs équipements et leur consommation à distance. Ce projet est le projet principal de la suite interne Weinmann, dont Tempo, Boléro et Swing sont des composantes.',
    problem:
      'Les données remontées par les cabines de peinture connectées (consommation, statuts, alertes) n\'étaient pas accessibles aux clients de manière directe et lisible. Le suivi se faisait par échanges manuels avec le SAV, sans tableaux de bord ni historiques consultables.',
    solution:
      'Développement d\'un portail web permettant aux clients de Weinmann de consulter en temps réel l\'état de leurs cabines : consommation, indicateurs de performance, historiques et alertes. Collecte automatisée des données des équipements, visualisation sous forme de dashboards, et architecture pensée pour accueillir plusieurs clients avec des droits d\'accès distincts.',
    result:
      'Portail livré et présenté comme projet de fin d\'études. Permet à Weinmann d\'offrir une expérience client moderne autour de ses équipements connectés et d\'ouvrir la voie à de nouveaux services digitaux.',
    techStack: ['Next.js', 'TypeScript', 'TailwindCSS', 'Node.js', 'MySQL', 'VPS Linux'],
    category: 'fullstack',
    featured: true,
  },
]

export const featuredProjects = projects.filter((p) => p.featured)

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug)
}
