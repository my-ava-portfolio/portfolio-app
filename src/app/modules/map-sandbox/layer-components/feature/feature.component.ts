import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { layerHandler, getWkt } from '@modules/map-sandbox/shared/layer-handler/layer-handler';
import Feature from 'ol/Feature';
import { Geometry } from 'ol/geom';
import { categoryClass } from '@modules/map-sandbox/shared/data-types';
import { centerIcon } from '@modules/map-activities/shared/icons';
import { disabledIcon, duplicateIcon, paramIcon } from '@modules/map-sandbox/shared/icons';
import { strokeWidthCoeff, strokeWidthLineCoeff } from '@modules/map-sandbox/shared/globals';


@Component({
  selector: 'app-feature',
  templateUrl: './feature.component.html',
  styleUrls: ['./feature.component.scss']
})
export class FeatureComponent implements OnInit {
  private _feature!: Feature;
  private _selected!: boolean;
  private _id!: string;
  private _geometry!: Geometry

  _strokeWidthCoeff = strokeWidthCoeff;
  _strokeWidthLineCoeff = strokeWidthLineCoeff;

  @Input() layer!: layerHandler;

  disabledIcon = disabledIcon;
  duplicateIcon = duplicateIcon;
  centerIcon = centerIcon;
  paramIcon = paramIcon;

  currentFillColor!: string;
  currentStrokeColor!: string;
  currentStrokeWidth!: number;

  displayPopup: boolean = false;

  constructor(
    private elementRef: ElementRef,
  ) {
  }

  ngOnInit(): void { }

  ngOnDestroy(): void {
    this.elementRef.nativeElement.remove();
  }

  @Input()
  set feature(feature: Feature) {
    this._feature = feature
    this._id = feature.getId() as string
    this._geometry = feature.getGeometry() as Geometry
  }

  get feature(): Feature {
    return this._feature;
  }

  get id(): string {
    return this._id;
  }

  get geometry(): Geometry {
    return this._geometry;
  }

  @Input()
  set selected(status: boolean) {
    this.displayPopup = false;
    this._selected = status;
  }

  get selected(): boolean {
    return this._selected;
  }

  removeFeature(): void {
    // the layer object is needed
    this.layer.container.removeFeature(this.id as string)
  }

  duplicateFeature(): void {
    // the layer object is needed
    this.layer.select.getFeatures().clear() // need to unselect to avoid to save the select style (openlayers behavior)
    this.layer.container.duplicateFeature(this.id as string)
  }
  zoomToFeature(): void {
    // the layer object is needed
    this.layer.zoomToFeature(this.id)
  }

  showPopup(): void {
    this.displayPopup = !this.displayPopup;
  }

  copyToClipboard(value: any): void {
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

  getWktFromFeature(): string {
    return getWkt(this.geometry)
  }

  getBoundsFromFeature(): string {
    // xmin, ymin, xmax, ymax
    return this.geometry.getExtent().join(', ')
  }

  applyClassifiedStyle(): void {
    const propertyName = this.layer.container.propertyStyled
    if (propertyName !== null) {
      this.layer.container.styleSettings.forEach((classItem: categoryClass) => {
        if (this.feature.get(propertyName) === classItem.class)
          this.feature.set('fill_color', classItem.color)
      })
    }

  }
}


