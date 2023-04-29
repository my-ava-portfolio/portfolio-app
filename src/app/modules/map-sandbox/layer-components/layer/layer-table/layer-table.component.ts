import { Component, Input, OnInit } from '@angular/core';
import { layerHandler } from '@modules/map-sandbox/shared/layer-handler/layer-handler';
import { getRandomDefaultColor } from '@modules/map-sandbox/shared/style-helper';
import Feature from 'ol/Feature';

@Component({
  selector: 'app-layer-table',
  templateUrl: './layer-table.component.html',
  styleUrls: ['./layer-table.component.scss']
})
export class LayerTableComponent implements OnInit {
  private _layer!: layerHandler;

  headerHidden = ['geometry', 'id', 'no', 'geom_type', 'created_at',
    'updated_at', 'fill_color', 'stroke_width', 'stroke_color']
  
  attributesHeader!: string[]
  attributesFeatures!: any[]

  ngOnInit(): void {
    this.getAttributesHeaders()
  }

  @Input()
  set layer(layerObject: layerHandler) {
    this._layer = layerObject
  }

  get layer(): layerHandler {
    return this._layer
  }

  getAttributesHeaders(): any {
    this.attributesHeader = this.layer.getAttributesHeader().filter(
      (header: string) => !this.headerHidden.includes(header)
    ) 
  }

  getFeatures(): Feature[] {
    return this.layer.container.features
  }

  addField(fieldName: string): void {
    this.layer.setAttribute(fieldName, null)
    this.refreshTable()
  }

  updateField(fieldName: string, value: any) {

    if (typeof value === 'number') {
      value = +value
    }
    this.layer.removeAttribute(fieldName)
    this.layer.setAttribute(fieldName, value)
    this.refreshTable()
  }

  removeField(fieldName: string): void {
    this.layer.removeAttribute(fieldName)
    this.refreshTable()
  }

  refreshTable(): void {
    this.getAttributesHeaders()
    this.getFeatures()
  }

  applyClassificationColor(fieldName: string): void {
    let uniqueValues: any[] = []
    this.getFeatures().forEach((feature: Feature) => {
      const value = feature.get(fieldName)
      if (!uniqueValues.includes(value)) {
        uniqueValues.push(value)
      }
    })
    
    uniqueValues.forEach((value: any) => {
      const randomColor = getRandomDefaultColor();
      this.getFeatures().forEach((feature: Feature) => {
        if (value === feature.get(fieldName)) {
          feature.set('fill_color', randomColor)
        }
      })
    })

  }

}
