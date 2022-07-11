import { dataVizIcon } from './../../../core/inputs';
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
import { getVectorContext } from 'ol/render';
import {LineString} from 'ol/geom';

import {unByKey} from 'ol/Observable';


import * as d3 from 'd3';

import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { locationIcon, tagsIcon, centerIcon, helpIcon, imageProfile, experiencesPages, educationPages } from '@core/inputs';
import { apiLogoUrl, currentYear } from '@core/inputs';

import { DataService } from '@modules/map-activities/shared/services/data.service';
import { ControlerService } from 'src/app/services/controler.service';
import { MapService } from '@services/map.service';
import { transform } from 'ol/proj';
import { activitiesStyle, activitySelectedStyle, travelStyles } from '../shared/core';


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
  activityLayerName = "activities"
  travelLayerName = "travel"

  geoFeaturesData!: any[];

  //////

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

        this.buildActivityLayer(this.geoFeaturesData)

        // check if the zoom is needed, it means only at the start !
        if (geoFeaturesData[1] === 0) {
          this.mapService.zoomToLayerName(this.activityLayerName, 9)

        }
      });

    this.pullTripsGeoDataToMapSubscription = this.dataService.tripsGeoDataToMap.subscribe(
      (geoFeaturesData: any[]) => {
        this.mapService.removeLayerByName(this.travelLayerName)

        if (geoFeaturesData.length === 1) {
          geoFeaturesData.forEach((item: any) => {

            let points: any[] = []
            item.geojson_data.forEach((element: any) => {
              points.push(transform(element.geometry.coordinates, 'EPSG:4326', 'EPSG:3857'))
            });;
            let travelLine = new LineString(points)//.transform('EPSG:4326', 'EPSG:3857')
            var travel = new Feature({
              type: 'route',
              geometry: travelLine
            })
            const startMarker = new Feature({
              type: 'limit',
              geometry: new Point(travelLine.getFirstCoordinate()),
            });
            const endMarker = new Feature({
              type: 'limit',
              geometry: new Point(travelLine.getLastCoordinate()),
            });
            const position = new Point(travelLine.getFirstCoordinate())
            const geoMarker = new Feature({
              type: 'geoMarker',
              geometry: position,
            });

            let vectorSource = new VectorSource({
              features: []
            });
            let vectorLayer = new VectorLayer({
              source: vectorSource,
            });
            const features = [travel, geoMarker, startMarker, endMarker]
            features.forEach((feature: any, index: number) => {
              feature.setStyle(travelStyles(feature.get("type")))
              vectorSource.addFeature(feature)
            })
            vectorLayer.set("name", this.travelLayerName)

            let lastTime = Date.now();
            let distance  = 0;

            this.mapContainer.addLayer(vectorLayer);

            vectorLayer.on('postrender', (event: any) => {
              const speed = 100;
              const time = event.frameState.time;
              const elapsedTime = time - lastTime;
              distance = (distance + (speed * elapsedTime) / 1e6) % 2;
              lastTime = time;

              const currentCoordinate = travelLine.getCoordinateAt(
                distance > 1 ? 2 - distance : distance
              );
              position.setCoordinates(currentCoordinate);
              const vectorContext = getVectorContext(event);
              vectorContext.setStyle(travelStyles('geoMarker'));
              vectorContext.drawGeometry(position);
              // tell OpenLayers to continue the postrender animation
              this.mapContainer.render();
            });
            console.log("aaa")

          });
        }

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
    this.mapService.removeLayerByName(this.travelLayerName)

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


  buildActivityLayer(data: any): void {
    let activitiesLayer = this.buildLayerFromFeatures(this.activityLayerName, data, activitiesStyle)

    this.mapContainer.addLayer(activitiesLayer)

    let select = new Select({
      condition: pointerMove,
      multi: false,
      layers: [activitiesLayer],
      style: (feature: any) => {
        let radius = feature.get("radius")
        var selectedStyle = activitySelectedStyle(radius)
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

  }


}
