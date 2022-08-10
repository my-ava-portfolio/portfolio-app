import { getWkt, layerHandler, refreshFeatureStyle } from '@modules/map-sandbox/shared/core';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { faEyeSlash, faEye, faCircle, faCirclePlus, faCircleQuestion, faDrawPolygon, faGear, faLayerGroup, faPencil, faWaveSquare, faXmark, faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';
import { Subject, Subscription } from 'rxjs';
import Feature from 'ol/Feature';
import { faClone } from '@fortawesome/free-regular-svg-icons';

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

  isVisible: boolean = true;
  isDrawn: boolean = false;
  isEdited: boolean = false;
  isShown: boolean = false;
  isHole: boolean = false;

  layerSelected: boolean = false;
  featureIdSelected!: string;

  featuresDisplayedObservable = new Subject<Feature[]>()
  featuresDisplayedSubscription!: Subscription;
  featuresPopupsProperties: any[] = []

  constructor(
    private elementRef: ElementRef
  ) {

    this.featuresDisplayedSubscription = this.featuresDisplayedObservable.subscribe(
      (features: Feature[]) => {
        this.resetFeaturesPopups()
        features.forEach((feature: Feature) => {
          this.buildFeaturesPopups(feature, false)
          this.moveToastsFeaturesToBody()
        })
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
      this.featuresDisplayedObservable.next([event.feature])
    })

  }

  ngOnDestroy(): void {
    this.featuresDisplayedSubscription.unsubscribe();

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
    }

  }


  visibleHandler(status: boolean): void {
    this.isVisible = status
    this.layer.vectorLayer.setVisible(status)
  }

  removeLayer(): void {
    // this.layer.removeLayer()
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
    this.resetFeaturesPopups()
    this.unSelectFeature()

    this.layerSelected = !this.layerSelected
    this.layerSelectedId.emit(this.layer.id)
  }

  duplicateLayer(): void {
    this.resetFeaturesPopups()
    this.unSelectFeature()
    this.layerSelected = !this.layerSelected // TODO refactor ? on unSelectFeature() ?

    const layerCloned: layerHandler = Object.create(this.layer) // create a clone
    this.layerCloned.emit(layerCloned)
  }

  updateLayerSelectionFromFeatureLayerId(layerIdToSelect: string): void {
    // during feature selection
    this.layerSelectedId.emit(layerIdToSelect)
  }

  unSelectFeature(): void {
    this.featureIdSelected = 'none'
    this.layer.select.getFeatures().clear()
  }

  selectFeatureById(featureId: any): void {

    this.featureIdSelected = featureId

    let feature = this.getFeature(this.featureIdSelected)
    this.layer.select.getFeatures().clear()
    this.layer.select.getFeatures().push(feature)
    this.featuresDisplayedObservable.next([feature])
  }
  removeFeatureById(featureId: any): void {
    this.layer.removeFeature(featureId)
  }

  duplicateFeatureById(featureId: any): void {
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

  resetFeaturesPopups(): void {
    this.featuresPopupsProperties = []
  }
  buildFeaturesPopups(feature: Feature, isNotify: boolean): any {

    // get wkt regarding selected projection
    const geomFeature = feature.getGeometry();
    if (geomFeature !== undefined) {

      this.featuresPopupsProperties.push({
        'id': feature.getId(),
        'name': feature.get('name'),
        'layer_id': this.layer.id,
        'geom_type': feature.get('geom_type'),
        'created_at': feature.get('created_at'),
        'updated_at': feature.get('updated_at'),
        'fill_color': feature.get('fill_color'),
        'stroke_color': feature.get('stroke_color'),
        'stroke_width': feature.get('stroke_width'),
        'wkt': getWkt(geomFeature)
      })
    }
  }

  updateFillColor(featureId: string, color: string): void {
    let feature = this.getFeature(featureId)
    feature.set("fill_color", color, false)
  }
  updateStrokeWidth(featureId: string, event: any): void {
    let feature = this.getFeature(featureId)
    feature.set("stroke_width", event.target.value, true)
  }
  updateStrokeColor(featureId: string, color: string): void {
    let feature = this.getFeature(featureId)
    feature.set("stroke_color", color, true)
  }

  copyToClipboard(value: string): void {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = value;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
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

  moveToastsFeaturesToBody(): void {
    // TODO create a global function
    let toastFeatureDiv = document.getElementById('featureToasts');
    if (toastFeatureDiv !== null) {

      let bodyDiv = document.body;
      if (bodyDiv !== null) {
        bodyDiv.appendChild(toastFeatureDiv)

      }
    }
  }



}


