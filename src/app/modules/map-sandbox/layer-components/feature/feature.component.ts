import { Component, ElementRef, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { faClone } from '@fortawesome/free-regular-svg-icons';


@Component({
  selector: 'app-feature',
  templateUrl: './feature.component.html',
  styleUrls: ['./feature.component.scss']
})
export class FeatureComponent implements OnInit {
  @Input() feature!: any;
  @Input() currentFeatureIdSelected!: string;

  @Output() layerIdFromFeature = new EventEmitter<string>();
  @Output() featureIdSelected = new EventEmitter<string>();
  @Output() removeFeatureEvent = new EventEmitter<string>();
  @Output() duplicateFeatureEvent = new EventEmitter<string>();

  disabledIcon = faXmark;
  duplicateIcon = faClone;

  constructor(
    private elementRef: ElementRef
  ) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {

    this.elementRef.nativeElement.remove();

  }

  ngOnChanges(changes: SimpleChanges) {
    const featureIdSelected = changes.currentFeatureIdSelected.currentValue
    if (featureIdSelected !== this.currentFeatureIdSelected) {
      this.selectFeature()
    }

  }

  selectFeature(): void {
    this.layerIdFromFeature.emit(this.feature.get('layer_id'))
    const featureId = this.feature.getId()
    if (typeof featureId === 'string') {
      this.featureIdSelected.emit(featureId)
    }
  }

  removeFeature(): void {
    this.removeFeatureEvent.emit(this.feature.getId())
  }

  duplicateFeature(): void {
    this.duplicateFeatureEvent.emit(this.feature.getId())
  }

}
