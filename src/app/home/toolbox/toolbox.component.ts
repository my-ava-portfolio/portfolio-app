import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

import { centerIcon, helpIcon, removeIcon, toolsIcon, locationIcon, lineIcon, PolygonIcon, editIcon, addIcon } from '../../core/inputs';

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
export class ToolboxComponent implements OnInit, OnDestroy  {
  toolsIcon = toolsIcon;
  pointIcon = locationIcon;
  lineIcon = lineIcon;
  PolygonIcon = PolygonIcon;
  editIcon = editIcon;
  addIcon = addIcon;
  removeIcon = removeIcon;
  helpIcon = helpIcon;
  centerIcon = centerIcon;

  pointsLayer!: PointsSvgLayerOnLeaflet;
  linesLayer!: LinesSvgLayerOnLeaflet;

  geomTypesList: any[] = [
    {
      name: 'points',
      icon: this.pointIcon,
      selected: true,
      edited: false,
      features: []
    },
    {
      name: 'lines',
      icon: this.lineIcon,
      selected: false,
      edited: false,
      features: []
    },
    {
      name: 'polygons',
      icon: this.PolygonIcon,
      selected: false,
      edited: false,
      features: []
    },
  ];
  color = '#FF0000';

  sidebarCollapsed: boolean = false;

  geomFeature!: Point;

  mapContainer!: any;

  defaultNamePlaceHolder = 'Editer le nom';
  defaultTagPlaceHolder = 'Editer le tag';

  mapContainerSubscription!: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    private mapService: MapService
  ) {

    this.titleService.setTitle(this.activatedRoute.snapshot.data.title);

    this.mapContainerSubscription = this.mapService.mapContainer.subscribe(
      (map: any) => {
        this.mapContainer = map;

        this.pointsLayer = new PointsSvgLayerOnLeaflet(this.mapContainer, "sandboxPoints");
        this.pointsLayer.buildLayer();

        // this.linesLayer = new LinesSvgLayerOnLeaflet(this.mapContainer, "sandboxLines")
        // this.linesLayer.addLines();
        // TODO support lines and polygons

        this.geomTypesList.forEach((element, _) => {
          if ( element.name === 'points' ) {
            element.features = this.pointsLayer.points;
          } else if ( element.name === 'lines' ) {
            element.features = []; // TODO
          } else if ( element.name === 'polygons' ) {
            element.features = []; // TODO
          }
        });
      }
    );

   }

  ngOnInit(): void {
    // init all the map container
    this.mapService.getMapContainer();

    // let start with the point menu
    this.setGeomMenu('points')
  };

  ngOnDestroy(): void {
    this.mapContainerSubscription.unsubscribe();

    this.mapContainer.off('click')
    this.removeLayer('points')
    // TODO add func to remove the layers

  };

  // SELECTION MENU //
  setGeomMenu(menu: string): void {
    // STARTER FROM MENU //
    // reset
    this.disableGeomFeatureEditing()
    this.resetGeomMenu()

    // disable all the map click events (from each geom editor class)
    this.mapContainer.off('click')

    // select menu
    this.geomTypesList.forEach((element, _) => {
      if ( element.name === menu ) {
        element.selected = true;
      }
    });
  };

  resetGeomMenu(): void {

    this.geomTypesList.forEach((element, _) => {
      element.selected = false;
      element.edited = false;
    });
  };

  disableGeomFeatureEditing(): void {
    if ( this.getCurrentGeomMenu() !== undefined ) {

      let currentFeatures: any = this.getCurrentGeomMenu().features

      if ( currentFeatures.length > 0 ) {
        currentFeatures.forEach((element: any, _: any) => {
          element.edited = false;
        });
      }
    }
  }

  switchEditGeomMenu(): void {
    this._getCurrentItemMenu().edited = !this._getCurrentItemMenu().edited;
  };

  getCurrentGeomMenu(): any {
    let selectedMenu = this._getCurrentItemMenu()
    return selectedMenu;
  };

  private _getCurrentItemMenu(): any {
    let currentMenu!: string;
    this.geomTypesList.forEach((element, _) => {
      if ( element.selected ) {
        currentMenu = element;
      }
    });
    return currentMenu
  };
  // SELECTION MENU //

  // ADD ACTION //
  addGeomFromToolbar(): void {
    // STARTER FROM ADD TOOLBUTTION //

    let currentMenu: any = this.getCurrentGeomMenu();

    if (currentMenu.edited) {
      // so go to desactivate
      if (currentMenu.name === "points") {
        this.pointsLayer.disableMapClick()
        this.pointsLayer.addButtonStatus(false) // very important to support mouseover circle
      }
      // TODO add lines and polygons cond

    } else {
      // so go to activate
      console.log("edit on")
      this._startEditing(currentMenu.name)
    }

    this.switchEditGeomMenu()
  };
  // ADD ACTION //


  _startEditing(currentMenu: string): void {
    if ( currentMenu === 'points' ) {
      this.pointsLayer.enableMapClick()
      this.pointsLayer.addButtonStatus(true) // very important to support mouseover circle

    } else if ( currentMenu === 'lines' ) {
      // this.linesLayer.addPoints(0, coords);
    }
  };


  // GEOM BUTTONS ACTIONS //
  enabledGeomEditing(geomId: string): void {
    if (this.getCurrentGeomMenu().name === 'points') {
      this.pointsLayer.setCurrentGeomEdited(geomId);
    }
    // TODO add lines and polygons cond

  };

  removeGeom(geomId: string): void {
    if (this.getCurrentGeomMenu().name === 'points') {
      this.pointsLayer.removePointById(geomId)
    }
    // TODO add lines and polygons cond

  };

  getGeomInfo(geomId: string): void {
    if (this.getCurrentGeomMenu().name === 'points') {
      this.geomFeature = this.pointsLayer.getPointById(geomId);
    }
    // TODO add lines and polygons cond
  };
  // GEOM BUTTONS ACTIONS //


  highLightGeom(geomId: string): void {
    this.pointsLayer.highLightPointById(geomId);
  };

  unHighLightGeom(geomId: string): void {
    this.pointsLayer.unHighLightPointById(geomId);
  };

  refreshLayer(): void {
    if (this.getCurrentGeomMenu().name === 'points') {
      this.pointsLayer.buildLayer();
    }
  };

  applyByProperties(filterPropertyName: any, filterPropertyValue: any, updatedPropertyName: any, updatedPropertyValue: any): void {
    if (this.getCurrentGeomMenu().name === 'points') {
      this.pointsLayer.updateGeomByProperty(filterPropertyName, filterPropertyValue, updatedPropertyName, updatedPropertyValue);
    }
  };

  removeLayer(geomMenu: string): void {

    if ( geomMenu === 'points' ) {
      this.pointsLayer.removeSvgLayer(true);

    } else if ( geomMenu === 'lines' ) {

    } else if ( geomMenu === 'polygons' ) {

    }

  };


}
