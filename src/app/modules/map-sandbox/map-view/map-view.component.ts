import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ControlerService } from '@services/controler.service';
import { MapService } from '@services/map.service';
import { Draw, Modify, Snap } from 'ol/interaction';
import VectorLayer from 'ol/layer/Vector';

import Map from 'ol/Map';
import VectorSource from 'ol/source/Vector';

import { faCircle, faWaveSquare, faDrawPolygon, faXmark } from '@fortawesome/free-solid-svg-icons';

import { DrawInteraction, getWkt, PointStyle } from '@modules/map-sandbox/shared/core';
import Feature from 'ol/Feature';
import * as d3 from 'd3';
import { Subscription } from 'rxjs/internal/Subscription';
import { Subject } from 'rxjs/internal/Subject';
import MousePosition from 'ol/control/MousePosition';
import { format } from 'ol/coordinate';
import { v4 as uuidv4 } from 'uuid';
import Group from 'ol/layer/Group';
import BaseLayer from 'ol/layer/Base';
import BaseTileLayer from 'ol/layer/BaseTile';
import BaseVectorLayer from 'ol/layer/BaseVector';


@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.scss']
})
export class MapViewComponent implements OnInit, OnDestroy {

  map!: Map;



  disabledIcon = faXmark;
  EditIcon = faCircle;
  pointIcon = faCircle;
  lineStringIcon = faWaveSquare;
  polygonIcon = faDrawPolygon;

  mousePositionControl!: MousePosition;
  cursorCoordinates!: any;
  epsgAvailable = ["EPSG:4326", "EPSG:3857"];
  // create a service to get the map epsg!
  currentEpsg!: string;
  selectedEpsg!: string;

  layersCount: number = 0;
  layerIdSelected!: string |null;
  allLayers: any[] = [];
  layerNamedIncrement: number = 0;
  createModesSupported = [
    {
      "mode": 'Point',
      "label": 'Couche de Points',
      "icon": this.pointIcon
    },
    {
      "mode": 'LineString',
      "label": 'Couche de LineString',
      "icon": this.lineStringIcon
    },
    {
      "mode": 'Polygon',
      "label": 'Couche de Polygones',
      "icon": this.polygonIcon
    }
  ]

  editMode!: any[] | null
  editModeSelected!: any[];
  editModesSupported: any = {
    "Point": [
      {
        "mode": "edit",
        "label": "Editer"
      }
    ],
    "LineString": [
      {
        "mode": "edit",
        "label": "Editer"
      }
    ],
    "Polygon": [
      {
        "mode": "edit",
        "label": "Editer"
      },
      {
        "mode": "hole",
        "label": "Ajouter un trou"
      }
    ]
  }

  isLegendDisplayed = true;

  mapSubscription!: Subscription;
  featuresDisplayedSubscription!: Subscription;
  featuresCreatedSubscription!: Subscription;

  constructor(
    private mapService: MapService,
    private controlerService: ControlerService,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
  ) {

    // this.featuresCreatedSubscription = this.featuresCreatedObservable.subscribe(
      // (features: Feature[]) => {
        // this.resetToasts();
        // features.forEach((feature: Feature) => {
          // this.setFeatureToasts(feature, true)
          // this.featureSelectedId = feature.get('id');

          // if (this.modifyModeSelected !== "Hole") {
          //   // Hole needs to work on a selected feature, so reset the mode is not relevant
          //   this.featureSelectedId = null;  // we don't want to select the feature on the div when creating a new feature
          // }
        // })
    //   }
    // )

    // this.featuresDisplayedSubscription = this.featuresDisplayedObservable.subscribe(
    //   (features: Feature[]) => {
        // this.resetToasts();
        // features.forEach((feature: Feature) => {
        //   this.setFeatureToasts(feature, false)
        //   this.featureSelectedId = feature.get('id');
        //   console.log(feature.get('name'))
        // })
    //   }
    // )

    this.mapSubscription = this.mapService.map.subscribe(
      (map: Map) => {
        this.map = map;
        this.currentEpsg = this.map.getView().getProjection().getCode();

        this.selectedEpsg = this.currentEpsg
      }
    );

   }

