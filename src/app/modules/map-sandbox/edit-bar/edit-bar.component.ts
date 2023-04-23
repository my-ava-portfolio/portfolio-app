import { Component, Input, OnDestroy, OnInit } from '@angular/core';

import { faArrowsUpDownLeftRight, faRoad, faCirclePlus, faDrawPolygon, faGear, faLock, faLockOpen, faPencil, faExpand, faCar, faPersonWalking } from '@fortawesome/free-solid-svg-icons';

import { getWkt, layerHandler } from '@modules/map-sandbox/shared/layer-handler/layer';

import { EditComputingService } from '../shared/service/edit-computing.service';
import { GraphComputingService } from '../shared/service/graph-computing.service';
import { Feature } from 'ol';

import { readStringWktAndGroupedByGeomType } from '@modules/map-sandbox/import-tools/import-tools.component'

@Component({
  selector: 'app-edit-bar',
  templateUrl: './edit-bar.component.html',
  styleUrls: ['./edit-bar.component.scss']
})
export class EditBarComponent implements OnInit, OnDestroy {
  private _layer!: layerHandler;
  @Input() currentEpsg!: string;

  private _enabled!: boolean

  addIcon = faCirclePlus;
  editIcon = faPencil;
  paramIcon = faGear;
  lockIcon = faLock;
  unLockIcon = faLockOpen;
  polygonIcon = faDrawPolygon;
  moveIcon = faArrowsUpDownLeftRight;
  pathIcon = faRoad;
  motorIcon = faCar;
  pedestrianIcon = faPersonWalking;
  centerIcon = faExpand;

  // add
  isDrawn: boolean = false;

  // edit
  isEdited: boolean = false;
  isHole: boolean = false;
  isMoved: boolean = false;

  // compute
  isShortestPath: boolean = false;

  // wkt import
  epsgAvailable = ["EPSG:4326", "EPSG:3857"]; //TODO refactor
  strInputDataValues: string | null = null;
  strInputEspgInput: string | null = null;

  constructor(
    private editComputingService: EditComputingService,
    private graphComputingService: GraphComputingService,
  ) {  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    this.disableEditing()
  }

  @Input()
  set layer(layer: layerHandler) {
    this._layer = layer
  }

  get layer(): layerHandler {
    return this._layer
  }

  @Input()
  set enabled(status: boolean) {
    if (!status) {
      this.disableEditing()
    }
    this._enabled = status
  }

  get enabled(): boolean {
    return this._enabled
  }

  disableEditing(unSelectLayer: boolean = true): void {
    this.drawHoleHandler(false)
    this.drawHandler(false)
    this.editHandler(false)
    this.translateHandler(false)

    if (unSelectLayer) {
      this.unSelectFeature()
    }
  }

  unSelectFeature(): void {
    this.layer.select.getFeatures().clear()

  }

  translateHandler(status: boolean): void {

    if (status) {
      this.disableEditing(false)
      this.translateFeatureEnable()
    } else {
      this.translateFeatureDisable()
    }
  }


  editHandler(status: boolean): void {
    if (status) {
      this.disableEditing(false)
      this.editFeatureEnable()
    } else {
      this.editFeatureDisable()
    }
  }

  drawHandler(status: boolean, holeStatus: boolean = false): void {
    if (status) {
      this.disableEditing(false)
      this.addFeatureEnable(holeStatus)
    } else {
      this.addFeatureDisable()
    }
  }

  drawHoleHandler(status: boolean, holeStatus: boolean = true): void {
    if (status) {
      this.disableEditing(false)
      this.addHoleFeatureEnable(holeStatus)
    } else {
      this.addHoleFeatureDisable()
    }
  }

  private translateFeatureEnable(): void {
    this.layer.enableTranslating()
    this.isMoved = true;
  }

  private translateFeatureDisable(): void {
    this.layer.disableTranslating()
    this.isMoved = false
  }

  private addFeatureEnable(holeStatus: boolean = false): void {
    this.layer.enableDrawing(holeStatus);
    this.isDrawn = true;
  }

  private addFeatureDisable(): void {
    this.layer.disableDrawing();
    this.isDrawn = false;
  }

  private editFeatureEnable(): void {
    this.layer.enableEditing()
    this.isEdited = true;
  }

  private editFeatureDisable(): void {
    this.layer.disableEditing()
    this.isEdited = false
  }

  private addHoleFeatureEnable(holeStatus: boolean = true): void {
    this.layer.enableDrawing(holeStatus);
    this.isHole = true;
  }
  private addHoleFeatureDisable(): void {

    this.layer.disableDrawing();
    this.isHole = false;
  }

  computeShortestPath(mode: 'pedestrian' | 'vehicle'): void {
    //TODO call osmrx-api
    let wktFeatures: string[] = []
      this.layer.container.features.forEach((feature: Feature) => {
        const featureCloned = feature.clone()
        let geom = featureCloned.getGeometry()
        if (geom !== undefined) {
          if (this.currentEpsg !== 'EPSG:4326') {
            geom = geom.transform(this.currentEpsg, 'EPSG:4326')
          }
          wktFeatures.push(getWkt(geom))
        }

      })
      const featureParams = {
        dataProjection: "EPSG:4326",
        featureProjection: this.currentEpsg
      }
      this.graphComputingService.getShortestPathFromApi(wktFeatures, mode).subscribe(
        // TODO improve it
        (data: string[]) => {
          const featuresToAdd = readStringWktAndGroupedByGeomType(data, featureParams)
          this.editComputingService.addNewFeatures(featuresToAdd)
        })

  }

  computeBoundingBox(): void {
    if (this.layer.container.features.length > 0) {
      this.editComputingService.addNewFeatures(this.layer.exportBoundsPolygon())
    }
  }
  
}
