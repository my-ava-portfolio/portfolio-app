import Feature from "ol/Feature";
import { Geometry } from "ol/geom";

export type toolsTypes = 'geoTools' | 'createTools' | 'pathTools'

export type pointType = 'Point'
export type lineStringType = 'LineString'
export type polygonType = 'Polygon'
export type geomLayerTypes = pointType | lineStringType | polygonType;
export type featuresLayerType = Partial<Record<geomLayerTypes, Feature<Geometry>[]>>


// classification

export type categoryClass = {
    class: string;
    color: string |null;
}

export const epsg4326 = 'EPSG:4326';
export const epsg3857 = 'EPSG:3857';
