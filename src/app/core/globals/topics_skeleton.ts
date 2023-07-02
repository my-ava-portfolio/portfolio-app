import { activitiesPagesType, mapPagesType } from "@core/data-types";
import { assetsImagesPath } from "./resume-shared-data";
import { blogIcon, companyIcon, galleryIcon, graduateIcon, homeIcon, mapIcon, navigationIcon, resumeIcon, skillIcon, stackIcon } from "./icons";


export const homePages: activitiesPagesType = {
  id: 'home',
  route: '/home/about_me',
  title: 'A propos...',
  icon: homeIcon,
  sub_menus: []
};

export const educationPages: activitiesPagesType = {
  id: 'education',
  route: '/education',
  title: 'Formation',
  colorType: 'education',
  verbose_title: 'Accès à mes formations',
  icon: graduateIcon,
  sub_menus: [
    {
      id: "degrees",
      title: "Parcours universitaire",
      fragment: "education__degrees",
      icon: graduateIcon
    },
    {
      id: "degrees",
      title: "Travaux/publications",
      fragment: "education__publish",
      icon: graduateIcon  // TODO find a better icon
    },
    {
      id: "trainings",
      title: "Formations",
      fragment: "education__trainings",
      icon: graduateIcon
    }
  ]
};

export const legacyResumePage: activitiesPagesType = {
  id: 'legacyResume',
  route: '/resume',
  title: 'CV',
  verbose_title: 'Télécharger mon CV',
  icon: resumeIcon,
  sub_menus: []
};

export const experiencesPages: activitiesPagesType = {
  id: 'experiences',
  route: '/experiences',
  title: 'Expériences',
  colorType: 'job',
  verbose_title: 'Accès au CV',
  icon: resumeIcon,
  sub_menus: [
    {
      id: "navigation",
      title: "Navigation",
      fragment: "experiences__navigate",
      icon: navigationIcon
    },
    {
      id: "activities",
      title: "Activités",
      fragment: "experiences__content__activities",
      icon: companyIcon
    },
    {
      id: "skills",
      title: "Compétences",
      fragment: "experiences__content__skills",
      icon: skillIcon
    }
  ]
};

const svgLogoTypescript = "https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg"
const svgLogoPython = "https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg"
const pngLogoGo = "https://www.developpez.com/images/logos/go.png"


export const mapActivitiesPages: mapPagesType = {
  id: 'maps',
  route: '/maps',
  title: 'Cartes',
  verbose_title: 'Accès aux carte',
  colorType: 'personal-project',
  icon: mapIcon,
  sub_menus: [
    {
      id: "activities",
      title: "Carte des activités",
      type: 'app',
      content_url: "/maps/app/activities",
      categories: [],
      tags: [],
      stack: [
        {
          type: "Back-end",
          language: "Python",
          img: svgLogoPython,
        },
        {
          type: "Front-end",
          language: "TypeScript",
          img: svgLogoTypescript,
        }
      ],
      status: 'Done',
      image_url: `${assetsImagesPath}/md-portfolio_activities.avif`,
      description: `La cartographie de mon parcours universitaire et professionnel. La librarie OpenLayers est utilisée pour
      la gestion du fond de plan et la génération des objets géographiques issus d'une base de données Postgres/GIS. Les données sont gérées par le backend en Python
      et diffusées avec une API REST (starlite). Enfin la légende temporelle, avec son interactivité, est gérée avec à D3js.`
    },
    {
      id: "sandbox",
      title: "Bac à sable",
      type: 'app',
      content_url: "/maps/app/sandbox",
      categories: [],
      tags: [],
      stack: [
        {
          type: "Back-end",
          language: "Python",
          img: svgLogoPython,
        },
        {
          type: "Front-end",
          language: "TypeScript",
          img: svgLogoTypescript,
        }
      ],
      status: 'Dev',
      image_url: `${assetsImagesPath}/md-sandbox.avif`,
      description: `Un bac à sable pour saisir et exporter des données géographiques: Points, LineString, Polygons (et à trous).
        L'ensemble est géré par le front avec OpenLayers. Egalement, il est possible de calculer des plus courts
        chemins en saisissant des noeuds ; calculs gérés par la librairie python OsmRx (en remplacement de OsmGt) au travers
        d'une API Rest (starlite)`
    },
    {
      id: "gtfs-viewer",
      title: "Visualisation de GTFS",
      type: 'app',
      content_url: "/maps/app/gtfs-viewer",
      categories: [],
      tags: [],
      stack: [
        {
          type: "Pre-Proc",
          language: "Python",
          img: svgLogoPython,
        },
        {
          type: "Back-end",
          language: "Go",
          img: pngLogoGo,
        },
        {
          type: "Front-end",
          language: "TypeScript",
          img: svgLogoTypescript,
        }
      ],
      status: 'Dev',
      image_url: `${assetsImagesPath}/md-gtfs_viewer.avif`,
      description: `Application pour visualiser la circulation sur une journée des transports en commun à partir d'un GTFS.
        On propose ainsi une cartographie spatio-temporelle des TER de la SNCF sur l'ensemble du territoire, ainsi que les lignes de trams
        et métros pour Toulouse et Lyon. OpenLayers (fond de plans et données) et D3js (légende temporelle) sont mobilisés pour le front.
        Une phase de pré-traitement des données, à partir des GTFS, est réalisée en Python pour obtenir des données facilement exploitables.
        Ces dernières, au format JSON, sont chargées et diffusées par un backend développé en Golang à l'aide d'une API REST (Gin Gonic)`
    },
  ]
};

export const galleryPages: activitiesPagesType = {
  id: 'gallery',
  route: '/gallery',
  title: 'Galerie',
  verbose_title: 'Accès à la galerie',
  colorType: 'gallery',
  icon: galleryIcon,
  sub_menus: []
};


export const blogPages: activitiesPagesType[] = [
  {
    id: 'blog',
    route: '/blog',
    title: 'Blog',
    verbose_title: 'Accès au blog',
    colorType: 'secondary',
    icon: blogIcon,
    sub_menus: []
  }
];

export const techStackPages: activitiesPagesType[] = [
  {
    id: 'stack',
    route: '/stack',
    title: 'Stack technique',
    verbose_title: 'Accès à la stack technique',
    colorType: 'secondary',
    icon: stackIcon,
    sub_menus: []
  }
];

export const resumeTopicsPages = [...[educationPages], ...[experiencesPages], ...[mapActivitiesPages], ...[galleryPages]]
export const mainTopicsPages = [...[homePages], ...resumeTopicsPages, ...blogPages]
export const pagesObject: any = mainTopicsPages.reduce((a: any, x: any) => ({...a, [x.id]: x}), {});
