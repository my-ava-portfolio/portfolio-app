import { faInfoCircle, faStepBackward, faStepForward, faMapMarkedAlt, faPrint, faStar, faArrowAltCircleDown, faPhone, faEnvelopeOpen, faAddressCard, faImages, faBookOpen, faGlobeEurope, faQuestionCircle, faMapMarkerAlt, faArrowAltCircleUp, faGlobe, faFilePdf, faUserGraduate, faLanguage } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';


export const apiBaseUrl = 'http://127.0.0.1:5000/';
export const apiImgUrl = `${apiBaseUrl}images/logo/`;
export const jupyterNotebookUrl = 'https://amauryval.github.io/my-notes/';

export const navBarTitle = 'Amaury Valorge - Portfolio';


export const resumeIcon = faAddressCard;
export const galleryIcon = faImages;
export const notesIcon = faBookOpen;
export const githubIcon = faGithub;
export const topicIcon = faGlobeEurope;
export const helpIcon = faQuestionCircle;
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
export const emailIcon = faEnvelopeOpen;
export const phoneIcon = faPhone;
export const MapIcon = faMapMarkedAlt;
export const backwardIcon = faStepBackward;
export const forwardIcon = faStepForward;
export const infoIcon = faInfoCircle;

export const homePage: any = {
  id: 'home',
  route: '/home',
  title: 'Accueil',
  status: false
};

export const currentYear: number = new Date().getFullYear();
export const currentDate = new Date()

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
    icon: MapIcon
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
    route: '/github',
    title: 'Github',
    status: false,
    icon: githubIcon
  }
];

export const pagesObject: any = pages.reduce((a: any, x: any) => ({...a, [x.id]: x}), {});


