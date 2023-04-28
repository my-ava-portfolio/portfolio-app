import { Component, Input } from '@angular/core';
import { layerHandler } from '@modules/map-sandbox/shared/layer-handler/layer-handler';

@Component({
  selector: 'app-layer-settings',
  templateUrl: './layer-settings.component.html',
  styleUrls: ['./layer-settings.component.scss']
})
export class LayerSettingsComponent {

  private _layer!: layerHandler;

  @Input()
  set layer(layerObject: layerHandler) {
    this._layer = layerObject
  }

  get layer(): layerHandler {
    return this._layer
  }
}
