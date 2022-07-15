import { v4 as uuidv4 } from 'uuid';

import { Draw, Modify, Snap } from 'ol/interaction';
import VectorLayer from 'ol/layer/Vector';

import Map from 'ol/Map';
import VectorSource from 'ol/source/Vector';


export class DrawInteraction {
  private map: Map;
  private draw!: Draw;
  private snap!: Snap;
  private modifier!: Modify;

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
      source: this.vectorLayer.getSource()
    });

    this.map.addInteraction(this.draw);
    this.map.addInteraction(this.modifier);
    this.map.addInteraction(this.snap);

    this.draw.on('drawstart', this.onDrawStart.bind(this));
    this.draw.on('drawend', this.onDrawEnd.bind(this));
  }

  disableDrawing(): void {
    if (this.draw !== undefined) {
      this.map.removeInteraction(this.draw);
    }

    this.map.removeInteraction(this.snap);
    this.map.removeInteraction(this.modifier);
  }

  onDrawStart(e: any): void {
  }

  onDrawEnd(e: any): void {
    const featureCount = this.sourceFeatures.getFeatures().length
    const uuid = uuidv4()
    e.feature.setId(uuid)
    e.feature.setProperties({
      'name': 'feature_' + featureCount,
      'geom_type': e.feature.getGeometry()?.getType(),
      'created_at': new Date().toISOString()
    })
  }

  onGeomChange(e: any): void {
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
