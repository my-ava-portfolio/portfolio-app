import { Component, ElementRef, Input, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { faXmark, faCircle, faWaveSquare, faDrawPolygon, faUpload, faExpand, faEyeSlash, faLock, faLockOpen } from '@fortawesome/free-solid-svg-icons';
import { layerHandler, layerHandlerPositionning } from '@modules/map-sandbox/shared/core';

import Map from 'ol/Map';
import {createEmpty} from 'ol/extent';
import {extend} from 'ol/extent';

import { MapService } from '@services/map.service';
import { Subscription } from 'rxjs';

import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import WKT from 'ol/format/WKT';
import { faEye } from '@fortawesome/free-regular-svg-icons';
import { InteractionsService } from '../shared/service/interactions.service';

import { geomLayerTypes } from '@modules/map-sandbox/shared/data-types';


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
  @ViewChild('layersListDiv') layersListDiv!: ElementRef;

  disabledIcon = faXmark;
  pointIcon = faCircle;
  lineStringIcon = faWaveSquare;
  polygonIcon = faDrawPolygon;
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

  createFromModesSupported = [
    {
      "mode": 'GeoJSON',
      "label": 'Importer un GeoJSON',
      "label_text": "GeoJSON",
      "icon": this.loadIcon
    },
    {
      "mode": 'WKT',
      "label": 'Importer un/des WKT(s)',
      "label_text": "WKT(s)",
      "icon": this.loadIcon
    },
  ]
  importDataType!: string;
  strInputDataValues: string | null = null;
  strInputEpsgInput: string | null = null;
  modeImportInput: string = 'new';

  epsgChangesSubscription!: Subscription;
  layerIdSelectedSubscription!: Subscription;

  zoomPadding = [100, 100, 100, 100];  // TODO refactor

  constructor(
    private mapService: MapService,
    private interactionsService: InteractionsService,
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

   }

  ngOnInit(): void {

    this.moveImportDataModalToBody()
  }

  ngOnDestroy(): void {

    this.existingLayers.forEach((layer: any) => {
      this.map.removeLayer(layer.vectorLayer)
      layer.cleanEvents()
    })

    this.epsgChangesSubscription.unsubscribe()
    this.layerIdSelectedSubscription.unsubscribe()

  }

  ngOnChanges(changes: SimpleChanges) {

    if (changes.layersListDiv) {
      this.refreshLayers()
    }
  }

  addLayer(geomType: geomLayerTypes, groupId: string | null = null): void {
    // TODO geomType set types in create-tools components
    const layerNo: number = ++this.layerNamedIncrement
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

  duplicateLayer(layer: layerHandler): void {
    const layerNo: number = this.existingLayers.length
    let newLayer = new layerHandler(
      this.map,
      layer.layerName + " copy",
      layer.geomType,
      layerNo, // Zindex
      null
    )
    // copy the feature from the current feature selecte to duplicate
    newLayer.addFeaturesAndUpdateIds(layer.features())
    this.existingLayers.push(newLayer)
    this.refreshLayers()
  }

  addLayerFromFeatures(geomType: 'Point' | 'LineString' | 'Polygon', features: any[]): void {
    // TODO verify if geomType and features geom type match
    const layerNo: number = ++this.layerNamedIncrement
    let newLayer = new layerHandler(
      this.map,
      'layer ' + layerNo,
      geomType,
      layerNo, // Zindex
      null
    )
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


  moveImportDataModalToBody(): void {
    // TODO create a global function
    let modalLayerDiv = document.getElementById('modalDataImport');
    if (modalLayerDiv !== null) {

      let bodyDiv = document.body;
      if (bodyDiv !== null) {
        bodyDiv.appendChild(modalLayerDiv)
      }
    }
  }

  setImportDataType(dataType: string): void {
    this.importDataType = dataType;
  }

  importFromFormat(): void {
    let featureParams = {}
    if (this.strInputEpsgInput !== this.currentEpsg) {
      featureParams = {
        dataProjection: this.strInputEpsgInput,
        featureProjection: this.currentEpsg
      }
    }

    let featuresToAdd: any;

    if (this.strInputDataValues !== null) {
      if (this.importDataType === "GeoJSON") {
        featuresToAdd = readGeoJsonAndGroupedByGeomType(this.strInputDataValues, featureParams)
      } else if (this.importDataType === "WKT(s)") {
        featuresToAdd = readStringWktAndGroupedByGeomType(this.strInputDataValues.split('\n'), featureParams)
      }
      if (this.modeImportInput === 'new') {
        Object.keys(featuresToAdd).forEach((geomType) => {
          let features = featuresToAdd[geomType]
          this.addLayerFromFeatures(geomType as geomLayerTypes, features)
        })
      } else {
        let layerTarget = this.getLayerFromId(this.modeImportInput)
        Object.keys(featuresToAdd).forEach((geomType: string) => {
          let features = featuresToAdd[geomType]
          if (geomType === layerTarget.geomType) {
            layerTarget.addFeaturesAndUpdateIds(features)  // TODO synchronize properties      
            this.refreshLayers()
          }
        })
      }
    }

    this.strInputDataValues = null;
    this.strInputEpsgInput = null;
    this.modeImportInput = 'new';
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

function readGeoJsonAndGroupedByGeomType(geoData: string, featureParams: any): any {
  let featuresGroupedByGeom = {}
  const vectorSource = new VectorSource({
    features: new GeoJSON().readFeatures(JSON.parse(geoData, featureParams))
  });

  const features = vectorSource.getFeatures()
  featuresGroupedByGeom = groupByGeomType(features)
  
  return featuresGroupedByGeom

}

function readStringWktAndGroupedByGeomType(inputWkts: string[], featureParams: any): any {
  let featuresGroupedByGeom: any = {}
  inputWkts.forEach((wktValue: string) => {
    // POLYGON((10.689 -25.092, 34.595 -20.170, 38.814 -35.639, 13.502 -39.155, 10.689 -25.092))
    let feature!: any;
    try {
      feature = new WKT().readFeature(wktValue, featureParams);
    } catch (error: any) { // TODO catche the expected exception
      alert(error.message)
    }

    if (feature !== undefined && !feature.getGeometry().flatCoordinates.includes(NaN) ) {
      // NaN check appears if the projection is not well defined
      const featureGeom = feature.getGeometry();
      const featureGeomType: string = featureGeom.getType()
      if (!( featureGeomType in featuresGroupedByGeom)) {
        featuresGroupedByGeom[featureGeomType] = []
      }

      if (featureGeom !== undefined) {
        featuresGroupedByGeom[featureGeomType].push(feature)
      }
    }
    // TODO addd gui warning if something wrong appears with geom
    // => need to create a dedicated component

  })
  return featuresGroupedByGeom
}

function groupByGeomType(objectArray: any[]) {
  return objectArray.reduce((acc: any, obj: any) => {
    let key = obj.getGeometry().getType();
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(obj);
    return acc;
  }, {});
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