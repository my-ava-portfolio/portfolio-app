import { Component } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';

import { faCircle, faWaveSquare, faDrawPolygon } from '@fortawesome/free-solid-svg-icons';
import { geomLayerTypes, pointType, lineStringType, polygonType } from '@modules/map-sandbox/shared/data-types';


@Component({
  selector: 'app-create-tools',
  templateUrl: './create-tools.component.html',
  styleUrls: ['./create-tools.component.scss']
})

  
export class CreateToolsComponent {

  @Output() newLayerEvent = new EventEmitter<geomLayerTypes>();

  // TODO icons must be linked to others components:
  private pointIcon = faCircle;
  private lineStringIcon = faWaveSquare;
  private polygonIcon = faDrawPolygon;
  
  layerTypes = [
    {
      "mode": 'Point' as pointType,
      "label": 'Ajouter une couche de Points',
      "icon": this.pointIcon
    },
    {
      "mode": 'LineString' as lineStringType,
      "label": 'Ajouter une couche de LineString',
      "icon": this.lineStringIcon
    },
    {
      "mode": 'Polygon' as polygonType,
      "label": 'Ajouter une couche de Polygones',
      "icon": this.polygonIcon
    }
  ]

  addLayer(geomType: geomLayerTypes) {
    this.newLayerEvent.emit(geomType)
  }

}
