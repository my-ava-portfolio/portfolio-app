import { Component, OnDestroy, OnInit, AfterViewInit, ElementRef, ViewChild, SimpleChanges } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ControlerService } from '@services/controler.service';
import { MapService } from '@services/map.service';

import Map from 'ol/Map';

import {faLayerGroup, faCircle, faWaveSquare, faDrawPolygon, faXmark } from '@fortawesome/free-solid-svg-icons';

import { layerHandler, getWkt, findBy, findElementBy  } from '@modules/map-sandbox/shared/core';
import { Subscription } from 'rxjs/internal/Subscription';
import MousePosition from 'ol/control/MousePosition';
import { format } from 'ol/coordinate';
import { View } from 'ol';
import { layer } from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.scss']
})
export class MapViewComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('exportStringGeomDiv') exportStringGeomDiv!: ElementRef;
  @ViewChild('layersListDiv') layersListDiv!: ElementRef;

  // icons
  layersIcon = faLayerGroup;
  disabledIcon = faXmark;
  pointIcon = faCircle;
  lineStringIcon = faWaveSquare;
  polygonIcon = faDrawPolygon;


  map!: Map;
  defaultMapView!: View;

  allExistingLayers: any[] = [];
  existingLayers: any[] = []; // LayerHandler or GroupHandler list
  layerIdSelected!: string;
  layerForModal!: layerHandler;
  layerNamedIncrement: number = -1;
  createModesSupported = [
    {
      "mode": 'Point',
      "label": 'Ajouter une couche de Points',
      "icon": this.pointIcon
    },
    {
      "mode": 'LineString',
      "label": 'Ajouter une couche de LineString',
      "icon": this.lineStringIcon
    },
    {
      "mode": 'Polygon',
      "label": 'Ajouter une couche de Polygones',
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

  ngOnChanges(changes: SimpleChanges) {

    if (changes.layersListDiv) {
      this.refreshLayers()
    }

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
    let currentLayer = this.allExistingLayers.filter((layer: layerHandler) => {
      return layer.id === layerId
    })

    this.layerForModal = currentLayer[0]

  }

  addLayer(geomType: any, groupId: string | null = null): void {
    const layerNo: number = ++this.layerNamedIncrement
    let newLayer = new layerHandler(
      this.map,
      'layer ' + layerNo,
      geomType,
      layerNo, // Zindex
      groupId
    )
    this.allExistingLayers.push(newLayer)
    this.refreshLayers()

  }

  layerGoUp(layerId: string): void {
    this.existingLayers = moveLayerOnZIndex(this.existingLayers, layerId, 1)
  }

  layerGoDown(layerId: string): void {
    this.existingLayers = moveLayerOnZIndex(this.existingLayers, layerId, -1)
  }

  refreshLayers(): void {
    this.existingLayers = this.allExistingLayers.filter((layer: layerHandler) => {
      return !layer.deleted;
    })
    // this.existingLayers = this.existingLayers.sort((a,b) =>  a.zIndexValue - b.zIndexValue)

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


function moveLayerOnZIndex(layersArray: layerHandler[], layerId: string, incrementValue: number): layerHandler[] {
  let outputArray: layerHandler[] = [];

  const layerIndexToGet = layersArray.findIndex((layer: layerHandler) => layer.id === layerId);
  const layerZIndex = layersArray[layerIndexToGet].zIndexValue;
  const toIndex = layerZIndex + incrementValue
  if (toIndex >= 0 && toIndex < layersArray.length) {
    layersArray.splice(
      toIndex, 0,
      layersArray.splice(layerZIndex, 1)[0]
    );
    // rebuild ZIndex
    layersArray.forEach((layer: layerHandler, idx: number) => {
      layer.zIndexValue = idx;
      layer.vectorLayer.setZIndex(idx);
      outputArray.push(layer)
    })
  }

  return layersArray
}

