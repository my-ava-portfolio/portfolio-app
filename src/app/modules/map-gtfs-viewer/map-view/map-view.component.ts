import { Component, OnInit, OnDestroy, AfterViewInit} from '@angular/core';

import { Subscription } from 'rxjs';

import Map from 'ol/Map';

import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { DataService } from '@modules/map-gtfs-viewer/shared/services/data.service';

import { locationIcon, tagsIcon, centerIcon, gtfsLayerName, gtfsStyle, circleRadius, metroColor, strokeWidth, trainColor, tramColor, strokeColor } from '@modules/map-gtfs-viewer/shared/core';
import { MapService } from '@services/map.service';
import { ControlerService } from '@services/controler.service';
import { Feature } from 'ol';
import Point from 'ol/geom/Point';
import VectorImageLayer from 'ol/layer/VectorImage';
import VectorSource from 'ol/source/Vector';


@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.scss']
})
export class MapViewComponent implements OnInit, OnDestroy, AfterViewInit {

  locationIcon = locationIcon;
  tagIcon = tagsIcon;
  centerIcon = centerIcon;

  // TODO improve API to return the areas list
  availableArea!: string[];
  input_data: any[] = [
    { "area": "lyon", "default_step_value": 4000, "zoom": 12, "source": "Métropole de Lyon" },
    { "area": "ter", "default_step_value": 1500, "zoom": 6, "source": "SNCF" },
    { "area": "toulouse", "default_step_value": 4000, "zoom": 12, "source": "Toulouse métropole" }
  ]

  widthLegendElement = 100;
  heightLegendElement = 80;
  heightMoveLegendElement = 60;

  // TODO improve the SVG build and linked it with the route about routeType
  routeTypesLegendData: any = {
    circleR: circleRadius * 2,
    circleCxPos: 20,
    fontSize: '12px',
    circleStrokeColor: strokeColor,
    circleStrokeWidth: strokeWidth,
    textXPos: 35,
    features: [
      { dataValue: '0', cy: 22, label: 'Tram', color: tramColor },
      { dataValue: '1', cy: 44, label: 'Métro', color: metroColor },
      { dataValue: '2', cy: 66, label: 'Train', color: trainColor },
    ]
  };


  previousArea: string | null = null;
  currentArea = this.input_data[1].area;
  currentstepValue = this.input_data[1].default_step_value;
  currentZoomValue = this.input_data[1].zoom;
  currentAttributionValue = this.input_data[1].source;

  endDate!: Date;
  startDate!: Date;
  currentDate!: Date;
  dataBoundingBox!: number[];

  isGeodataCanBeDisplayed = false;
  isLegendDisplayed = true;
  currentFeatureSelectedId!: string | null;
  currentRouteTypes: string[] = [];
  gtfsLayer!: any

  map!: Map;

  // check css code related to popup
  popupWidth = 100;
  popupHeight = 100;
  geoFeaturesData!: any[];

  mapSubscription!: Subscription;
  pullGeoDataToMapSubscription!: Subscription;
  pullAvailableRouteTypeSubscription!: Subscription;
  pullBoundingBoxDataSubscription!: Subscription;
  pullGeoDataSubscription!: Subscription;
  zoomEventSubscription!: Subscription;
  screenMapBoundSubscription!: Subscription;
  pullAvailableAreasSubscription!: Subscription;

  constructor(
    private dataService: DataService,
    private mapService: MapService,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    private controlerService: ControlerService,
  ) {

    this.zoomEventSubscription = this.mapService.zoomEvent.subscribe(
      (_: boolean) => {
        this.mapService.zoomToExtent(this.gtfsLayer.getSource().getExtent(), this.currentZoomValue)
      }
    );


    this.mapSubscription = this.mapService.map.subscribe(
      (map: Map) => {
        this.map = map;
      }
    );

    this.screenMapBoundSubscription = this.mapService.screenMapBound.subscribe(
      (data: any) => {
        this.dataBoundingBox = data;
        // redraw data when zoom/pan event occurs on map
        this.dataService.pullGeoData(this.currentArea, this.currentDate, this.dataBoundingBox)
      }
    );

    this.pullGeoDataToMapSubscription = this.dataService.GeoDataToMap.subscribe(
      (geoFeaturesData: any[]) => {

        this.geoFeaturesData = geoFeaturesData;

        this.refreshSourceLayer(geoFeaturesData)

        // we zoom to the area only once
        if (this.previousArea !== this.currentArea) {
          this.mapService.sendZoomAction();
          this.previousArea = this.currentArea
        }
      }
    );

    this.pullAvailableRouteTypeSubscription = this.dataService.availableRouteTypes.subscribe(
      (routeType: string[]) => {
        this.currentRouteTypes = routeType;
      }
    );

    this.pullBoundingBoxDataSubscription = this.dataService.rangeDateData.subscribe(
      (element) => {

        this.dataBoundingBox = element.data_bounds;
        this.startDate = this.parseTime(element.start_date);
        this.endDate = this.parseTime(element.end_date)

        // let s go to adapt the timeline with the current time for fun. It seems good if the currentData is outside the time boundaries...
        const now = new Date()
        let currentDate = new Date(
          `${this.startDate.getFullYear()}-${this.startDate.getMonth() + 1}-${this.startDate.getDate()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`
        )
        if (currentDate < this.startDate) {
          // to avoid case where current time is out of the data time bounds
          this.currentDate = this.startDate
        } else {
          this.currentDate = currentDate
        }
        // TIPS call this.getCurrentDate(this.currentDate) to display data without timeline
      }
    );

    this.pullGeoDataSubscription = this.dataService.GeoData.subscribe(
      (geoData) => {
        if (geoData.length > 0) {
          this.dataService.pullGeoDataToMap(geoData);
        }
      },
    );

    this.pullAvailableAreasSubscription = this.dataService.availableAreas.subscribe(
      (element) => {
        this.availableArea = element;
      }
    );

  }

