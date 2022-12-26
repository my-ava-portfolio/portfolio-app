import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';

import Map from 'ol/Map';
import Feature from 'ol/Feature';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Point from 'ol/geom/Point';
import Select from 'ol/interaction/Select';
import {pointerMove} from 'ol/events/condition';
import { getVectorContext } from 'ol/render';
import {LineString} from 'ol/geom';
import { Style } from 'ol/style';

import * as d3 from 'd3';

import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { DataService } from '@modules/map-activities/shared/services/data.service';
import { ControlerService } from 'src/app/services/controler.service';
import { MapService } from '@services/map.service';
import { activitiesStyle, activityLayerName, activitySelectedStyle, getFeatureFromLayer, legendActivitiesId, travelLayerName, travelNodespeed, travelStyles } from '../shared/core';
import { assetsLogoPath, imageProfile } from '@core/global-values/main';
import { faMapMarkerAlt, faTags, faExpand, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';

import { experiencesPages, educationPages } from '@core/global-values/topics';


@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.scss']
})
export class MapViewComponent implements OnInit, OnDestroy  {
  imageProfile: string = imageProfile;

  fragment: string | null = null;

  experiencesRoute: string = experiencesPages.route;
  educationRoute: string = educationPages.route;

  map!: Map;
  currentFeatureSelectedId!: string | null;

  activitiesStyle!: Style;

  geoFeaturesData!: any;
  geoTripsData: any[] = [];

  travelId: string | null = null;
  startDate!: Date;
  endDate!: Date;
  currentDate!: Date;
  sourceFeatures!: VectorSource;

  isLegendDisplayed = true;

  innerWidth!: any;
  innerHeight!: any;

  zoomInitDone!: boolean;
  defaultActivitieLayerZoom = 9;

  apiImgUrl = assetsLogoPath;

  locationIcon = faMapMarkerAlt;
  tagIcon = faTags;
  centerIcon = faExpand;
  helpIcon = faQuestionCircle;

  helpPopup = 'Voici une cartographie spatio-temporelles de mes expériences';

  // check css code related to popup
  popupWidth = 330;
  popupHeight = 190;

  mapSubscription!: Subscription;
  getActivitiesGeoDataToMapSubscription!: Subscription;
  pullGeoDataSubscription!: Subscription;
  tripsGeoDataToMapSubscription!: Subscription;
  getTripsGeoDataToMapSubscription!: Subscription;

  zoomEventSubscription!: Subscription;
  routeSubscription!: Subscription;
  newCoordsSubscription!: Subscription;

  constructor(
    private mapService: MapService,
    private dataService: DataService,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    private controlerService: ControlerService,
  ) {

    this.zoomEventSubscription = this.mapService.zoomEvent.subscribe(
      (_: boolean) => {
        this.mapService.zoomToLayerName(activityLayerName, this.defaultActivitieLayerZoom)
      }
    );

    this.newCoordsSubscription = this.mapService.newCoords.subscribe(
      (coordinates: any) => {
        const pixelCoords = coordinates[1];
        this.popupMoving(pixelCoords)

      }
    )

    this.mapSubscription = this.mapService.map.subscribe(
      (map: Map) => {
        this.map = map;
      }
    );


    this.getActivitiesGeoDataToMapSubscription = this.dataService.activitiesGeoData.subscribe(
      (geoData: any) => {
        this.geoFeaturesData = geoData.geojson;

        this.startDate = new Date(geoData.date_range.start_date)
        this.endDate = new Date()
        this.getCurrentDate(this.endDate)


        // if a click is done on experience location icon
        if (this.fragment !== null) {
          const feature: Feature = getFeatureFromLayer(this.map, activityLayerName, this.fragment, 'id')
          const featureGeom = feature.getGeometry()
          if (featureGeom !== undefined) {
            this.mapService.zoomToExtent(featureGeom.getExtent(), 13)
          }

        } else {
          // check if the zoom is needed, it means only at the start !
          this.mapService.zoomToLayerName(activityLayerName, this.defaultActivitieLayerZoom)
        }
      });
    
    
    this.getTripsGeoDataToMapSubscription = this.dataService.tripsGeoData.subscribe(
      (geoData: any) => {
        this.geoTripsData = geoData
      }
    );

    this.tripsGeoDataToMapSubscription = this.dataService.tripsGeoDataToMap.subscribe(
      (tripData: any[]) => {
        if (tripData.length === 1 && this.travelId !== tripData[0].name) {
          // oh! a trvel must be displayed
          this.mapService.removeLayerByName(travelLayerName)
          this.travelId = tripData[0].name
          this.buildTravelLayer(tripData[0])
        }
        if (tripData.length === 0) {
          // stop displayed the travel
          this.travelId = null
          this.mapService.removeLayerByName(travelLayerName)
        }
      }
    );


    this.routeSubscription = this.activatedRoute.fragment.subscribe(
      (fragment) => {
        if (fragment === null) {
          this.fragment = null;
        } else {
          this.fragment = fragment;
        }
      }
    );

  }

