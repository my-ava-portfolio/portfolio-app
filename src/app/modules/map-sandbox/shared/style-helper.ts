import { faCircle, faWaveSquare, faDrawPolygon } from "@fortawesome/free-solid-svg-icons";

export const defaultStrokeWidth: number = 2;
export const defaultStrokeColor: string = "black";
export const hexColorReg = /^#([0-9a-f]{3}){1,2}$/i;


const paletteColors = [
    '#a6cee3', '#1f78b4', '#b2df8a', '#33a02c', '#fb9a99', '#e31a1c', '#fdbf6f', '#ff7f00', '#cab2d6', '#6a3d9a', '#ffff99', '#b15928',
    '#e41a1c', '#377eb8', '#4daf4a', '#984ea3', '#ff7f00', '#ffff33', '#a65628', '#f781bf', '#999999',
    '#8dd3c7', '#ffffb3', '#bebada', '#fb8072', '#80b1d3', '#fdb462', '#b3de69', '#fccde5', '#d9d9d9',
    '#1b9e77','#d95f02','#7570b3','#e7298a','#66a61e','#e6ab02'
]





export function getRandomDefaultColor(): string {
    const palette = paletteColors;
    const randomNumber = Math.floor(Math.random()* palette.length);
    return palette[randomNumber];
  
}
  
export const pointIcon = faCircle;
export const lineStringIcon = faWaveSquare;
export const polygonIcon = faDrawPolygon;