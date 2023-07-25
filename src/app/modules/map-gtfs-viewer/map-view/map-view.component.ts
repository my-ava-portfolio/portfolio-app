import { Component, OnInit, OnDestroy} from '@angular/core';

import { Subscription } from 'rxjs';

import Map from 'ol/Map';

import { ActivatedRoute } from '@angular/router';

import { DataService } from '@modules/map-gtfs-viewer/shared/services/data.service';

import { gtfsLayerName, gtfsStyle, circleRadius, metroColor, strokeWidth, trainColor, tramColor, strokeColor, transportModeTranslator, transportModeColor } from '@modules/map-gtfs-viewer/shared/core';
import { MapService } from '@services/map.service';
import { ControlerService } from '@services/controler.service';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import VectorImageLayer from 'ol/layer/VectorImage';
import VectorSource from 'ol/source/Vector';
import { centerIcon } from '@modules/map-activities/shared/icons';
import * as d3 from 'd3';
import { pointerMove } from 'ol/events/condition';
import { Select } from 'ol/interaction';


@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.scss']
})
export class MapViewComponent implements OnInit, OnDestroy {
  dataCached = {}

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
      { dataValue: 0, cy: 22, label: 'Tram', color: tramColor },
      { dataValue: 1, cy: 44, label: 'Métro', color: metroColor },
      { dataValue: 2, cy: 66, label: 'Train', color: trainColor },
    ]
  };
  private stopPopupDiv = '.stopPopup'

  previousArea: string | null = null;
  currentArea = this.input_data[1].area;
  currentstepValue = this.input_data[1].default_step_value;
  currentZoomValue = this.input_data[1].zoom;
  currentAttributionValue = this.input_data[1].source;

  endDate!: Date;
  startDate!: Date;
  currentDate!: Date;
  dataBoundingBox!: number[];

  currentRouteTypes: string[] = [];
  gtfsLayer!: any

  map!: Map;

  // check css code related to popup
  popupWidth = 100;
  popupHeight = 100;

  innerWidth!: any;
  innerHeight!: any;

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
        this.dataBoundingBox = data["4326"];
        // redraw data when zoom/pan event occurs on map
        if (this.currentDate !== undefined) {
          this.dataService.pullGeoData(this.currentArea, this.currentDate, this.dataBoundingBox)
        }
      }
    );

    this.pullGeoDataToMapSubscription = this.dataService.GeoDataToMap.subscribe(
      (geoFeaturesData: any[]) => {

        if (geoFeaturesData !== null) {
          this.refreshSourceLayer(geoFeaturesData)
        }

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
      (element: any) => {
        this.dataBoundingBox = element.DataBounds;
        this.startDate = this.secsToDate(element.StartDate);
        this.endDate = this.secsToDate(element.EndDate);

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
      (geoData: any) => {
        this.dataService.pullGeoDataToMap(geoData);
      },
    );

    this.pullAvailableAreasSubscription = this.dataService.availableAreas.subscribe(
      (element: any) => {
        this.availableArea = element;
      }
    );

    this.dataService.routeLongName.subscribe(
      (element: string) => {
        d3.select(this.stopPopupDiv + ' .card-header').html('Ligne : ' + element)
      }
    )

  }

  ngOnInit(): void {
    // the begining of the process
    this.dataService.pullAvailableAreas();
    this.sendResumeSubMenus();
    this.mapService.setMapEvent("mapBounds")
    // let's go to get map container and init layer(s)
    this.mapService.changeMapInteractionStatus(true)
    this.mapService.getMap();
    this.buildGtfsLayer(gtfsLayerName)
    this.updateData(this.currentArea)

    this.innerWidth = window.innerWidth;
    this.innerHeight = window.innerHeight;
  }

  secsToDate(secs: number): Date {
    let date = new Date(secs * 1000); // Epoch
    return date;
  }

  getCurrentDate(date: Date): void {
    this.currentDate = date
    // update current map bound to reduce the amount of data
    this.dataService.pullGeoData(this.currentArea, this.currentDate, this.dataBoundingBox)

  }

  sendResumeSubMenus(): void {
    this.controlerService.pullSubMenus([]);
    this.controlerService.pullTitlePage(this.activatedRoute.snapshot.data.title);
  }

  ngOnDestroy(): void {
    this.mapService.unsetMapEvent("mapBounds")

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
    this.mapService.sendZoomAction();
  }

  private parseTime(time: string): Date {
    return new Date(time);
  }

  updateData(currentArea: string): void {
    const data_found = this.input_data.filter((e) => {
      return e.area === currentArea;
    });
    this.currentArea = currentArea
    this.dataService.pullRangeDateData(this.currentArea);

    this.currentstepValue = data_found[0]["default_step_value"]
    this.currentZoomValue = data_found[0]["zoom"]
    this.currentAttributionValue = data_found[0]["source"]
  }

  buildGtfsLayer(layerName: string): void {

    this.gtfsLayer = new VectorImageLayer({
      source:  new VectorSource({
        features: []
      }),
      style: gtfsStyle
    });

    this.gtfsLayer.set("name", layerName)
    this.map.addLayer(this.gtfsLayer)

    // add mouse interaction
    let stopsLayerSelector = new Select({
      condition: pointerMove,
      multi: false,
      layers: [this.gtfsLayer],
    });
    const popupDiv = d3.select(this.stopPopupDiv)

    stopsLayerSelector.on('select', (evt: any) => {
      const selected = evt.selected
      const deSelected = evt.deselected
      if (deSelected.length === 1) {
        let deSelectedFeature = deSelected[0]
        this.mapService.unsetMapEvent("mapCoords")
        popupDiv
          .classed('d-none', !popupDiv.classed('d-none'))

        // TODO add highlight
      }
      if (selected.length === 1) {
        let selectedFeature = selected[0]
        // this.currentFeatureSelectedId = selectedFeature.get("id")
        this.mapService.setMapEvent("mapCoords")

        popupDiv
          .style('z-index', '1')
          .classed('d-none', !popupDiv.classed('d-none'))

        popupDiv
          .select('.card-header')
          .style('background-color', transportModeColor(selectedFeature))

        popupDiv.select(".mode .value")
          .html(transportModeTranslator(selectedFeature));
        const coordinates = selectedFeature.getGeometry().getCoordinates()
        popupDiv.select(".position-x .value")
          .html(coordinates[0]);
        popupDiv.select(".position-y .value")
          .html(coordinates[1]);
        this.dataService.pullRouteLongName(this.currentArea, selectedFeature.get('route_id'))

        this.popupMoving(evt.mapBrowserEvent.pixel)

        // TODO add highlight
      }

    });

    this.map.addInteraction(stopsLayerSelector);

  };


  refreshSourceLayer(features: any[]): void {

    let vectorSource = new VectorSource({
      features: [],
      attributions: this.currentAttributionValue  // sources will be added
    });

    let featuresToAdd: any[] = []
    features.forEach((feature: any, _: number) => {
      let iconFeature = new Feature({
        geometry: new Point([feature.X, feature.Y]).transform('EPSG:4326', 'EPSG:3857'),
        route_type: String(feature.RouteType),
        route_id: feature.RouteId,
      })
      featuresToAdd.push(iconFeature)
    })

    vectorSource.addFeatures(featuresToAdd)
    this.gtfsLayer.setSource(vectorSource)
  }

  popupMoving(pixelCoords: number[]): void {
    const popupPixelPadding = 20;
    const positionPixelPadding = 15;
    d3.select('.stopPopup')
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
