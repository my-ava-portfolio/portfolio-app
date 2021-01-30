export const apiBaseUrl = 'https://find-my-path.herokuapp.com';
// export const apiBaseUrl = 'http://192.168.1.16:5000';

export const navBarTitle = "Amaury Valorge - Portfolio"


export const homePage: any = {
  route: 'home',
  title: 'Accueil',
  status: false
}


export const pages: any = [
  {
    route: 'resume',
    title: 'Profil',
    status: false
  },
  {
    route: 'gallery',
    title: 'Galerie',
    status: false
  },
  {
    route: 'notes',
    title: 'Notes',
    status: false
  },
  {
    route: 'github',
    title: 'Github',
    status: false
  }
];

export const pagesObject: any = pages.reduce((a: any, x: any) => ({...a, [x.route]: x}), {})
