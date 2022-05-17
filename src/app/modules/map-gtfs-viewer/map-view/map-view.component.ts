import { Component, OnInit, OnDestroy} from '@angular/core';

import { Subscription } from 'rxjs';

import * as L from 'leaflet';
import * as d3 from 'd3';

import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';


import { DataService } from '@modules/map-gtfs-viewer/shared/services/data.service';

import { locationIcon, tagsIcon, centerIcon } from '@modules/map-gtfs-viewer/shared/inputs';
import { MapService } from '@services/map.service';
import { ControlerService } from '@services/controler.service';
import { currentDate } from '@core/inputs';
import { TimelineService } from '@shared/services/timeline.service';


export class App {
  constructor() {}

  private print = (str: string) => console.log(str);

  init = () => {
      this.print('test');
  }
}


@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.scss']
})
export class MapViewComponent implements OnInit, OnDestroy {

  locationIcon = locationIcon;
  tagIcon = tagsIcon;
  centerIcon = centerIcon;

  // TODO improve API to return the areas list
  available_data = ["TER", "Toulouse", "Lyon"];
  currentData = this.available_data[0];

  endDate: Date | null = currentDate;
  startDate: Date | null = currentDate;
  currentDate!: string;

  isGeodataCanBeDisplayed = false;
  isLegendDisplayed = true;

  innerWidth!: any;
  innerHeight!: any;

  mapContainer!: any;
  dataBoundingBox!: number[];

  canvas!: any;
  context!: any;
  pi2 = Math.PI * 2;
  radius = 4;
  zoomCanvasLimit = 8;

  // check css code related to popup
  popupWidth = 100;
  popupHeight = 100;
  geoFeaturesData!: any[];
  svgLayerId = 'svgLayer';
  canvasLayerId = 'canvasLayer';

  circleOpacity = 0.7;
  circleStroke = 'ghostwhite';
  circleWidth = '1px';

  mappingColors: Record<string, string> = {
    '0': 'red',
    '1': 'blue',
    '2': 'brown'
  }
  defaultColor = 'brown';

  geoData!: any;

  mapContainerSubscription!: Subscription;
  pullGeoDataToMapSubscription!: Subscription;
  pullBoundingBoxDataSubscription!: Subscription;
  pullGeoDataSubscription!: Subscription;

  constructor(
    private dataService: DataService,
    private mapService: MapService,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    private controlerService: ControlerService,
    private timelineService: TimelineService,
  ) {

    // to get the data properties from routes (app.module.ts)
    this.titleService.setTitle(this.activatedRoute.snapshot.data.title);

    this.mapContainerSubscription = this.mapService.mapContainer.subscribe(
      (element: any) => {
        this.mapContainer = element;

        this.initnodesSvgLayer();
        this.initCircleCanvasLayer();
      }
    );

    this.pullGeoDataToMapSubscription = this.dataService.GeoDataToMap.subscribe(
      (geoFeaturesData: any[]) => {

        this.geoFeaturesData = geoFeaturesData;
        if (this.mapContainer.getZoom() <= this.zoomCanvasLimit) {
          // build canvas layer and replace svg layer
          this.clearSvgNodesMapping();
          this.canvasNodesMapping(this.geoFeaturesData);
        } else {
          // build svg layer and replace canvas laver
          this.clearCanvasNodesMapping()
          this.svgNodesMapping(geoFeaturesData);
        }
      }
    );

    this.pullBoundingBoxDataSubscription = this.dataService.rangeDateData.subscribe(
      (element) => {
        this.dataBoundingBox = element.data_bounds;
        this.mapService.sendZoomMapFromBounds(this.dataBoundingBox);

        this.startDate = this.parseTime(element.start_date);
        if (this.startDate !== null) {
          this.endDate = this.parseTime(element.end_date);
          this.currentDate = element.start_date
          this.timelineService.pushTimeLineInputs(this.startDate, this.endDate, String(this.currentDate))

        }
      }
    );

    this.timelineService.dateUpdated.subscribe(
      (date) => {
        this.currentDate = date
        this.dataService.pullGeoData(this.currentData, this.currentDate, this.dataBoundingBox)

      }
    )

    this.pullGeoDataSubscription = this.dataService.GeoData.subscribe(
      (element) => {
        // this.dataService.pullStartEvent()
        this.geoData = element.data_geojson;
        if (this.geoData !== null && this.currentDate !== null) {
          this.dataService.pullGeoDataToMap(this.geoData);
        }

      }
    );


  }

  ngOnInit(): void {

    this.sendResumeSubMenus();
    // let's go to get map container and init layer(s)
    this.mapService.getMapContainer()

    // the begining of the process
    this.dataService.pullRangeDateData(this.currentData)

    this.innerWidth = window.screen.width;
    this.innerHeight = window.screen.height;

  }


  sendResumeSubMenus(): void {
    this.controlerService.pullSubMenus([]);
    this.controlerService.pullTitlePage(this.activatedRoute.snapshot.data.title);
    // to get the data properties from routes (app.module.ts)
    this.titleService.setTitle(this.activatedRoute.snapshot.data.title);

  }

