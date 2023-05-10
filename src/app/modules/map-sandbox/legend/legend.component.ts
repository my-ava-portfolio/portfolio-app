import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { layerHandler } from '../shared/layer-handler/layer-handler';
import { lineStringIcon, pointIcon, polygonIcon } from '../shared/icons';

@Component({
  selector: 'app-legend',
  templateUrl: './legend.component.html',
  styleUrls: ['./legend.component.scss']
})
export class LegendComponent implements OnInit, OnDestroy {
  private _layer!: layerHandler;

  featureIdSelected!: string;

  pointIcon = pointIcon
  lineStringIcon = lineStringIcon
  polygonIcon = polygonIcon

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
