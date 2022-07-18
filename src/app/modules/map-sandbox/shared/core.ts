import { strokeWidth } from './../../map-gtfs-viewer/shared/core';
import {LineString, Polygon}  from 'ol/geom';
import { v4 as uuidv4 } from 'uuid';

import { Draw, Modify, Snap } from 'ol/interaction';
import VectorLayer from 'ol/layer/Vector';

import Map from 'ol/Map';
import VectorSource from 'ol/source/Vector';
import Feature from 'ol/Feature';
import LinearRing from 'ol/geom/LinearRing';
import WKT from 'ol/format/WKT';

import Select from 'ol/interaction/Select';
import { altKeyOnly, pointerMove } from 'ol/events/condition';
import { Fill, Style } from 'ol/style';
import CircleStyle from 'ol/style/Circle';
import { StyleLike } from 'ol/style/Style';
import Stroke from 'ol/style/Stroke';


const defaultStrokeWidth: number = 2;
const defaultFillColor: string = '#ffcc33';

export class DrawInteraction {
  private map: Map;
  private draw!: Draw;
  private snap!: Snap;
  private modifier!: Modify;
  private select!: Select;

  private counter: number = 0

  // var for polygon holes
  private holePolygonDrawingStatus = false;
  private polygonIntersected!: Feature | undefined;
  private coordsLength!: number;
  private previousPolygonGeometry!: any;

  lastCreatedFeature!: Feature;

  vectorLayer: VectorLayer<any>;
  sourceFeatures: VectorSource;
  allFeatures: any[] = [];

  constructor(
    map: Map,
    vectorLayer: VectorLayer<any>,
  ) {
    this.map = map;
    this.vectorLayer = vectorLayer;
    this.sourceFeatures = vectorLayer.getSource();

    this.select = new Select({
      condition: pointerMove,
      layers: [this.vectorLayer],
      style: (feature: any) => {
        const selectedStyle = highLigthStyle(feature)
        if (selectedStyle !== undefined) {
          return selectedStyle;
        }
        return defaultStyleDEPRECATED
      }
    });



    this.map.addInteraction(this.select);

    this.prepareModifier()

   this.snap = new Snap({source: this.sourceFeatures});
  }