  ngOnInit(): void {
    this.mapService.changeMapInteractionStatus(true)

    this.mapService.getMap();

    this.sendResumeSubMenus();

    // set the layer container
    this.initLayer(activityLayerName, activitiesStyle)

    this.dataService.queryTripsGeoData();
    this.dataService.queryActivitiesGeoData();

    this.zoomInitDone = false;
    this.innerWidth = window.innerWidth;
    this.innerHeight = window.innerHeight;

  }

  ngOnDestroy(): void {
    this.mapSubscription.unsubscribe();
    this.getActivitiesGeoDataToMapSubscription.unsubscribe();
    this.tripsGeoDataToMapSubscription.unsubscribe();
    this.getTripsGeoDataToMapSubscription.unsubscribe();
    this.zoomEventSubscription.unsubscribe();
    this.routeSubscription.unsubscribe();
    this.newCoordsSubscription.unsubscribe();

    this.mapService.removeLayerByName(activityLayerName)
    this.mapService.removeLayerByName(travelLayerName)
    this.mapService.changeMapInteractionStatus(false)

    this.mapService.resetMapView()
  }

  getCurrentDate(date: Date): void {
    this.currentDate = date

    // manage activities
    const newData = this.geoFeaturesData.filter((d: any) => {
      const selectedDate = new Date(d.start_date);
        return selectedDate <= this.currentDate;
    });
    this.addLayerFeatures(newData, activitiesStyle)

    // manage trips
    let tripFound: any[] = []
    this.geoTripsData.forEach((item: any) => {
      const startDate: string = item.start_date;
      const endDate: string = item.end_date;
      const tripStartDate: Date = new Date(startDate);
      const tripEndDate: Date = new Date(endDate);

      if (this.currentDate >= tripStartDate && this.currentDate < tripEndDate) {
        tripFound.push(item)
      }
    });
    this.dataService.pullTripsGeoDataToMap(tripFound);

  }


  zoomOnData(): void {
    // TODO create map components with buttons
    this.mapService.sendZoomAction();
  }

  sendResumeSubMenus(): void {
    this.controlerService.pullSubMenus([]);
    this.controlerService.pullTitlePage(this.activatedRoute.snapshot.data.title);
  }

  showHideLegend(): void {
    this.isLegendDisplayed = !this.isLegendDisplayed;
  }

  initLayer(layerName: string, style: Function): void  {
    this.sourceFeatures = new VectorSource();

    const vectorLayer = new VectorLayer({
      source: this.sourceFeatures,
      style: (feature: any, _: any): any => {
        return style(feature)
      }
    });
    vectorLayer.set("name", layerName)

    this.map.addLayer(vectorLayer)

    // add mouse interaction
    let activityLayerSelector = new Select({
      condition: pointerMove,
      multi: false,
      layers: [vectorLayer],
      style: (feature: any) => {
        let radius = feature.get("radius")
        var selectedStyle = activitySelectedStyle(radius)
        return selectedStyle;
      }
    });

    activityLayerSelector.on('select', (evt: any) => {
      const selected = evt.selected
      const deSelected = evt.deselected
      // WARNING not refactoring needed ! because we can have both selected and deselected
      if (deSelected.length === 1) {
        let deSelectedFeature = deSelected[0]
        this.currentFeatureSelectedId = null
        this.mapService.unsetMapEvent("mapCoords")
        d3.select('#popup-feature-' + deSelectedFeature.get("id"))
          .style('display', 'none')
          .style('right', 'unset')
          .style('top', 'unset')
          .style('left', 'unset');
        // this._handleActivityCircleOnLegend(deSelectedFeature)

      }
      if (selected.length === 1) {
        let selectedFeature = selected[0]
        this.currentFeatureSelectedId = selectedFeature.get("id")
        this.mapService.setMapEvent("mapCoords")

        d3.select('#popup-feature-' + selectedFeature.get("id"))
          .style('z-index', '1')
        // this._handleActivityCircleOnLegend(selectedFeature)
      }

    });

    this.map.addInteraction(activityLayerSelector);

  };

