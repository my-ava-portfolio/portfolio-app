import { Component, ElementRef, Input, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { faXmark, faUpload, faExpand, faEyeSlash, faLock, faLockOpen } from '@fortawesome/free-solid-svg-icons';
import { baseLayer, layerHandler, layerHandlerPositionning } from '@modules/map-sandbox/shared/layer-handler/layer-handler';

import Map from 'ol/Map';
import {createEmpty} from 'ol/extent';
import {extend} from 'ol/extent';

import { MapService } from '@services/map.service';
import { Subscription } from 'rxjs';

import { faEye, faMinusSquare, faPlusSquare } from '@fortawesome/free-regular-svg-icons';
import { InteractionsService } from '@modules/map-sandbox/shared/service/interactions.service';

import { featuresLayerType, geomLayerTypes, toolsTypes } from '@modules/map-sandbox/shared/data-types';
import { EditComputingService } from '@modules/map-sandbox/shared/service/edit-computing.service';
import { linestringsExample, pointsExample, polygonsExample } from '../data-example';
import { readStringWktAndGroupedByGeomType } from '../import-tools/import-tools.component';


@Component({
  selector: 'app-layers-manager',
  templateUrl: './layers-manager.component.html',
  styleUrls: ['./layers-manager.component.scss']
})
export class LayersManagerComponent implements OnInit, OnDestroy {
  @Input() map!: Map;

  private _currentEpsg!: string;
  private _toolsMode!: toolsTypes;

  @Input() epsgAvailable!: string[];

  @ViewChild('exportStringGeomDiv') exportStringGeomDiv!: ElementRef;

  disabledIcon = faXmark;

  loadIcon = faUpload;

  visibleIcon = faEye;
  invisibleIcon = faEyeSlash;
  centerIcon = faExpand;
  lockIcon = faLock;
  unLockIcon = faLockOpen;
  unToggleIcon = faMinusSquare;
  toggleIcon = faPlusSquare;

  allToggled: boolean = false;
  allVisible: boolean = true;
  allLocked: boolean = false;

  existingLayers: layerHandler[] = [];
  layersToDisplay: layerHandler[] = [];

  currentLayerIdSelected: string  | null = null;

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
        this.currentEpsg = epsg;
      }
    )

    this.layerIdSelectedSubscription = this.interactionsService.layerIdSelected.subscribe(
      (currentLayerIdSelected: string | null) => {
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
    this._mapExamplesData()
  }

  ngOnDestroy(): void {

    this.existingLayers.forEach((layer: layerHandler) => {
      this.map.removeLayer(layer.container.layer)
      layer.cleanEvents()
    })

    this.epsgChangesSubscription.unsubscribe();
    this.layerIdSelectedSubscription.unsubscribe();
    this.newFeaturesSubscription.unsubscribe();
  }

  private _mapExamplesData(): void {
    const featureParams = {
      dataProjection: this.currentEpsg,
      featureProjection: 'EPSG:3857'
    }
    const exampleData = [...pointsExample, ...linestringsExample, ...polygonsExample]
    const dataformated = readStringWktAndGroupedByGeomType(exampleData, featureParams)
    this.createNewLayersFromFeatures(dataformated)
  }

  @Input()
  set toolsMode(value: toolsTypes) {
    this._toolsMode = value;
    this.refreshLayers();
  }

  get toolsMode(): toolsTypes {
    return this._toolsMode;
  }

  @Input()
  set currentEpsg(value: string) {
    this._currentEpsg = value
  }

  get currentEpsg(): string {
    return this._currentEpsg
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
    let containerLayer = new baseLayer(layerName, geomType, layerNo)
    return new layerHandler(
      this.map,
      containerLayer
    )
  }

  duplicateLayer(layer: layerHandler): void {
    let duplicatedLayer = this.setNewLayer(layer.container.geomType, layer.container.layerName + " copy")
    // copy the feature from the current feature selecte to duplicate
    duplicatedLayer.container.addFeaturesAndUpdateIds(layer.container.features)
    this.existingLayers.push(duplicatedLayer)
    this.refreshLayers()
  }

  addLayerFromFeatures(geomType: 'Point' | 'LineString' | 'Polygon', features: any[]): void {
    let newLayer = this.setNewLayer(geomType)
    newLayer.container.addFeaturesAndUpdateIds(features)
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
      return layer.container.uuid !== layerId
    })
    this.buildLayersIndexes()
    this.refreshLayers()
  }

  getLayerFromId(layerId: string | null): layerHandler | null {
    if (layerId !== null) {
      let currentLayer = this.existingLayers.filter((layer: layerHandler) => {
        return layer.container.uuid === layerId
      })
      return currentLayer[0]
    }
    return null
  }

  refreshLayers(): void {
    this.layersToDisplay = this.existingLayers.sort((a, b) => (a.container.zIndex > b.container.zIndex ? -1 : 1))
    
    // for layout map legend
    this.interactionsService.sendAllLayers(this.layersToDisplay)
  }

  unSelectLayer(): void {
    this.currentLayerIdSelected = null
  }

  buildLayersIndexes(): void {
    let existingLayers = this.existingLayers

    this.existingLayers = []
    existingLayers.forEach((layer: layerHandler, idx: number) => {
      layer.container.zIndex = idx;
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
    if (layerTarget !== null) {
      const geomTypeLayer = layerTarget.container.geomType
      let layerObject = layerTarget.container
      Object.keys(featuresToAdd).forEach((geomType: string) => {
        let features = featuresToAdd[geomType]
        if (geomType === geomTypeLayer) {
          layerObject.addFeaturesAndUpdateIds(features)  // TODO synchronize properties      
          this.refreshLayers()
        }
      })
    }
  }

  // START layers controlers //
  zoomLayers(): void {
    let emptyExtent = createEmpty();
    this.existingLayers.forEach((layer: layerHandler) => {
      extend(emptyExtent, layer.container.sourceFeatures.getExtent());
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