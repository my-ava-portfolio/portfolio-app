import GeoJSON from 'ol/format/GeoJSON';
import {LineString, Polygon}  from 'ol/geom';
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

const defaultStrokeWidth: number = 2;
const defaultStrokeColor: string = "black";
const defaultFillColor: string = '#ffcc33';


export class layerHandler {
  private map: Map;
  draw!: Draw;
  snap!: Snap;
  translate!: Translate;
  modifier!: Modify;
  select!: Select;

  private counter: number = 0

  // var for polygon holes
  private holePolygonDrawingStatus = false;  // TODO add GUI option to play with it
  private polygonIntersected!: Feature | undefined;
  private coordsLength!: number;
  private previousPolygonGeometry!: any;

  vectorLayer!: VectorLayer<any>;
  sourceFeatures!: VectorSource;
  allFeatures: any[] = [];

  groupId: string | null; // not used
  id: string;
  zIndexValue: number;
  layerName: string;
  geomType: 'Point' | 'LineString' | 'Polygon';
  fillColor = defaultFillColor;
  strokeColor = defaultStrokeColor;
  strokeWidth = defaultStrokeWidth;

  deleted = false;
  locked = false;
  
  featuresSelected: any[] = []
  featuresDeselected: any[] = []

  zoomPadding = [100, 100, 100, 100];  // TODO set as a global var (use by layer-manager)
  maxZoom = 14;

  constructor(
    map: Map,
    layerName: string,
    geomType: 'Point' | 'LineString' | 'Polygon',
    zIndexValue: number,
    groupId: string | null = null
  ) {
    this.map = map
    this.layerName = layerName
    this.geomType = geomType
    this.groupId = groupId

    this.id = uuidv4();
    this.zIndexValue = zIndexValue;

    this.setLayer();
    this.initSelect();
    this.initTranslate();
    this.initSnap();
    this.initModifier();

    this.map.addLayer(this.vectorLayer);

  }

  private setLayer(): void {
    this.sourceFeatures = new VectorSource();

    this.vectorLayer = new VectorLayer({
      source: this.sourceFeatures,
      style: (feature: any, _: any): any => {
        return refreshFeatureStyle(feature)
      }
    });

    this.vectorLayer.set('name', this.layerName, true)
    this.vectorLayer.set('geomType', this.geomType, true)
    this.vectorLayer.setZIndex(this.zIndexValue);

  }

  removeLayer(): void {
    this.map.removeLayer(this.vectorLayer)
    this.deleted = true;
  }

  private initSelect(): void {
    this.select = new Select({
      condition: click,
      multi: false,
      layers: [this.vectorLayer],
    })
  }

  private initSnap(): void {
    this.snap = new Snap({
      source: this.sourceFeatures
    });
  }

  private initTranslate(): void {
    this.translate = new Translate({
      features: this.select.getFeatures(),
    });
  }

  enableTranslating(): void {
    this.map.addInteraction(this.translate)
  }

  disableTranslating(): void {
    this.map.removeInteraction(this.translate)
  }

  enableSelecting(): void {
    this.map.addInteraction(this.select)
  }

  disableSelecting(): void {
    this.map.removeInteraction(this.select)
  }


  private initModifier(): void {
    this.modifier = new Modify({
      features: this.select.getFeatures(),
    });

    this.modifier.on('modifyend', (e: any) => {

      // to remove hole on polygon (select the polygon, press ctr + start to edti a vertice + release)
      if (e.mapBrowserEvent.originalEvent.ctrlKey) {
        this.removeHoles(e)
      }

      // to update value definitively (especially during hole drawing)
      if (e.features.getArray().length > 0) {
        e.features.getArray().forEach((element: Feature) => {
          this.updateFeature(element)
        });
      }
    })
  }

  enableDrawing(holeStatus = false): void {
    this.holePolygonDrawingStatus = holeStatus;

    this.draw = new Draw({
      type: this.geomType,
      stopClick: false,
      source: this.vectorLayer.getSource(),
    });

    this.map.addInteraction(this.draw);
    this.map.addInteraction(this.snap);

    this.draw.on('drawstart', this.onDrawStart.bind(this));
    this.draw.on('drawend', this.onDrawEnd.bind(this));

    this.draw.on('drawabort', this.onDrawAborting.bind(this));
  }

  disableDrawing(): void {
    this.map.removeInteraction(this.draw);
    this.map.removeInteraction(this.snap);
  }

  enableEditing(): void {
    this.disableEditing()
    this.map.addInteraction(this.modifier);
    this.map.addInteraction(this.snap);
  }

  disableEditing(): void {
    this.map.removeInteraction(this.modifier);
    this.map.removeInteraction(this.snap);
  }

  cleanEvents(): void {
    this.disableDrawing();
    this.disableEditing();
    this.disableSelecting();
  }

  private onDrawAborting(e: any): void {
      // to cancel a drawing hole (shift + left click OR shift + right click for hole )
    if (this.holePolygonDrawingStatus) {

      if (this.polygonIntersected !== undefined) {
        this.polygonIntersected.setGeometry(this.previousPolygonGeometry)
        this.polygonIntersected = undefined;
      }
    }
  }

