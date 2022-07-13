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

import { v4 as uuidv4 } from 'uuid';

import { faCircle, faWaveSquare, faDrawPolygon, faXmark } from '@fortawesome/free-solid-svg-icons';


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

  geomTypesSupported = [
    {
      "name": 'editDisabled',
      "icon": faXmark
    },
    {
      "name": 'Point',
      "icon": faCircle
    },
    {
      "name": 'LineString',
      "icon": faWaveSquare
    },
    {
      "name": 'Polygon',
      "icon": faDrawPolygon
    }
  ]

  geomTypeSelected = "editDisabled";
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

    this.initSourceFeatures();
    this.initVectorLayer();
    this.initModifier();

    this.mapService.changeMapInteractionStatus(true)

    // let's go to get map container and init layer(s)
    this.addInteractions(this.geomTypesSupported[0].name)

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

  initSourceFeatures(): void {
    this.sourceFeatures = new VectorSource();

  }

  initModifier(): void {
    this.modifier = new Modify({source: this.sourceFeatures});
    this.map.addInteraction(this.modifier);
  }

  initVectorLayer(): any {
    this.layerFeatures = new VectorLayer({
      source: this.sourceFeatures,
      style: new Style({
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
      }),
    });
    this.layerFeatures.set("name", this.layerName)

    this.map.addLayer(this.layerFeatures)
  }

  addInteractions(geomType: string): void {
    if (geomType !== "editDisabled") {
      this.removeInteractions()

      this.map.addInteraction(this.modifier);

      this.geomTypeSelected = geomType;
      console.log(this.geomTypeSelected)
      this.draw = new Draw({
        source: this.sourceFeatures,
        type: geomType,
      });

      this.draw.on('drawend', (e) => {
        const featureCount = this.layerFeatures.getSource().getFeatures().length
        e.feature.setProperties({
          'id': uuidv4(),
          'name': 'feature_' + featureCount,
          'geom_type': e.feature.getGeometry()?.getType(),
          'created_at': new Date().toISOString()
        })
      });
      
      this.map.addInteraction(this.draw);
      this.snap = new Snap({source: this.sourceFeatures});
      this.map.addInteraction(this.snap);

    } else {
      this.removeInteractions()
    }


  }


  removeInteractions(): void {
    if (this.draw !== undefined && this.snap !== undefined) {
      this.map.removeInteraction(this.draw);
      this.map.removeInteraction(this.snap);
    }
    this.map.removeInteraction(this.modifier);

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
