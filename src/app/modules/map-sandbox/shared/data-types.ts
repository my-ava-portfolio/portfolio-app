import Feature from "ol/Feature";

export type toolsTypes = 'geoTools' | 'createTools' | 'pathTools' 

export type pointType = 'Point'
export type lineStringType = 'LineString'
export type polygonType = 'Polygon'
export type geomLayerTypes = pointType | lineStringType | polygonType;

export type featuresLayerType = Partial<Record<geomLayerTypes, Feature[]>>
