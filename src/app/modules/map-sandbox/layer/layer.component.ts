import { findElementBy, getWkt, layerHandler } from '@modules/map-sandbox/shared/core';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { faCircle, faCirclePlus, faCircleQuestion, faDrawPolygon, faGear, faLayerGroup, faPencil, faWaveSquare, faXmark } from '@fortawesome/free-solid-svg-icons';
import { identifierName } from '@angular/compiler';
import { Subject, Subscription } from 'rxjs';
import Feature from 'ol/Feature';
import * as d3 from 'd3';

@Component({
  selector: 'app-layer',
  templateUrl: './layer.component.html',
  styleUrls: ['./layer.component.scss']
})
export class LayerComponent implements OnInit {
  @Input() layer!: layerHandler;
  @Input() currentLayerIdSelected!: string;
  @Output() layerSelectedId = new EventEmitter<string>();

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

  isDrawn: boolean = false;
  isEdited: boolean = false;
  isShown: boolean = false;

  layerSelected: boolean = false;
  featureIdSelected!: string;

  featuresDisplayedObservable = new Subject<Feature[]>()
  featuresDisplayedSubscription!: Subscription;
  featuresPopupsProperties: any[] = []

  layerDisplayedObservable = new Subject<layerHandler>()
  layerDisplayedSubscription!: Subscription;
  layerForPopup!: layerHandler | null;

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

    this.layerDisplayedSubscription = this.layerDisplayedObservable.subscribe(
      (layer: layerHandler) => {
        this.resetLayerForPopup()
        this.layerForPopup = layer
        d3.selectAll("#toastLayer")
        .attr("class", "toast toastFeature faded");
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


  }

  ngOnDestroy(): void {
    this.featuresDisplayedSubscription.unsubscribe();
    this.layerDisplayedSubscription.unsubscribe();

    this.elementRef.nativeElement.remove();

    this.resetSelection()
  }

  ngOnChanges(changes: SimpleChanges) {

    if (changes.currentLayerIdSelected.currentValue !== this.layer.id) {
      this.resetSelection()
    }

  }


  removeLayer(): void {
    this.layer.removeLayer()
    this.ngOnDestroy()
  }

  editHandler(status: boolean): void {
    if (status) {
      this.drawHandler(false) // disable draw tool
      this.editFeatureEnable()
    } else {
      this.editFeatureDisable()
    }
  }

  drawHandler(status: boolean, holeStatus: boolean = false): void {
    if (status) {
      this.editHandler(false) // disable edit tool
      this.addFeatureEnable(holeStatus)
    } else {
      this.addFeatureDisable()
    }
  }

  selectLayer(): void {
    this.resetLayerForPopup()
    this.resetFeaturesPopups()
    this.unSelectFeature()

    this.layerSelected = !this.layerSelected
    this.layerSelectedId.emit(this.layer.id)
    this.layerDisplayedObservable.next(this.layer)
  }

  updateLayerSelectionFromFeatureLayerId(layerIdToSelect: string): void {
    // during feature selection
    this.layerSelectedId.emit(layerIdToSelect)
  }

  unSelectFeature(): void {

    this.resetLayerForPopup()
    this.featureIdSelected = 'none'
    this.layer.select.getFeatures().clear()

  }

  selectFeatureById(featureId: any): void {
    this.resetLayerForPopup()

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
    this.resetLayerForPopup()
    this.resetFeaturesPopups()
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

  private getFeature(featureId: string): any {
    let features = this.layer.features().filter((feature: any) => {
      return feature.getId() === featureId
    })
    if (features.length === 1) {
      return features[0]
    }
    return null
  }

  resetLayerForPopup(): void {
    this.layerForPopup = null
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

      if (isNotify) {  // TODO deprecated
        // display it with fading
        d3.select("html")
        .transition()
        .delay(2000) // need this delayto wait the toats html building
        .duration(5000)
        .on("end", () => {
          d3.selectAll(".toastFeature")
          .attr("class", "toast toastFeature");
        })
      } else {
        // happened only if a feature is selected
        d3.selectAll(".toastFeature")
        .attr("class", "toast toastFeature faded");
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

}


