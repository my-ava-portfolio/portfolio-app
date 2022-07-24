import { Component, ElementRef, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import * as d3 from 'd3';
import Feature from 'ol/Feature';
import { Subject, Subscription } from 'rxjs';

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
  @Output() addHoleEvent = new EventEmitter<boolean>();

  disabledIcon = faXmark;

  isHole: boolean = false;

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

  addHole(status: boolean): void {
    this.addHoleEvent.emit(status)
  }

  removeFeature(): void {
    this.removeFeatureEvent.emit(this.feature.getId())
  }

}