  private onDrawStart(e: any): void {

    //to build hole on polygon
    if (this.holePolygonDrawingStatus) {
      if (e.feature.getGeometry()?.getType() === "Polygon") {

        let featureFound: Feature | undefined = this.checkIfCoordIntersectLayer(e.feature)
        this.polygonIntersected = featureFound
        if (this.polygonIntersected === undefined) {
          e.target.abortDrawing();
          this.onDrawAborting(e)
          alert('An hole is possible only on a polygon!')
          return;
        }

        if (this.polygonIntersected !== undefined) {
          this.previousPolygonGeometry = this.polygonIntersected.getGeometry()
          const polygonIntersectedGeom: any = this.polygonIntersected.getGeometry()
          this.coordsLength = polygonIntersectedGeom.getCoordinates().length;
          e.feature.getGeometry().on('change', this.onGeomChangeBuildHole.bind(this));
        }
      }
    }

  }

  private checkIfCoordIntersectLayer(feature: any): Feature | undefined {
    let featureFound!: Feature | undefined;
    this.vectorLayer.getSource().forEachFeatureIntersectingExtent(feature.getGeometry().getExtent(), (feature: Feature | undefined) => {
      featureFound = feature;
    });

    return featureFound
  }

  private onDrawEnd(e: any): void {

    // let's go to finalize
    if (this.holePolygonDrawingStatus) {
      // disable hole editing
      setTimeout(() => {
        // we remove the polygon drawn, because it has been used to create the hole on onGeomChangeBuildHole()
        this.sourceFeatures.removeFeature(e.feature);
      }, 5);

      if (this.polygonIntersected !== undefined) {
        e.feature.setGeometry(this.polygonIntersected.getGeometry())
        this.select.getFeatures().clear()
      }


      this.polygonIntersected = undefined;
      // TODO: QUESTION: no need to recreate the properties because the polygon already exists?
      return
    }

    this.addProperties(e.feature)
  }

  addProperties(feature: any): any {
    // TODO synchronize properties after the call of this func
    ++this.counter;
    const uuid = uuidv4()
    feature.setId(uuid)

    let name!: string;
    if (feature.get("name") !== undefined) {
      name = feature.get("name") + " copy"
    } else {
      name = 'feature ' + this.counter
    }
    feature.setProperties({
      'id': feature.getId(),
      'layer_id': this.id,
      'no': this.counter,
      'name': name,
      'geom_type': feature.getGeometry()?.getType(),
      "status": "added",
      'created_at': new Date().toISOString(),
      'updated_at': new Date().toISOString(),
      // 'fill_color': this.fillColor,
      // 'stroke_width': this.strokeWidth,
      // 'stroke_color':  this.strokeColor
    }, true)
    if (feature.get("fill_color") === undefined) {
      feature.set("fill_color",  this.fillColor, true)
    }
    if (feature.get("stroke_width") === undefined) {
      feature.set("stroke_width",  this.strokeWidth, true)
    }
    if (feature.get("stroke_color") === undefined) {
      feature.set("stroke_color",  this.strokeColor, true)
    }
    return feature
  }

  // addFeaturesFromGeomFeatureWithoutProperties(features: any[]): void {
  //   if (features.length > 0) {
  //     features.forEach((feature: any) => {
  //       let featureWithProperties = this.addProperties(feature)
  //       this.sourceFeatures.addFeature(featureWithProperties)
  //     })
  //   }
  // }
  addFeaturesAndUpdateIds(features: any[]): void {
    if (features.length > 0) {
      features.forEach((feature: any) => {
        let featureCloned = feature.clone() // important if it's some duplicated feature
        let featureWithProperties = this.addProperties(featureCloned)
        this.sourceFeatures.addFeature(featureWithProperties)
      })
    }
  }

  onGeomChangeBuildHole(e: any): void {
    //Get hole coordinates for polygon
    if (this.polygonIntersected !== undefined) {

      const polygonIntersectedGeom: any = this.polygonIntersected.getGeometry()
      let coordinates = polygonIntersectedGeom.getCoordinates();
      let geom = new Polygon(coordinates.slice(0, this.coordsLength));

      //Add hole coordinates to polygon and reset the polygon geometry
      let linearRing = new LinearRing(e.target.getCoordinates()[0]);
      geom.appendLinearRing(linearRing);
      this.polygonIntersected.setGeometry(geom);

    }
  }

  removeFeature(featureId: string): void {
    const featureFound = this.sourceFeatures.getFeatureById(featureId)
    if (featureFound !== null) {
      this.sourceFeatures.removeFeature(featureFound);
    }
  }
  duplicateFeature(featureId: string): void {
    const featureFound = this.sourceFeatures.getFeatureById(featureId)
    if (featureFound !== null) {
      const newFeature = this.addProperties(featureFound.clone())
      this.sourceFeatures.addFeature(newFeature)
      console.log(newFeature)
    }
  }

  getFeatureAttribute(featureId: string, attribute: string): void {
    // TODO issue stay selected
    const featureFound = this.sourceFeatures.getFeatureById(featureId)
    if (featureFound !== null) {
      return featureFound.get(attribute)
    }
  }


