import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Feature } from 'ol';
import { readStringWktAndGroupedByGeomType } from '../import-tools/import-tools.component';
import { getWkt, layerHandler } from '../shared/layer-handler/layer-handler';
import { GraphComputingService } from '../shared/service/graph-computing.service';
import { EditComputingService } from '../shared/service/edit-computing.service';
import { motorIcon, pedestrianIcon } from '../shared/icons';

@Component({
  selector: 'app-path-tools',
  templateUrl: './path-tools.component.html',
  styleUrls: ['./path-tools.component.scss']
})
export class PathToolsComponent implements OnInit, OnDestroy {
  @Input() currentEpsg!: string;

  motorIcon = motorIcon;
  pedestrianIcon = pedestrianIcon;

  buttonEnabled!: boolean;

  private _layerSelected!: layerHandler | null

  constructor(
    private editComputingService: EditComputingService,
    private graphComputingService: GraphComputingService,
  ) {
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {}

  @Input()
  set layersToDisplay(layers: layerHandler[]) {
    layers.forEach((layer: layerHandler) => {
      if (['Polygon', 'LineString'].includes(layer.container.geomType)) {
        layer.container.featuresToggled = true
      }
    })
  }

  @Input()
  set layerSelected(layer: layerHandler | null) {
    this.buttonEnabled = false;

    if (layer !== null) {
      if (layer.container.geomType === 'Point') {
        this.buttonEnabled = true
      }
    }
    this._layerSelected = layer
  }

  get layerSelected(): layerHandler | null {
    return this._layerSelected
  }


  computeShortestPath(mode: 'pedestrian' | 'vehicle'): void {
    let wktFeatures: string[] = []
    if (this.layerSelected !== null) {
      this.layerSelected.container.features.forEach((feature: Feature) => {
        const featureCloned = feature.clone()
        let geom = featureCloned.getGeometry()
        if (geom !== undefined) {
          if (this.currentEpsg !== 'EPSG:4326') {
            geom = geom.transform(this.currentEpsg, 'EPSG:4326')
          }
          wktFeatures.push(getWkt(geom))
        }

      })
      const featureParams = {
        dataProjection: "EPSG:4326",
        featureProjection: this.currentEpsg
      }
      this.graphComputingService.getShortestPathFromApi(wktFeatures, mode).subscribe(
        (data: string[]) => {
          const featuresToAdd = readStringWktAndGroupedByGeomType(data, featureParams)
          this.editComputingService.addNewFeatures(featuresToAdd)
        })
    }

  }
}
