import { Component, ElementRef, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { faExpand, faXmark } from '@fortawesome/free-solid-svg-icons';
import { faClone } from '@fortawesome/free-regular-svg-icons';
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
  centerIcon = faExpand;

  currentFillColor!: string;
  currentStrokeColor!: string;
  currentStrokeWidth!: number;

  displayPopup: boolean = true;

  constructor(
    private elementRef: ElementRef
  ) {


  }

  ngOnInit(): void {
    this.moveToastsFeaturesToBody()

    this.currentFillColor = this.feature.get('fill_color')
    this.currentStrokeColor = this.feature.get('stroke_color')
    this.currentStrokeWidth = this.feature.get('stroke_width')
  }

  ngOnDestroy(): void {
    this.elementRef.nativeElement.remove();
  }

  ngOnChanges(changes: SimpleChanges) {

    const featureIdSelected = changes.currentFeatureIdSelected.currentValue
    if (this.feature.getId() === featureIdSelected) {
      this.selectFeature()
    }

  }

  selectFeature(): void {
    this.layerIdFromFeature.emit(this.feature.get('layer_id'))
    const featureId = this.feature.getId()
    if (typeof featureId === 'string') {
      this.featureIdSelected.emit(featureId)
      this.displayPopup = true;
    }
  }

  removeFeature(): void {
    this.removeFeatureEvent.emit(this.feature.getId())
  }

  duplicateFeature(): void {
    this.duplicateFeatureEvent.emit(this.feature.getId())
  }

  hidePopup(): void {
    this.displayPopup = false;
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

  zoomToFeature(): void {
    this.currentLayer.zoomToFeature(this.feature.getId())
  }

  getWktFromFeature(feature: any): string {
    return getWkt(feature.getGeometry())
  }
}


