import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { faXmark, faCircle, faWaveSquare, faDrawPolygon } from '@fortawesome/free-solid-svg-icons';
import { layerHandler, layerHandlerPositionning } from '@modules/map-sandbox/shared/core';

import Map from 'ol/Map';
import { MapService } from '@services/map.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-layer-manager',
  templateUrl: './layer-manager.component.html',
  styleUrls: ['./layer-manager.component.scss']
})
export class LayerManagerComponent implements OnInit, OnDestroy {
  @Input() map!: Map;
  @Input() currentEpsg!: string;

  @Output() layerSelected = new EventEmitter<layerHandler|null>();


  @ViewChild('exportStringGeomDiv') exportStringGeomDiv!: ElementRef;
  @ViewChild('layersListDiv') layersListDiv!: ElementRef;

  disabledIcon = faXmark;
  pointIcon = faCircle;
  lineStringIcon = faWaveSquare;
  polygonIcon = faDrawPolygon;


  existingLayers: any[] = [];
  // existingLayers: any[] = []; // LayerHandler or GroupHandler list
  layerIdSelected!: string;
  currentLayer!: layerHandler;
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

  epsgChangesSubscription!: Subscription;

  constructor(
    private mapService: MapService,
  ) {

    this.epsgChangesSubscription = this.mapService.setMapProjectionFromEpsg.subscribe(
      (epsg: string) => {
        this.existingLayers.forEach((layer: layerHandler) => {
          layer.features().forEach( (feature: any) => {
            feature.setGeometry(feature.getGeometry().transform(this.currentEpsg, epsg))
          });
        })

        this.currentEpsg = epsg;
      }
    )

   }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {

    this.existingLayers.forEach((layer: any) => {
      this.map.removeLayer(layer.vectorLayer)
      layer.cleanEvents()
    })

  }

  ngOnChanges(changes: SimpleChanges) {

    if (changes.layersListDiv) {
      this.refreshLayers()
    }
  }

  addLayer(geomType: any, groupId: string | null = null): void {
    const layerNo: number = this.existingLayers.length
    let newLayer = new layerHandler(
      this.map,
      'layer ' + layerNo,
      geomType,
      layerNo, // Zindex
      groupId
    )
    this.existingLayers.push(newLayer)
    this.refreshLayers()

  }

  appendLayer(layer: layerHandler): void {
    const layerNo: number = this.existingLayers.length
    let newLayer = new layerHandler(
      this.map,
      layer.layerName + " copy",
      layer.geomType,
      layerNo, // Zindex
      null
    )
    newLayer.addFeaturesAndUpdateIds(layer.features())
    this.existingLayers.push(newLayer)
    this.refreshLayers()
  }

  layerGoUp(layerId: string): void {
    this.existingLayers = layerHandlerPositionning(this.existingLayers, layerId, 1)
  }

  layerGoDown(layerId: string): void {
    this.existingLayers = layerHandlerPositionning(this.existingLayers, layerId, -1)
  }

  removeLayer(layerId: string): void {
    this.existingLayers = this.existingLayers.filter((layer: layerHandler) => {
      return layer.id !== layerId
    })
    this.buildLayersIndexes()
  }

  getSelectedLayerId(layerId: any): void {
    this.layerIdSelected = layerId
    let currentLayer = this.existingLayers.filter((layer: layerHandler) => {
      return layer.id === layerId
    })

    this.currentLayer = currentLayer[0]
    this.layerSelected.emit(this.currentLayer)
  }

  refreshLayers(): void {
    this.existingLayers = this.existingLayers.filter((layer: layerHandler) => {
      return !layer.deleted;
    })
  }

  unSelectLayer(): void {
    this.layerIdSelected = 'none'
    this.layerSelected.emit(null)

  }

  buildLayersIndexes(): void {
    let existingLayers = this.existingLayers.sort((a, b) => (a.zIndexValue < b.zIndexValue ? -1 : 1))

    this.existingLayers = []
    existingLayers.forEach((layer: layerHandler, idx: number) => {
      layer.zIndexValue = idx;
      layer.vectorLayer.setZIndex(idx);
      this.existingLayers.push(layer)
    })
  }

}


