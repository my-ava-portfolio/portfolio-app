import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';

import { Subscription } from 'rxjs';

import * as L from 'leaflet';
import 'leaflet/dist/images/marker-shadow.png';
import * as d3 from 'd3';

import { MapService } from '../../services/map.service';


@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MapViewComponent implements OnInit, OnDestroy {

  mapContainer!: any;

  mapContainerSubscription!: Subscription;
  pullActivitiesGeoDataToMapSubscription!: Subscription;

  constructor(
    private mapService: MapService,
  ) {

    this.mapContainerSubscription = this.mapService.mapContainer.subscribe(
      (element) => {
        this.mapContainer = element;
        this.initActivitiesSvgLayer();

        console.log('map ok', this.mapContainer)
      }
    );

    this.pullActivitiesGeoDataToMapSubscription = this.mapService.activitiesGeoDataToMap.subscribe(
      (geodata) => {
        this.activitiesMapping(geodata);
      }
    );

  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.mapContainerSubscription.unsubscribe();
  }

  initActivitiesSvgLayer(): void {
    const svgLayerContainer: any = L.svg().addTo(this.mapContainer);
    const svgLayerObject = d3.select(svgLayerContainer._container)
      .attr('id', 'svgActivitiesLayer')
      .attr('pointer-events', 'auto');
    svgLayerObject.select('g')
      .attr('class', 'leaflet-zoom-hide')
      .attr('id', 'activities-container');

  }

  activitiesMapping(data: any): void {
    const group: any = d3.select('#activities-container');
    const jobs = group.selectAll('.activityPoint')
      .data(data, (d: any) => d.properties.id ) // need to defined an unique id to disordered draw, check doc...

    jobs
      .enter()
      .append('circle')
      .attr('id', (d: any) => 'circle_location_' + d.properties.id)
      .attr('class', (d: any) => d.properties.type + ' activityPoint')
      .append('a')
      .attr('href', (d: any) => '/resume#' + d.properties.id)
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
        // TODO popup
      })
      .on('mouseout', (d: any, i: any, n: any) => {

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

    jobs
      .transition()
      .attr('r', (d: any) => d.properties.months * 2);

    jobs.exit()
      .transition().duration(10)
        .attr('r', 1)
        .remove();

    this.mapContainer.on('moveend', this.reset.bind(this));
    this.reset();
  }

  reset(): void {
    // for the points we need to convert from latlong to map units
    d3.select('#svgActivitiesLayer')
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

}
