import { layerHandler, refreshFeatureStyle } from '@modules/map-sandbox/shared/core';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { faLock, faLockOpen, faEyeSlash, faEye, faCircle, faCirclePlus, faCircleQuestion, faDrawPolygon, faGear, faLayerGroup, faPencil, faWaveSquare, faXmark, faCaretDown, faCaretUp, faExpand } from '@fortawesome/free-solid-svg-icons';
import { faClone } from '@fortawesome/free-regular-svg-icons';
import { InteractionsService } from '@modules/map-sandbox/shared/service/interactions.service';

@Component({
  selector: 'app-layer',
  templateUrl: './layer.component.html',
  styleUrls: ['./layer.component.scss']
})
export class LayerComponent implements OnInit {
  @Input() layer!: layerHandler;
  @Input() currentLayerIdSelected!: string;

  @Output() layerSelectedId = new EventEmitter<string>();
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

  isVisible: boolean = true;
  isDrawn: boolean = false;
  isEdited: boolean = false;
  isShown: boolean = false;
  isHole: boolean = false;
  isLocked: boolean = false;

  layerSelected: boolean = false;
  featureIdSelected!: string;

  constructor(
    private elementRef: ElementRef,
    private interactionsService: InteractionsService
  ) {

  }

  ngOnInit(): void {

    // enable selecting
    this.layer.enableSelecting()

    // set select event
    this.layer.select.on("select", (event: any) => {
      let deselected = event.deselected
      let selected = event.selected

      if (deselected.length > 0 && selected.length === 0) {
        deselected.forEach((_: any) => {
          this.unSelectFeature()
        })
      }

      if (selected.length > 0) {
        selected.forEach((feature: any) => {
          this.featureIdSelected = feature.getId();
          this.selectFeatureById(this.featureIdSelected)

        })

      }
    })

    this.layer.modifier.on('modifyend', (event: any) => {
      event.features.getArray().forEach((feature: any) => {
        this.selectFeatureById(this.featureIdSelected)
      })
    });

    this.layer.sourceFeatures.on('changefeature', (event: any) => {
      // update step when change on feature occurs
      refreshFeatureStyle(event.feature)
    })

  }

  ngOnDestroy(): void {

    // remove the modal div
    let modalLayerDiv = document.getElementById('modalLayer-' + this.layer.id)
    if (modalLayerDiv !== null) {
      modalLayerDiv.remove()
    }
    let modalWktDiv = document.getElementById('modalWktLayer-' + this.layer.id)
    if (modalWktDiv !== null) {
      modalWktDiv.remove()
    }

    this.elementRef.nativeElement.remove();
  }

  ngOnChanges(changes: SimpleChanges) {

    if (changes.currentLayerIdSelected.currentValue !== this.layer.id) {
      this.unSelectFeature()  // unselect feature selected if an other layer is selected
    }
  }

  visibleHandler(status: boolean): void {
    this.isVisible = status
    this.layer.vectorLayer.setVisible(status)
  }

  lockingLayer(): void {
    this.layer.locked = !this.layer.locked
    this.interactionsService.setLayerLockStatus(this.layer.locked)
  }

  removeLayer(): void {
    this.layer.removeLayer()
    this.removeLayerId.emit(this.layer.id)
    this.ngOnDestroy()
  }

  layerGoUp(): void{
    this.layerMoveUp.emit(this.layer.id)
  }

  layerGoDown(): void{
    this.layerMoveDown.emit(this.layer.id)
  }

  selectLayer(): void {
    this.unSelectFeature()

    this.layerSelected = !this.layerSelected
    this.layerSelectedId.emit(this.layer.id)
  }

  zoomToLayer(): void {
    this.layer.zoomToLayer()
  }

  duplicateLayer(): void {
    this.unSelectFeature()
    this.layerSelected = !this.layerSelected // TODO refactor ? on unSelectFeature() ?

    const layerCloned: layerHandler = Object.create(this.layer) // create a clone
    this.layerCloned.emit(layerCloned)
  }

  getLayerIdFromFeatureSelectedId(layerIdToSelect: string): void {
    // during feature selection
    this.layerSelectedId.emit(layerIdToSelect)
  }

  moveModalToBody(): void {
    // TODO create a global function
    let modalLayerDiv = document.getElementById('modalLayer-'+ this.layer.id);
    if (modalLayerDiv !== null) {

      let bodyDiv = document.body;
      if (bodyDiv !== null) {
        bodyDiv.appendChild(modalLayerDiv)
      }
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
    // this.featuresDisplayedObservable.next([feature])
  }
  removeFeatureById(featureId: any): void {
    // TODO move it on feature component ?
    this.layer.removeFeature(featureId)
  }

  duplicateFeatureById(featureId: any): void {
    // TODO move it on feature component ?
    this.unSelectFeature() // IMPORTANT: we must unselect to avoid conflict with the style applied during selection...
    this.layer.duplicateFeature(featureId)
    this.selectFeatureById(featureId) // then reselect it
  }

  private getFeature(featureId: string): any {
    let features = this.layer.features().filter((feature: any) => {
      return feature.getId() === featureId
    })
    if (features.length === 1) {
      return features[0]
    }
    return null
  }

  // END FEATURE FUNCS //

}


