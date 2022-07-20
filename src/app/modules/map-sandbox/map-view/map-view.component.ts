import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ControlerService } from '@services/controler.service';
import { MapService } from '@services/map.service';
import { Draw, Modify, Snap } from 'ol/interaction';
import VectorLayer from 'ol/layer/Vector';

import Map from 'ol/Map';
import VectorSource from 'ol/source/Vector';

import { faCircle, faWaveSquare, faDrawPolygon, faXmark } from '@fortawesome/free-solid-svg-icons';

import { DrawInteraction, getWkt, PointStyle } from '@modules/map-sandbox/shared/core';
import Feature from 'ol/Feature';
import * as d3 from 'd3';
import { Subscription } from 'rxjs/internal/Subscription';
import { Subject } from 'rxjs/internal/Subject';
import MousePosition from 'ol/control/MousePosition';
import { format } from 'ol/coordinate';


@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.scss']
})
export class MapViewComponent implements OnInit, OnDestroy {

  map!: Map;


  sourceFeatures!: any;
  layerFeatures!: any;
  layerName = "edited_layer";
  holeEnabled = false;

  allFeatures: any[] = [];
  featureSelectedId: string | null = null;
  featuresDisplayedObservable = new Subject<Feature[]>()
  featuresCreatedObservable = new Subject<Feature[]>()

  featureProperties: any = {};
  featuresCount: number = 0;
  selectedFeaturesProperties: any[] = [];

  color!: string;

  drawSession!: any;

  modifier!: Modify;
  draw!: Draw;
  snap!: Snap;

  disabledIcon = faXmark;
  EditIcon = faCircle;
  pointIcon = faCircle;
  lineStringIcon = faWaveSquare;
  polygonIcon = faDrawPolygon;

  mousePositionControl!: MousePosition;
  cursorCoordinates!: any;
  epsgAvailable = ["EPSG:4326", "EPSG:3857"];
  // create a service to get the map epsg!
  currentEpsg!: string;
  selectedEpsg!: string;

  createModesSupported = [
    {
      "mode": 'disabled',
      "label": "Annuler/Désactiver",
      "type": "controler",
      "icon": this.disabledIcon
    },
    {
      "mode": 'Point',
      "label": 'Point',
      "type": "geometry",  // new feature creating
      "icon": this.pointIcon
    },
    {
      "mode": 'LineString',
      "label": 'LineString',
      "type": "geometry",  // new feature creating
      "icon": this.lineStringIcon
    },
    {
      "mode": 'Polygon',
      "label": 'Polygon',
      "type": "geometry",  // new feature creating
      "icon": this.polygonIcon
    },
    {
      "mode": 'Hole',  // works like a polygon
      "label": 'Trou',
      "type": "enhancement",  // particular case where we have to select And edit the feature
      "icon": this.polygonIcon
    }
  ]

  modifyModesSupported = [
    {
      "mode": 'disabled',
      "label": "Annuler/Désactiver",
      "type": "controler",
      "icon": this.disabledIcon
    },
    {
      "mode": 'edited',
      "label": 'Editer',
      "type": "controler",
      "icon": this.pointIcon
    },
    // {
    //   "mode": 'Hole',  // works like a polygon
    //   "label": 'Trou',
    //   "type": "enhancement",  // particular case where we have to select And edit the feature
    //   "icon": this.polygonIcon
    // }
  ]


  drawModeSelected = "disabled";
  modifyModeSelected  = "disabled";
  isLegendDisplayed = true;

  mapSubscription!: Subscription;
  featuresDisplayedSubscription!: Subscription;
  featuresCreatedSubscription!: Subscription;

  constructor(
    private mapService: MapService,
    private controlerService: ControlerService,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
  ) {

    this.featuresCreatedSubscription = this.featuresCreatedObservable.subscribe(
      (features: Feature[]) => {
        this.resetToasts();
        features.forEach((feature: Feature) => {
          // this.setFeatureToasts(feature, true)
          this.featureSelectedId = feature.get('id');

          if (this.modifyModeSelected !== "Hole") {
            // Hole needs to work on a selected feature, so reset the mode is not relevant
            this.featureSelectedId = null;  // we don't want to select the feature on the div when creating a new feature
          }
        })
      }
    )

    this.featuresDisplayedSubscription = this.featuresDisplayedObservable.subscribe(
      (features: Feature[]) => {
        this.resetToasts();
        features.forEach((feature: Feature) => {
          this.setFeatureToasts(feature, false)
          this.featureSelectedId = feature.get('id');
          console.log(feature.get('name'))
        })
      }
    )

    this.mapSubscription = this.mapService.map.subscribe(
      (map: Map) => {
        this.map = map;
        // this.setMapEpsg();
        this.currentEpsg = this.map.getView().getProjection().getCode();

        this.selectedEpsg = this.currentEpsg
      }
    );

   }

