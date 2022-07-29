import { getWkt, layerHandler, refreshFeatureStyle } from '@modules/map-sandbox/shared/core';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { faEyeSlash, faEye, faCircle, faCirclePlus, faCircleQuestion, faDrawPolygon, faGear, faLayerGroup, faPencil, faWaveSquare, faXmark, faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';
import { Subject, Subscription } from 'rxjs';
import Feature from 'ol/Feature';
import WKT from 'ol/format/WKT';

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

  @ViewChild('wktValue') wktValue!: ElementRef;
  @ViewChild('wktEpsgInput') wktEspgInput!: ElementRef;

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

    this.resetSelection()
  }

  ngOnChanges(changes: SimpleChanges) {

    if (changes.currentLayerIdSelected.currentValue !== this.layer.id) {
      this.resetSelection()
    }

  }


  visibleHandler(status: boolean): void {
    this.isVisible = status
    if (status) {
      this.layer.vectorLayer.setVisible(status)
    }
    if (!status) {
      this.drawHandler(false) // disable draw tool
      this.editHandler(false) // disable edit tool
      this.drawHoleHandler(false) // disable hole draw tool
    }
  }

  removeLayer(): void {
    this.layer.removeLayer()
    this.ngOnDestroy()
  }

  editHandler(status: boolean): void {
    if (status) {
      this.drawHandler(false) // disable draw tool
      this.drawHoleHandler(false) // disable hole draw tool

      this.editFeatureEnable()
    } else {
      this.editFeatureDisable()
    }
  }

  drawHandler(status: boolean, holeStatus: boolean = false): void {
    if (status) {
      this.editHandler(false) // disable edit tool
      this.drawHoleHandler(false) // disable hole draw tool

      this.addFeatureEnable(holeStatus)
    } else {
      this.addFeatureDisable()
    }
  }

  drawHoleHandler(status: boolean, holeStatus: boolean = true): void {
    if (status) {
      this.drawHandler(false) // disable draw tool
      this.editHandler(false) // disable edit tool

      this.addHoleFeatureEnable(holeStatus)
    } else {
      this.addHoleFeatureDisable()
    }
  }

  layerGoUp(): void{
    // this.layer.upPosition()
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

  private resetSelection(): void {
    this.resetFeaturesPopups()
    this.drawHoleHandler(false)
    this.drawHandler(false)
    this.editHandler(false)
    this.unSelectFeature()
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

      let toastDiv = document.getElementsByClassName('toastFeature');
      if (toastDiv !== null) {

        toastDiv[0].classList.add("faded");

      }
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

  moveWktModalToBody(): void {
    // TODO create a global function
    let modalLayerDiv = document.getElementById('modalWktLayer-'+ this.layer.id);
    if (modalLayerDiv !== null) {

      let bodyDiv = document.body;
      if (bodyDiv !== null) {
        bodyDiv.appendChild(modalLayerDiv)

      }
    }
  }

  addWkt(): void {
    //TODO support multipleWKT
    const wktString: string = this.wktValue.nativeElement.value;
    const wktFormat = new WKT();
    // POLYGON((10.689 -25.092, 34.595 -20.170, 38.814 -35.639, 13.502 -39.155, 10.689 -25.092))
    //TODO add espg support
    const feature = wktFormat.readFeature(wktString, {
      dataProjection: 'EPSG:4326',
      featureProjection: 'EPSG:3857',
    });
    //TODO check geom type and alert user

    this.layer.addFeatureFromGeomFeatureWithoutProperties(feature)
  }

}


