import { apiBaseUrl } from "@core/global-values/svr-url";

export const apiUrl = apiBaseUrl + 'api/v1/portfolio/';
export const assetsLogoPath = `./assets/logo/`;
export const assetsImagesPath = `./assets/images/`;

export const personalBlogUrl = 'https://blog.amaury-valorge.com';
export const githubPortfolioUrl = 'https://github.com/my-ava-portfolio/';
export const imageProfile = 'https://avatars.githubusercontent.com/u/36413727?v=4';


export const activitiesMapping = {
  "job": "Missions",
  "personal-project": "Projets personnels",
  "volunteer": "Bénévolat"
}

export const skillsMapping: any = {
  "themes": "Secteurs d'activité",
  "technics": "Techniques",
  "tools": "Outils"
}

export interface skillsMappingStatus {
  themes: boolean
  technics: boolean
  tools: boolean
}