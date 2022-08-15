import { Component, ElementRef, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { faExpand, faGear, faXmark } from '@fortawesome/free-solid-svg-icons';
import { faClone } from '@fortawesome/free-regular-svg-icons';
import { getWkt } from '@modules/map-sandbox/shared/core';
import { layerHandler } from '@modules/map-sandbox/shared/core';
import { InteractionsService } from '@modules/map-sandbox/shared/service/interactions.service';


@Component({
  selector: 'app-feature',
  templateUrl: './feature.component.html',
  styleUrls: ['./feature.component.scss']
})
export class FeatureComponent implements OnInit {
  @Input() feature!: any;
  @Input() currentFeatureIdSelected!: string;
  @Input() currentLayer!: layerHandler;

  disabledIcon = faXmark;
  duplicateIcon = faClone;
  centerIcon = faExpand;
  paramIcon = faGear;

  currentFillColor!: string;
  currentStrokeColor!: string;
  currentStrokeWidth!: number;

  displayPopup: boolean = false;

  constructor(
    private elementRef: ElementRef,
  ) {
  }

  ngOnInit(): void {

    this.currentFillColor = this.feature.get('fill_color')
    this.currentStrokeColor = this.feature.get('stroke_color')
    this.currentStrokeWidth = this.feature.get('stroke_width')

  }

  ngOnDestroy(): void {
    this.elementRef.nativeElement.remove();
  }

  ngOnChanges(changes: SimpleChanges) {
  }

  removeFeature(): void {
    this.currentLayer.removeFeature(this.feature.getId())
  }

  duplicateFeature(): void {
    this.currentLayer.select.getFeatures().clear() // need to unselect to avoid to save the select style (openlayers behavior)
    this.currentLayer.duplicateFeature(this.feature.getId())
  }

  showPopup(): void {
    this.displayPopup = !this.displayPopup;
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


