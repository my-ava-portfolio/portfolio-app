import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { layerHandler } from '../shared/layer-handler/layer-handler';
import { InteractionsService } from '../shared/service/interactions.service';
import { lineStringIcon, pointIcon, polygonIcon } from '../shared/icons';

@Component({
  selector: 'app-legend',
  templateUrl: './legend.component.html',
  styleUrls: ['./legend.component.scss']
})
export class LegendComponent implements OnInit, OnDestroy {
  // important component similar to layer to manage feature selection
  private _layer!: layerHandler;
  private _selected!: boolean;

  featureIdSelected!: string;

  pointIcon = pointIcon
  lineStringIcon = lineStringIcon
  polygonIcon = polygonIcon

  constructor(
    private interactionsService: InteractionsService,
  ) {
  }

  ngOnInit(): void {


  }

  ngOnDestroy(): void {
    // this.unSelectFeature()
  }

  @Input()
  set layer(layer: layerHandler) {
    this._layer = layer
  }

  get layer(): layerHandler {
    return this._layer
  }

}