  ngOnInit(): void {

    this.sendResumeSubMenus();

    // let's go to get map container and init layer(s)
    this.mapService.changeMapInteractionStatus(true)
    this.mapService.getMap();
    this.gtfsLayer = this.buildGtfsLayer(gtfsLayerName)

    // the begining of the process
    this.dataService.pullAvailableAreas();

  }

  ngAfterViewInit(): void {
    this.updateData(this.currentArea)

  }

  getCurrentDate(date: Date): void {
    this.currentDate = date
    this.dataService.pullGeoData(this.currentArea, this.currentDate, this.dataBoundingBox)
  }

  sendResumeSubMenus(): void {
    this.controlerService.pullSubMenus([]);
    this.controlerService.pullTitlePage(this.activatedRoute.snapshot.data.title);
    // to get the data properties from routes (app.module.ts)
    this.titleService.setTitle(this.activatedRoute.snapshot.data.title);

  }

  ngOnDestroy(): void {

    this.mapSubscription.unsubscribe();
    this.pullGeoDataToMapSubscription.unsubscribe();
    this.pullBoundingBoxDataSubscription.unsubscribe();
    this.pullGeoDataSubscription.unsubscribe();
    this.zoomEventSubscription.unsubscribe();
    this.screenMapBoundSubscription.unsubscribe();
    this.pullAvailableAreasSubscription.unsubscribe();
    this.pullAvailableRouteTypeSubscription.unsubscribe();


    this.mapService.removeLayerByName(gtfsLayerName)
    this.mapService.changeMapInteractionStatus(false)

    this.mapService.resetMapView()

  }

  zoomOnData(): void {
    // TODO create map components with buttons
    this.mapService.sendZoomAction();
  }

  private parseTime(time: string): Date {
    return new Date(time);
  }

  updateData(data: string): void {

    const data_found = this.input_data.filter((e) => {
      return e.area === data;
    });
    this.currentArea = data
    this.currentstepValue = data_found[0]["default_step_value"]
    this.currentZoomValue = data_found[0]["zoom"]
    this.currentAttributionValue = data_found[0]["source"]

    this.dataService.pullRangeDateData(this.currentArea);
  }

  showHideLegend(): void {
    this.isLegendDisplayed = !this.isLegendDisplayed;
  }


  buildGtfsLayer(layerName: string): any {

    let vectorLayer = new VectorImageLayer({
      source:  new VectorSource({
        features: []
      }),
      style: gtfsStyle
    });


    vectorLayer.set("name", layerName)
    this.map.addLayer(vectorLayer)
    return vectorLayer

  };


  refreshSourceLayer(features: any[]): void {
    let vectorSource = new VectorSource({
      features: [],
      attributions: this.currentAttributionValue  // sources will be added
    });


    let featuresToAdd: any[] = []
    features.forEach((feature: any, index: number) => {
      let iconFeature = new Feature({
        geometry: new Point([feature.x, feature.y]).transform('EPSG:4326', 'EPSG:3857'),
        route_type: feature.route_type,
        route_long_name: feature.route_long_name,
      })
      featuresToAdd.push(iconFeature)

    })
    vectorSource.addFeatures(featuresToAdd)
    const layers = this.map.getLayers().getArray()
    const layersFound: any[] = layers.filter((layer: any) => layer.get('name') === gtfsLayerName)
    if (layersFound.length === 1) {
      layersFound[0].setSource(vectorSource);
    }

  }

}
