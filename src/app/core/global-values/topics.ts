import { mapActivitiesPagesType } from "@core/data-types";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faHome, faUserGraduate, faGlobeEurope, faAddressCard, faBuilding, faStar, faMap, faImages, faFileAlt } from "@fortawesome/free-solid-svg-icons";
import { assetsImagesPath, githubUrl } from "./main";


export const homePages: any = {
  id: 'home',
  route: '/home/about_me',
  title: 'A propos...',
  icon: faHome,
  sub_menus: []
};

export const educationPages: any = {
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

export const legacyResumePage: any = {
  id: 'legacyResume',
  route: '/resume',
  title: 'CV',
  colorType: null,
  verbose_title: 'Télécharger mon CV',
  icon: faAddressCard,
  sub_menus: [
  ]
};

export const experiencesPages: any = {
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

export const mapActivitiesPages: mapActivitiesPagesType = {
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
      image_url: `${assetsImagesPath}/portfolio_activities.jpg`,
      description: "Cartographie de mon parcours universitaire et professionnel (OpenLayers et D3js)."
    },
    {
      id: "sandbox",
      title: "Bac à sable",
      type: 'app',
      content_url: "/maps/app/sandbox",
      categories: [],
      tags: [],
      image_url: `${assetsImagesPath}/sandbox.jpg`,
      description: "Un bac à sable (OpenLayers) pour saisir et exporter des données géographiques: Points, LineString, Polygons (et à trous). En cours de développement..."
    },
    {
      id: "gtfs-viewer",
      title: "Visualisation de GTFS",
      type: 'app',
      content_url: "/maps/app/gtfs-viewer",
      categories: [],
      tags: [],
      image_url: `${assetsImagesPath}/gtfs_viewer.jpg`,
      description: "Application (OpenLayers, D3js...) pour visualiser la circulation sur une journée des transports en commun (à partir d'un GTFS). En cours de développement..."
    },
    {
      id: "find-my-path",
      title: "Find my path",
      type: 'website',
      categories: [],
      tags: [],
      content_url: "https://findmypath.amaury-valorge.com/",
      image_url: `${assetsImagesPath}/find_my_path.jpg`,
      description: "Application Angular (Leaflet, D3js) pour calculer des plus courts chemins à partir des données OpenStreetMap. Le calcul est réalisé à partir de ma librarie Python OsmGT. En cours de refonte..."
    }
  ]
};

export const galleryPages: any = {
  id: 'gallery',
  route: '/gallery',
  title: 'Galerie',
  verbose_title: 'Accès à la galerie',
  colorType: 'gallery',
  icon: faImages
};


export const projectPages: any = [
  {
    id: 'blog',
    route: '/blog',
    title: 'Blog',
    verbose_title: 'Accès au blog',
    colorType: 'secondary',
    icon: faFileAlt
  },
  {
    id: 'github',
    url: githubUrl,
    title: 'Github',
    verbose_title: 'Accès à Github',
    colorType: 'secondary',
    icon: faGithub
  }
];

export const resumeTopicsPages = [...[educationPages], ...[experiencesPages], ...[mapActivitiesPages], ...[galleryPages]]
export const mainTopicsPages = [...[homePages], ...resumeTopicsPages, ...projectPages]
export const pagesObject: any = mainTopicsPages.reduce((a: any, x: any) => ({...a, [x.id]: x}), {});
