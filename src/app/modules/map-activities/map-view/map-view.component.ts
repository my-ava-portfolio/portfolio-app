import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { map } from 'rxjs/operators';

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
import { transform } from 'ol/proj';

import * as d3 from 'd3';

import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { locationIcon, tagsIcon, centerIcon, helpIcon, imageProfile, experiencesPages, educationPages } from '@core/inputs';
import { assetsLogoPath } from '@core/inputs';

import { DataService } from '@modules/map-activities/shared/services/data.service';
import { ControlerService } from 'src/app/services/controler.service';
import { MapService } from '@services/map.service';
import { activitiesStyle, activityLayerName, activitySelectedStyle, getFeatureFromLayer, legendActivitiesId, travelLayerName, travelNodespeed, travelStyles } from '../shared/core';


@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class MapViewComponent implements OnInit, OnDestroy  {
  imageProfile: string = imageProfile;

  fragment: string | null = null;

  experiencesRoute: string = experiencesPages.route;
  educationRoute: string = educationPages.route;

  map!: Map;
  currentFeatureSelectedId!: string | null;

  activitiesStyle!: Style;

  geoFeaturesData!: any[];
  travelId: string | null = null;
  //////

  isLegendDisplayed = true;

  innerWidth!: any;
  innerHeight!: any;

  zoomInitDone!: boolean;
  defaultActivitieLayerZoom = 9;

  apiImgUrl = assetsLogoPath;

  locationIcon = locationIcon;
  tagIcon = tagsIcon;
  centerIcon = centerIcon;
  helpIcon = helpIcon;

  helpPopup = 'Voici une cartographie spatio-temporelles de mes expériences';

  // check css code related to popup
  popupWidth = 330;
  popupHeight = 190;

  mapSubscription!: Subscription;
  pullActivitiesGeoDataToMapSubscription!: Subscription;
  pullTripsGeoDataToMapSubscription!: Subscription;
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

    this.pullActivitiesGeoDataToMapSubscription = this.dataService.activitiesGeoDataToMap.pipe(map((val, index) => [val, index])) // here we transform event to array (call it tuple if you like)
     .subscribe(
      (geoFeaturesData: any[]) => {

        this.mapService.removeLayerByName(activityLayerName)
        this.geoFeaturesData = geoFeaturesData[0];

        this.buildActivityLayer(this.geoFeaturesData)

        // if a click is done on experience location icon
        if (this.fragment !== null) {
        const feature: Feature = getFeatureFromLayer(this.map, activityLayerName, this.fragment, 'id')
        const featureGeom = feature.getGeometry()
          if (featureGeom !== undefined ) {
            this.mapService.zoomToExtent(featureGeom.getExtent(), 13)
          }
        } else if (geoFeaturesData[1] === 0) {
           // check if the zoom is needed, it means only at the start !
          this.mapService.zoomToLayerName(activityLayerName, this.defaultActivitieLayerZoom)
         }

      });

    this.pullTripsGeoDataToMapSubscription = this.dataService.tripsGeoDataToMap.subscribe(
      (geoFeaturesData: any[]) => {

        if (geoFeaturesData.length === 1 && this.travelId !== geoFeaturesData[0].name) {
          this.mapService.removeLayerByName(travelLayerName)
          this.travelId = geoFeaturesData[0].name
          this.buildTravelLayer(geoFeaturesData[0])

          }
        if (geoFeaturesData.length === 0) {
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

    this.zoomInitDone = false;
    this.innerWidth = window.innerWidth;
    this.innerHeight = window.innerHeight;

  }

  ngOnDestroy(): void {
    this.mapSubscription.unsubscribe();
    this.pullActivitiesGeoDataToMapSubscription.unsubscribe();
    this.pullTripsGeoDataToMapSubscription.unsubscribe();
    this.zoomEventSubscription.unsubscribe();
    this.routeSubscription.unsubscribe();
    this.newCoordsSubscription.unsubscribe();

    this.mapService.removeLayerByName(activityLayerName)
    this.mapService.removeLayerByName(travelLayerName)
    this.mapService.changeMapInteractionStatus(false)

    this.mapService.resetMapView()
  }

  sendResumeSubMenus(): void {
    this.controlerService.pullSubMenus([]);
    this.controlerService.pullTitlePage(this.activatedRoute.snapshot.data.title);
    // to get the data properties from routes (app.module.ts)
    this.titleService.setTitle(this.activatedRoute.snapshot.data.title);
  }

  showHideLegend(): void {
    this.isLegendDisplayed = !this.isLegendDisplayed;
  }

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
    let activitiesLayer = this.buildLayerFromFeatures(activityLayerName, data, activitiesStyle)

    this.map.addLayer(activitiesLayer)

    let activityLayerSelector = new Select({
      condition: pointerMove,
      multi: false,
      layers: [activitiesLayer],
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
        this._handleActivityCircleOnLegend(deSelectedFeature)


      }
      if (selected.length === 1) {
        let selectedFeature = selected[0]
        this.currentFeatureSelectedId = selectedFeature.get("id")
        this.mapService.setMapEvent("mapCoords")

        d3.select('#popup-feature-' + selectedFeature.get("id"))
          .style('display', 'block')
          .style('z-index', '1')

        this._handleActivityCircleOnLegend(selectedFeature)
      }

    });

    this.map.addInteraction(activityLayerSelector);

  }

  _handleActivityCircleOnLegend(feature: Feature): void {
    const legendElement: any = d3.select("#" + legendActivitiesId + " circle." + feature.get("type"));
    legendElement.classed('selected', !legendElement.classed('selected')); // toggle class

    const timeLineEvent: any = d3.select('circle#location_' + feature.get("id"));
    timeLineEvent.classed('selected', !timeLineEvent.classed('selected'));
  }


  buildTravelLayer(data: any): void {
    let points: any[] = []
    data.geojson_data.forEach((element: any) => {
      points.push(transform(element.geometry.coordinates, 'EPSG:4326', 'EPSG:3857'))
    });;
    let travelLine = new LineString(points)
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

    const features = [travel, movingNode, startMarker, endMarker]
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
    });
  }


}
