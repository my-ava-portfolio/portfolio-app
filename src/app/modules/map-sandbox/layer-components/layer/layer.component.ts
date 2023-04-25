import { layerHandler, refreshFeatureStyle } from '@modules/map-sandbox/shared/layer-handler/layer-handler';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, OnDestroy } from '@angular/core';
import { faLock, faLockOpen, faEyeSlash, faEye, faCircle, faCirclePlus, faCircleQuestion, faDrawPolygon, faGear, faLayerGroup, faPencil, faWaveSquare, faXmark, faCaretDown, faCaretUp, faExpand } from '@fortawesome/free-solid-svg-icons';
import { faClone, faMinusSquare, faPlusSquare } from '@fortawesome/free-regular-svg-icons';
import { InteractionsService } from '@modules/map-sandbox/shared/service/interactions.service';
import { Subscription } from 'rxjs';
import { EditComputingService } from '@modules/map-sandbox/shared/service/edit-computing.service';


@Component({
  selector: 'app-layer',
  templateUrl: './layer.component.html',
  styleUrls: ['./layer.component.scss'],
})
export class LayerComponent implements OnInit, OnDestroy {
  private _layer!: layerHandler;

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
  unToggleIcon = faMinusSquare
  toggleIcon = faPlusSquare

  private _epsg!: string
  private _selected: boolean = false
  displayTool: boolean = false;

  isDrawn: boolean = false;
  isEdited: boolean = false;
  isShown: boolean = false;
  isHole: boolean = false;

  featureIdSelected!: string;

  removeLayerSubscription!: Subscription;
  displayLayerModal = false;
  isLayerRemoved = false;
  exportData: string = '';
  exportDataMode = 'geojson'
  featureIdEditedSubscription!: Subscription

  constructor(
    private elementRef: ElementRef,
    private interactionsService: InteractionsService,
    private editComputingService: EditComputingService
  ) {

    this.removeLayerSubscription = this.interactionsService.removeLayers.subscribe(
      (_: boolean) => {
        // to remove the layer, if all layers must be removed
        this.removeLayer()
      }
    )

    this.featureIdEditedSubscription = this.editComputingService.snappingLayerEnabled.subscribe(
      (snappingLayerEnabled: boolean) => {
        // mandatory to manage selecting and enable snapping interactionbetween layers when editing
        if (snappingLayerEnabled) {
          // this.layer.enableSelecting()
          this.layer.enableSnapping()
        } else {
          this.layer.disableSnapping()

        }
      }
    )

  }

  ngOnInit(): void {
    
    // enable selecting 
    // TODO useless ?
    // this.layer.enableSnapping()
    this.layer.enableSelecting()

    // set select interaction event
    this.layerSelectConfigured()

    this.layer.container.sourceFeatures.on('changefeature', (event: any) => {
      // update step when change on feature occurs
      refreshFeatureStyle(event.feature)
    })

  }

  ngOnDestroy(): void {

    this.isLayerRemoved = true;
    
    let modalWktDiv = document.getElementById('modalWktLayer-' + this.layer.container.uuid)
    if (modalWktDiv !== null) {
      modalWktDiv.remove()
    }
    
    this.removeLayerSubscription.unsubscribe();
    this.layer.disableSelecting()
    this.elementRef.nativeElement.remove();
  }

  toggleFeatures(): void {
    this.toggled = !this.toggled;
  }

  @Input()
  set layer(layer: layerHandler) {
    this._layer = layer
  }

  get layer(): layerHandler {
    return this._layer
  }

  @Input()
  set epsg(value: string) {
    if (value !== this._epsg && this._epsg !== undefined) {
      this.layer.container.features.forEach((feature: any) => {
        console.log(this._epsg, value)
        feature.setGeometry(feature.getGeometry().transform(this._epsg, value))
      });
    }

    this._epsg = value
  }

  get epsg(): string {
    return this._epsg
  }

  @Input()
  set visible(status: boolean) {
    this.layer.container.visible = status
  }

  get visible(): boolean {
    return this.layer.container.visible;
  }

  @Input()
  set locked(status: boolean) {
    this.layer.container.locked = status
  }

  get locked(): boolean {
    return this.layer.container.locked;
  }

  @Input()
  set toggled(status: boolean) {
    this.layer.container.featuresToggled = status
  }

  get toggled(): boolean {
    return this.layer.container.featuresToggled;
  }
  
  @Input()
  set selected(status: boolean) {
    
    if (!status) {
      // unselect all the features
      this.unSelectFeature()
    } else {
      this.selectLayer()
    }
    this._selected = status
  }

  get selected(): boolean {
    return this._selected;
  }

  layerSelectConfigured(): void {
    // set select event: mandatory to connect ol api and angular mecanisms
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
  }

  removeLayer(): void {
    this.layer.removeLayer()
    this.removeLayerId.emit(this.layer.container.uuid)
    this.ngOnDestroy()
  }

  layerGoUp(): void{
    this.layerMoveUp.emit(this.layer.container.uuid)
  }

  layerGoDown(): void{
    this.layerMoveDown.emit(this.layer.container.uuid)
  }

  selectLayer(): void {
    this.interactionsService.sendSelectedLayerId(this.layer.container.uuid)
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
    this.layer.enableSelecting()  // mandatory
    this.layer.select.getFeatures().clear()
    this.layer.select.getFeatures().push(feature)

    this.selectLayer()
  }

  private getFeature(featureId: string): any {
    let features = this.layer.container.features.filter((feature: any) => {
      return feature.getId() === featureId
    })
    if (features.length === 1) {
      return features[0]
    }
    return null
  }

  // END FEATURE FUNCS //

}


