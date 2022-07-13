import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ControlerService } from '@services/controler.service';
import { MapService } from '@services/map.service';
import Feature from 'ol/Feature';
import { Draw, Modify, Snap } from 'ol/interaction';
import VectorLayer from 'ol/layer/Vector';

import Map from 'ol/Map';
import VectorSource from 'ol/source/Vector';
import { Fill, Stroke, Style } from 'ol/style';
import CircleStyle from 'ol/style/Circle';
import { Subscription } from 'rxjs';

import {v4 as uuidv4} from 'uuid';


@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.scss']
})
export class MapViewComponent implements OnInit, OnDestroy {

  map!: Map;

  sourceFeatures!: any;
  layerFeatures!: any;
  layerName = "edited_layer";

  modifier!: Modify;
  draw!: Draw;
  snap!: Snap;

  geomTypesSupported = ['Point', 'LineString', 'Polygon']
  geomTypeSelected!: string
  isLegendDisplayed = true;

  mapSubscription!: Subscription;

  constructor(
    private mapService: MapService,
    private controlerService: ControlerService,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
  ) {

    this.mapSubscription = this.mapService.map.subscribe(
      (map: Map) => {
        this.map = map;
      }
    );

   }

  ngOnInit(): void {
    this.sendResumeSubMenus();
    this.mapService.getMap();

    this.initSourceFeatureAndModifier();
    this.initVectorLayer();

    // let's go to get map container and init layer(s)
    this.addInteractions(this.geomTypesSupported[0])
    this.mapService.changeMapInteractionStatus(true)

  }

  ngOnDestroy(): void {

    this.mapSubscription.unsubscribe();

    this.map.removeInteraction(this.modifier)

    this.mapService.resetMapView()
    this.mapService.changeMapInteractionStatus(false)

  }

  sendResumeSubMenus(): void {
    this.controlerService.pullSubMenus([]);
    this.controlerService.pullTitlePage(this.activatedRoute.snapshot.data.title);
    // to get the data properties from routes (app.module.ts)
    console.log(this.activatedRoute.snapshot.data.title)
    this.titleService.setTitle(this.activatedRoute.snapshot.data.title);

  }

  showHideLegend(): void {
    this.isLegendDisplayed = !this.isLegendDisplayed;
  }

  initSourceFeatureAndModifier(): void {
    this.sourceFeatures = new VectorSource();
    this.modifier = new Modify({source: this.sourceFeatures});
    this.map.addInteraction(this.modifier);
  }

  initVectorLayer(): any {
    this.layerFeatures = new VectorLayer({
      source: this.sourceFeatures,
      style: new Style({
        fill: new Fill({
          color: 'rgba(255, 255, 255, 0.2)',
        }),
        stroke: new Stroke({
          color: '#ffcc33',
          width: 2,
        }),
        image: new CircleStyle({
          radius: 7,
          fill: new Fill({
            color: '#ffcc33',
          }),
        }),
      }),
    });
    this.layerFeatures.set("name", this.layerName)

    this.map.addLayer(this.layerFeatures)
  }

  addInteractions(geomType: string): void {
    this.removeInteractions()

    this.geomTypeSelected = geomType;

    this.draw = new Draw({
      source: this.sourceFeatures,
      type: geomType,
    });

    this.draw.on('drawend', (e) => {

      e.feature.setProperties({
        'id': uuidv4(),
        'geom_type': e.feature.getGeometry()?.getType(),
        'created_at': new Date().toISOString()
      })
    });



    this.map.addInteraction(this.draw);
    this.snap = new Snap({source: this.sourceFeatures});
    this.map.addInteraction(this.snap);
  }


  removeInteractions(): void {
    if (this.draw !== undefined && this.snap !== undefined) {
      this.map.removeInteraction(this.draw);
      this.map.removeInteraction(this.snap);
    }
  }

  displayFeatures(): void {
    console.log(this.getFeatureFromLayer(this.map, this.layerName))
  }


  getFeatureFromLayer(map: any, layerName: string): Feature[] {
    const layers = map.getLayers().getArray()
    const layersFound = layers.filter((layer: any) => layer.get('name') === layerName)
    const features = layersFound[0].getSource().getFeatures()
    return features
  }
}