  ngOnInit(): void {
    this.sendResumeSubMenus();

    this.mapService.getMap();
    this.initMousePosition()

  }

  ngOnDestroy(): void {

    this.mapSubscription.unsubscribe();
    this.featuresDisplayedSubscription.unsubscribe();
    this.featuresCreatedSubscription.unsubscribe();


    this.mapService.resetMapView()
    this.mapService.changeMapInteractionStatus(false)
    this.setProjection("EPSG:3857")
  }

  sendResumeSubMenus(): void {
    this.controlerService.pullSubMenus([]);
    this.controlerService.pullTitlePage(this.activatedRoute.snapshot.data.title);
    this.titleService.setTitle(this.activatedRoute.snapshot.data.title);

  }

  showHideLegend(): void {
    this.isLegendDisplayed = !this.isLegendDisplayed;
  }

  addLayer(geomType: string): void {
    let sourceFeatures = new VectorSource();

    let layerFeatures = new VectorLayer({
      source: sourceFeatures,
    });
    const idValue = uuidv4()
    layerFeatures.set('id', idValue, true)
    layerFeatures.set('name', 'layer ' + ++this.layerNamedIncrement, true)
    layerFeatures.set('geomType', geomType, true)

    this.map.addLayer(layerFeatures)
    this.getAllLayers()
  }

  selectLayer(layerId: string | null): void {
    this.editMode = null
    this.map.getLayers().forEach((layer: any) => {
      if (layer instanceof VectorLayer) {
        if (layer.get('id') === layerId) {
          layer = layer
          this.layerIdSelected = layerId
          this.editMode = this.editModesSupported[layer.get('geomType')] // to activate the edit widget, but it could be useless
        }
      }

    });
  }

  removeLayer(layerId: string): void {
    this.map.getLayers().forEach((layer: any) => {

      if (layer instanceof VectorLayer) {
        if (layer.get('id') === layerId) {
          this.map.removeLayer(layer)
          this.layerIdSelected = null // deselect by defaultt when removing
        }
      }

    });
    this.getAllLayers()
  }


  getAllLayers(): void {
    this.allLayers = [];

    this.map.getLayers().forEach((item: any) => {
      if (item instanceof BaseVectorLayer) {
        this.allLayers.push(item);
      } else if (item instanceof BaseTileLayer) {

      } else {
        console.log("not supported")
      }
    });

  }












  copyToClipboard(value: string): void {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = value;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }

  initMousePosition(): void {
    let mouseCoordinatesDiv!: any;
    mouseCoordinatesDiv = document.getElementById('mouseCoordinates')

    this.mousePositionControl = new MousePosition({
      coordinateFormat: this.setPrecisionFunc(4),
      placeholder: false,
      className: 'mouse-position',
      target: mouseCoordinatesDiv,
    });
    this.mousePositionControl.on("propertychange", (event: any) => {
      this.cursorCoordinates = event
    })
    this.map.addControl(this.mousePositionControl)
  }

  setProjection(epsg: string): void {
    this.selectedEpsg = epsg;

    this.mapService.setProjectionOnMap(epsg)

    // this.layerFeatures.getSource().getFeatures().forEach( (feature: any) => {
    //   feature.setGeometry(feature.getGeometry().transform(this.currentEpsg, this.selectedEpsg))
    // });
    this.setMapEpsg();

  }

  updatePrecision(event: any): any {
    return this.mousePositionControl.setCoordinateFormat(this.setPrecisionFunc(event.target.value))
  }
  private setPrecisionFunc(precision: any): any {
    var template = '{x}, {y}';
    return (
      function(coordinate: any) {
          return format(coordinate, template, precision);
      });
  }

  setMapEpsg(): void {
    this.currentEpsg = this.map.getView().getProjection().getCode();
  }


}


