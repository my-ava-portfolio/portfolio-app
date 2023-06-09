import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { baseLayer, layerHandler, layerHandlerPositionning } from '@modules/map-sandbox/shared/layer-handler/layer-handler';

import Map from 'ol/Map';
import {createEmpty} from 'ol/extent';
import {extend} from 'ol/extent';

import { MapService } from '@services/map.service';
import { Subscription } from 'rxjs';

import { InteractionsService } from '@modules/map-sandbox/shared/service/interactions.service';

import { epsg3857, featuresLayerType, geomLayerTypes, toolsTypes } from '@modules/map-sandbox/shared/data-types';
import { EditComputingService } from '@modules/map-sandbox/shared/service/edit-computing.service';
import { linestringsExample, pointsExample, polygonsExample } from '@modules/map-sandbox/data-example';
import { readStringWktAndGroupedByGeomType } from '@modules/map-sandbox/import-tools/import-tools.component';
import Feature from 'ol/Feature';
import { zoomPadding } from '@modules/map-sandbox/shared/globals';
import { disabledIcon, loadIcon, visibleIcon, invisibleIcon, centerIcon, lockIcon, unLockIcon, unToggleIcon, toggleIcon } from '@modules/map-sandbox/shared/icons';


@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit, OnDestroy {
  map!: Map;

  private _currentEpsg!: string;
  private _toolsMode!: toolsTypes;

  @Input() epsgAvailable!: string[];

  @ViewChild('exportStringGeomDiv') exportStringGeomDiv!: ElementRef;

  disabledIcon = disabledIcon;
  loadIcon = loadIcon;
  visibleIcon = visibleIcon;
  invisibleIcon = invisibleIcon;
  centerIcon = centerIcon;
  lockIcon = lockIcon;
  unLockIcon = unLockIcon;
  unToggleIcon = unToggleIcon;
  toggleIcon = toggleIcon;

  allToggled: boolean = false;
  allVisible: boolean = true;
  allLocked: boolean = false;

  existingLayers: layerHandler[] = [];
  layersToDisplay: layerHandler[] = [];

  layerIdSelected: string | null = null;

  layerNamedIncrement: number = -1;

  mapSubscription!: Subscription;
  epsgChangesSubscription!: Subscription;
  layerIdSelectedSubscription!: Subscription;
  newFeaturesSubscription!: Subscription;

  private zoomPadding = zoomPadding;

  constructor(
    private mapService: MapService,
    private interactionsService: InteractionsService,
    private editComputingService: EditComputingService,
  ) {

    this.mapSubscription = this.mapService.map.subscribe(
      (map: Map) => {
        this.map = map;
      }
    );

    this.epsgChangesSubscription = this.mapService.setMapProjectionFromEpsg.subscribe(
      (epsg: string) => {
        this.currentEpsg = epsg;
      }
    )

    this.layerIdSelectedSubscription = this.interactionsService.layerIdSelected.subscribe(
      (layerIdSelected: string | null) => {
        this.layerIdSelected = layerIdSelected
      }
    )

    this.newFeaturesSubscription = this.editComputingService.newFeatures.subscribe(
      (newFeatures: featuresLayerType) => {
        this.createNewLayersFromFeatures(newFeatures)
      }
    )

  }

  ngOnInit(): void {
    this.mapService.getMap()
    this._mapExamplesData()
    this.zoomToLayers()
  }

  ngOnDestroy(): void {

    this.existingLayers.forEach((layerItem: layerHandler) => {
      this.map.removeLayer(layerItem.container.layer)
      layerItem.cleanEvents()
    })

    this.mapSubscription.unsubscribe();
    this.epsgChangesSubscription.unsubscribe();
    this.layerIdSelectedSubscription.unsubscribe();
    this.newFeaturesSubscription.unsubscribe();
  }

  private _mapExamplesData(): void {
    const featureParams = {
      dataProjection: this.currentEpsg,
      featureProjection: epsg3857
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

  addLayerFromFeatures(geomType: geomLayerTypes, features: Feature[]): void {
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
    if (layerId) {
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
    this.layerIdSelected = null
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
      let features: Feature[] = featuresToAdd[geomType]
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
        if (geomType === geomTypeLayer) {
          let features = featuresToAdd[geomType]
          layerObject.addFeaturesAndUpdateIds(features)  // TODO synchronize properties
          this.refreshLayers()
        }
      })
    }
  }

  // START layers controlers //
  zoomToLayers(): void {
    let emptyExtent = createEmpty();
    if (this.existingLayers.length > 0) {
      this.existingLayers.forEach((layer: layerHandler) => {
        extend(emptyExtent, layer.container.sourceFeatures.getExtent());
      })
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
