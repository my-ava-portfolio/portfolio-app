import { faHome, faCaretRight, faTrophy, faAddressBook, faBuilding, faUserCog, faBook, faPaintBrush, faExclamationCircle, faBug, faSpinner, faAngleRight, faProjectDiagram, faExpand, faTools, faMobileAlt, faTags, faTag, faCogs, faStepBackward, faStepForward, faPrint, faStar, faArrowAltCircleDown, faPhone, faFilter, faGlobeEurope, faQuestionCircle, faMapMarkerAlt, faArrowAltCircleUp, faGlobe, faFilePdf, faUserGraduate, faLanguage } from '@fortawesome/free-solid-svg-icons';
import { faAppStore, faYoutube, faPython, faGithub, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';

import { faEnvelope, faChartBar, faAddressCard, faImages, faMap, faFileAlt } from '@fortawesome/free-regular-svg-icons';

import { apiBaseUrl } from '../../app/core/constants';

export const apiUrl = apiBaseUrl + 'api/v1/portfolio/';
export const apiCoreUrl = apiBaseUrl + 'api/v1/core/';
export const apiLogoUrl = `./assets/logo/`;
export const apiMapsUrl = `./assets/maps/`;
export const jupyterNotebookUrl = 'https://amauryval.github.io/';
export const githubUrl = 'https://github.com/amauryval/';
export const navBarTitle = 'Amaury Valorge - Portfolio';
export const githubBugIssueUrl = 'https://github.com/amauryval/portfolio/issues/new?assignees=amauryval&labels=bug&template=bug_report.md&title=';
export const githubQuestionUrl = 'https://github.com/amauryval/portfolio/issues/new?assignees=amauryval&labels=question&template=question-.md&title=';
export const githubEnhancementUrl = 'https://github.com/amauryval/portfolio/issues/new?assignees=amauryval&labels=enhancement&template=feature_request.md&title=';

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

// font awesome unicode
export const trainIconUnicode = '\uf238';
export const ungroupIconUnicode = '\uf247';

export const svgActivitiesPointsLayerId = 'svgActivitiesLayer';
export const svgTripIdPrefix = 'svg_trip_';
export const legendActivities = 'legendActivity';
export const sliderBarId = 'slider-bar';


export const currentYear: number = new Date().getFullYear();
export const currentDate = now();

export const homePages: any = [
  {
    id: 'home',
    route: '/',
    title: 'Accueil',
    icon: homeIcon
  },
]

export const resumePages: any = [
  {
    id: 'resume',
    route: '/resume',
    title: 'Profil',
    icon: resumeIcon,
    sub_menus: [
      {
        id: "print",
        title: "Imprimer...",
        route: '../short_resume',
      },
      {
        id: "navigation",
        title: "Navigation",
        route: '/resume',
        fragment: "navigation"
      },
      {
        id: "jobs",
        title: "Expériences",
        route: '/resume',
        fragment: "jobs"
      },
      {
        id: "volunteers",
        title: "Bénévolat",
        route: '/resume',
        fragment: "volunteers"
      },
      {
        id: "personal_projects",
        title: "Projets personnels",
        route: '/resume',
        fragment: "personal_projects"
      },
      {
        id: "publications",
        title: "Publications",
        route: '/resume',
        fragment: "publications"
      },
    ]
  },
  {
    id: 'map',
    route: '/map',
    title: 'Carte',
    icon: mapIcon
  },
  {
    id: 'gallery',
    route: '/gallery',
    title: 'Galerie',
    icon: galleryIcon
  }
];

export const projectPages: any = [
  {
    id: 'blog',
    route: '/blog',
    title: 'Blog',
    icon: notesIcon
  },
  {
    id: 'github',
    url: githubUrl,
    title: 'Github',
    icon: githubIcon
  }
];


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
