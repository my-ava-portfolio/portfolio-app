import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { layerHandler } from '@modules/map-sandbox/shared/layer-handler/layer-handler';
import { lineStringIcon, pointIcon, polygonIcon } from '@modules/map-sandbox/shared/icons';
import { strokeWidthCoeff, strokeWidthLineCoeff } from '@modules/map-sandbox/shared/globals';

@Component({
  selector: 'app-layer-legend',
  templateUrl: './layer-legend.component.html',
  styleUrls: ['./layer-legend.component.scss']
})
export class LayerLegendComponent implements OnInit, OnDestroy {
  private _layer!: layerHandler;

  featureIdSelected!: string;

  pointIcon = pointIcon
  lineStringIcon = lineStringIcon
  polygonIcon = polygonIcon
  
  _strokeWidthCoeff = strokeWidthCoeff;
  _strokeWidthLineCoeff = strokeWidthLineCoeff;

  constructor( ) {
  }

  ngOnInit(): void { }

  ngOnDestroy(): void {}

  @Input()
  set layer(layer: layerHandler) {
    this._layer = layer
  }

  get layer(): layerHandler {
    return this._layer
  }

}
