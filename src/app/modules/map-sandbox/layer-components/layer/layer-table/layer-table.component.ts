import { Component, Input, OnInit } from '@angular/core';
import { categoryClass } from '@modules/map-sandbox/shared/data-types';
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
  
  attributesHeader!: string[]
  attributesFeatures!: any[]

  propertyStyled!: string
  propertiesStylingClassified: categoryClass[] = [] 
    
  ngOnInit(): void {
  }

  @Input()
  set layer(layerObject: layerHandler) {
    this._layer = layerObject
  }

  get layer(): layerHandler {
    return this._layer
  }

  getFeatures(): Feature[] {
    return this.layer.container.features
  }

  addField(fieldName: string): void {
    this.layer.setAttribute(fieldName, null)
    // this.refreshTable()
  }

  updateField(fieldName: string, value: any) {

    if (typeof value === 'number') {
      value = +value
    }
    this.layer.removeAttribute(fieldName)
    this.layer.setAttribute(fieldName, value)
    // this.refreshTable()
  }

  removeField(fieldName: string): void {
    this.layer.removeAttribute(fieldName)
    // this.refreshTable()
  }

  refreshTable(): void {
    this.getFeatures()
  }

  setCategoryClassesStyling(propertyName: string): void {
      this.propertiesStylingClassified = []
      let uniqueValues: any[] = []
      this.layer.container.features.forEach((feature: Feature) => {
        const value = feature.get(propertyName)
        if (!uniqueValues.includes(value)) {
          uniqueValues.push(value)
        }
      })
    
      uniqueValues.forEach((value: any) => {
        const randomColor = getRandomDefaultColor();
        this.propertiesStylingClassified.push({'class': value, 'color': randomColor}) 
      })
    this.applyClassifiedStyle(propertyName)
  }

  changeCategoryClassStyle(propertyName: string, value: any, color: string): void {
    this.propertiesStylingClassified.forEach((classItem: categoryClass) => {
      if (classItem.class === value) {
        classItem.color = color
      }
    })
    this.applyClassifiedStyle(propertyName)
  }

  applyClassifiedStyle(propertyName: string): void {
    this.propertiesStylingClassified.forEach((classItem: categoryClass) => {
      this.layer.container.features.forEach((feature: Feature) => {
        if (feature.get(propertyName) === classItem.class)
          feature.set('fill_color', classItem.color)
      })
    })
    this.layer.container.propertyStyled = propertyName
    this.layer.container.styleSettings = this.propertiesStylingClassified
  }
}
