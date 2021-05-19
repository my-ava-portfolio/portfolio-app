import { faExclamationCircle, faBug, faSpinner, faAngleRight, faProjectDiagram, faExpand, faTools, faMobileAlt, faTags, faCogs, faStepBackward, faStepForward, faPrint, faStar, faArrowAltCircleDown, faPhone, faFilter, faGlobeEurope, faQuestionCircle, faMapMarkerAlt, faArrowAltCircleUp, faGlobe, faFilePdf, faUserGraduate, faLanguage } from '@fortawesome/free-solid-svg-icons';
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
export const topicIcon = faGlobeEurope;
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
export const tagIcon = faTags;
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

// font awesome unicode
export const trainIconUnicode = '\uf238';
export const ungroupIconUnicode = '\uf247';

export const svgActivitiesPointsLayerId = 'svgActivitiesLayer';
export const svgTripIdPrefix = 'svg_trip_';
export const legendActivities = 'legendActivity';
export const sliderBarId = 'slider-bar';

export const homePage: any = {
  id: 'home',
  route: '/home',
  title: 'Accueil',
  status: false
};

export const currentYear: number = new Date().getFullYear();
export const currentDate = new Date();

export const pages: any = [
  {
    id: 'resume',
    route: '/resume',
    title: 'Profil',
    status: false,
    icon: resumeIcon
  },
  {
    id: 'map',
    route: '/map',
    title: 'Carte',
    status: false,
    icon: mapIcon
  },
  {
    id: 'gallery',
    route: '/gallery',
    title: 'Galerie',
    status: false,
    icon: galleryIcon
  },
  {
    id: 'notes',
    route: '/notes',
    title: 'Notes',
    status: false,
    icon: notesIcon
  },
  {
    id: 'github',
    route: githubUrl,
    title: 'Github',
    status: false,
    icon: githubIcon
  }
];

export const pagesObject: any = pages.reduce((a: any, x: any) => ({...a, [x.id]: x}), {});

export function checkIfScreenPortraitOrientation(): boolean {
  if (window.screen.orientation.angle === 90 && window.screen.width >= minWidthLandscape && window.screen.height >= minHeightLandscape) {
    return true;
  } else if (window.screen.orientation.angle === 0 ) {
    return true;
  } else {
    return false;
  }

}


