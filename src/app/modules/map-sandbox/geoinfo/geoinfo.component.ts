import { AfterViewInit, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MapService } from '@services/map.service';
import MousePosition from 'ol/control/MousePosition';
import { Subscription } from 'rxjs';
import { format } from 'ol/coordinate';

import Map from 'ol/Map';


@Component({
  selector: 'app-geoinfo',
  templateUrl: './geoinfo.component.html',
  styleUrls: ['./geoinfo.component.scss']
})
export class GeoinfoComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() currentEpsg!: string;
  @Input() map!: Map;

  mousePositionControl!: MousePosition;
  cursorCoordinates!: any;
  epsgAvailable = ["EPSG:4326", "EPSG:3857"];

  mapSubscription!: Subscription;

  constructor(
    private mapService: MapService,
  ) {  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.initMousePosition()

  }

  ngOnDestroy(): void {
  }


  initMousePosition(): void {
    let mouseCoordinatesDiv!: any;
    mouseCoordinatesDiv = document.getElementById('mouseCoordinates')

    this.mousePositionControl = new MousePosition({
      coordinateFormat: this.setPrecisionFunc(4),
      placeholder: 'x :<br>y : ',
      className: 'mouse-position',
      target: mouseCoordinatesDiv,

    });

    this.map.addControl(this.mousePositionControl)
  }

  updatePrecision(event: any): any {
    return this.mousePositionControl.setCoordinateFormat(this.setPrecisionFunc(event.target.value))
  }

  private setPrecisionFunc(precision: any): any {
    var template = 'x : {x}<br>y : {y}';
    return (
      function(coordinate: any) {
          return format(coordinate, template, precision);
      });
  }

  setMapEpsg(): void {
    this.currentEpsg = this.map.getView().getProjection().getCode();
  }

  setProjection(epsg: string): void {
    this.currentEpsg = epsg;

    this.mapService.setProjectionOnMap(epsg)

    this.setMapEpsg();

  }

}