  ngOnDestroy(): void {
    this.mapContainerSubscription.unsubscribe();
    this.pullGeoDataToMapSubscription.unsubscribe();

    d3.select('#' + this.svgLayerId).remove();
    d3.select('#' + this.canvasLayerId).remove();

    this.mapService.resetMapView()
  }

  private parseTime(time: string): Date | null {
    return d3.timeParse('%Y-%m-%d %H:%M:%S')(time);
  }

  updateTimeline(data: string): void {
    this.currentData = data
    this.dataService.pullRangeDateData(this.currentData);
  }

  showHideLegend(): void {
    this.isLegendDisplayed = !this.isLegendDisplayed;
  }

  initnodesSvgLayer(): void {
    const svgLayerContainer: any = L.svg().addTo(this.mapContainer);
    const svgLayerObject = d3.select(svgLayerContainer._container)
      .attr('id', this.svgLayerId)
      .attr('pointer-events', 'auto');
    svgLayerObject.select('g')
      .attr('class', 'leaflet-zoom-hide')
      .attr('id', 'nodes-container');
  }

  initCircleCanvasLayer(): void {
    // const tooltipsCanvas = new L.Canvas().addTo(this.mapContainer);
    // d3.select('canvas').attr('id', 'tooltips')
    const canvas = new L.Canvas().addTo(this.mapContainer);
    d3.select('canvas:not(#tooltips)').attr('id', this.canvasLayerId)
    this.canvas = document.querySelector('#' + this.canvasLayerId);
    this.context = this.canvas.getContext('2d')
  }

  clearCanvasNodesMapping(): void {
    // https://stackoverflow.com/questions/2142535/how-to-clear-the-canvas-for-redrawing

    // IN ORDER TO CLEAN THE CANVAS
    // Store the current transformation matrix
    this.context.save();
    // Use the identity matrix while clearing the canvas
    this.context.setTransform(1, 0, 0, 1, 0, 0);
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    // Restore the transform
    this.context.restore();
  }

  canvasNodesMapping(data: any): void {

    this.clearCanvasNodesMapping()

    let i!: number
    for (i = 0; i < data.length; i++) {

      this.context.beginPath();

      const coords: any = this.mapContainer.latLngToLayerPoint(new L.LatLng(data[i].y, data[i].x))

      this.context.moveTo( coords.x + this.radius, coords.y ); // This was the line you were looking for
      this.context.arc(
        coords.x,
        coords.y,
        this.radius, 0, this.pi2
      );

      this.context.fillStyle = this.mappingColors[data[i].route_type]
      this.context.fill();
      this.context.lineWidth = 1;
      this.context.strokeStyle="white";
      this.context.stroke();
      this.context.closePath();
    }
  }

  clearSvgNodesMapping(): void {
    // remove existing nodes
    d3.selectAll('#nodes-container a').remove()
  }

  svgNodesMapping(data: any): void {

    // remove existing nodes
    this.clearSvgNodesMapping()

    const group: any = d3.select('#nodes-container');
    const jobs = group.selectAll('.node')
      .data(data, (d: any) => d.stop_code); // need to defined an unique id to disordered draw, check doc...

    jobs
      .enter()
      .append('a') // add hyper link and the svg circle
      .attr('xlink:href', (d: any) => '#/resume#' + d.id)
      .append('circle')
      .style('opacity', 1)
      .attr('stroke', this.circleStroke)
      .attr('fill', (d: any) => {
        return this.mappingColors[d.route_type]
      })
      .attr('r', '4')
      .attr('stroke-width', this.circleWidth)
      .on('mouseover', (e: any, d: any) => {
        d3.select('html').append('div')
          .attr('id', 'popup-stop')
          .style('width', this.popupWidth + 'px')

        d3.select('#popup-stop')
          .attr('class', 'text-black bg-white border rounded shadow')
          .style('position', 'absolute')
          .style('visibility', 'visible')
          // .style('height', '100px')
          .style('left', () => {
            if (e.x + this.popupWidth + 20 > this.innerWidth) {
              return e.x - this.popupWidth - 15 + 'px';
            } else {
              return e.x + 15 + 'px';
            }
          })
          .style('top', () => {
            if (e.y + this.popupHeight + 20 > this.innerHeight) {
              return e.y - this.popupHeight - 15 + 'px';
            } else {
              return e.y + 15 + 'px';
            }
          })
          .text(d.route_long_name);
      })
      .on('mousemove', (e: any, d: any) => {})
      .on('mouseout', (e: any, d: any) => {
        d3.select('#popup-stop').remove()
      });

    jobs
      .exit()
      .remove();

    this.mapContainer.on('moveend', this.reset.bind(this));
    this.reset();
  }

  reset(): void {
    // for the points we need to convert from latlong to map units
    d3.select('#' + this.svgLayerId)
      .selectAll('circle')
      .attr('transform', (d: any) => {
        return 'translate(' +
          this.applyLatLngToLayer(d).x + ',' +
          this.applyLatLngToLayer(d).y + ')';
      });
  }

  applyLatLngToLayer(d: any): any {
    const y: number = d.y;
    const x: number = d.x;
    return this.mapContainer.latLngToLayerPoint(new L.LatLng(y, x));
  }

}
