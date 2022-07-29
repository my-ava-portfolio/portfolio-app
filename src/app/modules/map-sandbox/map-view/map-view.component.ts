import { Component, OnDestroy, OnInit, ElementRef, ViewChild, SimpleChanges } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ControlerService } from '@services/controler.service';
import { MapService } from '@services/map.service';

import Map from 'ol/Map';

import { faGlobe, faOutdent, faLayerGroup, faCircle, faWaveSquare, faDrawPolygon, faXmark } from '@fortawesome/free-solid-svg-icons';

import { layerHandler } from '@modules/map-sandbox/shared/core';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.scss']
})
export class MapViewComponent implements OnInit, OnDestroy {
  @ViewChild('exportStringGeomDiv') exportStringGeomDiv!: ElementRef;
  @ViewChild('layersListDiv') layersListDiv!: ElementRef;

  currentEpsg!: string;

  // icons
  geoIcon = faGlobe;
  leftSideIcon = faOutdent;
  layersIcon = faLayerGroup;
  disabledIcon = faXmark;
  pointIcon = faCircle;
  lineStringIcon = faWaveSquare;
  polygonIcon = faDrawPolygon;


  map!: Map;

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



  isLegendDisplayed = true;
  currentMenuDisplayed = 'geoTools'

  mapSubscription!: Subscription;
  epsgChangesSubscription!: Subscription;

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
      }
    );

    this.epsgChangesSubscription = this.mapService.setMapProjectionFromEpsg.subscribe(
      (epsg: string) => {
        this.allExistingLayers.forEach((layer: layerHandler) => {
          layer.features().forEach( (feature: any) => {
            feature.setGeometry(feature.getGeometry().transform(this.currentEpsg, epsg))
          });
        })

        this.currentEpsg = epsg;
      }
    )

   }

  ngOnInit(): void {

    this.sendResumeSubMenus();
    this.mapService.changeMapInteractionStatus(true)
    this.mapService.getMap();

  }



  ngOnDestroy(): void {

    this.mapSubscription.unsubscribe();
    this.epsgChangesSubscription.unsubscribe();

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
  }

  unSelectLayer(): void {
    this.layerIdSelected = 'none'
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

