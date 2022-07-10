import { Component, OnInit, OnDestroy, HostListener, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { count, map } from 'rxjs/operators';

import { Subscription } from 'rxjs';

import * as L from 'leaflet';
import Feature from 'ol/Feature';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';

import Point from 'ol/geom/Point';
import {Circle as CircleStyle, Fill, Stroke, Style} from 'ol/style';
import Select from 'ol/interaction/Select';
import {pointerMove} from 'ol/events/condition';
import {Tile as TileLayer} from 'ol/layer';
import {easeOut} from 'ol/easing';
import {getVectorContext} from 'ol/render';

import {unByKey} from 'ol/Observable';


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
  mousePosition!: number[];
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

    this.pullActivitiesGeoDataToMapSubscription = this.dataService.activitiesGeoDataToMap.pipe(map((val, index) => [val, index]) // here we transform event to array (call it tuple if you like)
     ).subscribe(
      (geoFeaturesData: any[]) => {

        this.mapService.removeLayerByName(this.activityLayerName)
        this.geoFeaturesData = geoFeaturesData[0];
        let activitiesLayer = this.buildLayerFromFeatures(this.activityLayerName, this.geoFeaturesData, this.BuildActivitiesStyle)

        this.mapContainer.addLayer(activitiesLayer)

        let select = new Select({
          condition: pointerMove,
          multi: false,
          layers: [activitiesLayer],
          style: (feature: any) => {

            let radius = feature.get("radius")

            var selectedStyle = new Style({
              image: new CircleStyle({
                radius: radius,
                fill: new Fill({
                  color: 'rgba(255, 215, 0, 0.6)',
                }),
                stroke: new Stroke({
                  color: 'black',
                  width: 2,
                }),
              }),
            });
            return selectedStyle;

          }
        });
        select.on('select', (evt: any) => {

          const selected = evt.selected
          const deSelected = evt.deselected

          // WARNING not refactoring needed ! because we can have both selected and deselected
          if (deSelected.length === 1) {
            let deSelectedFeature = deSelected[0]

            d3.select('#popup-feature-' + deSelectedFeature.get("id"))
            .style('display', 'none')
            .style('right', 'unset')
            .style('top', 'unset');


            const currentElement: any = d3.select("#legendActivity ." + deSelectedFeature.get("type"));
            currentElement.classed('selected', !currentElement.classed('selected')); // toggle class

            const timeLineEvent: any = d3.select('circle#location_' + deSelectedFeature.get("id"));
            timeLineEvent.classed('selected', !timeLineEvent.classed('selected'));

          }
          if (selected.length === 1) {
            let selectedFeature = selected[0]
            let pos = evt.mapBrowserEvent.pixel
            d3.select('#popup-feature-' + selectedFeature.get("id"))
              .style('display', 'block')
              .style('z-index', '1')
              .style('left', () => {
                if (pos[0] + this.popupWidth + 20 > this.innerWidth) {
                  return pos[0] - this.popupWidth - 15 + 'px';
                } else {
                  return pos[0] + 15 + 'px';
                }
              })
              .style('top', () => {

                if (pos[1] + this.popupHeight + 20 > this.innerHeight) {
                  return pos[1] - this.popupHeight - 15 + 'px';
                } else {
                  return pos[1] + 15 + 'px';
                }
              });

            const currentElement: any = d3.select("#legendActivity ." + selectedFeature.get("type"));
            currentElement.classed('selected', !currentElement.classed('selected')); // toggle class

            const timeLineEvent: any = d3.select('circle#location_' + selectedFeature.get("id"));
            timeLineEvent.classed('selected', !timeLineEvent.classed('selected'));
          }

        });

        this.mapContainer.addInteraction(select);



        // check if the zoom is needed, it means only at the start !
        if (geoFeaturesData[1] === 0) {
          this.mapService.zoomToLayerName(this.activityLayerName, 9)

        }
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
    // this.activitiesStyle = this.BuildActivitiesStyle.bind(this)
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


  buildLayerFromFeatures(layerName: string, features: any[], style: Function): any {

    let vectorSource = new VectorSource({
      features: []
    });
    let vectorLayer = new VectorLayer({
      source: vectorSource,
    });

    features.forEach((data: any, index: number) => {
      let iconFeature = new Feature({
        geometry: new Point(data.geometry.coordinates).transform('EPSG:4326', 'EPSG:3857'),
        id: data.properties.id,
        type: data.properties.type,
        name: data.properties.name,
        radius: data.properties.months * 2,
      })

      iconFeature.setStyle(style(data.properties))
      vectorSource.addFeature(iconFeature)
    })
    vectorLayer.set("name", layerName)

    return vectorLayer

  };

  BuildActivitiesStyle(properties: any): Style {

    const education = new Style({
      image: new CircleStyle({
        radius: properties.months * 2,
        fill: new Fill({
          color: 'rgba(0, 144, 29, 0.6)',
        }),
        stroke: new Stroke({
          color: 'white',
          width: 2,
        }),
      }),
    });

    const job = new Style({
      image: new CircleStyle({
        radius: properties.months * 2,
        fill: new Fill({
          color: 'rgba(225, 0, 116, 0.6)',
        }),
        stroke: new Stroke({
          color: 'white',
          width: 2,
        }),
      }),
    });

    const volunteer = new Style({
      image: new CircleStyle({
        radius: properties.months * 2,
        fill: new Fill({
          color: 'rgba(98, 0, 255, 0.6)',
        }),
        stroke: new Stroke({
          color: 'white',
          width: 2,
        }),
      }),
    });




    if (properties.type === "job") {
      return job
    } else if ( properties.type === "education") {
      return education
    } else {
      return volunteer
    }


  }






}
