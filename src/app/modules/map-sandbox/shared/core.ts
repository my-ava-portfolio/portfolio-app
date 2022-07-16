import {LineString, Polygon}  from 'ol/geom';
import { v4 as uuidv4 } from 'uuid';

import { Draw, Modify, Snap } from 'ol/interaction';
import VectorLayer from 'ol/layer/Vector';

import Map from 'ol/Map';
import VectorSource from 'ol/source/Vector';
import Feature from 'ol/Feature';
import LinearRing from 'ol/geom/LinearRing';
import Select from 'ol/interaction/Select';
import { pointerMove, shiftKeyOnly } from 'ol/events/condition';



export class DrawInteraction {
  private map: Map;
  private draw!: Draw;
  private snap!: Snap;
  private modifier!: Modify;
  private select!: Select;

  // var for polygon holes
  private holePolygonDrawingStatus = false;
  private polygonIntersected!: Feature | undefined;
  private coordsLength!: number;
  private previousPolygonGeometry!: any;

  vectorLayer: VectorLayer<any>;
  sourceFeatures: VectorSource;
  allFeatures: any[] = [];

  constructor( map: Map, vectorLayer: VectorLayer<any>) {
    this.map = map;
    this.vectorLayer = vectorLayer;
    this.sourceFeatures = vectorLayer.getSource();

    this.select = new Select({
      layers: [this.vectorLayer],
    });
    this.map.addInteraction(this.select);

    this.modifier = new Modify({
      condition: shiftKeyOnly,
      source: this.sourceFeatures
    });
    this.modifier.on('modifyend', (e: any) => {

      // to remove hole on polygon (select the polygon, press shift + start to edti a vertice + press ctrl)
      console.log(e.mapBrowserEvent.originalEvent.ctrlKey)
      if (e.mapBrowserEvent.originalEvent.ctrlKey) {
        this.removeHoles(e)
      }
    })

   this.snap = new Snap({source: this.sourceFeatures});
  }

  enabledDrawing(geomType: 'Point' | 'LineString' | 'Polygon', holeStatus: boolean): void {
    this.holePolygonDrawingStatus = holeStatus;
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

    this.draw.on('drawabort', (e: any) => {

      // to cancel a drawing hole (shift + left click OR shift + right click for hole )
      if (this.holePolygonDrawingStatus && this.polygonIntersected !== undefined) {
        this.polygonIntersected.setGeometry(this.previousPolygonGeometry)
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
        this.vectorLayer.getSource().forEachFeatureIntersectingExtent(e.feature.getGeometry().getExtent(), (feature: Feature | undefined) => {
          this.polygonIntersected = feature;
        });

        if (this.polygonIntersected !== undefined) {
          this.previousPolygonGeometry = this.polygonIntersected.getGeometry()
          const polygonIntersectedGeom: any = this.polygonIntersected.getGeometry()
          this.coordsLength = polygonIntersectedGeom.getCoordinates().length;
          e.feature.getGeometry().on('change', this.onGeomChangeBuildHole.bind(this));
        }
      }
    }

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
        this.polygonIntersected.setProperties({
          'updated_at': new Date().toISOString()
        })
      }
      this.polygonIntersected = undefined;
      e.feature.getGeometry().on('change', (_: any) => {return });

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



}