  features(): any[] {
    if (!this.deleted) {
      // sort feature by no
      let features = this.sourceFeatures.getFeatures().sort((a, b) => {
        return a.get('no') - b.get('no');
      });

      return features
    } else {
      return []
    }
  }

  private removeHoles(event: any): void {

    // we suppose that we have only one feature!
    const featureFound: any = event.features.getArray()[0];
    const mouseCoordinate: number[] = event.mapBrowserEvent.coordinate;

    if (featureFound.getGeometry().getType() == "Polygon") {

      // get the linearing composing the polygon & convert them into LineString to compare them
      const linearRingsFound = featureFound.getGeometry().getLinearRings()

      if (linearRingsFound.length > 1) {
        let linearRingVectorSource = new VectorSource();
        linearRingsFound.forEach((geom: any, index: number) => {
          const line: LineString = new LineString(geom.getCoordinates())
          let featureLine: Feature = new Feature({
            geometry: line
          });
          featureLine.setId(index)
          linearRingVectorSource.addFeature(featureLine);
        })
        // get the closest LineString from the mouse coords
        const closestFeature = linearRingVectorSource.getClosestFeatureToCoordinate(mouseCoordinate);
        let coordsCleaned: number[] = []
        linearRingsFound.forEach((ring: any, index: number) => {
          if (index !== closestFeature.getId()) {
            coordsCleaned.push(ring.getCoordinates());
          }
        })
        // let go to remove the linearing found
        featureFound.getGeometry().setCoordinates(coordsCleaned)
      }

    };

  }

  updateFeature(feature: Feature): void {
    feature.setProperties({
      'updated_at': new Date().toISOString(),
      "status": "modified",
    }, true)
  }

  // update functions
  getOpacity(): number {
    return this.vectorLayer.getOpacity()
  }
  setOpacity(event: any): void {
    this.vectorLayer.setOpacity(event.target.valueAsNumber)
  }

  setName(event: any): void {
    this.layerName = event.target.value
    this.vectorLayer.set('name', this.layerName, true)
  }

  setStyleForAllFeatures(eventValue: any, styleProperties: 'fill_color' | 'stroke_color' | 'stroke_width'): void {
    let value!: string;
    // TODO avoid this condition regarding input output type?
    if (styleProperties === 'stroke_width') {
      value = eventValue.target.value
    } else {
      value = eventValue

      if (styleProperties === 'fill_color') {
        this.fillColor = eventValue;
      } else if (styleProperties === 'stroke_color') {
        this.strokeColor = eventValue;
      }

    }
    this.features().forEach((feature: Feature) => {
      feature.set(styleProperties, value, false)
      // refreshFeatureStyle(feature) // not need ? supported by changefeature event....
    })
  }

  exportToGeoJSON(): string {
    let exportFormatContainer = new GeoJSON();
    return JSON.stringify(JSON.parse(
      exportFormatContainer.writeFeatures(this.features())
    ), null, 2);
  }

  exportToWkt(): string {
    let wktFeatures: string[] = []
    this.features().forEach((feature: any) => {
      wktFeatures.push(getWkt(feature.getGeometry()))
    })
    return wktFeatures.join('\n')
  }

  exportToPytestFixture(): string {
    const fixtureHeader = "\n@pytest.fixture\ndef "
    let fixtureFeatures: string[] = []
    if (this.features() !== undefined) {
      this.features().forEach((feature: any) => {
        fixtureFeatures.push(
          fixtureHeader + feature.get('name').replace(' ', '_') + '():\n\treturn \'' + getWkt(feature.getGeometry()) + '\''
        )
      })
    }
    return 'import pytest\n' + fixtureFeatures.join('\n')

  }

  zoomToLayer(): void {
    if (this.sourceFeatures.getFeatures().length > 0) {
      this.map.getView().fit(this.sourceFeatures.getExtent(), { size: this.map.getSize(), maxZoom: this.maxZoom, padding: this.zoomPadding});
    }
  }

  zoomToFeature(featureId: string): void {

    this.features().filter((feature: any) => {
      if (feature.getId() === featureId) {
        this.map.getView().fit(feature.getGeometry(), {size:this.map.getSize(), maxZoom: this.maxZoom})
      }
    })
  }

}


export function layerHandlerPositionning(layersArray: layerHandler[], layerId: string, incrementValue: number): layerHandler[] {
  let outputArray: layerHandler[] = [];

  const layerIndexToGet = layersArray.findIndex((layer: layerHandler) => layer.id === layerId);
  const layerZIndex = layersArray[layerIndexToGet].zIndexValue;
  const toIndex = layerZIndex + incrementValue
  if (toIndex >= 0 && toIndex < layersArray.length) {
    layersArray.splice(
      toIndex, 0,
      layersArray.splice(layerZIndex, 1)[0]
    );
    // rebuild ZIndex
    layersArray.forEach((layer: layerHandler, idx: number) => {
      layer.zIndexValue = idx;
      layer.vectorLayer.setZIndex(idx);
      outputArray.push(layer)
    })
    return outputArray
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


