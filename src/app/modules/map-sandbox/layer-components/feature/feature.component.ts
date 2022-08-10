import { Component, ElementRef, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { faClone } from '@fortawesome/free-regular-svg-icons';
import { Feature } from 'ol';
import { Subject, Subscription } from 'rxjs';
import { getWkt } from '@modules/map-sandbox/shared/core';
import { layerHandler } from '@modules/map-sandbox/shared/core';


@Component({
  selector: 'app-feature',
  templateUrl: './feature.component.html',
  styleUrls: ['./feature.component.scss']
})
export class FeatureComponent implements OnInit {
  @Input() feature!: any;
  @Input() currentFeatureIdSelected!: string;
  @Input() currentLayer!: layerHandler;

  @Output() layerIdFromFeature = new EventEmitter<string>();
  @Output() featureIdSelected = new EventEmitter<string>();
  @Output() removeFeatureEvent = new EventEmitter<string>();
  @Output() duplicateFeatureEvent = new EventEmitter<string>();

  disabledIcon = faXmark;
  duplicateIcon = faClone;

  featuresPopupsProperties!: any

  featuresDisplayedObservable = new Subject<Feature>()
  featuresDisplayedSubscription!: Subscription;

  constructor(
    private elementRef: ElementRef
  ) {
    this.featuresDisplayedSubscription = this.featuresDisplayedObservable.subscribe(
      (feature: Feature) => {
        this.resetFeaturesPopups()
        this.buildFeaturesPopups(feature)
      }
    )

  }

  ngOnInit(): void {
    this.moveToastsFeaturesToBody()
  }

  ngOnDestroy(): void {
    this.featuresDisplayedSubscription.unsubscribe();
    this.elementRef.nativeElement.remove();

  }

  ngOnChanges(changes: SimpleChanges) {

    const featureIdSelected = changes.currentFeatureIdSelected.currentValue
    if (this.feature.getId() === featureIdSelected) {
      this.selectFeature()
    } else {
      this.resetFeaturesPopups()
    }

  }

  selectFeature(): void {
    this.layerIdFromFeature.emit(this.feature.get('layer_id'))
    const featureId = this.feature.getId()
    if (typeof featureId === 'string') {
      this.featureIdSelected.emit(featureId)
      // this.featuresDisplayedObservable.next(this.feature)
      this.resetFeaturesPopups()
      this.buildFeaturesPopups(this.feature)
    }
  }

  removeFeature(): void {
    this.removeFeatureEvent.emit(this.feature.getId())
  }

  duplicateFeature(): void {
    this.duplicateFeatureEvent.emit(this.feature.getId())
  }

  resetFeaturesPopups(): void {
    let toastFeatureDiv = document.getElementById("featureToasts");

    if (toastFeatureDiv !== null) {

      toastFeatureDiv.remove()
    }
    this.featuresPopupsProperties = null
  }

  buildFeaturesPopups(feature: Feature): any {

    // get wkt regarding selected projection
    const geomFeature = feature.getGeometry();
    if (geomFeature !== undefined) {

      this.featuresPopupsProperties = {
        'id': feature.getId(),
        'name': feature.get('name'),
        'layer_id': feature.get('layer_id'),
        'geom_type': feature.get('geom_type'),
        'created_at': feature.get('created_at'),
        'updated_at': feature.get('updated_at'),
        'fill_color': feature.get('fill_color'),
        'stroke_color': feature.get('stroke_color'),
        'stroke_width': feature.get('stroke_width'),
        'wkt': getWkt(geomFeature)
      }
    }
  }

  moveToastsFeaturesToBody(): void {
    // TODO create a global function
    let toastFeatureDiv = document.getElementById("featureToasts");

    if (toastFeatureDiv !== null) {

      let bodyDiv = document.body;
      if (bodyDiv !== null) {
        bodyDiv.appendChild(toastFeatureDiv)

      }
    }
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

  updateFillColor(featureId: string, color: string): void {
    this.feature.set("fill_color", color, false)
  }
  updateStrokeWidth(featureId: string, event: any): void {
    this.feature.set("stroke_width", event.target.value, true)
  }
  updateStrokeColor(featureId: string, color: string): void {
    this.feature.set("stroke_color", color, true)
  }

}


