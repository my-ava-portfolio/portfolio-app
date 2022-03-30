import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

import { centerIcon, helpIcon, removeIcon, toolsIcon, locationIcon, lineIcon, PolygonIcon, editIcon, addIcon, homePages } from '@core/inputs';

import { PointsSvgLayerOnLeaflet } from '@core-helpers/points_svg_layer';
import { Point } from '@core-helpers/core-geom';

import { LinesSvgLayerOnLeaflet } from '@core-helpers/lines_svg_layer';
import { Subscription } from 'rxjs/internal/Subscription';
import { MapService } from 'src/app/services/map.service';
import { ControlerService } from '@services/controler.service';


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

  homeTopics: any[] = homePages;


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
    private mapService: MapService,
    private controlerService: ControlerService,
  ) {

    this.titleService.setTitle(this.activatedRoute.snapshot.data.title);

    this.mapContainerSubscription = this.mapService.mapContainer.subscribe(
      (map: any) => {
        this.mapContainer = map;

        this.geomTypesList.forEach((element, _) => {
          if (element.name === 'points') {
            this.pointsLayer = new PointsSvgLayerOnLeaflet(this.mapContainer, "sandboxPoints");
            this.pointsLayer.buildLayer();
            element.features = this.pointsLayer.points;

          } else if (element.name === 'lines') {
            this.linesLayer = new LinesSvgLayerOnLeaflet(this.mapContainer, "sandboxLines")
            element.features = this.linesLayer.lines;

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

    this.sendResumeSubMenus()

    // let start with the point menu
    this.setGeomMenu('points')
  };

  ngOnDestroy(): void {
    this.mapContainerSubscription.unsubscribe();

    this.mapContainer.off('click')
    this.removeLayer('points')
    // TODO add func to remove the layers

  };

  sendResumeSubMenus(): void {
    this.controlerService.pullSubMenus(this.homeTopics)
    this.controlerService.pullTitlePage(this.activatedRoute.snapshot.data.title)

  }

  // SELECTION MENU //
  setGeomMenu(menu: string): void {
    // STARTER FROM MENU //
    // reset
    this.resetGeomMenuAndEdits()

    // disable all the map click events (from each geom editor class)
    this.mapContainer.off('click')

    // select menu
    this.geomTypesList.forEach((element, _) => {
      if ( element.name === menu ) {
        element.selected = true;
      }
    });
  };


  resetGeomMenuAndEdits(): void {

    this.geomTypesList.forEach((element, _) => {
      element.selected = false;
      element.edited = false;

      element.features.forEach((element: any, _: any) => {
        element.edited = false;
      });

    });

    this.pointsLayer.setAddButtonStatus(false);
  };

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
        this.pointsLayer.setAddButtonStatus(false) // very important to support mouseover circle

      } else if (currentMenu.name === "lines") {
        this.linesLayer.disableMapClick()
        this.linesLayer.setAddButtonStatus(false) // very important to support mouseover circle
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
      this.pointsLayer.setAddButtonStatus(true) // very important to support mouseover circle

    } else if (currentMenu === 'lines') {
      this.linesLayer.setAddButtonStatus(true) // very important to support mouseover circle
      this.linesLayer.addLineClick()
    }
  };


  // GEOM BUTTONS ACTIONS //
  enabledGeomEditing(geomId: string): void {

    if (this.getCurrentGeomMenu().name === 'points') {
      this.pointsLayer.setCurrentGeomEdited(geomId);

    } else if (this.getCurrentGeomMenu().name === 'lines') {
      // TODO be sure that there's no more than one edit

      if (this.linesLayer.getLineCurrentlyEdited().length === 0) {
        // go to edit !

        // add line is disabled if a line is edited
        this._getCurrentItemMenu().edited = false;
        this.linesLayer.disableMapClick();

        this.linesLayer.setCurrentGeomEdited(geomId);
        this.linesLayer.nodeMapClick();
      } else {
        // close edit !
        this.linesLayer.disableMapClick();
        this.linesLayer.unsetCurrentGeomEdited(geomId);
      }


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