  prepareModifier(): void {

    this.modifier = new Modify({
      condition: altKeyOnly,
      source: this.sourceFeatures
    });


    this.modifier.on('modifyend', (e: any) => {

      // to remove hole on polygon (select the polygon, press shift + start to edti a vertice + press ctrl)
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

    this.sourceFeatures.on('changefeature', (event: any) => {
      // to display the changed values
      if (event.feature !== undefined) {
        this.updateFeature(event.feature)
      }

    });

  }

  enabledDrawing(geomType: 'Point' | 'LineString' | 'Polygon', holeStatus: boolean): void {
    this.holePolygonDrawingStatus = holeStatus;
    this.disableDrawing();
    this.draw = new Draw({
      type: geomType,
      stopClick: false,
      source: this.vectorLayer.getSource(),
    });

    this.map.addInteraction(this.draw);
    this.map.addInteraction(this.modifier);
    this.map.addInteraction(this.snap);

    this.draw.on('drawstart', this.onDrawStart.bind(this));
    this.draw.on('drawend', this.onDrawEnd.bind(this));

    this.draw.on('drawabort', (e: any) => {

      // to cancel a drawing hole (shift + left click OR shift + right click for hole )
      if (this.holePolygonDrawingStatus && this.polygonIntersected !== undefined) {
        this.polygonIntersected.setGeometry(this.previousPolygonGeometry)
        this.polygonIntersected = undefined;
      }
    });

  }

  disableDrawing(): void {
    if (this.draw !== undefined) {
      this.map.removeInteraction(this.draw);
    }

    this.map.removeInteraction(this.snap);
    this.map.removeInteraction(this.modifier);

  }

  onDrawStart(e: any): void {

    //to build hole on polygon
    if (this.holePolygonDrawingStatus) {
      if (e.feature.getGeometry()?.getType() === "Polygon") {

        let featureFound: Feature | undefined = this.checkIfCoordIntersectLayer(e.feature)
        this.polygonIntersected = featureFound
        if (this.polygonIntersected === undefined) {
          e.target.abortDrawing();
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

  checkIfCoordIntersectLayer(feature: any): Feature | undefined {
    let featureFound!: Feature | undefined;
    this.vectorLayer.getSource().forEachFeatureIntersectingExtent(feature.getGeometry().getExtent(), (feature: Feature | undefined) => {
      featureFound = feature;
    });

    return featureFound
  }

  onDrawEnd(e: any): void {

    // let's go to finalize
    if (this.holePolygonDrawingStatus) {
      // disable hole editing
      setTimeout(() => {
        // we remove the polygon drawn, because it has been used to create the hole on onGeomChangeBuildHole()
        this.sourceFeatures.removeFeature(e.feature);
      }, 5);

      if (this.polygonIntersected !== undefined) {
        e.feature.setGeometry(this.polygonIntersected.getGeometry())

      }
      this.polygonIntersected = undefined;
      // TODO: QUESTION: no need to recreate the properties because the polygon already exists?
      // return
    }

    const geomType = e.feature.getGeometry()?.getType()
    if (geomType === "Point") {
      e.feature.setStyle(PointStyle(defaultFillColor, defaultStrokeWidth))
    } else if (geomType === "LineString") {
      e.feature.setStyle(LineStyle(defaultFillColor, defaultStrokeWidth))
    } else if (geomType === "Polygon") {
      e.feature.setStyle(PolygonStyle(defaultFillColor, defaultStrokeWidth))
    }
    ++this.counter;
    const uuid = uuidv4()
    e.feature.setId(uuid)
    e.feature.setProperties({
      'id': e.feature.getId(),
      'name': 'feature ' + this.counter,
      'geom_type': e.feature.getGeometry()?.getType(),
      'wkt': this.getWkt(e.feature),
      "status": "added",
      'created_at': new Date().toISOString(),
      'updated_at': new Date().toISOString(),
      '_defaultStyle': e.feature.getStyle()  // style saved to revert it later
    })

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


  removeFeature(id: string): void {
    const featureFound = this.sourceFeatures.getFeatureById(id)
    if (featureFound !== null) {
      this.sourceFeatures.removeFeature(featureFound);
    }
  }

  returnFeatures(mode: 'Feature' | 'Properties'): any[] {
    const allFeatures = this.sourceFeatures.getFeatures()
    if (mode === 'Feature') {
      return allFeatures

    } else if (mode === 'Properties') {
      let allFeaturesProperties: any[] = []
      allFeatures.forEach( (element: Feature) => {
        allFeaturesProperties.push(element.getProperties())
      });
      return allFeaturesProperties

    }

    return allFeatures;
  }

  returnCreatedFeatures(): Feature {
    const featuresCount = this.sourceFeatures.getFeatures().length
    const lastFeature: any = this.sourceFeatures.getFeatures()[featuresCount - 1]

    return lastFeature
  }


  removeHoles(event: any): void {

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

    }
  }

  updateFeature(feature: Feature): void {
    feature.setProperties({
      'updated_at': new Date().toISOString(),
      "status": "modified",
      'wkt': this.getWkt(feature),
    })
  }

  getWkt(feature: any): string {
    const wktFormat = new WKT()
    return wktFormat.writeGeometry(feature.getGeometry());
  }

}




export const defaultStyleDEPRECATED = new Style({
  fill: new Fill({
    color: '#ffcc33',
  }),
  stroke: new Stroke({
    color: 'black',
    width: 2,
  }),
  image: new CircleStyle({
    radius: 7,
    fill: new Fill({
      color: '#ffcc33',
    }),
    stroke: new Stroke({
      color: "black",
      width: 2,
    }),
  }),
})

export function PointStyle(color: string, strokeWidth: number): Style {
  return new Style({
    image: new CircleStyle({
      radius: 7,
      fill: new Fill({
        color: color,
      }),
      stroke: new Stroke({
        color: "black",
        width: strokeWidth,
      }),
    })
  })
}

export function LineStyle(color: string, strokeWidth: number): Style[] {
  return [
    new Style({
      fill: new Fill({
        color: color,
      }),
      stroke: new Stroke({
        color: 'black',
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


export function PolygonStyle(color: string, strokeWidth: number): Style {
  return new Style({
    fill: new Fill({
      color: color,
    }),
    stroke: new Stroke({
      color: 'black',
      width: strokeWidth,
    })
  })
}


export function highLigthStyle(feature: Feature): Style | Style[] | undefined {
  let style = feature.getStyle()

  const largerStroke = new Stroke({
    color: "black",
    width: 6,
  })


  if (style !== undefined) {

    if (feature.getGeometry()?.getType() === "Point") {
      // TODO get point fill color
      const newStyle = PointStyle('#ffcc33', 6);
      return newStyle

    }
    if (feature.getGeometry()?.getType() === "LineString") {
      // TODO get Linestring fill color
      const newStyle = LineStyle('#ffcc33', 4);
      return newStyle

    }
    if (feature.getGeometry()?.getType() === "Polygon") {
      // TODO get Linestring fill color
      const newStyle = PolygonStyle('#ffcc33', 4);
      return newStyle

    }
  }
  return


};
