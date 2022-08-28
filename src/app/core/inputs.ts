import { faChevronRight, faChevronLeft, faTrashCan, faSquarePlus, faWaveSquare, faDrawPolygon, faGear, faPenSquare, faMicrochip, faTerminal, faChartLine, faDatabase, faAngleDoubleDown, faAlignJustify, faAlignLeft, faBars, faHome, faCaretRight, faTrophy, faAddressBook, faBuilding, faUserCog, faBook, faPaintBrush, faExclamationCircle, faBug, faSpinner, faAngleRight, faProjectDiagram, faExpand, faTools, faMobileAlt, faTags, faTag, faCogs, faStepBackward, faStepForward, faPrint, faStar, faArrowAltCircleDown, faPhone, faFilter, faGlobeEurope, faQuestionCircle, faMapMarkerAlt, faArrowAltCircleUp, faGlobe, faFilePdf, faUserGraduate, faLanguage } from '@fortawesome/free-solid-svg-icons';
import { faAppStore, faYoutube, faPython, faGithub, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faChartBar, faAddressCard, faImages, faMap, faFileAlt } from '@fortawesome/free-regular-svg-icons';

import { apiBaseUrl } from './constants';
import { mapActivitiesPagesType } from './data-types';


export const apiUrl = apiBaseUrl + 'api/v1/portfolio/';
export const assetsLogoPath = `./assets/logo/`;
export const assetsImagesPath = `./assets/images/`;
export const personalBlogUrl = 'https://blog.amaury-valorge.com';
export const githubUrl = 'https://github.com/amauryval/';
export const githubBugIssueUrl = githubUrl + '/portfolio/issues/new?assignees=amauryval&labels=bug&template=bug_report.md&title=';
export const githubQuestionUrl = githubUrl + '/portfolio/issues/new?assignees=amauryval&labels=question&template=question-.md&title=';
export const githubEnhancementUrl = githubUrl + '/portfolio/issues/new?assignees=amauryval&labels=enhancement&template=feature_request.md&title=';
export const imageProfile = 'https://avatars.githubusercontent.com/u/36413727?v=4';

export const minWidthLandscape = 1024;
export const minHeightLandscape = 768;

export const resumeIcon = faAddressCard;
export const galleryIcon = faImages;
export const notesIcon = faFileAlt;
export const githubIcon = faGithub;
export const navIcon = faGlobeEurope;
export const helpIcon = faQuestionCircle;
export const exclamationIcon = faExclamationCircle;
export const locationIcon = faMapMarkerAlt;
export const arrowUpIcon = faArrowAltCircleUp;
export const websiteIcon = faGlobe;
export const pdfFileIcon = faFilePdf;
export const degreeIcon = faUserGraduate;
export const languageIcon = faLanguage;
export const skillIcon = faStar;
export const arrowDownIcon = faArrowAltCircleDown;
export const printIcon = faPrint;
export const linkedinIcon = faLinkedinIn;
export const emailIcon = faEnvelope;
export const phoneIcon = faPhone;
export const mapIcon = faMap;
export const backwardIcon = faStepBackward;
export const forwardIcon = faStepForward;
export const infoIcon = faCogs;
export const pythonIcon = faPython;
export const tagsIcon = faTags;
export const tagIcon = faTag;
export const mobileIcon = faMobileAlt;
export const centerIcon = faExpand;
export const filterIcon = faFilter;
export const methodoIcon = faProjectDiagram;
export const nextIcon = faAngleRight;
export const loadingIcon = faSpinner;
export const chartItemIcon = faChartBar;
export const videoItemIcon = faYoutube;
export const appItemIcon = faAppStore;
export const toolItemIcon = faTools;
export const bugIcon = faBug;
export const expandIcon = faExpand;
export const projectIcon = faPaintBrush;
export const publishIcon = faBook;
export const volunteerIcon = faUserCog;
export const jobIcon = faBuilding;
export const presIcon = faAddressBook;
export const trophyIcon = faTrophy
export const caretRightIcon = faCaretRight;
export const homeIcon = faHome;
export const menuIcon = faBars;
export const navBarIcon = faAlignLeft;
export const subMenuIcon = faAlignJustify;
export const arrowsDownIcon = faAngleDoubleDown;
export const databaseIcon = faDatabase;
export const dataVizIcon = faChartLine;
export const codingIcon = faTerminal;
export const integrationIcon = faTools;
export const modelingIcon = faMicrochip;
export const specIcon = faPenSquare;
export const editIcon = faPenSquare;
export const toolsIcon = faGear;
export const lineIcon = faWaveSquare;
export const PolygonIcon = faDrawPolygon;
export const addIcon = faSquarePlus;
export const removeIcon = faTrashCan;
export const arrowRightIcon = faChevronRight;
export const arrowLeftIcon = faChevronLeft;

// font awesome unicode
export const ungroupIconUnicode = '\uf247';



