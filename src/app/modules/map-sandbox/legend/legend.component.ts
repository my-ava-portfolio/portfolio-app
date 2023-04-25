import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { layerHandler } from '../shared/layer-handler/layer-handler';
import { lineStringIcon, pointIcon, polygonIcon } from '../shared/style-helper';
import { InteractionsService } from '../shared/service/interactions.service';

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
    this.layerSelectConfigured
  }

  ngOnInit(): void {
    
    // enable selecting 
    this.layer.enableSelecting()

    // set select interaction event
    this.layerSelectConfigured()

    // this.layer.container.sourceFeatures.on('changefeature', (event: any) => {
    //   // update step when change on feature occurs
    //   refreshFeatureStyle(event.feature)
    // })

  }

  ngOnDestroy(): void {
    this.unSelectFeature()
  }

  @Input()
  set layer(layer: layerHandler) {
    this._layer = layer
  }

  get layer(): layerHandler {
    return this._layer
  }

  @Input()
  set selected(status: boolean) {
    
    if (!status) {
      // unselect all the features
      this.unSelectFeature()
    } else {
      this.selectLayer()
    }
    this._selected = status
  }

  get selected(): boolean {
    return this._selected;
  }

  layerSelectConfigured(): void {
    // set select event: mandatory to connect ol api and angular mecanisms
    this.layer.select.on("select", (event: any) => {
      let deselected = event.deselected
      let selected = event.selected
      
      if (deselected.length > 0 && selected.length === 0) {
        this.unSelectFeature()

      }

      if (selected.length > 0) {
        selected.forEach((feature: any) => {
          this.selectFeatureById(feature.getId())
        })

      }
    })
  }

  unSelectFeature(): void {
    this.featureIdSelected = 'none'
    this.layer.select.getFeatures().clear()
  }

  selectFeatureById(featureId: any): void {

    this.featureIdSelected = featureId

    let feature = this.getFeature(this.featureIdSelected)
    this.layer.enableSelecting()  // mandatory
    this.layer.select.getFeatures().clear()
    this.layer.select.getFeatures().push(feature)

    this.selectLayer()
  }

  private getFeature(featureId: string): any {
    let features = this.layer.container.features.filter((feature: any) => {
      return feature.getId() === featureId
    })
    if (features.length === 1) {
      return features[0]
    }
    return null
  }
  selectLayer(): void {
    this.interactionsService.sendSelectedLayerId(this.layer.container.uuid)
  }
}
