import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';

import { faArrowsUpDownLeftRight, faRoad, faCirclePlus, faDrawPolygon, faGear, faLock, faLockOpen, faPencil, faExpand } from '@fortawesome/free-solid-svg-icons';

import { getWkt, layerHandler } from '@modules/map-sandbox/shared/layer-handler';

import { InteractionsService } from '../shared/service/interactions.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { EditComputingService } from '../shared/service/edit-computing.service';
import { GraphComputingService } from '../shared/service/graph-computing.service';
import { Feature } from 'ol';
import { LineString } from 'ol/geom';
import { lineStringType } from '../shared/data-types';


@Component({
  selector: 'app-edit-bar',
  templateUrl: './edit-bar.component.html',
  styleUrls: ['./edit-bar.component.scss']
})
export class EditBarComponent implements OnInit, OnDestroy {
  @Input() layer!: layerHandler;
  @Input() currentEpsg!: string;

  addIcon = faCirclePlus;
  editIcon = faPencil;
  paramIcon = faGear;
  lockIcon = faLock;
  unLockIcon = faLockOpen;
  polygonIcon = faDrawPolygon;
  moveIcon = faArrowsUpDownLeftRight;
  pathIcon = faRoad;
  centerIcon = faExpand;

  // add
  isDrawn: boolean = false;

  // edit
  isEdited: boolean = false;
  isHole: boolean = false;
  isMoved: boolean = false;

  // compute
  isShortestPath: boolean = false;

  isEditBarEnabled!: boolean;;

  // wkt import
  epsgAvailable = ["EPSG:4326", "EPSG:3857"]; //TODO refactor
  strInputDataValues: string | null = null;
  strInputEspgInput: string | null = null;

  layerLockStatusSubscription!: Subscription;

  constructor(
    private interactionsService: InteractionsService,
    private editComputingService: EditComputingService,
    private graphComputingService: GraphComputingService,
    private cdRef: ChangeDetectorRef,
  ) {

    this.layerLockStatusSubscription = this.interactionsService.editBarActivation.subscribe(
      (activated: boolean) => {
        if (activated) {
          this.isEditBarEnabled = true
        } else {
          this.isEditBarEnabled = false

          this.disableEditing()
        }
        this.cdRef.detectChanges();
      }
    )

  }

  ngOnInit(): void {
    this.isEditBarEnabled = !this.layer.locked
  }

  ngOnDestroy(): void {
    this.disableEditing()
    this.layerLockStatusSubscription.unsubscribe()
  }

  ngOnChanges(changes: any) {
  }

  enablingSelectOnlyOnTheCurrentLayer(): void { // not really on all layer
    this.interactionsService.setSelectableLayer(this.layer.id)
  }

  enableSelectingOnAllLayers(): void {
    this.interactionsService.setSelectableAllLayers()
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

      this.enablingSelectOnlyOnTheCurrentLayer()

      this.addFeatureEnable(holeStatus)
    } else {
      this.addFeatureDisable()
      this.enableSelectingOnAllLayers()

    }
  }

  drawHoleHandler(status: boolean, holeStatus: boolean = true): void {
    if (status) {
      this.disableEditing(false)

      this.enablingSelectOnlyOnTheCurrentLayer()

      this.addHoleFeatureEnable(holeStatus)
    } else {
      this.addHoleFeatureDisable()
      this.enableSelectingOnAllLayers()

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

  computeShortestPath(): void {
    //TODO call osmrx-api
    let wktFeatures: string[] = []
    if (this.layer.features().length > 0) {

      this.layer.features().forEach((feature: Feature) => {
        const featureCloned = feature.clone()
        let geom = featureCloned.getGeometry()
        if (geom !== undefined) {
          if (this.currentEpsg !== 'EPSG:4326') {
            geom = geom.transform(this.currentEpsg, 'EPSG:4326')
          }
          wktFeatures.push(getWkt(geom))
        }

      })

      this.graphComputingService.getShortestPathFromApi(wktFeatures).subscribe(
        // TODO improve it
        (data: number[][]) => {
          let path!: any;
          path = new LineString(data)
          if (this.currentEpsg !== 'EPSG:4326') {
            path = path.transform('EPSG:4326', this.currentEpsg)
          }
          let feature: Feature = new Feature({
            geometry: path
          });
          let geomType: lineStringType = 'LineString'
          this.editComputingService.addNewFeatures( {[geomType]: [feature]})

        })
      
    }
  }

  computeBoundingBox(): void {
    if (this.layer.features().length > 0) {
      this.editComputingService.addNewFeatures(this.layer.exportBoundsPolygon())
    }
  }
}
