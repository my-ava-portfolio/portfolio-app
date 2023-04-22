import GeoJSON from 'ol/format/GeoJSON';
import {LineString, Point, Polygon}  from 'ol/geom';
import { v4 as uuidv4 } from 'uuid';

import { Draw, Modify, Snap, Translate } from 'ol/interaction';
import VectorLayer from 'ol/layer/Vector';

import Map from 'ol/Map';
import VectorSource from 'ol/source/Vector';
import Feature from 'ol/Feature';
import LinearRing from 'ol/geom/LinearRing';
import WKT from 'ol/format/WKT';

import Select from 'ol/interaction/Select';
import { click } from 'ol/events/condition';
import { Fill, Style } from 'ol/style';
import CircleStyle from 'ol/style/Circle';
import { StyleLike } from 'ol/style/Style';
import Stroke from 'ol/style/Stroke';

import { featuresLayerType, geomLayerTypes, polygonType } from '@modules/map-sandbox/shared/data-types';
import { defaultStrokeColor, defaultStrokeWidth, getRandomDefaultColor, hexColorReg } from '../style-helper';
import { layerCore } from './layer-core';



export class layerHandler extends layerCore {
  private _locked: boolean = false;

  constructor(
    map: Map,
    layerName: string,
    geomType: geomLayerTypes,
    zIndexValue: number,
    groupId: string | null = null
  ) {
    super(map, layerName, geomType, zIndexValue, groupId)
  }

  set visible(enabled: boolean) {
    this.layer.setVisible(enabled)
  }

  get visible(): boolean {
      return this.layer.getVisible()
  }

  set locked(enabled: boolean) {
    this._locked = enabled
  }

  get locked(): boolean {
      return this._locked
  }

  duplicateFeature(featureId: string): void {
    const featureFound = this.featureById(featureId)
    if (featureFound.length === 1) {
      const newFeature = this.addProperties(featureFound[0].clone())
      this.sourceFeatures.addFeature(newFeature)
    }
  }

  removeFeature(featureId: string): void {
    const featureFound = this.featureById(featureId)
    if (featureFound.length === 1) {
      this.sourceFeatures.removeFeature(featureFound[0]);
    }
  }

  set opacity(event: any) {
      this.layer.setOpacity(event.target.valueAsNumber)
  }

  get opacity(): number {
      return this.layer.getOpacity()
  }

  addFeaturesAndUpdateIds(features: any[]): void {
    if (features.length > 0) {
      features.forEach((feature: any) => {
        let featureCloned = feature.clone() // important if it's some duplicated feature
        let featureWithProperties = this.addProperties(featureCloned)
        this.sourceFeatures.addFeature(featureWithProperties)
      })
    }
  }

  getFeatureAttribute(featureId: string, attribute: string): void {
    // TODO not used
    const featureFound = this.featureById(featureId)
    if (featureFound.length === 1) {
      return featureFound[0].get(attribute)
    }
  }

  exportBounds(): number[] {
    // TODO return the list for copy to clipboard
    return this.sourceFeatures.getExtent().join(',').split(',').map(Number) ;
  }

  exportBoundsPolygon(): featuresLayerType {
    const bounds = this.exportBounds()
    const coordinates = [
      [bounds[0], bounds[3]],
      [bounds[2], bounds[3]],
      [bounds[2], bounds[1]],
      [bounds[0], bounds[1]],
      [bounds[0], bounds[3]],
    ];
    const boundsPolygon: Polygon = new Polygon([coordinates])
    let feature: Feature = new Feature({
      geometry: boundsPolygon
    });
    let geomType: polygonType = 'Polygon'
    return {[geomType]: [feature]}
  }

  exportToGeoJSON(): string {
    let exportFormatContainer = new GeoJSON();
    return JSON.stringify(JSON.parse(
      exportFormatContainer.writeFeatures(this.features)
    ), null, 2);
  }

  exportToWkt(): string {
    let wktFeatures: string[] = []
    this.features.forEach((feature: any) => {
      wktFeatures.push(getWkt(feature.getGeometry()))
    })
    return wktFeatures.join('\n')
  }

