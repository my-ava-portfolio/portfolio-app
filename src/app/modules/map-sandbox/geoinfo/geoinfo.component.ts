import { AfterViewInit, Component, Input } from '@angular/core';
import { MapService } from '@services/map.service';
import MousePosition from 'ol/control/MousePosition';
import { format } from 'ol/coordinate';

import Map from 'ol/Map';


@Component({
  selector: 'app-geoinfo',
  templateUrl: './geoinfo.component.html',
  styleUrls: ['./geoinfo.component.scss']
})
export class GeoinfoComponent implements AfterViewInit {
  @Input() currentEpsg!: string;
  @Input() map!: Map;
  @Input() epsgAvailable!: string[];

  mousePositionControl!: MousePosition;
  defaultCoordsPrecision = 4;

  constructor(private mapService: MapService) {}

  ngAfterViewInit(): void {
    this.initMousePosition()
  }

  updatePrecision(event: any): void {
    this.mousePositionControl.setCoordinateFormat(this.setPrecisionFunc(event.target.value))
  }

  setProjection(epsg: string): void {
    this.currentEpsg = epsg;
    this.mapService.setProjectionOnMap(epsg)
    this.setMapEpsg();
  }

  private initMousePosition(): void {
    let mouseCoordinatesDiv!: any;
    mouseCoordinatesDiv = document.getElementById('mouseCoordinates')

    this.mousePositionControl = new MousePosition({
      coordinateFormat: this.setPrecisionFunc(this.defaultCoordsPrecision),
      placeholder: 'x :<br>y : ',
      className: 'mouse-position',
      target: mouseCoordinatesDiv,
    });

    this.map.addControl(this.mousePositionControl)
  }

  private setPrecisionFunc(precision: any): any {
    var template = 'x : {x}<br>y : {y}';
    return (
      function(coordinate: any) {
          return format(coordinate, template, precision);
      });
  }

  private setMapEpsg(): void {
    this.currentEpsg = this.map.getView().getProjection().getCode();
  }

}
