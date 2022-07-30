import { Component, ElementRef, Input, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { faXmark, faCircle, faWaveSquare, faDrawPolygon } from '@fortawesome/free-solid-svg-icons';
import { layerHandler } from '../shared/core';

import Map from 'ol/Map';
import { MapService } from '@services/map.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-creator',
  templateUrl: './creator.component.html',
  styleUrls: ['./creator.component.scss']
})
export class CreatorComponent implements OnInit, OnDestroy {
  @Input() map!: Map;
  @Input() currentEpsg!: string;


  @ViewChild('exportStringGeomDiv') exportStringGeomDiv!: ElementRef;
  @ViewChild('layersListDiv') layersListDiv!: ElementRef;

  disabledIcon = faXmark;
  pointIcon = faCircle;
  lineStringIcon = faWaveSquare;
  polygonIcon = faDrawPolygon;


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

  epsgChangesSubscription!: Subscription;

  constructor(
    private mapService: MapService,
  ) {

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
  }

  ngOnDestroy(): void {

    this.allExistingLayers.forEach((layer: any) => {
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

  getSelectedLayerId(layerId: any): void {
    this.layerIdSelected = layerId
    let currentLayer = this.allExistingLayers.filter((layer: layerHandler) => {
      return layer.id === layerId
    })

    this.layerForModal = currentLayer[0]

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