export const currentYear: number = new Date().getFullYear();
export const currentDate = now();

export const homePages: any = {
  id: 'home',
  route: '/home/about_me',
  title: 'A propos...',
  icon: homeIcon,
  sub_menus: []
};

export const educationPages: any = {
  id: 'education',
  route: '/education',
  title: 'Formation',
  colorType: 'education',
  verbose_title: 'Accès à mes formations',
  icon: degreeIcon,
  sub_menus: [
    {
      id: "degrees",
      title: "Parcours universitaire",
      fragment: "education__degrees",
      icon: degreeIcon
    },
    {
      id: "trainings",
      title: "Formations",
      fragment: "education__trainings",
      icon: navIcon
    }
  ]
};

export const legacyResumePage: any = {
  id: 'legacyResume',
  route: '/resume',
  title: 'CV',
  colorType: null,
  verbose_title: 'Télécharger mon CV',
  icon: resumeIcon,
  sub_menus: [
  ]
};

export const experiencesPages: any = {
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
      icon: navIcon
    },
    {
      id: "activities",
      title: "Activités",
      fragment: "experiences__content__activities",
      icon: jobIcon
    },
    {
      id: "skills",
      title: "Compétences",
      fragment: "experiences__content__skills",
      icon: skillIcon
    }
  ]
};

export const mapActivitiesPages: mapActivitiesPagesType = {
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
      content_url: "maps/app/activities",
      categories: [],
      tags: [],
      image_url: `${assetsImagesPath}/portfolio_activities.jpg`,
      description: "Cartographie de mon parcours universitaire et professionnel."
    },
    {
      id: "sandbox",
      title: "Bac à sable",
      type: 'app',
      content_url: "maps/app/sandbox",
      categories: [],
      tags: [],
      image_url: `${assetsImagesPath}/sandbox.jpg`,
      description: "Un bac à sable pour saisir des données géographiques: Points, LineString, Polygons (et à trous). En cours de développement..."
    },
    {
      id: "gtfs-viewer",
      title: "Visualisation de GTFS",
      type: 'app',
      content_url: "maps/app/gtfs-viewer",
      categories: [],
      tags: [],
      image_url: `${assetsImagesPath}/gtfs_viewer.jpg`,
      description: "Application pour visualiser des GTFS. En cours de développement..."
    },
    {
      id: "find-my-path",
      title: "Find my path",
      type: 'website',
      categories: [],
      tags: [],
      content_url: "https://findmypath.amaury-valorge.com/",
      image_url: `${assetsImagesPath}/find_my_path.jpg`,
      description: "Application pour déterminer le meilleur chemin. En cours de refonte..."
    }
  ]
};

export const galleryPages: any = {
  id: 'gallery',
  route: '/gallery',
  title: 'Galerie',
  verbose_title: 'Accès à la galerie',
  colorType: 'gallery',
  icon: galleryIcon
};


export const projectPages: any = [
  {
    id: 'blog',
    route: '/blog',
    title: 'Blog',
    verbose_title: 'Accès au blog',
    colorType: 'secondary',
    icon: notesIcon
  },
  {
    id: 'github',
    url: githubUrl,
    title: 'Github',
    verbose_title: 'Accès à Github',
    colorType: 'secondary',
    icon: githubIcon
  }
];

export const resumeTopicsPages = [...[educationPages], ...[experiencesPages], ...[mapActivitiesPages], ...[galleryPages]]
export const mainTopicsPages = [...[homePages], ...resumeTopicsPages, ...projectPages]
export const pagesObject: any = mainTopicsPages.reduce((a: any, x: any) => ({...a, [x.id]: x}), {});


export function checkIfScreenPortraitOrientation(): boolean {
  if (window.screen.orientation.angle === 90 && window.screen.width >= minWidthLandscape && window.screen.height >= minHeightLandscape) {
    return true;
  } else if (window.screen.orientation.angle === 0 ) {
    return true;
  } else {
    return false;
  }

}

function now(): Date {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  return date
}


export function stringToColor(inputText: string, seed: number): string {

  let hash = 0;
  for (let i = 0; i < inputText.length; i++) {
     hash = inputText.charCodeAt(i) + ((hash << seed) - hash);
  }
  let temp_color = (hash & 0x00FFFFFF).toString(16).toUpperCase();

  return "#" + "00000".substring(0, 6 - temp_color.length) + temp_color;

}


export function chunkArray(array: any[], size: number) {
  var outputArray = [];
  for(var i = 0; i < array.length; i += size) {
    outputArray.push(array.slice(i, i+size));
  }
  return outputArray;
}


export const activitiesMapping: { job: string; 'personal-project': string; volunteer: string;} = {
  "job": "Missions",
  "personal-project": "Projets personnels",
  "volunteer": "Bénévolat"
}

export const skillsMapping: { themes: string; technics: string; tools: string;} = {
  "themes": "Thématiques",
  "technics": "Techniques",
  "tools": "Outils"
}