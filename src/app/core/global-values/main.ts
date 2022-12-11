import { activities } from "@core/data-types";
import { apiBaseUrl } from "@core/global-values/svr-url";

export const apiUrl = apiBaseUrl + 'api/v1/portfolio/';
export const assetsLogoPath = `./assets/logo/`;
export const assetsImagesPath = `./assets/images/`;

export const personalBlogUrl = 'https://blog.amaury-valorge.com';
export const githubUrl = 'https://github.com/amauryval/';
export const imageProfile = 'https://avatars.githubusercontent.com/u/36413727?v=4';


export const activitiesMapping = {
  "job": "Missions",
  "personal-project": "Projets personnels",
  "volunteer": "Bénévolat"
}

export const skillsMapping: any = {
  "themes": "Thématiques",
  "technics": "Techniques",
  "tools": "Outils"
}
