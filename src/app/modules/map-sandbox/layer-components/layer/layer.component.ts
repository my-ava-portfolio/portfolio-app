import { layerHandler, refreshFeatureStyle } from '@modules/map-sandbox/shared/layer-handler/layer-handler';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, OnDestroy, ViewChild } from '@angular/core';
import { InteractionsService } from '@modules/map-sandbox/shared/service/interactions.service';
import { Subscription } from 'rxjs';
import { EditComputingService } from '@modules/map-sandbox/shared/service/edit-computing.service';
import { ModalComponent } from '@shared/modules/items/modal/modal.component';
import { addIcon, centerIcon, clearIcon, downIcon, duplicateIcon, editIcon, groupIcon, helpIcon, invisibleIcon, lineStringIcon, lockIcon, paramIcon, pointIcon, polygonIcon, removeIcon, toggleIcon, unLockIcon, unToggleIcon, upIcon, visibleIcon } from '@modules/map-sandbox/shared/icons';


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

  groupIcon = groupIcon;
  helpIcon = helpIcon;
  addIcon = addIcon;
  editIcon = editIcon;
  paramIcon = paramIcon;
  clearIcon = clearIcon;
  removeIcon = removeIcon;
  pointIcon = pointIcon;
  lineStringIcon = lineStringIcon;
  polygonIcon = polygonIcon;
  visibleIcon = visibleIcon;
  invisibleIcon = invisibleIcon;
  upIcon = upIcon;
  downIcon = downIcon;
  duplicateIcon = duplicateIcon;
  centerIcon = centerIcon;
  lockIcon = lockIcon;
  unLockIcon = unLockIcon;
  unToggleIcon = unToggleIcon
  toggleIcon = toggleIcon

  private _epsg!: string
  private _selected: boolean = false
  displayTool: boolean = false;

  featuresIdSelected: string[] = [];

  removeLayerSubscription!: Subscription;
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

  @ViewChild('modalLayerSettings') private modalLayerSettingComponent!: ModalComponent
  async openSettings() {
    return await this.modalLayerSettingComponent.open()
  }

  @ViewChild('modalLayerTable') private modalLayerTableComponent!: ModalComponent
  async openTable() {
    return await this.modalLayerTableComponent.open()
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
    this.zoomToLayer()

  }

  ngOnDestroy(): void {

    this.isLayerRemoved = true;

    let modalWktDiv = document.getElementById('modalWktLayer-' + this.layer.container.uuid)
    if (modalWktDiv !== null) {
      modalWktDiv.remove()
    }

    this.removeLayerSubscription.unsubscribe();
    this.featureIdEditedSubscription.unsubscribe();

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
      this.unSelectFeatures()
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

      if (event.mapBrowserEvent.originalEvent.shiftKey) {
        // multiple selections
        selected.forEach((feature: any) => {
          this.featuresIdSelected.push(feature.get('id'))
          this.layer.select.getFeatures().push(feature)
          this.selectLayer()
        })
      } else {

        if (deselected.length > 0) {
          this.unSelectFeatures()
        }

        if (selected.length == 0) {
          this.selected = false
        }

        if (deselected.length == 0) {
          this.selected = true
        }

        if (selected.length > 0) {
          selected.forEach((feature: any) => {
            this.featuresIdSelected.push(feature.get('id'))
            this.layer.select.getFeatures().push(feature)
          })
        }

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
  unSelectLayer(): void {
    this.interactionsService.sendSelectedLayerId(null)
  }

  zoomToLayer(): void {
    this.layer.zoomToLayer()
  }

  duplicateLayer(): void {
    this.unSelectFeatures()
    const layerCloned: layerHandler = Object.create(this.layer) // create a clone
    this.layerCloned.emit(layerCloned)
  }

  // START FEATURE FUNCS //

  unSelectFeatures(): void {
    this.featuresIdSelected = []
    this.layer.select.getFeatures().clear()
    // this.layer.select.getFeatures().dispose()
  }

  selectFeatureById(featureId: any): void {
    this.unSelectFeatures()
    this.featuresIdSelected.push(featureId)

    let feature = this.getFeature(featureId)
    // this.layer.enableSelecting()
    // this.layer.select.getFeatures().clear()
    this.layer.select.getFeatures().push(feature)

    this.selected = true
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


