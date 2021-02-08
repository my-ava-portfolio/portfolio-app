import { Component, OnInit, OnDestroy, ViewEncapsulation, AfterViewInit } from '@angular/core';

import { Subscription } from 'rxjs';

import * as L from 'leaflet';
import 'leaflet/dist/images/marker-shadow.png';
import * as d3 from 'd3';

import { ActivatedRoute } from '@angular/router';


import { locationIcon } from '../../core/inputs';
import { apiImgUrl, currentYear } from '../../core/inputs';

import { MapService } from '../../services/map.service';


@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MapViewComponent implements OnInit, AfterViewInit, OnDestroy {
  fragment!: string | null;
  currentDate = currentYear;

  innerWidth!: any;
  innerHeight!: any;

  mapContainer!: any;
  zoomInitDone!: boolean;
  maxZoomValue = 9;
  ZoomActivityValue = 12;

  apiImgUrl = apiImgUrl;
  locationIcon = locationIcon;
  // check css code related to popup
  popupWidth = 330;
  popupHeight = 190;
  geoFeaturesData!: any[];
  svgActivitiesLayerId = 'svgActivitiesLayer'

  mapContainerSubscription!: Subscription;
  pullActivitiesGeoDataToMapSubscription!: Subscription;

  constructor(
    private mapService: MapService,
    private activatedRoute: ActivatedRoute,
  ) {

    this.mapContainerSubscription = this.mapService.mapContainer.subscribe(
      (element: any) => {
        this.mapContainer = element;
        console.log('tralalalallala', this.mapContainer)
        this.initActivitiesSvgLayer();
      }
    );

    this.pullActivitiesGeoDataToMapSubscription = this.mapService.activitiesGeoDataToMap.subscribe(
      (geoFeaturesData: any[]) => {
        this.geoFeaturesData = geoFeaturesData;
        console.log('data');
        this.activitiesMapping(geoFeaturesData);
        console.log('lalala', this.zoomInitDone, this.fragment)
        if (!this.zoomInitDone) {
          if (this.fragment !== null) {
            console.log(this.fragment);
            this.zoomFromActivityId(this.geoFeaturesData, this.fragment);
          } else {
            this.zoomFromDataBounds(geoFeaturesData);
          }
          this.zoomInitDone = true;
        }
      }
    );

  }

  ngOnInit(): void {
    this.zoomInitDone = false;
    this.innerWidth = window.innerWidth;
    this.innerHeight = window.innerHeight;

  }

  ngAfterViewInit(): void {
    this.activatedRoute.fragment.subscribe(
      (fragment) => {
        if (fragment === undefined) {
          this.fragment = null;
        } else {
          this.fragment = fragment;
        }

        console.log('fragment map', fragment, this.fragment)
      }
    );
  }

  ngOnDestroy(): void {
    this.mapContainerSubscription.unsubscribe();
    this.pullActivitiesGeoDataToMapSubscription.unsubscribe();
    d3.select('#' + this.svgActivitiesLayerId).remove()
    this.mapService.resetMapView()
  }

  zoomFromDataBounds(geojsonData: any): void {

    this.mapContainer.fitBounds(
      L.geoJSON(geojsonData).getBounds(),
      {
        maxZoom: this.maxZoomValue
      }
    );
    console.log('default zoom')
  }

  zoomFromActivityId(geoFeaturesData: any[], activityId: string): void {
    const dataFiltered: any = geoFeaturesData.filter((d: any) => d.properties.id === activityId);
    if (dataFiltered.length === 1) {
      this.mapContainer.setView(
        [dataFiltered[0].geometry.coordinates[1], dataFiltered[0].geometry.coordinates[0]],
        this.ZoomActivityValue
      );
      this.bounceRepeat('#node_location_' + activityId + ' circle')
    }
    // else mean that the geom related is not display

  }

  initActivitiesSvgLayer(): void {
    const svgLayerContainer: any = L.svg().addTo(this.mapContainer);
    const svgLayerObject = d3.select(svgLayerContainer._container)
      .attr('id', this.svgActivitiesLayerId)
      .attr('pointer-events', 'auto');
    svgLayerObject.select('g')
      .attr('class', 'leaflet-zoom-hide')
      .attr('id', 'activities-container');

  }

  activitiesMapping(data: any): void {
    const group: any = d3.select('#activities-container');
    const jobs = group.selectAll('.activityPoint')
      .data(data, (d: any) => d.properties.id); // need to defined an unique id to disordered draw, check doc...

    jobs
      .enter()
      .append('a') // add hyper link and the svg circle
      .attr('xlink:href', (d: any) => '/resume#' + d.properties.id)
      .attr('id', (d: any) => 'node_location_' + d.properties.id)
      .attr('class', (d: any) => d.properties.type + ' activityPoint')
      .attr('cursor', 'pointer')
      .append('circle')
      .on('mouseover', (d: any, i: any, n: any) => {
        // TODO popup

        // hightlight map point
        const currentElement: any = d3.select(n[i]);
        currentElement.classed('selected', !currentElement.classed('selected')); // toggle class
        // legends
        // timeline highlight
        const sliderNode: any = d3.select('#slider-bar #location_' + d.properties.id);
        sliderNode.classed('slider-node-selected', !sliderNode.classed('slider-node-selected')); // toggle class
        const typeNodeLegend: any = d3.select('#theme-legend .' + d.properties.type);
        typeNodeLegend.classed('selected', !typeNodeLegend.classed('selected')); // toggle class


      })
      .on('mousemove', (d: any) => {
        // dynamic tooltip position
        this.adaptActivityPopup(d.properties.id);

      })
      .on('mouseout', (d: any, i: any, n: any) => {
        this.disableActivityPopup(d.properties.id);

        // hightlight map point
        const currentElement: any = d3.select(n[i]);
        currentElement.classed('selected', !currentElement.classed('selected')); // toggle class
        // legends
        // timeline highlight
        const sliderNode: any = d3.select('#slider-bar #location_' + d.properties.id);
        sliderNode.classed('slider-node-selected', !sliderNode.classed('slider-node-selected')); // toggle class
        const typeNodeLegend: any = d3.select('#theme-legend .' + d.properties.type);
        typeNodeLegend.classed('selected', !typeNodeLegend.classed('selected')); // toggle class

      });

    d3.selectAll('.activityPoint circle').transition()
      .attr('r', (d: any) => d.properties.months * 2);

    jobs
      .exit()
      // .transition()
      // .attr('r', 0)
      .remove();

    this.mapContainer.on('moveend', this.reset.bind(this));
    this.reset();
  }

  reset(): void {
    // for the points we need to convert from latlong to map units
    d3.select('#' + this.svgActivitiesLayerId)
      .selectAll('circle')
      .attr('transform', (d: any) => {
        return 'translate(' +
          this.applyLatLngToLayer(d).x + ',' +
          this.applyLatLngToLayer(d).y + ')';
      });
  }

  applyLatLngToLayer(d: any): any {
    const y: number = d.geometry.coordinates[1];
    const x: number = d.geometry.coordinates[0];
    return this.mapContainer.latLngToLayerPoint(new L.LatLng(y, x));
  }

  adaptActivityPopup(popupId: string): void {
    const currentPopup: any = d3.select('#popup-feature-' + popupId)
      .style('visibility', 'visible')
      .style('left', () => {
        if (d3.event.pageX + this.popupWidth + 20 > this.innerWidth) {
          return d3.event.pageX - this.popupWidth - 15 + 'px';
        } else {
          return d3.event.pageX + 15 + 'px';
        }
      })
      .style('top', () => {
        if (d3.event.pageY + this.popupHeight + 20 > this.innerHeight) {
          return d3.event.pageY - this.popupHeight - 15 + 'px';
        } else {
          return d3.event.pageY + 15 + 'px';
        }
      });
  }

  disableActivityPopup(popupId: string): void {
    d3
      .select('#popup-feature-' + popupId)
      .style('visibility', 'hidden')
      .style('left', 'unset') // reset position to avoid conflict with popup from timeline
      .style('top', 'unset');
  }

  bounceRepeat(activityPointId: string): void {
    d3.select(activityPointId)
      .transition()
      .duration(1000)
      .ease(d3.easeElastic)
      .attr('r', (d: any) => d.properties.months * 4)
      // .style("opacity", 1)
      .transition()
      .duration(300)
      .ease(d3.easeLinear)
      .attr('r', (d: any) => d.properties.months * 2)
      // .style("opacity", 0)
      .on('end', this.bounceRepeat.bind(this, activityPointId))
  }


}
