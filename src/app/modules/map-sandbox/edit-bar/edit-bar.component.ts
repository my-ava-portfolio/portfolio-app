import { Component, Input, OnDestroy, OnInit } from '@angular/core';

import { layerHandler } from '@modules/map-sandbox/shared/layer-handler/layer-handler';

import { EditComputingService } from '../shared/service/edit-computing.service';
import { addIcon, centerIcon, editIcon, moveIcon, polygonIcon, snapIcon } from '../shared/icons';


@Component({
  selector: 'app-edit-bar',
  templateUrl: './edit-bar.component.html',
  styleUrls: ['./edit-bar.component.scss']
})
export class EditBarComponent implements OnInit, OnDestroy {
  private _layer!: layerHandler;
  @Input() currentEpsg!: string;

  private _enabled!: boolean

  addIcon = addIcon;
  editIcon = editIcon;
  polygonIcon = polygonIcon;
  moveIcon = moveIcon;
  centerIcon = centerIcon;
  snapIcon = snapIcon;

  // add
  isDrawn: boolean = false;

  // edit
  isEdited: boolean = false;
  isHole: boolean = false;
  isMoved: boolean = false;

  // compute
  isShortestPath: boolean = false;

  // misc
  editing: boolean = false;
  isSnapped: boolean = false;

  // wkt import
  epsgAvailable = ["EPSG:4326", "EPSG:3857"]; //TODO refactor
  strInputDataValues: string | null = null;
  strInputEspgInput: string | null = null;

  constructor(
    private editComputingService: EditComputingService,
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

  enableSnapModeOnAllOthersLayers(): void {
    // must be enabled at the end the interactions setter
    // to enable snapping on all layers
    if (this.isSnapped) {
      this.editComputingService.activateSnapping(true)
    }
  }

  disableSnapModeOnAllOthersLayers(): void {
    // to disable snapping on all layers, only if snap mode is enabled
    // to avoid useless call to remove the interaction
    if (this.isSnapped) {
      this.editComputingService.activateSnapping(false)
    }
 }

  snappingHandler(status: boolean): void {
    this.isSnapped = status
    if (!status) {
      this.disableSnapModeOnAllOthersLayers()
    }
  }

  disableEditing(unSelectLayer: boolean = true): void {
    this.drawHoleHandler(false)
    this.drawHandler(false)
    this.editHandler(false)
    this.translateHandler(false)
    this.disableSnapModeOnAllOthersLayers()
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
      this.enableSnapModeOnAllOthersLayers()
    } else {
      this.editFeatureDisable()
      this.disableSnapModeOnAllOthersLayers()
    }
  }

  drawHandler(status: boolean, holeStatus: boolean = false): void {
    if (status) {
      this.disableEditing(false)
      this.addFeatureEnable(holeStatus)
      this.enableSnapModeOnAllOthersLayers()
    } else {
      this.addFeatureDisable()
      this.disableSnapModeOnAllOthersLayers()
    }

  }

  drawHoleHandler(status: boolean, holeStatus: boolean = true): void {
    if (status) {
      this.disableEditing(false)
      this.addHoleFeatureEnable(holeStatus)
      this.enableSnapModeOnAllOthersLayers()
    } else {
      this.addHoleFeatureDisable()
      this.disableSnapModeOnAllOthersLayers()
    }
  }

  private translateFeatureEnable(): void {
    this.layer.enableTranslating()
    this.isMoved = true;
    this.editing = true
  }

  private translateFeatureDisable(): void {
    this.layer.disableTranslating()
    this.isMoved = false
    this.editing = false
  }

  private addFeatureEnable(holeStatus: boolean = false): void {
    this.layer.enableDrawing(holeStatus);
    this.isDrawn = true;
    this.editing = true
  }

  private addFeatureDisable(): void {
    this.layer.disableDrawing();
    this.isDrawn = false;
    this.editing = false

  }

  private editFeatureEnable(): void {
    this.layer.enableEditing()
    this.isEdited = true;
    this.editing = true

  }

  private editFeatureDisable(): void {
    this.layer.disableEditing()
    this.isEdited = false
    this.editing = false
  }

  private addHoleFeatureEnable(holeStatus: boolean = true): void {
    this.layer.enableDrawing(holeStatus);
    this.isHole = true;
    this.editing = true
  }
  private addHoleFeatureDisable(): void {

    this.layer.disableDrawing();
    this.isHole = false;
    this.editing = false
  }

  computeBoundingBox(): void {
    if (this.layer.container.features.length > 0) {
      this.editComputingService.addNewFeatures(this.layer.exportBoundsPolygon())
    }
  }

}
