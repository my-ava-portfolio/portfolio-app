import { Component, OnInit, OnDestroy, HostListener, ViewEncapsulation, AfterViewInit } from '@angular/core';

import { Subscription } from 'rxjs';

import * as L from 'leaflet';
import Feature from 'ol/Feature';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';

import Point from 'ol/geom/Point';
import {Circle as CircleStyle, Fill, Stroke, Style} from 'ol/style';
import {extend} from 'ol/extent';

import * as d3 from 'd3';

import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { locationIcon, tagsIcon, centerIcon, trainIconUnicode, helpIcon, minWidthLandscape, imageProfile, experiencesPages, educationPages } from '@core/inputs';
import { apiLogoUrl, currentYear } from '@core/inputs';
import { svgActivitiesPointsLayerId, svgTripIdPrefix, legendActivities } from '@core/inputs';

import { DataService } from '@modules/map-activities/shared/services/data.service';
import { ControlerService } from 'src/app/services/controler.service';
import { MapService } from '@services/map.service';


@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class MapViewComponent implements OnInit, OnDestroy  {
  imageProfile: string = imageProfile;

  fragment!: any;
  fragmentValue!: string;

  experiencesRoute: string = experiencesPages.route;
  educationRoute: string = educationPages.route;

  activitiesStyle!: Style;
  activityLayerName = "activities_layer"
  //////

  svgTripIdPrefix = svgTripIdPrefix;
  legendActivities = legendActivities;

  trainIconUnicode = trainIconUnicode;

  currentDate = currentYear;

  isLegendDisplayed = true;

  innerWidth!: any;
  innerHeight!: any;

  mapContainer!: any;
  zoomInitDone!: boolean;
  maxZoomValue = 9;
  ZoomActivityValue = 12;

  apiImgUrl = apiLogoUrl;

  locationIcon = locationIcon;
  tagIcon = tagsIcon;
  centerIcon = centerIcon;
  helpIcon = helpIcon;

  helpPopup = 'Voici une cartographie spatio-temporelles de mes expériences';

  // check css code related to popup
  popupWidth = 330;
  popupHeight = 190;
  geoFeaturesData!: any[];
  svgActivitiesLayerId = svgActivitiesPointsLayerId;
  circleOpacity = 0.7;
  circleStroke = 'ghostwhite';
  circleWidth = '2.5px';
  generalData!: any;

  mapContainerSubscription!: Subscription;
  pullActivitiesGeoDataToMapSubscription!: Subscription;
  pullTripsGeoDataToMapSubscription!: Subscription;
  zoomEventSubscription!: Subscription;
  routeSubscription!: Subscription;

  constructor(
    private mapService: MapService,
    private dataService: DataService,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    private controlerService: ControlerService,
  ) {

    this.zoomEventSubscription = this.mapService.zoomEvent.subscribe(
      (_: boolean) => {
        // this.zoomFromDataBounds(this.geoFeaturesData)
      }
    );

    this.mapContainerSubscription = this.mapService.mapContainer.subscribe(
      (mapContainer: any) => {
        this.mapContainer = mapContainer;
        // this.initActivitiesSvgLayer();

      }
    );

    this.pullActivitiesGeoDataToMapSubscription = this.dataService.activitiesGeoDataToMap.subscribe(
      (geoFeaturesData: any[]) => {
        this.geoFeaturesData = geoFeaturesData;
        let activitiesLayer = this.buildLayerFromFeatures(this.activityLayerName, this.geoFeaturesData, this.activitiesStyle)
        var extent = this.mapContainer.getView().calculateExtent(this.mapContainer.getSize());

        this.mapContainer.addLayer(activitiesLayer)
        this.mapService.zoomToLayerName(this.activityLayerName)


      });

    this.pullTripsGeoDataToMapSubscription = this.dataService.tripsGeoDataToMap.subscribe(
      (geoFeaturesData: any[]) => {

      }
    );

    this.routeSubscription = this.activatedRoute.fragment.subscribe(
      (fragment) => {
        if (fragment === null) {
          this.fragment = null;
        } else {
          this.fragment = fragment;
          this.fragmentValue = this.fragment;

        }
      }
    );

  }

  ngOnInit(): void {
    this.mapService.setMapInteraction(true)
    this.activitiesStyle = this.BuildActivitiesStyle()
    this.mapService.getMapContainer();

    this.sendResumeSubMenus();

    this.zoomInitDone = false;
    this.innerWidth = window.innerWidth;
    this.innerHeight = window.innerHeight;

  }

  sendResumeSubMenus(): void {
    this.controlerService.pullSubMenus([]);
    this.controlerService.pullTitlePage(this.activatedRoute.snapshot.data.title);
    // to get the data properties from routes (app.module.ts)
    this.titleService.setTitle(this.activatedRoute.snapshot.data.title);

  }

  ngOnDestroy(): void {
    this.mapContainerSubscription.unsubscribe();
    this.pullActivitiesGeoDataToMapSubscription.unsubscribe();
    this.pullTripsGeoDataToMapSubscription.unsubscribe();
    this.zoomEventSubscription.unsubscribe();
    this.routeSubscription.unsubscribe();



    this.mapService.removeLayerByName(this.activityLayerName)
    this.mapService.resetMapView()
  }


  zoomOnData(): void {
    // TODO REWORK
    if (this.geoFeaturesData !== undefined) {
      this.zoomFromDataBounds(this.geoFeaturesData);
    }
  }

  showHideLegend(): void {
    this.isLegendDisplayed = !this.isLegendDisplayed;
  }

  zoomFromDataBounds(geojsonData: any): void {
    // TODO REWORK
    this.mapContainer.fitBounds(
      L.geoJSON(geojsonData).getBounds(),
      {
        maxZoom: this.maxZoomValue
      }
    );
  };


  buildLayerFromFeatures(layerName: string, features: any[], style: Style): any {

    let vectorSource = new VectorSource({
      features: []
    });
    let vectorLayer = new VectorLayer({
      source: vectorSource,
    });

    features.forEach((data: any, index: number) => {
      let iconFeature = new Feature({
        geometry: new Point(data.geometry.coordinates).transform('EPSG:4326', 'EPSG:3857'),
        name: data.name
      })

      iconFeature.setStyle(style)
      vectorSource.addFeature(iconFeature)
    })
    vectorLayer.set("name", layerName)
    return vectorLayer

  };

  BuildActivitiesStyle(): any {


    return new Style({


      image: new CircleStyle({
        radius: 10,
        fill: new Fill({
          color: 'red',
        }),
        stroke: new Stroke({
          color: 'white',
          width: 1,
        }),
      }),
    });
  }






}