  exportToPytestFixture(): string {
    const fixtureHeader = "\n@pytest.fixture\ndef "
    let fixtureFeatures: string[] = []
    if (this.features !== undefined) {
      this.features.forEach((feature: any) => {
        fixtureFeatures.push(
          fixtureHeader + feature.get('name').replace(' ', '_') + '():\n\treturn \'' + getWkt(feature.getGeometry()) + '\''
        )
      })
    }
    return 'import pytest\n' + fixtureFeatures.join('\n')

  }

}


export function layerHandlerPositionning(layersArray: layerHandler[], layerId: string, incrementValue: number): layerHandler[] {
  const layerIndexToGet = layersArray.findIndex((layer: layerHandler) => layer.uuid === layerId);
  const layerZIndex = layersArray[layerIndexToGet].zIndex;
  const toIndex = layerZIndex + incrementValue
  console.log(toIndex >= 0 && toIndex < layersArray.length)
  if (toIndex >= 0 && toIndex < layersArray.length) {
    layersArray[layerIndexToGet].zIndex = toIndex
    layersArray = layersArray.sort((a, b) => (a.zIndex < b.zIndex ? -1 : 1));

    // rebuild ZIndex
    layersArray.forEach((layer: layerHandler, idx: number) => {
      layer.zIndex = idx;
    })
    return layersArray
  }

  return layersArray
}


export function getWkt(geometry: any): string {
  const wktFormat = new WKT()
  return wktFormat.writeGeometry(geometry);
}



export function PointStyle(color: string, strokeWidth: number, strokeColor: string): Style {
  return new Style({
    image: new CircleStyle({
      radius: 7,
      fill: new Fill({
        color: color,
      }),
      stroke: new Stroke({
        color: strokeColor,
        width: strokeWidth,
      }),
    })
  })
}


export function LineStringStyle(color: string, strokeWidth: number, strokeColor: string): Style[] {
  return [
    new Style({
      fill: new Fill({
        color: color,
      }),
      stroke: new Stroke({
        color: strokeColor,
        width: strokeWidth * 2,
      })
    }),
    new Style({
      fill: new Fill({
        color: color,
      }),
      stroke: new Stroke({
        color: color,
        width: strokeWidth,
      })
    })
  ]
}


export function PolygonStyle(color: string, strokeWidth: number, strokeColor: string): Style {
  return new Style({
    fill: new Fill({
      color: color,
    }),
    stroke: new Stroke({
      color: strokeColor,
      width: strokeWidth,
    })
  })
}

export function refreshFeatureStyle(feature: Feature): StyleLike {
  // style feature is based on feature properties !
  let defaultStyle!:StyleLike
  let geom = feature.getGeometry()
  if (geom !== undefined) {
    const fillColor = feature.get('fill_color')
    const strokeWidth = feature.get('stroke_width')
    const strokeColor = feature.get('stroke_color')

    if (geom.getType() === "Point") {
      defaultStyle = PointStyle(fillColor, strokeWidth, strokeColor)

    } else if (geom.getType() === "LineString") {
      defaultStyle = LineStringStyle(fillColor, strokeWidth, strokeColor)

    } else if (geom.getType() === "Polygon") {
      defaultStyle = PolygonStyle(fillColor, strokeWidth, strokeColor)
    }
    return defaultStyle

  }
  return new Style()


}



export function findBy(layer: any, property: string, value: string | number | null): any {

  if (layer.get(property) === value) {
    return layer;
  }

  // Find recursively if it is a group
  if (layer.getLayers) {
    var layers = layer.getLayers().getArray()
    var len = layers.length
    var result!: any;
    for (var i = 0; i < len; i++) {
      result = findBy(layers[i], property, value);
      if (result) {
        return result;
      }
    }
  }

  return null;
}

export function findElementBy(layer: any, attribute: string, value: string | number | null): any {
  if (attribute in layer) {
    if (layer[attribute as keyof typeof layer] === value)
    return layer;
  }

  if (layer) {
    var layers = layer
    var len = layers.length
    var result!: any;
    for (var i = 0; i < len; i++) {
      result = findElementBy(layers[i], attribute, value);
      if (result) {
        return result;
      }
    }
  }

  return null;
}

