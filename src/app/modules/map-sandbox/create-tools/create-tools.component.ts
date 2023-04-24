import { Component, Input, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';

import { faCircle, faWaveSquare, faDrawPolygon } from '@fortawesome/free-solid-svg-icons';
import { geomLayerTypes, pointType, lineStringType, polygonType } from '@modules/map-sandbox/shared/data-types';


@Component({
  selector: 'app-create-tools',
  templateUrl: './create-tools.component.html',
  styleUrls: ['./create-tools.component.scss']
})

  
export class CreateToolsComponent implements OnInit {
  @Input() layerTypeModes!: geomLayerTypes[] ;

  @Output() newLayerEvent = new EventEmitter<geomLayerTypes>();

  layerTypesModes!: any[];
  // TODO icons must be linked to others components:
  private _pointIcon = faCircle;
  private _lineStringIcon = faWaveSquare;
  private _polygonIcon = faDrawPolygon;
  
  private _layerTypes = [
    {
      "mode": 'Point' as pointType,
      "label": 'Ajouter une couche de Points',
      "icon": this._pointIcon
    },
    {
      "mode": 'LineString' as lineStringType,
      "label": 'Ajouter une couche de LineString',
      "icon": this._lineStringIcon
    },
    {
      "mode": 'Polygon' as polygonType,
      "label": 'Ajouter une couche de Polygones',
      "icon": this._polygonIcon
    }
  ]

  ngOnInit(): void {

    this.layerTypesModes = this._layerTypes.filter((mode: any) => {
      return this.layerTypeModes.includes(mode['mode'])
    })
    
  }

  addLayer(geomType: geomLayerTypes) {
    this.newLayerEvent.emit(geomType)
  }

}
