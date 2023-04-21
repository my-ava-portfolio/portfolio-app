import { layerHandler, refreshFeatureStyle } from '@modules/map-sandbox/shared/layer-handler/layer-handler';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { faLock, faLockOpen, faEyeSlash, faEye, faCircle, faCirclePlus, faCircleQuestion, faDrawPolygon, faGear, faLayerGroup, faPencil, faWaveSquare, faXmark, faCaretDown, faCaretUp, faExpand } from '@fortawesome/free-solid-svg-icons';
import { faClone } from '@fortawesome/free-regular-svg-icons';
import { InteractionsService } from '@modules/map-sandbox/shared/service/interactions.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-layer',
  templateUrl: './layer.component.html',
  styleUrls: ['./layer.component.scss'],
})
export class LayerComponent implements OnInit {
  @Input() layer!: layerHandler;

  @Input() layersVisibleStatus!: boolean;

  @Output() layerIdCurrentlySelected = new EventEmitter<string>();

  @Output() layerMoveUp = new EventEmitter<string>(); // go to update the layer which need a zindex changes regarding the action
  @Output() layerMoveDown = new EventEmitter<string>(); // go to update the layer which need a zindex changes regarding the action
  @Output() layerCloned = new EventEmitter<layerHandler>();
  @Output() removeLayerId = new EventEmitter<string>();

  groupIcon = faLayerGroup;
  helpIcon = faCircleQuestion;
  addIcon = faCirclePlus;
  editIcon = faPencil;
  paramIcon = faGear;
  disabledIcon = faXmark;
  EditIcon = faCircle;
  pointIcon = faCircle;
  lineStringIcon = faWaveSquare;
  polygonIcon = faDrawPolygon;
  visibleIcon = faEye;
  invisibleIcon = faEyeSlash;
  upIcon = faCaretUp;
  downIcon = faCaretDown;
  duplicateIcon = faClone;
  centerIcon = faExpand;
  lockIcon = faLock;
  unLockIcon = faLockOpen;

  private _epsg!: string
  private _selected: boolean = false
  displayTool: boolean = false;

  isDrawn: boolean = false;
  isEdited: boolean = false;
  isShown: boolean = false;
  isHole: boolean = false;
  @Input() isLocked: boolean = false;

  featureIdSelected!: string;

  removeLayerSubscription!: Subscription;
  selectableLayerStatusSubscription!: Subscription;
  selectableAllLayersStatusSubscription!: Subscription;

  // layerIdSelectedSubscription!: Subscription;

  displayLayerModal = false;
  isLayerRemoved = false;
  exportData: string = '';
  exportDataMode = 'geojson'

  constructor(
    private elementRef: ElementRef,
    private interactionsService: InteractionsService,
  ) {

    this.removeLayerSubscription = this.interactionsService.removeLayers.subscribe(
      (_: boolean) => {
        // to remove the layer, if all layers must be removed
        this.removeLayer()
      }
    )
  
    this.selectableLayerStatusSubscription = this.interactionsService.selectableLayerId.subscribe(
      (layerIdtoSelect: string) => {

        if (this.layer.uuid !== layerIdtoSelect) {
          this.layer.disableSelecting()
        } else {
          this.layer.disableSelecting()
          this.layer.enableSelecting()
        }
      }
    )

    this.selectableAllLayersStatusSubscription = this.interactionsService.selectableAllLayers.subscribe(
      (_: boolean) => {
        this.layer.disableSelecting()
        this.layer.enableSelecting()
      }
    )
   
  }

  ngOnInit(): void {
    
    // enable selecting
    this.layer.enableSelecting()

    // set select event
    this.layer.select.on("select", (event: any) => {
      let deselected = event.deselected
      let selected = event.selected
      
      if (deselected.length > 0 && selected.length === 0) {
        this.unSelectFeature()

      }

      if (selected.length > 0) {
        selected.forEach((feature: any) => {
          this.selectFeatureById(feature.getId())
        })

      }
    })

    this.layer.sourceFeatures.on('changefeature', (event: any) => {
      // update step when change on feature occurs
      refreshFeatureStyle(event.feature)
    })

  }

  ngOnDestroy(): void {

    this.isLayerRemoved = true;
    
    let modalWktDiv = document.getElementById('modalWktLayer-' + this.layer.uuid)
    if (modalWktDiv !== null) {
      modalWktDiv.remove()
    }
    
    this.removeLayerSubscription.unsubscribe();
    this.selectableLayerStatusSubscription.unsubscribe();
    this.selectableAllLayersStatusSubscription.unsubscribe();

    this.layer.disableSelecting()
    this.elementRef.nativeElement.remove();
  }

  @Input()
  set epsg(value: string) {
    this._epsg = value
  }

  get epsg(): string {
    return this._epsg
  }

  @Input()
  set visible(status: boolean) {
    this.layer.vectorLayer.setVisible(status)
  }

  get visible(): boolean {
    return this.layer.vectorLayer.getVisible();
  }

  @Input()
  set locked(status: boolean) {
    this.isLocked = status
    this.layer.locked = this.isLocked
    if (this.selected) {
      // it concerns here only the selected layer
      this.interactionsService.activateEditBar(!this.layer.locked)
    }
  }

  get locked(): boolean {
    return this.layer.locked;
  }

  @Input()
  set selected(status: boolean) {
    console.log(status)
    if (!status) {
      // unselect all the features
      this.unSelectFeature()
    } else {
      this.selectLayer()
    }
    console.log(status)
    this._selected = status

  }

  get selected(): boolean {
    return this._selected;
  }

  removeLayer(): void {
    this.layer.removeLayer()
    this.removeLayerId.emit(this.layer.uuid)
    // this.interactionsService.sendSelectedLayer(null)

    this.ngOnDestroy()
  }

  layerGoUp(): void{
    this.layerMoveUp.emit(this.layer.uuid)
  }

  layerGoDown(): void{
    this.layerMoveDown.emit(this.layer.uuid)
  }

  selectLayer(): void {
    this.interactionsService.sendSelectedLayerId(this.layer.uuid)
    this.interactionsService.sendSelectedLayer(this.layer) // for layout component
  }

  zoomToLayer(): void {
    this.layer.zoomToLayer()
  }

  duplicateLayer(): void {
    this.unSelectFeature()
    const layerCloned: layerHandler = Object.create(this.layer) // create a clone
    this.layerCloned.emit(layerCloned)
  }

  hideModalLayer(): void {
    this.displayLayerModal = false;
  }

  displayLayerSettings(): void {
    this.displayLayerModal = true;
    this.exportBuilder(this.exportDataMode)
  }

  exportBuilder(mode: string): void {
    this.exportDataMode = mode
    if (mode === 'wkt') {
      this.exportData = this.layer.exportToWkt()
    } else if (mode === 'geojson') {
      this.exportData = this.layer.exportToGeoJSON()
    } else if (mode === 'pytestFixture') {
      this.exportData = this.layer.exportToPytestFixture()
    }
  }

  // START FEATURE FUNCS //

  unSelectFeature(): void {
    this.featureIdSelected = 'none'
    this.layer.select.getFeatures().clear()
  }

  selectFeatureById(featureId: any): void {

    this.featureIdSelected = featureId

    let feature = this.getFeature(this.featureIdSelected)

    this.layer.select.getFeatures().clear()
    this.layer.select.getFeatures().push(feature)

    this.selectLayer()
  }

  private getFeature(featureId: string): any {
    let features = this.layer.features.filter((feature: any) => {
      return feature.getId() === featureId
    })
    if (features.length === 1) {
      return features[0]
    }
    return null
  }

  // END FEATURE FUNCS //

}