  ngOnInit(): void {
    this.sendResumeSubMenus();
    this.mapService.getMap();

    this.initSourceFeatures();
    this.initVectorLayer();

    this.mapService.changeMapInteractionStatus(true)

    // let's go to get map container and init layer(s)
    this.disableCreationMode()

    this.initMousePosition()
  }

  ngOnDestroy(): void {

    this.mapSubscription.unsubscribe();
    this.featuresDisplayedSubscription.unsubscribe();
    this.featuresCreatedSubscription.unsubscribe();

    this.map.removeInteraction(this.modifier)

    this.mapService.resetMapView()
    this.mapService.changeMapInteractionStatus(false)
    this.map.removeLayer(this.layerFeatures);
    this.drawSession.destroySession()
    this.setProjection("EPSG:3857")
  }

  sendResumeSubMenus(): void {
    this.controlerService.pullSubMenus([]);
    this.controlerService.pullTitlePage(this.activatedRoute.snapshot.data.title);
    this.titleService.setTitle(this.activatedRoute.snapshot.data.title);

  }

  showHideLegend(): void {
    this.isLegendDisplayed = !this.isLegendDisplayed;
  }

  disableCreationMode(): void {
    this.activateDrawing(this.createModesSupported[0].mode)
  }

  initSourceFeatures(): void {
    this.sourceFeatures = new VectorSource();
  }

  setMapEpsg(): void {
    this.currentEpsg = this.map.getView().getProjection().getCode();
  }

  initVectorLayer(): any {
    this.layerFeatures = new VectorLayer({
      source: this.sourceFeatures,
    });
    this.layerFeatures.set("name", this.layerName, true)

    this.drawSession = new DrawInteraction(this.map, this.layerFeatures)

    this.drawSession.sourceFeatures.on('addfeature', (event: any) => {
      this.returnExistingFeaturesAndProperties()

      this.pushFeaturesCreated([event.feature])
    });

    this.drawSession.sourceFeatures.on('changefeature', (event: any) => {
      // in order to get a dynamic popup
      this.displayFeaturePopup([event.feature])
    });

    this.drawSession.sourceFeatures.on('removefeature', (event: any) => {
      this.returnExistingFeaturesAndProperties()
      // TODO add a remove toast?
    });

    this.drawSession.selectClick.on("select", (event: any) => {
      if (event.selected.length === 0) {
        // all is unselected on the objects div
        this.selectAndDisplayFeature(null)
      }
      if (event.selected.length === 1) {
        // if a feature is selected on the map, it will be selected on the object div also
        this.selectAndDisplayFeature(event.selected[0].getId())
      }
    })


    this.map.addLayer(this.layerFeatures)
  }

  activateDrawing(mode: string): void {

    switch (mode) {
      case "disabled": {
        this.drawSession.disableDrawing()
         break;
      }

      case "editEnabled": {
        this.drawSession.enableEditingMode()
         break;
      }

      case "Point":
      case "LineString":
      case "Polygon": {
        this.activateModifiying('disabled')
        this.selectAndDisplayFeature(null)  // unselect selected feature on div (objet)
        this.holeEnabled = false;
        this.drawSession.enabledDrawing(mode, this.holeEnabled)
         break;
      }

      case "Hole": {
        this.holeEnabled = true;
        this.drawSession.enabledDrawing("Polygon", this.holeEnabled)
        this.drawModeSelected = 'Hole';
        // this.activateDrawing('Hole')
         break;
      }

      default: {
         break;
      }
    }
    this.drawModeSelected = mode;

  }


  activateModifiying(mode: string): void {

    switch (mode) {
      case "disabled": {
        this.drawSession.disableDrawing()
        this.activateDrawing(mode)
         break;
      }

      case "edited": {
        this.activateDrawing('disabled')
        this.drawSession.enableEditingMode()
         break;
      }

      case "Hole": {
        this.holeEnabled = true;
        this.drawSession.enabledDrawing("Polygon", this.holeEnabled)
        this.drawModeSelected = 'Polygon';
        // this.activateDrawing('Hole')
         break;
      }

      default: {
         break;
      }
    }
    this.modifyModeSelected = mode;

  }

  returnExistingFeaturesAndProperties(): void {
    this.allFeatures = this.drawSession.returnFeatures()
    this.featuresCount = this.allFeatures.length
  }

