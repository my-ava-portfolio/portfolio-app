import { Component, Input, OnInit } from '@angular/core';
import { layerHandler } from '@modules/map-sandbox/shared/layer-handler/layer-handler';

@Component({
  selector: 'app-layer-settings',
  templateUrl: './layer-settings.component.html',
  styleUrls: ['./layer-settings.component.scss']
})
export class LayerSettingsComponent implements OnInit {

  private _layer!: layerHandler;

  ngOnInit(): void {
    this.updateStyle()
  }

  @Input()
  set layer(layerObject: layerHandler) {
    this._layer = layerObject
  }

  get layer(): layerHandler {
    return this._layer
  }

  updateStyle(): void {
    this.layer.container.propertyStyled = null
    this.layer.container.styleSettings = [{class: "*", color: this.layer.container.fillColor }]
  }
}
