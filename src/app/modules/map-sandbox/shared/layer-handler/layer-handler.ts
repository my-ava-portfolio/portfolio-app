import Map from 'ol/Map';
import GeoJSON from 'ol/format/GeoJSON';

import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { v4 as uuidv4 } from 'uuid';
import { Feature } from "ol";
import { featuresLayerType, geomLayerTypes, lineStringType, pointType, polygonType } from '../data-types';
import { getRandomDefaultColor, defaultStrokeColor, defaultStrokeWidth, hexColorReg } from "../style-helper";
import { click, altKeyOnly } from 'ol/events/condition';
import { LineString, Polygon, LinearRing, Geometry } from 'ol/geom';
import { Draw, Snap, Translate, Modify, Select } from 'ol/interaction';
import WKT from 'ol/format/WKT';
import { Fill, Stroke, Style } from 'ol/style';
import CircleStyle from 'ol/style/Circle';
import { StyleLike } from 'ol/style/Style';



export class baseLayer{  
  private _vectorLayer!: VectorLayer<any>;
  private _sourceFeatures!: VectorSource;

  // common style
  private _fillColor: string = getRandomDefaultColor();
  private _strokeColor: string = defaultStrokeColor;
  private _strokeWidth: string = "" + defaultStrokeWidth;
  
  private _locked: boolean = false;
  private _featuresToggled: boolean = false;
  private _featuresCounter: number = 0

  constructor(
    layerName: string,
    geomType: geomLayerTypes,
    zIndexValue: number,
    groupId: string | null = null
  ) { 
    this._initLayer(layerName, geomType, zIndexValue);
  }
  
    get layer(): VectorLayer<any> {
        return this._vectorLayer
    }

    get layerName(): string {
        return this._getLayerAttributes('name')
    }
    set layerName(name: string) {
        this.layer.set('name', name)
    }

    get geomType(): geomLayerTypes {
        return this._getLayerAttributes('geom_type');
    }

    get sourceFeatures(): VectorSource {
        return this._sourceFeatures
    }

    get zIndex(): number {
        return this.layer.getZIndex()
    }
    set zIndex(value: number) {
        this.layer.setZIndex(value)
    }

    get uuid(): string {
        return this._getLayerAttributes('uuid');
    }

    set visible(enabled: boolean) {
        this.layer.setVisible(enabled)
      }
    
    get visible(): boolean {
          return this.layer.getVisible()
      }
    
    set featuresToggled(enabled: boolean) {
      this._featuresToggled = enabled
    }
    
    get featuresToggled(): boolean {
        return this._featuresToggled
    }
  
    set locked(enabled: boolean) {
        this._locked = enabled
      }
    
    get locked(): boolean {
          return this._locked
    }

    set opacity(event: any) {
        this.layer.setOpacity(event.target.valueAsNumber)
    }
  
    get opacity(): number {
        return this.layer.getOpacity()
    }

    public get fillColor(): string {
        // main style
        return this._fillColor;
    }

    public set fillColor(color: string) {
        if (hexColorReg.test(color)) {
        this.features.forEach((feature: Feature) => {
            feature.set("fill_color", color, false)
        })
        this._fillColor = color
        };
    }

    public get strokeColor(): string {
        // main style
        return this._strokeColor;
    }

    public set strokeColor(color: string) {
        if (hexColorReg.test(color)) {
        this.features.forEach((feature: Feature) => {
            feature.set("stroke_color", color, false)
        })
        this._strokeColor = color
        };
    }

    public get strokeWidth(): string {
        // main style
        return this._strokeWidth;
    }

    public set strokeWidth(width: string) {
        this._strokeWidth = width
        this.features.forEach((feature: Feature) => {
        feature.set("stroke_width", parseFloat(width), false)
        })
    }

    private _initLayer(layerName: string, geomType: geomLayerTypes, zIndexValue: number): void {
        this._sourceFeatures = new VectorSource();
    
        this._vectorLayer = new VectorLayer({
          source: this._sourceFeatures,
          style: (feature: any, _: any): any => {
            return refreshFeatureStyle(feature)
          }
        });

        this.layerName = layerName
        this.layer.set('uuid', uuidv4())
        this.layer.set('geom_type', geomType)
        this.zIndex = zIndexValue;
    }

    private _getLayerAttributes(attribute: string): any {
        return this.layer.get(attribute)
    }

