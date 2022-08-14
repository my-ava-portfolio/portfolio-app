import { Component, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';

import { faArrowsUpDownLeftRight, faCircle, faCirclePlus, faDrawPolygon, faGear, faLock, faLockOpen, faPencil } from '@fortawesome/free-solid-svg-icons';

import { layerHandler } from '@modules/map-sandbox/shared/core';

import { InteractionsService } from '../shared/service/interactions.service';
import { Subscription } from 'rxjs/internal/Subscription';


@Component({
  selector: 'app-edit-bar',
  templateUrl: './edit-bar.component.html',
  styleUrls: ['./edit-bar.component.scss']
})
export class EditBarComponent implements OnInit, OnDestroy {
  // @Input() layer!: layerHandler;
  @Input() currentEpsg!: string;

  layer!: layerHandler;

  currentLayerIdSelected!: string;

  addIcon = faCirclePlus;
  editIcon = faPencil;
  paramIcon = faGear;
  lockIcon = faLock;
  unLockIcon = faLockOpen;
  polygonIcon = faDrawPolygon;
  moveIcon = faArrowsUpDownLeftRight;

  isDrawn: boolean = false;
  isEdited: boolean = false;
  isHole: boolean = false;
  isMoved: boolean = false;
  isLocked!: boolean;

  // wkt import
  epsgAvailable = ["EPSG:4326", "EPSG:3857"]; //TODO refactor
  strInputDataValues: string | null = null;
  strInputEspgInput: string | null = null;

  tutu!: Subscription;

  layerLockStatusSubscription!: Subscription;

  constructor(
    private interactionsService: InteractionsService
  ) {

    this.layerLockStatusSubscription = this.interactionsService.layerLockStatus.subscribe(
      (locked: boolean) => {
        if (locked) {
          this.disableEditing()
        }
      }
    )



    this.tutu = this.interactionsService.currentSelectedLayer.subscribe(
      (layerSelected: layerHandler | null) => {
        if (this.layer !== undefined) {
          this.resetPreviousSelectedLayer(this.layer)
        }
        if (layerSelected !== null) {
          this.layer = layerSelected
        }
    }
    )
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.layerLockStatusSubscription.unsubscribe()

    this.disableEditing()
  }

  ngOnChanges(changes: any) {
    // if (changes.layer) {
    //   if (!changes.layer.firstChange) {
    //     this.resetPreviousSelectedLayer(changes.layer.previousValue)
    //   }
    // }
    // this.layer = changes.layer.currentValue
  }

  resetPreviousSelectedLayer(previousLayer: layerHandler): void {
    this.layer = previousLayer

    this.disableEditing()
  }

  disableSelectingOnAllLayers(): void { // not really on all layer
    this.interactionsService.setSelectingLayers(false)
  }

  enableSelectingOnAllLayers(): void {
    this.interactionsService.setSelectingLayers(true)
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

  removeFeature(): void {
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
    this.disableSelectingOnAllLayers()
    this.layer.enableDrawing(holeStatus);
    this.isDrawn = true;
  }

  private addFeatureDisable(): void {
    this.enableSelectingOnAllLayers()
    this.layer.disableDrawing();
    this.isDrawn = false;
  }

  private editFeatureEnable(): void {
    this.disableSelectingOnAllLayers()
    this.layer.enableEditing()
    this.isEdited = true;
  }

  private editFeatureDisable(): void {
    this.enableSelectingOnAllLayers()
    this.layer.disableEditing()
    this.isEdited = false
  }

  private addHoleFeatureEnable(holeStatus: boolean = true): void {
    this.disableSelectingOnAllLayers()
    this.layer.enableDrawing(holeStatus);
    this.isHole = true;
  }
  private addHoleFeatureDisable(): void {
    this.enableSelectingOnAllLayers()

    this.layer.disableDrawing();
    this.isHole = false;
  }

}