  pushFeaturesCreated(features: Feature[]): void {
    this.featuresCreatedObservable.next(features);
  }

  displayFeaturePopup(features: Feature[]): void {
    // update displayed features
    // this.returnExistingFeaturesAndProperties() // in order to refresh the list of feature and its properties
    this.featuresDisplayedObservable.next(features);
  }

  removeFeature(id: string): void {
    this.drawSession.removeFeature(id)
    this.resetToasts()
    this.featureSelectedId = null

  }

  setFeatureToasts(feature: Feature, isNotify: boolean): any {

    // get the geom Icon // TODO could be improved...
    const modeSupportedFound = this.createModesSupported.filter(mode => {
      return mode.mode === feature.get('geom_type')
    });
    const geomIcon = modeSupportedFound[0].icon

    // get wkt regarding selected projection
    const geomFeature = feature.getGeometry();
    if (geomFeature !== undefined) {

      this.selectedFeaturesProperties.push({
        'id': feature.getId(),
        'name': feature.get('name'),
        'geom_type': feature.get('geom_type'),
        'created_at': feature.get('created_at'),
        'updated_at': feature.get('updated_at'),
        'icon': geomIcon,
        'wkt': getWkt(geomFeature)
      })

      if (isNotify) {
        // display it with fading
        d3.select("html")
        .transition()
        .delay(2000) // need this delayto wait the toats html building
        .duration(5000)
        .on("end", () => {
          d3.selectAll(".toastFeature")
          .attr("class", "toast toastFeature");
        })
      } else {
        // happened only if a feature is selected
        // d3.selectAll(".toastFeature").remove()
        d3.selectAll(".toastFeature")
        .attr("class", "toast toastFeature faded");
      }
    }
  }

  selectAndDisplayFeature(featureId: string | null): any {
    // reset toast
    this.resetToasts()

    if (featureId !== null) {
      // this.disableCreationMode()
      const featureFound = this.sourceFeatures.getFeatureById(featureId)
      if (featureFound !== undefined) {
        this.featureSelectedId = featureFound.get('id')

        // reset the selection and set it (then the style will be updated) + it call the changefeature event !
        this.drawSession.selectClick.getFeatures().clear()
        this.drawSession.selectClick.getFeatures().push(featureFound)
        this.displayFeaturePopup([featureFound])

        // featureFound.setStyle(highLigthStyle(featureFound))  // NO NEED ?
        // it will push a changefeature event on sourceFeatures object

      }

    } else {
      this.drawSession.selectClick.getFeatures().clear()
      this.featureSelectedId = featureId;
    }

  }

  refreshStyle(feature: Feature): void {
    // feature.set("fill_color", color)
    this.drawSession.refreshFeatureStyle(feature)
  }

  updateFillColor(feature: Feature, color: string): void {
    feature.set("fill_color", color, true)
    this.refreshStyle(feature)
  }
  updateStrokeWidth(feature: Feature, event: any): void {
    feature.set("stroke_width", event.target.value, true)
    this.refreshStyle(feature)
  }
  updateStrokeColor(feature: Feature, color: string): void {
    feature.set("stroke_color", color, true)
    this.refreshStyle(feature)
  }


  resetToasts(): void {
    this.selectedFeaturesProperties = []
  }

  copyToClipboard(value: string): void {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = value;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }

  initMousePosition(): void {
    let mouseCoordinatesDiv!: any;
    mouseCoordinatesDiv = document.getElementById('mouseCoordinates')

    this.mousePositionControl = new MousePosition({
      coordinateFormat: this.setPrecisionFunc(4),
      placeholder: false,
      className: 'mouse-position',
      target: mouseCoordinatesDiv,
    });
    this.mousePositionControl.on("propertychange", (event: any) => {
      this.cursorCoordinates = event
    })
    this.map.addControl(this.mousePositionControl)
  }

  setProjection(epsg: string): void {
    this.selectedEpsg = epsg;

    this.mapService.setProjectionOnMap(epsg)

    this.layerFeatures.getSource().getFeatures().forEach( (feature: any) => {
      feature.setGeometry(feature.getGeometry().transform(this.currentEpsg, this.selectedEpsg))
    });
    this.setMapEpsg();

  }

  updatePrecision(event: any): any {
    return this.mousePositionControl.setCoordinateFormat(this.setPrecisionFunc(event.target.value))
  }
  private setPrecisionFunc(precision: any): any {
    var template = '{x}, {y}';
    return (
      function(coordinate: any) {
          return format(coordinate, template, precision);
      });
  }

}


