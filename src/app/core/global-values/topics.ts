import { activitiesPagesType } from "@core/data-types";
import { faHome, faUserGraduate, faGlobeEurope, faAddressCard, faBuilding, faStar, faMap, faImages, faFileAlt } from "@fortawesome/free-solid-svg-icons";
import { assetsImagesPath } from "./main";


export const homePages: activitiesPagesType = {
  id: 'home',
  route: '/home/about_me',
  title: 'A propos...',
  icon: faHome,
  sub_menus: []
};

export const educationPages: activitiesPagesType = {
  id: 'education',
  route: '/education',
  title: 'Formation',
  colorType: 'education',
  verbose_title: 'Accès à mes formations',
  icon: faUserGraduate,
  sub_menus: [
    {
      id: "degrees",
      title: "Parcours universitaire",
      fragment: "education__degrees",
      icon: faUserGraduate
    },
    {
      id: "degrees",
      title: "Travaux/publications",
      fragment: "education__publish",
      icon: faUserGraduate  // TODO find a better icon
    },
    {
      id: "trainings",
      title: "Formations",
      fragment: "education__trainings",
      icon: faGlobeEurope
    }
  ]
};

export const legacyResumePage: activitiesPagesType = {
  id: 'legacyResume',
  route: '/resume',
  title: 'CV',
  verbose_title: 'Télécharger mon CV',
  icon: faAddressCard,
  sub_menus: []
};

export const experiencesPages: activitiesPagesType = {
  id: 'experiences',
  route: '/experiences',
  title: 'Expériences',
  colorType: 'job',
  verbose_title: 'Accès au CV',
  icon: faAddressCard,
  sub_menus: [
    {
      id: "navigation",
      title: "Navigation",
      fragment: "experiences__navigate",
      icon: faGlobeEurope
    },
    {
      id: "activities",
      title: "Activités",
      fragment: "experiences__content__activities",
      icon: faBuilding
    },
    {
      id: "skills",
      title: "Compétences",
      fragment: "experiences__content__skills",
      icon: faStar
    }
  ]
};

export const mapActivitiesPages: activitiesPagesType = {
  id: 'maps',
  route: '/maps',
  title: 'Cartes',
  verbose_title: 'Accès aux carte',
  colorType: 'personal-project',
  icon: faMap,
  sub_menus: [
    {
      id: "activities",
      title: "Carte des activités",
      type: 'app',
      content_url: "/maps/app/activities",
      categories: [],
      tags: [],
      status: 'Done',
      image_url: `${assetsImagesPath}/portfolio_activities.jpg`,
      description: `Cartographie de mon parcours universitaire et professionnel. Le front utilise Angular avec notamment 
          les libraries OpenLayers pour la gestion des objets géographiques et D3js pour la légende temporelles. Les données 
          sont gérées par le backend en Python au travers d'une API Flask.`
    },
    {
      id: "sandbox",
      title: "Bac à sable",
      type: 'app',
      content_url: "/maps/app/sandbox",
      categories: [],
      tags: [],
      status: 'Dev',
      image_url: `${assetsImagesPath}/sandbox.jpg`,
      description: `Un bac à sable pour saisir et exporter des données géographiques: Points, LineString, Polygons (et à trous). 
        L'ensemble est totalement géré par le front avec OpenLayers principalement.`
    },
    {
      id: "gtfs-viewer",
      title: "Visualisation de GTFS",
      type: 'app',
      content_url: "/maps/app/gtfs-viewer",
      categories: [],
      tags: [],
      status: 'Dev',
      image_url: `${assetsImagesPath}/gtfs_viewer.jpg`,
      description: `Application pour visualiser la circulation sur une journée des transports en commun à partir d'un GTFS. 
        On propose ainsi une cartographie spatio-temporelle des TER de la SNCF sur l'ensemble du territoire et les lignes de trams 
        et métros pour Toulouse et Lyon. OpenLayers et D3js sont mobilisés pour le front. Une phase de pré-traitement des données, 
        issus des GTFS est réalisée en Python pour obtenir des données exploitables. Ces dernières sont diffusées par un backend 
        codé en Golang à l'aide d'une API REST (Gin Gonic)`
    },
    {
      id: "find-my-path",
      title: "Find my path",
      type: 'website',
      categories: [],
      tags: [],
      status: 'Dev',
      content_url: "https://findmypath.amaury-valorge.com/",
      image_url: `${assetsImagesPath}/find_my_path.jpg`,
      description: `Application Angular (Leaflet, D3js) pour déterminer des plus courts chemins à partir des données OpenStreetMap. 
        Le calcul est réalisé à partir de ma librarie Python OsmGT dédiée à l'analyse de réseau.`
    }
  ]
};

export const galleryPages: activitiesPagesType = {
  id: 'gallery',
  route: '/gallery',
  title: 'Galerie',
  verbose_title: 'Accès à la galerie',
  colorType: 'gallery',
  icon: faImages,
  sub_menus: []
};


export const projectPages: activitiesPagesType[] = [
  {
    id: 'blog',
    route: '/blog',
    title: 'Blog',
    verbose_title: 'Accès au blog',
    colorType: 'secondary',
    icon: faFileAlt,
    sub_menus: []
  }
];

export const resumeTopicsPages = [...[educationPages], ...[experiencesPages], ...[mapActivitiesPages], ...[galleryPages]]
export const mainTopicsPages = [...[homePages], ...resumeTopicsPages, ...projectPages]
export const pagesObject: any = mainTopicsPages.reduce((a: any, x: any) => ({...a, [x.id]: x}), {});
