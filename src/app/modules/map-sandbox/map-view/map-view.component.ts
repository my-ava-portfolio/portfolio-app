import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ControlerService } from '@services/controler.service';
import { MapService } from '@services/map.service';
import { Draw, Modify, Snap } from 'ol/interaction';
import VectorLayer from 'ol/layer/Vector';

import Map from 'ol/Map';
import VectorSource from 'ol/source/Vector';
import { Fill, Stroke, Style } from 'ol/style';
import CircleStyle from 'ol/style/Circle';
import { Subscription } from 'rxjs';


import { faCircle, faWaveSquare, faDrawPolygon, faXmark } from '@fortawesome/free-solid-svg-icons';

import { DrawInteraction } from '@modules/map-sandbox/shared/core';


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

  _allFeatures: any[] = [];
  allFeatures: any[] = [];
  allRawFeatures: any[] = [];
  drawSession!: any;

  modifier!: Modify;
  draw!: Draw;
  snap!: Snap;

  editDisabledIcon = faXmark;
  pointIcon = faCircle;
  lineStringIcon = faWaveSquare;
  polygonIcon = faDrawPolygon;

  geomTypesSupported = [
    {
      "name": 'editDisabled',
      "icon": this.editDisabledIcon
    },
    {
      "name": 'Point',
      "icon": this.pointIcon
    },
    {
      "name": 'LineString',
      "icon": this.lineStringIcon
    },
    {
      "name": 'Polygon',
      "icon": this.polygonIcon
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

    this.drawSession = new DrawInteraction(this.map, this.layerFeatures)

    this.drawSession.sourceFeatures.on('addfeature', (event: any) => {
      this.returnFeatures()
    });
    this.drawSession.sourceFeatures.on('removefeature', (event: any) => {
      this.returnFeatures()
    });

    this.map.addLayer(this.layerFeatures)


  }

  addInteractions(geomType: string): void {

    if (geomType !== "editDisabled") {
      this.drawSession.enabledDrawing(geomType)

      this.geomTypeSelected = geomType;
    } else {
      this.drawSession.disableDrawing()
    }


  }

  returnFeatures(): void {
    this.allFeatures = this.drawSession.returnFeatures()
  }

  removeFeature(id: string): void {
    this.drawSession.removeFeature(id)
  }


}