    get features(): Feature[] {
        return  this._sourceFeatures.getFeatures().sort((feat1: Feature, feat2: Feature) => {
            return feat1.get('no') - feat2.get('no');
        });
    }

    featureById(featureId: string) : Feature[] {
        const featureFound = this.sourceFeatures.getFeatureById(featureId)
        if (featureFound !== null) {
            return [featureFound]
        }
        return []
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

    addProperties(feature: Feature): any {
        // TODO synchronize properties after the call of this func
        ++this._featuresCounter;
        const uuid = uuidv4()
        feature.setId(uuid)
    
        let name!: string;
        if (feature.get("name") !== undefined) {
          name = feature.get("name") + " copy"
        } else {
          name = 'feature ' + this._featuresCounter
        }
        // TOOD add the layerName ? 
        feature.setProperties({
          'id': feature.getId(),
          // 'layer_id': this.uuid,
          'no': this._featuresCounter,
          'name': name,
          'geom_type': feature.getGeometry()?.getType(),
          "status": "added",
          'created_at': new Date().toISOString(),
          'updated_at': new Date().toISOString(),
          'fill_color': this.fillColor,
          'stroke_width': this.strokeWidth,
          'stroke_color':  this.strokeColor
        }, true)
        return feature
    }

    private _updateMetadataFeature(feature: Feature): void {
        feature.setProperties({
          'updated_at': new Date().toISOString(),
          "status": "modified",
        }, true)
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
}


// export class PointsLayer extends baseLayer {
//     constructor(
//         layerName: string,
//         zIndexValue: number,
//      ) {
//         super(layerName, "Point" as pointType, zIndexValue)
//   }
  
//   setAttributes(): void {
//   }
// }

// export class LineStringsLayer extends baseLayer{

//     constructor(
//         layerName: string,
//         zIndexValue: number,
//     ) {
//         super(layerName, "LineString" as lineStringType, zIndexValue)
//   }
  
//   setAttributes(): void {
//     const currentEpsg = this.layer.getSource().getProjection().getCode()
//     this.features.forEach((feature: Feature) => {
//       let geom = feature.getGeometry() as LineString

//       if (currentEpsg === 'EPSG:4326' && geom !== undefined) {
//         geom = geom.transform(currentEpsg, 'EPSG:3857') as LineString
//         feature.set('lenght', geom.getLength())
//       }
//     })
//   }
// }


// export class PolygonsLayer extends baseLayer{
 
//     constructor(
//         layerName: string,
//         zIndexValue: number,
//     ) {
//         super(layerName, "Polygon" as polygonType, zIndexValue)
//   }
//   setAttributes(): void {
//   }
// }


export class layerHandler {
    private _headerHidden = ['geometry', 'id', 'no', 'geom_type', 'created_at',
      'updated_at', 'fill_color', 'stroke_width', 'stroke_color']
    container!: baseLayer;

    private _map: Map
    // var for polygon holes
    private holePolygonDrawingStatus = false;  // TODO add GUI option to play with it
    private polygonIntersected!: Feature | undefined;
    private coordsLength!: number;
    private previousPolygonGeometry!: any;
    private _propertyStyled!: string | null;
  
    private _draw!: Draw;
    private _snap!: Snap;
    private _translate!: Translate;
    private _modifier!: Modify;
    select!: Select;
    
    _zoomPadding = [100, 100, 100, 200];  // TODO set as a global var (use by layer-manager)
    _maxZoom = 14;


    constructor(
        map: Map,
        container: baseLayer
    ) {
        this.container = container
        this._map = map

        this._initSelect();
        this._initTranslate();
        this._initSnap();
        this._initModifier();
        this._map.addLayer(this.container.layer);
    }

  set propertyStyledByCategory(propertyName: string | null) {
    if (propertyName !== null) {
      let uniqueValues: any[] = []
      this.container.features.forEach((feature: Feature) => {
        const value = feature.get(propertyName)
        if (!uniqueValues.includes(value)) {
          uniqueValues.push(value)
        }
      })
    
      uniqueValues.forEach((value: any) => {
        const randomColor = getRandomDefaultColor();
        this.container.features.forEach((feature: Feature) => {
          if (value === feature.get(propertyName)) {
            feature.set('fill_color', randomColor)
          }
        })
      })
    }
    this._propertyStyled = propertyName
  }

  get propertyStyledByCategory(): string | null {
    return this._propertyStyled
  }

  removeLayer(): void {
      this._map.removeLayer(this.container.layer)
  }      

  enableTranslating(): void {
    this._map.addInteraction(this._translate)
  }

  disableTranslating(): void {
    this._map.removeInteraction(this._translate)
  }

  enableSelecting(): void {
    this._map.addInteraction(this.select)
  }

  disableSelecting(): void {
    this._map.removeInteraction(this.select)
  }

  enableSnapping(): void {
    // used during the drawing, editing
    this._map.addInteraction(this._snap);
  }

  disableSnapping(): void {
    this._map.removeInteraction(this._snap);
  }

  private _initSelect(): void {
    this.select = new Select({
      condition: click,
      multi: false,
      layers: [this.container.layer],
    })
  }
    
  private _initSnap(): void {
    this._snap = new Snap({
      source: this.container.layer.getSource()
    });
  }
  
  private _initTranslate(): void {
    this._translate = new Translate({
      features: this.select.getFeatures(),
    });
  }
    
  private _initModifier(): void {
    this._modifier = new Modify({
        features: this.select.getFeatures(),
        deleteCondition: altKeyOnly,
        snapToPointer: true
      }
    );

    this._modifier.on('modifyend', (e: any) => {

        // to remove hole on polygon (select the polygon, press ctr + start to edti a vertice + release)
        if (e.mapBrowserEvent.originalEvent.ctrlKey) {
        this._removeHoles(e)
        }

        // to update value definitively (especially during hole drawing)
        if (e.features.getArray().length > 0) {
        e.features.getArray().forEach((element: Feature) => {
            this._updateMetadataFeature(element)
        });
        }
    })
  }

  private _removeHoles(event: any): void {

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

  enableEditing(): void {
    this.disableEditing()
    this._map.addInteraction(this._modifier);  
  }
  
  disableEditing(): void {
    this._map.removeInteraction(this._modifier);
  }
  
  cleanEvents(): void {
      this.disableDrawing();
      this.disableEditing();
      // this.disableSelecting();
  }
    
  enableDrawing(holeStatus = false): void {
    this.holePolygonDrawingStatus = holeStatus;
  
    this._draw = new Draw({
      type: this.container.geomType,
      stopClick: true,
      source: this.container.sourceFeatures,
      condition: (e: any) => e.originalEvent.buttons === 1,  // draw only with left click
    });
  
    this._map.addInteraction(this._draw);
    if (!holeStatus) {
      // select is disabled when drawing a new feature
      // this.disableSelecting()
    }

    this._draw.on('drawstart', this._onDrawStart.bind(this));
    this._draw.on('drawend', this._onDrawEnd.bind(this));
    this._draw.on('drawabort', this._onDrawAborting.bind(this));
  }
    
  disableDrawing(): void {
    this._map.removeInteraction(this._draw);
    // this.enableSelecting()
  }

  // att
  private _updateMetadataFeature(feature: Feature): void {
      feature.setProperties({
        'updated_at': new Date().toISOString(),
        "status": "modified",
      }, true)
  }
    
  private _onDrawStart(e: any): void {

    //to build hole on polygon
    if (this.holePolygonDrawingStatus) {
      if (e.feature.getGeometry()?.getType() === "Polygon") {

        let featureFound: Feature | undefined = this.checkIfCoordIntersectLayer(e.feature)
        this.polygonIntersected = featureFound
        if (this.polygonIntersected === undefined) {
            e.target.abortDrawing();
            this._onDrawAborting(e)
            alert('An hole is possible only on a polygon!')
            return;
        }

        if (this.polygonIntersected !== undefined) {
            this.previousPolygonGeometry = this.polygonIntersected.getGeometry()
            const polygonIntersectedGeom: any = this.polygonIntersected.getGeometry()
            this.coordsLength = polygonIntersectedGeom.getCoordinates().length;
            e.feature.getGeometry().on('change', this._onGeomChangeBuildHole.bind(this));
        }
      }
    }
  }
    
  private _onDrawEnd(e: any): void {
    // let's go to finalize
    if (this.holePolygonDrawingStatus) {
      // disable hole editing
      setTimeout(() => {
        // we remove the polygon drawn, because it has been used to create the hole on _onGeomChangeBuildHole()
        this.container.sourceFeatures.removeFeature(e.feature);
      }, 5);

      if (this.polygonIntersected !== undefined) {
        e.feature.setGeometry(this.polygonIntersected.getGeometry())
        this.select.getFeatures().clear()
      }


      this.polygonIntersected = undefined;
      // TODO: QUESTION: no need to recreate the properties because the polygon already exists?
      return
    }

    this.container.addProperties(e.feature)
  }
    
  private _onDrawAborting(e: any): void {
      // to cancel a drawing hole (shift + left click OR shift + right click for hole )
      if (this.holePolygonDrawingStatus) {

      if (this.polygonIntersected !== undefined) {
        this.polygonIntersected.setGeometry(this.previousPolygonGeometry)
        this.polygonIntersected = undefined;
      }
    }
  }

  private checkIfCoordIntersectLayer(feature: any): Feature | undefined {
      let featureFound!: Feature | undefined;
      this.container.sourceFeatures.forEachFeatureIntersectingExtent(feature.getGeometry().getExtent(), (feature: Feature | undefined) => {
        featureFound = feature;
      });
  
      return featureFound
  }
    
  private _onGeomChangeBuildHole(e: any): void {
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
    
  // att
  zoomToLayer(): void {
    if (this.container.features.length > 0) {
      this._map.getView().fit(
          this.container.layer.getSource().getExtent(),
          { size: this._map.getSize(), padding: this._zoomPadding, maxZoom: 20 }
      );
    }
  }
    
  zoomToFeature(featureId: string): void {
    this.container.features.filter((feature: any) => {
      if (feature.getId() === featureId) {
        this._map.getView().fit(
          feature.getGeometry(),
          { size: this._map.getSize(), padding: this._zoomPadding, maxZoom: 20 })
      }
    })
  }
  
   
  getFeatureAttribute(featureId: string, attribute: string): void {
    // TODO not used
    const featureFound = this.container.featureById(featureId)
    if (featureFound.length === 1) {
      return featureFound[0].get(attribute)
    }
  }
  
  getAttributesHeader(): string[] {
    const headers = this.container.features[0].getKeys()
    const headersFound = headers.filter(
      (header: string) => !this._headerHidden.includes(header)
    ) 
    return headersFound
  }

  setAttribute(attributeName: string, value: any | null): void {
    const defaultEmptyValue = ''
    if (!this.getAttributesHeader().includes(attributeName)) {
      this.container.features.forEach((feature: Feature) => {
        if (value === null) {
          value = defaultEmptyValue
        }
        feature.set(attributeName, value, false)
      })
    }
  }

  removeAttribute(attributeName: string): void {
    if (this.getAttributesHeader().includes(attributeName)) {
      this.container.features.forEach((feature: Feature) => {
        feature.unset(attributeName, false)
      })
    }
  }
    
  exportBounds(): number[] {
    // TODO return the list for copy to clipboard
    return this.container.sourceFeatures.getExtent().join(',').split(',').map(Number) ;
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
      exportFormatContainer.writeFeatures(this.container.features)
    ), null, 2);
  }

  exportToWkt(): string {
    let wktFeatures: string[] = []
    this.container.features.forEach((feature: any) => {
      wktFeatures.push(getWkt(feature.getGeometry()))
    })
    return wktFeatures.join('\n')
  }
    
  exportToPytestFixture(): string {
    const fixtureHeader = "\n@pytest.fixture\ndef "
    let fixtureFeatures: string[] = []
      this.container.features.forEach((feature: any) => {
        fixtureFeatures.push(
          fixtureHeader + feature.get('name').replace(' ', '_') + '():\n\treturn \'' + getWkt(feature.getGeometry()) + '\''
        )
      })
    return 'import pytest\n' + fixtureFeatures.join('\n')
  }
}



export function layerHandlerPositionning(layersArray: layerHandler[], layerId: string, incrementValue: number): layerHandler[] {
    const layerIndexToGet = layersArray.findIndex((layerObj: layerHandler) => layerObj.container.uuid === layerId);
    const layerZIndex = layersArray[layerIndexToGet].container.zIndex;
    const toIndex = layerZIndex + incrementValue
    if (toIndex >= 0 && toIndex < layersArray.length) {
      layersArray[layerIndexToGet].container.zIndex = toIndex
      layersArray = layersArray.sort((a, b) => (a.container.zIndex < b.container.zIndex ? -1 : 1));
  
      // rebuild ZIndex
      layersArray.forEach((layer: layerHandler, idx: number) => {
        layer.container.zIndex = idx;
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