  addLayerFeatures(features: any[], style: Function): any {
    let featuresBuilt: Feature[] = []

    features.forEach((data: any, index: number) => {
      let featureBuild = new Feature({
        geometry: new Point(data.geometry.coordinates).transform('EPSG:4326', 'EPSG:3857'),
        id: data.id,
        type: data.type,
        name: data.name,
        radius: data.years * 12 + data.months,
      })
      featuresBuilt.push(featureBuild)
    })

    this.sourceFeatures.clear()
    this.sourceFeatures.addFeatures(featuresBuilt)
  };

  _handleActivityCircleOnLegend(feature: Feature): void {
    const legendElement: any = d3.select("#" + legendActivitiesId + " circle." + feature.get("type"));
    legendElement.classed('selected', !legendElement.classed('selected')); // toggle class

    const timeLineEvent: any = d3.select('circle#location_' + feature.get("id"));
    timeLineEvent.classed('selected', !timeLineEvent.classed('selected'));
  }


  buildTravelLayer(data: any): void {
    const travelLine = new LineString(data.geojson_data[0].coordinates)
    const travel = new Feature({
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

    const movingNodeGeom = new Point(travelLine.getFirstCoordinate())
    const movingNode = new Feature({
      type: 'movingNode',
      geometry: movingNodeGeom,
    });

    let vectorSource = new VectorSource({
      features: []
    });
    let vectorLayer = new VectorLayer({
      source: vectorSource,
    });

    let features = [travel, startMarker, endMarker]
    features.forEach((feature: any, index: number) => {
      feature.setStyle(travelStyles(feature.get("type")))
      vectorSource.addFeature(feature)
    })


    vectorLayer.set("name", travelLayerName)

    this.map.addLayer(vectorLayer);

    // init these value to compute the animation
    let initTime = Date.now();
    let distance = 0;

    vectorLayer.on('postrender', (event: any) => {
      const time = event.frameState.time;
      const elapsedTime = time - initTime;
      distance = (distance + (travelNodespeed * elapsedTime) / 1e6) % 2;
      initTime = time;
      const currentCoordinate = travelLine.getCoordinateAt(
        distance > 1 ? 2 - distance : distance
      );
      movingNodeGeom.setCoordinates(currentCoordinate);
      const vectorContext = getVectorContext(event);
      vectorContext.setStyle(travelStyles('movingNode'));
      vectorContext.drawGeometry(movingNodeGeom);
      // to continue the postrender animation
      this.map.render();
    });

  }

  popupMoving(pixelCoords: number[]): void {
    const popupPixelPadding = 20;
    const positionPixelPadding = 15;
    d3.select('#popup-feature-' + this.currentFeatureSelectedId)
    .style('left', () => {
      if (pixelCoords[0] + this.popupWidth + popupPixelPadding > this.innerWidth) {
        return pixelCoords[0] - this.popupWidth - positionPixelPadding + 'px';
      } else {
        return pixelCoords[0] + positionPixelPadding + 'px';
      }
    })
    .style('top', () => {

      if (pixelCoords[1] + this.popupHeight + popupPixelPadding > this.innerHeight) {
        return pixelCoords[1] - this.popupHeight - positionPixelPadding + 'px';
      } else {
        return pixelCoords[1] + positionPixelPadding + 'px';
      }
    })
    .style('display', 'block');
  }

}
