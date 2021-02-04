import { faPrint, faStar, faArrowAltCircleDown, faAddressCard, faImages, faBookOpen, faGlobeEurope, faQuestionCircle, faMapMarkerAlt, faArrowAltCircleUp, faGlobe, faFilePdf, faUserGraduate, faLanguage } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';


export const apiBaseUrl = 'http://127.0.0.1:5000/';
export const apiImgUrl = `${apiBaseUrl}/images/logo/`;

export const navBarTitle = "Amaury Valorge - Portfolio"


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

export const homePage: any = {
  route: 'home',
  title: 'Accueil',
  status: false
}


export const pages: any = [
  {
    route: 'resume',
    title: 'Profil',
    status: false,
    icon: resumeIcon
  },
  {
    route: 'gallery',
    title: 'Galerie',
    status: false,
    icon: galleryIcon
  },
  {
    route: 'notes',
    title: 'Notes',
    status: false,
    icon: notesIcon
  },
  {
    route: 'github',
    title: 'Github',
    status: false,
    icon: githubIcon
  }
];

export const pagesObject: any = pages.reduce((a: any, x: any) => ({...a, [x.route]: x}), {})


