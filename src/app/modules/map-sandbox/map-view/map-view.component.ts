import { Component, OnDestroy, OnInit, AfterViewInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ControlerService } from '@services/controler.service';
import { MapService } from '@services/map.service';

import Map from 'ol/Map';

import {faLayerGroup, faPencil, faCircleQuestion, faGear, faCirclePlus, faCircle, faWaveSquare, faDrawPolygon, faXmark, faTag } from '@fortawesome/free-solid-svg-icons';

import { layerHandler, getWkt, findBy, findElementBy  } from '@modules/map-sandbox/shared/core';
import { Subscription } from 'rxjs/internal/Subscription';
import MousePosition from 'ol/control/MousePosition';
import { format } from 'ol/coordinate';
import { View } from 'ol';

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.scss']
})
export class MapViewComponent implements OnInit, OnDestroy, AfterViewInit {

  // icons
  layersIcon = faLayerGroup;
  groupIcon = faLayerGroup;
  helpIcon = faCircleQuestion;
  addIcon = faCirclePlus;
  editIcon = faPencil;
  paramIcon = faGear;
  disabledIcon = faXmark;
  EditIcon = faCircle;
  pointIcon = faCircle;
  lineStringIcon = faWaveSquare;
  polygonIcon = faDrawPolygon;

  map!: Map;
  defaultMapView!: View;

  allExistingLayers: any[] = [];
  existingLayers: any[] = []; // LayerHandler or GroupHandler list
  layerIdSelected!: string;
  layerForModal!: layerHandler;
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

  mousePositionControl!: MousePosition;
  cursorCoordinates!: any;
  epsgAvailable = ["EPSG:4326", "EPSG:3857"];
  // create a service to get the map epsg!
  currentEpsg!: string;
  selectedEpsg!: string;

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
        this.currentEpsg = this.map.getView().getProjection().getCode();
        this.defaultMapView = this.map.getView()
        this.selectedEpsg = this.currentEpsg

      }
    );

   }

  ngOnInit(): void {

    this.sendResumeSubMenus();
    this.mapService.changeMapInteractionStatus(true)
    this.mapService.getMap();

  }

  ngAfterViewInit(): void {
    this.initMousePosition()

  }

  ngOnDestroy(): void {
    this.map.setView(this.defaultMapView)

    this.mapSubscription.unsubscribe();


    this.allExistingLayers.forEach((layer: any) => {
      this.map.removeLayer(layer.vectorLayer)
      layer.cleanEvents()
    })

    this.mapService.changeMapInteractionStatus(false)

    this.mapService.resetMapView()

  }

  sendResumeSubMenus(): void {
    this.controlerService.pullSubMenus([]);
    this.controlerService.pullTitlePage(this.activatedRoute.snapshot.data.title);
    this.titleService.setTitle(this.activatedRoute.snapshot.data.title);

  }

  showHideLegend(): void {
    this.isLegendDisplayed = !this.isLegendDisplayed;
  }

  getSelectedLayerId(layerId: any): void {
    this.layerIdSelected = layerId
  }

  addLayer(geomType: any, groupId: string | null = null): void {

    let newLayer = new layerHandler(
      this.map,
      'layer ' + ++this.layerNamedIncrement,
      geomType,
      groupId
    )

    this.allExistingLayers.push(newLayer)

    this.refreshLayers()

  }

  refreshLayers(): void {
    this.existingLayers = this.allExistingLayers.filter((layer: layerHandler) => {
      return !layer.deleted;
    })
  }

  unSelectLayer(): void {
    this.layerIdSelected = 'none'
  }

  initMousePosition(): void {
    let mouseCoordinatesDiv!: any;
    mouseCoordinatesDiv = document.getElementById('mouseCoordinates')

    this.mousePositionControl = new MousePosition({
      coordinateFormat: this.setPrecisionFunc(4),
      placeholder: 'x :<br>y : ',
      className: 'mouse-position',
      target: mouseCoordinatesDiv,

    });

    this.map.addControl(this.mousePositionControl)
  }

  setProjection(epsg: string): void {
    this.selectedEpsg = epsg;

    this.mapService.setProjectionOnMap(epsg)

    //  reproject each layer  // TODO create func
    this.allExistingLayers.forEach((layer: layerHandler) => {
      layer.features().forEach( (feature: any) => {
        feature.setGeometry(feature.getGeometry().transform(this.currentEpsg, this.selectedEpsg))
      });
    })

    this.setMapEpsg();

  }

  updatePrecision(event: any): any {
    return this.mousePositionControl.setCoordinateFormat(this.setPrecisionFunc(event.target.value))
  }
  private setPrecisionFunc(precision: any): any {
    var template = 'x : {x}<br>y : {y}';
    return (
      function(coordinate: any) {
          return format(coordinate, template, precision);
      });
  }


  setMapEpsg(): void {
    this.currentEpsg = this.map.getView().getProjection().getCode();
  }

}


