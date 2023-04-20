import { Component, ElementRef, Input, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { faXmark, faUpload, faExpand, faEyeSlash, faLock, faLockOpen } from '@fortawesome/free-solid-svg-icons';
import { layerHandler, layerHandlerPositionning } from '@modules/map-sandbox/shared/layer-handler/layer-handler';

import Map from 'ol/Map';
import {createEmpty} from 'ol/extent';
import {extend} from 'ol/extent';

import { MapService } from '@services/map.service';
import { Subscription } from 'rxjs';

import { faEye } from '@fortawesome/free-regular-svg-icons';
import { InteractionsService } from '../shared/service/interactions.service';

import { featuresLayerType, geomLayerTypes } from '@modules/map-sandbox/shared/data-types';
import { EditComputingService } from '../shared/service/edit-computing.service';


@Component({
  selector: 'app-layer-manager',
  templateUrl: './layer-manager.component.html',
  styleUrls: ['./layer-manager.component.scss']
})
export class LayerManagerComponent implements OnInit, OnDestroy {
  @Input() map!: Map;
  @Input() currentEpsg!: string;
  @Input() epsgAvailable!: string[];

  @ViewChild('exportStringGeomDiv') exportStringGeomDiv!: ElementRef;
  @ViewChild('layersList') layersList!: ElementRef;

  disabledIcon = faXmark;

  loadIcon = faUpload;

  visibleIcon = faEye;
  invisibleIcon = faEyeSlash;
  centerIcon = faExpand;
  lockIcon = faLock;
  unLockIcon = faLockOpen;

  forceVisibleStatus: boolean = true;
  layersLockStatus: boolean = false;

  existingLayers: layerHandler[] = [];
  allLayers: layerHandler[] = [];

  currentLayerIdSelected!: string;

  layerNamedIncrement: number = -1;

  epsgChangesSubscription!: Subscription;
  layerIdSelectedSubscription!: Subscription;
  newFeaturesSubscription!: Subscription;

  zoomPadding = [100, 100, 100, 100];  // TODO refactor

  constructor(
    private mapService: MapService,
    private interactionsService: InteractionsService,
    private editComputingService: EditComputingService,
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

    this.layerIdSelectedSubscription = this.interactionsService.layerIdSelected.subscribe(
      (currentLayerIdSelected: string) => {
        this.currentLayerIdSelected = currentLayerIdSelected
      }
    )

    this.newFeaturesSubscription = this.editComputingService.newFeatures.subscribe(
      (newFeatures: featuresLayerType) => {
        this.createNewLayersFromFeatures(newFeatures)
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

    this.epsgChangesSubscription.unsubscribe();
    this.layerIdSelectedSubscription.unsubscribe();
    this.newFeaturesSubscription.unsubscribe();
  }

  ngOnChanges(changes: SimpleChanges) {

    if (changes.layersList) {
      this.refreshLayers()
    }
  }

  addLayer(geomType: geomLayerTypes): void {
    let layer = this.setNewLayer(geomType)
    this.existingLayers.push(layer)
    this.refreshLayers()

  }

  private setNewLayer(geomType: geomLayerTypes, layerName: string | null = null, groupId: string | null = null): layerHandler {
    const layerNo: number = ++this.layerNamedIncrement
    if (layerName === null) {
      layerName = 'layer ' + layerNo
    }
    return new layerHandler(
      this.map,
      layerName,
      geomType,
      layerNo, // Zindex
      groupId
    )
  }

  duplicateLayer(layer: layerHandler): void {
    let duplicatedLayer = this.setNewLayer(layer.geomType, layer.layerName + " copy")
    // copy the feature from the current feature selecte to duplicate
    duplicatedLayer.addFeaturesAndUpdateIds(layer.features())
    this.existingLayers.push(duplicatedLayer)
    this.refreshLayers()
  }

  addLayerFromFeatures(geomType: 'Point' | 'LineString' | 'Polygon', features: any[]): void {
    let newLayer = this.setNewLayer(geomType)
    newLayer.addFeaturesAndUpdateIds(features)
    this.existingLayers.push(newLayer)
    this.refreshLayers()
  }

  layerGoUp(layerId: string): void {
    this.existingLayers = layerHandlerPositionning(this.existingLayers, layerId, 1)
    this.refreshLayers()
  }

  layerGoDown(layerId: string): void {
    this.existingLayers = layerHandlerPositionning(this.existingLayers, layerId, -1)
    this.refreshLayers()
  }

  removeLayer(layerId: string): void {
    this.existingLayers = this.existingLayers.filter((layer: layerHandler) => {
      return layer.id !== layerId
    })
    this.buildLayersIndexes()
  }

  private getLayerFromId(layerId: string): layerHandler {
    let currentLayer = this.existingLayers.filter((layer: layerHandler) => {
      return layer.id === layerId
    })
    return currentLayer[0]
  }

  refreshLayers(): void {
    this.allLayers = this.existingLayers.filter((layer: layerHandler) => {
      return !layer.deleted;
    }).sort((a, b) => (a.zIndexValue > b.zIndexValue ? -1 : 1))
  }

  unSelectLayer(): void {
    this.interactionsService.sendSelectedLayerId('none')
    this.interactionsService.sendSelectedLayer(null)
  }

  buildLayersIndexes(): void {
    let existingLayers = this.existingLayers

    this.existingLayers = []
    existingLayers.forEach((layer: layerHandler, idx: number) => {
      layer.zIndexValue = idx;
      layer.vectorLayer.setZIndex(idx);
      this.existingLayers.push(layer)
    })
  }

  createNewLayersFromFeatures(featuresToAdd: any): void {
    // TODO improve! use featuresLayerType as type
    Object.keys(featuresToAdd).forEach((geomType) => {
      let features = featuresToAdd[geomType]
      this.addLayerFromFeatures(geomType as geomLayerTypes, features)
    })
  }

  appendFeatureOnLayerFromFeatures(data: any): void {
    // TODO improve!
    const layerId = data.layerId;
    const featuresToAdd = data.features
    let layerTarget = this.getLayerFromId(layerId)
    Object.keys(featuresToAdd).forEach((geomType: string) => {
      let features = featuresToAdd[geomType]
      if (geomType === layerTarget.geomType) {
        layerTarget.addFeaturesAndUpdateIds(features)  // TODO synchronize properties      
        this.refreshLayers()
      }
    })
    return
  }

  // START layers controlers //
  zoomLayers(): void {
    let emptyExtent = createEmpty();
    this.existingLayers.forEach((layer: layerHandler) => {
      extend(emptyExtent, layer.sourceFeatures.getExtent());
    })
    if (emptyExtent[0] !== Infinity
      && emptyExtent[1] !== Infinity
      && emptyExtent[2] !== Infinity
      && emptyExtent[3] !== Infinity
    ) {
      this.map.getView().fit(
        emptyExtent,
        { size: this.map.getSize(), padding: this.zoomPadding }
      );
    }

  }

  visibleLayers(status: boolean): void {
    this.forceVisibleStatus = status
  }

  lockLayers(status: boolean): void {
    this.layersLockStatus = status
  }

  removeLayers(): void {
    this.interactionsService.removeAllLayers()
  }
  // END layers controlers //

}


function groupBy(objectArray: any[], property: any) {
  return objectArray.reduce(function (acc, obj) {
    var key = obj[property];
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(obj);
    return acc;
  }, {});
}