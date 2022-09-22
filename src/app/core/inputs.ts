import { minWidthLandscape, minHeightLandscape } from './styles/screen';


export const currentYear: number = new Date().getFullYear();
export const currentDate = now();




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
