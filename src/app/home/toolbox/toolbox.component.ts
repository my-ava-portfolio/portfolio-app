import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

import { helpIcon, removeIcon, toolsIcon, locationIcon, lineIcon, PolygonIcon, editIcon, addIcon } from '../../core/inputs';

import { PointsSvgLayerOnLeaflet } from '../../core/points_svg_layer';
import { Point } from '../../core/points_svg_layer';

import { LinesSvgLayerOnLeaflet } from '../../core/lines_svg_layer';
import { Subscription } from 'rxjs/internal/Subscription';
import { MapService } from 'src/app/services/map.service';

@Component({
  selector: 'app-toolbox',
  templateUrl: './toolbox.component.html',
  styleUrls: ['./toolbox.component.scss']
})
export class ToolboxComponent implements OnInit  {
  toolsIcon = toolsIcon;
  pointIcon = locationIcon;
  lineIcon = lineIcon;
  PolygonIcon = PolygonIcon;
  editIcon = editIcon;
  addIcon = addIcon;
  removeIcon = removeIcon;
  helpIcon = helpIcon;

  geomTypesList: any[] = [
    {
      name: 'points',
      icon: this.pointIcon
    },
    {
      name: 'lines',
      icon: this.lineIcon
    },
    {
      name: 'polygons',
      icon: this.PolygonIcon
    },
  ];

  sidebarCollapsed: boolean = false;

  editStatus!: any;
  editModeEnabled: boolean = false;
  geomTypeButton!: string;
  geomInfo!: Point;

  pointsLayer!: PointsSvgLayerOnLeaflet
  pointsMapped: any[] = []
  linesLayer!: LinesSvgLayerOnLeaflet
  linessMapped: any[] = []

  mapContainer!: any;

  mapContainerSubscription!: Subscription;
  getCoordsMapSubscription!: Subscription;

  newPointsSvgMapSubscription!: Subscription;
  removePointsSvgMapSubscription!: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    private mapService: MapService,
  ) {

    this.titleService.setTitle(this.activatedRoute.snapshot.data.title);

    this.mapContainerSubscription = this.mapService.mapContainer.subscribe(
      (map: any) => {
        this.mapContainer = map;

        this.pointsLayer = new PointsSvgLayerOnLeaflet(this.mapContainer, "sandboxPoints");
        this.pointsLayer.buildPointsLayer();

        // this.linesLayer = new LinesSvgLayerOnLeaflet(this.mapContainer, "sandboxLines")
        // this.linesLayer.addLines();

      }
    );

    this.getCoordsMapSubscription = this.mapService.newCoords.subscribe(
      (coords: any) => {

        let currentGeomTypeEdited = this.getCurrentGeomType();
        console.log(currentGeomTypeEdited)

        if ( currentGeomTypeEdited === 'points' ) {
          this.pointsLayer.addPoints(coords)
          this.pointsMapped = this.pointsLayer.points

        } else if ( currentGeomTypeEdited === 'lines' ) {
          this.linesLayer.addPoints(0, coords);
          this.pointsMapped = []
        }
      }
    );

   }

  ngOnInit(): void {
    this.resetEditModeDefaultValues(false);
    this.mapService.getMapContainer();
    this.displayGeomToolbar('points')
  }

  editModeSelector(geomType: string): void {

    if (this.editModeEnabled) {
      // desactivate
      this.resetEditModeDefaultValues(false);
    } else {
      // activate
      this.resetEditModeDefaultValues(true);
      this.editStatus[geomType] = true;
    }
  }

  resetEditModeDefaultValues(setEditMode: boolean): void {
    this.switchEditMode(setEditMode);

    this.editStatus = {
      "points": false,
      "lines": false,
      "polygons": false,
    }
  }

  getCurrentGeomType(): string {
    return Object.keys(this.editStatus).filter((key: string) => this.editStatus[key])[0];
  }

  switchEditMode(status: boolean): void {
    this.editModeEnabled = status;
  }

  removeGeom(geomType: string, geomId: string): void {
    if (geomType === 'point') {
      this.pointsLayer.removePointById(geomId)
    }
  }

  displayGeomToolbar(geomType: string): void {
    this.geomTypeButton = geomType;
  }

  getGeomInfo(geomId: string): void {
    if (this.getCurrentGeomType() === 'points') {

      this.geomInfo = this.pointsLayer.getPointById(geomId);
      console.log(this.geomInfo)
    }
  }

  highLightGeom(geomId: string): void {
    if (this.getCurrentGeomType() === 'points') {

      this.pointsLayer.highLightPointById(geomId);
    }
  }

  unHighLightGeom(geomId: string): void {
    if (this.getCurrentGeomType() === 'points') {

      this.pointsLayer.unHighLightPointById(geomId);
    }
  }

}
