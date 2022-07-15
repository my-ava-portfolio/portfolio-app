import {Polygon}  from 'ol/geom';
import { v4 as uuidv4 } from 'uuid';

import { Draw, Modify, Snap } from 'ol/interaction';
import VectorLayer from 'ol/layer/Vector';

import Map from 'ol/Map';
import VectorSource from 'ol/source/Vector';
import Feature from 'ol/Feature';
import LinearRing from 'ol/geom/LinearRing';


export class DrawInteraction {
  private map: Map;
  private draw!: Draw;
  private snap!: Snap;
  private modifier!: Modify;

  // var for polygon holes
  private holePolygonDrawingStatus = false;
  private polygonIntersected!: Feature | undefined;
  private coordsLength!: number;

  vectorLayer: VectorLayer<any>;
  sourceFeatures: VectorSource;
  allFeatures: any[] = [];

  constructor( map: Map, vectorLayer: VectorLayer<any>) {
    this.map = map;
    this.vectorLayer = vectorLayer;
    this.sourceFeatures = vectorLayer.getSource();

    this.modifier = new Modify({source: this.sourceFeatures});

    this.snap = new Snap({source: this.sourceFeatures});
  }

  enabledDrawing(geomType: 'Point' | 'LineString' | 'Polygon'): void {
    this.disableDrawing();

    this.draw = new Draw({
      type: geomType,
      stopClick: true,
      source: this.vectorLayer.getSource(),
    });

    this.map.addInteraction(this.draw);
    this.map.addInteraction(this.modifier);
    this.map.addInteraction(this.snap);

    this.draw.on('drawstart', this.onDrawStart.bind(this));
    this.draw.on('drawend', this.onDrawEnd.bind(this));

    this.draw.on('drawabort', () => {
      console.log('draw aborted');
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

    // to build hole on polygon
    if (e.feature.getGeometry()?.getType() === "Polygon") {
      this.vectorLayer.getSource().forEachFeatureIntersectingExtent(e.feature.getGeometry().getExtent(), (feature: Feature | undefined) => {
        this.polygonIntersected = feature;
      });

      if (this.polygonIntersected !== undefined) {
        this.holePolygonDrawingStatus = true;
        const polygonIntersectedGeom: any = this.polygonIntersected.getGeometry()
        this.coordsLength = polygonIntersectedGeom.getCoordinates().length;
        e.feature.getGeometry().on('change', this.onGeomChange.bind(this));
      }
    }
  }

  onDrawEnd(e: any): void {

    if (this.holePolygonDrawingStatus) {
      setTimeout(() => {
        this.sourceFeatures.removeFeature(e.feature);
      }, 5);

      if (this.polygonIntersected !== undefined) {
        this.polygonIntersected.setProperties({
          'updated_at': new Date().toISOString()
        })
      }
      this.polygonIntersected = undefined;
      this.holePolygonDrawingStatus = false
    }

    if (!this.holePolygonDrawingStatus) {
      const featureCount = this.sourceFeatures.getFeatures().length
      const uuid = uuidv4()
      e.feature.setId(uuid)
      e.feature.setProperties({
        'name': 'feature_' + featureCount,
        'geom_type': e.feature.getGeometry()?.getType(),
        'created_at': new Date().toISOString(),
        'updated_at': new Date().toISOString()
      })
    }


  }

  onGeomChange(e: any): void {
    //Get hole coordinates for polygon
    let linearRing = new LinearRing(e.target.getCoordinates()[0]);

    if (this.polygonIntersected !== undefined) {
      const polygonIntersectedGeom: any = this.polygonIntersected.getGeometry()
      let coordinates = polygonIntersectedGeom.getCoordinates();
      let geom = new Polygon(coordinates.slice(0, this.coordsLength));

      //Add hole coordinates to polygon and reset the polygon geometry
      geom.appendLinearRing(linearRing);
      console.log(linearRing)
      this.polygonIntersected.setGeometry(geom);
    }
  }


  removeFeature(id: string): void {
    const featureFound = this.sourceFeatures.getFeatureById(id)
    if (featureFound !== null) {
      this.sourceFeatures.removeFeature(featureFound);
    }
  }

  returnFeatures(): any[] {
    let featuresFound: any[] = []
    this.sourceFeatures.getFeatures().forEach((feature: any) => {
      featuresFound.push(
        {
          id: feature.getId(),
          name: feature.get('name'),
          geom_type: feature.get('geom_type')
        }
      )
    })
    return featuresFound
  }


}
