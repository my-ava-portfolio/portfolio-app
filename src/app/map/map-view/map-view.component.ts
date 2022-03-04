import { Component, OnInit, OnDestroy, HostListener, ViewEncapsulation } from '@angular/core';

import { Subscription } from 'rxjs';

import * as L from 'leaflet';
import 'leaflet/dist/images/marker-shadow.png';
import * as d3 from 'd3';

import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { locationIcon, tagsIcon, centerIcon, trainIconUnicode, helpIcon, minWidthLandscape } from '../../core/inputs';
import { apiLogoUrl, currentYear } from '../../core/inputs';
import { svgActivitiesPointsLayerId, svgTripIdPrefix, legendActivities } from '../../core/inputs';

import { checkIfScreenPortraitOrientation } from '../../core/inputs';

import { MapService } from '../../services/map.service';
import { ControlerService } from 'src/app/services/controler.service';


@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class MapViewComponent implements OnInit, OnDestroy {

  mapContainerWidth!: number;

  fragment!: string | null;
  fragmentValue!: string;

  svgTripIdPrefix = svgTripIdPrefix;
  legendActivities = legendActivities;

  trainIconUnicode = trainIconUnicode;

  currentDate = currentYear;

  isGeodataCanBeDisplayed = false;
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

  mapContainerSubscription!: Subscription;
  pullActivitiesGeoDataToMapSubscription!: Subscription;
  pullTripsGeoDataToMapSubscription!: Subscription;
  pullPageContentWidthSubscription!: Subscription;

  constructor(
    private mapService: MapService,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    private controlerService: ControlerService,
  ) {

    // to get the data properties from routes (app.module.ts)
    this.titleService.setTitle(this.activatedRoute.snapshot.data.title);

    this.pullPageContentWidthSubscription = this.controlerService.widthContentPage.subscribe(
      (width: number) => {
        console.log("cata", width)
        this.mapContainerWidth = width;
      }
    );

    this.mapContainerSubscription = this.mapService.mapContainer.subscribe(
      (element: any) => {
        this.mapContainer = element;
        this.initActivitiesSvgLayer();

        // to add scale
        const scaleLeaflet: any = L.control.scale(
          {
            imperial: false,
            position: 'bottomright'
          }
        );
        const AttributionLeaflet: any = L.control.attribution(
          {
            position: 'bottomright'
          }
        );

        scaleLeaflet.addTo(this.mapContainer);
        AttributionLeaflet.addTo(this.mapContainer);

        const divScale: any = window.document.getElementById('legend-scale');
        const divAttribution: any = window.document.getElementById('attribution')
        divScale.appendChild(scaleLeaflet.getContainer())
        divAttribution.appendChild(AttributionLeaflet.getContainer())


      }
    );

    this.pullActivitiesGeoDataToMapSubscription = this.mapService.activitiesGeoDataToMap.subscribe(
      (geoFeaturesData: any[]) => {
        this.geoFeaturesData = geoFeaturesData;
        this.activitiesMapping(geoFeaturesData);
        if (!this.zoomInitDone) {
          if (this.fragment !== null) {
            this.zoomFromActivityId(this.geoFeaturesData, this.fragment);
          } else {
            this.zoomFromDataBounds(geoFeaturesData);
          }
          this.zoomInitDone = true;
        }
      }
    );

    this.pullTripsGeoDataToMapSubscription = this.mapService.tripsGeoDataToMap.subscribe(
      (geoFeaturesData: any[]) => {
        geoFeaturesData.forEach((item: any) => {
          // create forward and backward trip
          const tripDataReverted: any = Object.create(item.geojson_data);
          const tripDataRevertedFeatures: any = tripDataReverted.features.slice().reverse();
          tripDataReverted.features = tripDataRevertedFeatures;
          this.computeAnimatePointsOnLine(item.geojson_data, item.name);
          this.computeAnimatePointsOnLine(tripDataReverted, item.name + '_reverted');
        });
      }
    );
  }

  ngOnInit(): void {

    this.sendResumeSubMenus()

    this.zoomInitDone = false;
    this.innerWidth = window.innerWidth;
    this.innerHeight = window.innerHeight;

    this.displayContentRegardingDeviceScreen();

    this.activatedRoute.fragment.subscribe(
      (fragment) => {
        if (fragment === undefined) {
          this.fragment = null;
        } else {
          this.fragment = fragment;
          this.fragmentValue = this.fragment;

        }
      }
    );

  }

  sendResumeSubMenus(): void {
    this.controlerService.pullSubMenus([])
  }

  @HostListener('window:orientationchange', ['$event']) displayContentRegardingDeviceScreen(): void {
    this.isGeodataCanBeDisplayed = checkIfScreenPortraitOrientation();

    // if mode portrait and width screen <= 1024...
    if (window.screen.orientation.angle === 0 && window.screen.height <= minWidthLandscape) {
      this.isLegendDisplayed = false;
    }
  }


  ngOnDestroy(): void {
    this.mapContainerSubscription.unsubscribe();
    this.pullActivitiesGeoDataToMapSubscription.unsubscribe();
    this.pullTripsGeoDataToMapSubscription.unsubscribe();

    d3.select('#' + this.svgActivitiesLayerId).remove();
    d3.selectAll('[id^=' + this.svgTripIdPrefix + ']').remove();

    d3.select(".leaflet-control-scale").remove();
    d3.select(".leaflet-control-attribution").remove();
    this.mapService.resetMapView()
  }


  zoomOnData(): void {
    if (this.geoFeaturesData !== undefined) {
      this.zoomFromDataBounds(this.geoFeaturesData);
    }
  }

  showHideLegend(): void {
    this.isLegendDisplayed = !this.isLegendDisplayed;
  }

  zoomFromDataBounds(geojsonData: any): void {

    this.mapContainer.fitBounds(
      L.geoJSON(geojsonData).getBounds(),
      {
        maxZoom: this.maxZoomValue
      }
    );
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
      .attr('xlink:href', (d: any) => '#/resume#' + d.properties.id)
      .attr('id', (d: any) => 'node_location_' + d.properties.id)
      .attr('class', (d: any) => {
        // in order to match with legend status
        const relatedLegendElement = d3.selectAll('#' + this.legendActivities + ' circle.' + d.properties.type);
        if (relatedLegendElement.size() > 0) {
          if (relatedLegendElement.classed('disabled')) {
            return 'invisible activityPoint ' + d.properties.type;
          }
        }
        return 'activityPoint ' + d.properties.type;
      })
      .attr('cursor', 'pointer')
      .append('circle')
      .style('opacity', this.circleOpacity)
      .style('stroke', this.circleStroke)
      .style('stroke-width', this.circleWidth)
      .attr('class', (d: any) => d.properties.type)
      .on('mouseover', (e: any, d: any) => {
        // hightlight map point
        const currentElement: any = d3.select(e.currentTarget);
        currentElement.classed('selected', !currentElement.classed('selected')); // toggle class
        // legends
        // timeline highlight
        const sliderNode: any = d3.select('#slider-bar #location_' + d.properties.id);
        sliderNode.classed('selected', !sliderNode.classed('selected')); // toggle class
        const typeNodeLegend: any = d3.select('#theme-legend .' + d.properties.type);
        typeNodeLegend.classed('selected', !typeNodeLegend.classed('selected')); // toggle class

      })
      .on('mousemove', (e: any, d: any) => {
        // dynamic tooltip position
        this.adaptActivityPopup(d.properties.id, e);

      })
      .on('mouseout', (e: any, d: any) => {
        this.disableActivityPopup(d.properties.id);

        // hightlight map point
        const currentElement: any = d3.select(e.currentTarget);
        currentElement.classed('selected', !currentElement.classed('selected')); // toggle class
        // legends
        // timeline highlight
        const sliderNode: any = d3.select('#slider-bar #location_' + d.properties.id);
        sliderNode.classed('selected', !sliderNode.classed('selected')); // toggle class
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

  adaptActivityPopup(popupId: string, event: any): void {
    // TODO improve popup display
    d3.select('#popup-feature-' + popupId)
      .style('display', 'block')
      .style('left', () => {
        if (event.x + this.popupWidth + 20 > this.innerWidth) {
          return event.x - this.popupWidth - 15 + 'px';
        } else {
          return event.x + 15 + 'px';
        }
      })
      .style('top', () => {
        if (event.y + this.popupHeight + 20 > this.innerHeight) {
          return event.y - this.popupHeight - 15 + 'px';
        } else {
          return event.y + 15 + 'px';
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
      .duration(500)
      .ease(d3.easeLinear)
      .attr('r', (d: any) => d.properties.months)
      // .style("opacity", 0)
      .on('end', this.bounceRepeat.bind(this, activityPointId));
  }

  // animation on line

  computeAnimatePointsOnLine(nodesPathData: any, layerId: string): void {
    // this.removeFeaturesMapFromLayerId(layerId);

    // input Data contains nodes
    const inputData: any = nodesPathData.features;
    const convertLatLngToLayerCoords = (d: any): any => {
        return this.mapContainer.latLngToLayerPoint(
            new L.LatLng(
                d.geometry.coordinates[1],
                d.geometry.coordinates[0]
            )
        );
    };
    inputData.forEach( (feature: any) => {
        feature.LatLng = new L.LatLng(
            feature.geometry.coordinates[1],
            feature.geometry.coordinates[0]
        );
    });

    const svgMapContainer: any = L.svg().addTo(this.mapContainer);
    const svg: any = d3.select(svgMapContainer._container).attr('id', this.svgTripIdPrefix + layerId);
    // leaflet-zoom-hide needed to avoid the phantom original SVG
    const g: any = svg.append('g').attr('class', 'leaflet-zoom-hide path_' + layerId);

    // function to generate a line
    const toLine: any = d3.line()
      // .interpolate("linear")
      .x((d: any): number => convertLatLngToLayerCoords(d).x)
      .y((d: any): number => convertLatLngToLayerCoords(d).y);


    // Here we will make the points into a single
    // line/path. Note that we surround the input_data
    // with [] to tell d3 to treat all the points as a
    // single line. For now these are basically points
    // but below we set the "d" attribute using the
    // line creator function from above.
    const linePath: any  = g.selectAll('.lineConnect_' + layerId)
      .data([inputData])
      .enter()
      .append('path')
      .attr('class', 'train-line lineConnect_' + layerId)  // TODO add a property type into data linked to a scss class
      .style('fill', 'none')
      .style('opacity', 'unset') // add 0 to hide the path
      .style('stroke', 'black')
      .style('stroke-width', '3px')
      .style('overflow', 'overlay');

    // the traveling circle along the path
    // TODO improve style : refactoring
    const marker: any = g.append('circle')
      .attr('r', 11)
      .attr('id', 'marker_' + layerId)
      .attr('class', 'train-marker travelMarker_' + layerId);
      // .style('fill', 'yellow')
      // .style('stroke', 'black')
      // .style('stroke-width', '3px');

    const textmarker: any = g.append('text') // uncomment line? Firefox issue?
      // .attr('font-family', '\'Font Awesome 5 Free\'')
      // .attr('font-weight', 900)
      // .style('color', 'black')
      .text(this.trainIconUnicode)
      .attr('id', 'markerText_' + layerId)
      .attr('class', 'train-marker-text travelMarkerText_' + layerId)

    // points that make the path, we'll be used to display them with the line chart
    // we make them transparent
    const ptFeatures: any = g.selectAll('circle')
      .data(inputData)
      .enter()
      .append('circle')
      .attr('class', 'waypoints_' + layerId)
      .style('opacity', '0');

    // Reposition the SVG to cover the features.
    const reset = (): void => {

      // we get the stating point
      marker.attr('transform', (): string => {
        const y: number = inputData[0].geometry.coordinates[1];
        const x: number = inputData[0].geometry.coordinates[0];
        return 'translate(' +
          this.mapContainer.latLngToLayerPoint(new L.LatLng(y, x)).x + ',' +
          this.mapContainer.latLngToLayerPoint(new L.LatLng(y, x)).y +
        ')';
      });

      textmarker.attr('transform', (): string => {
        const y: number = inputData[0].geometry.coordinates[1];
        const x: number = inputData[0].geometry.coordinates[0];
        return 'translate(' +
          this.mapContainer.latLngToLayerPoint(new L.LatLng(y, x)).x + ',' +
          this.mapContainer.latLngToLayerPoint(new L.LatLng(y, x)).y +
        ')';
      });

      linePath.attr('d', toLine);

      ptFeatures.attr('transform', (d: any): string => 'translate(' +
          convertLatLngToLayerCoords(d).x + ',' +
          convertLatLngToLayerCoords(d).y +
        ')'
      );

    };

    function transition(): void {
      linePath.transition()
        .duration(7500)
        .attrTween('stroke-dasharray', tweenDash)
        .on('end', (e: any): void => {
          d3.select(e.currentTarget).call(transition); // infinite loop
          linePath.style('stroke-dasharray', '0'); // after the first pass, the line will not disappear
        })
        ;
    }

    // this function feeds the attrTween operator above with the
    // stroke and dash lengths
    function tweenDash(): any {
      return (t: any): any => {
        // total length of path (single value)
        const l: any = linePath.node().getTotalLength();
        // t is the time converted from 0 to 1
        const interpolate: any = d3.interpolateString('0,' + l, l + ',' + l);
        // t is fraction of time 0-1 since transition began
        const markerSelected: any = d3.select('#marker_' + layerId);
        const textmarkerSelect: any = d3.select('#markerText_' + layerId);

        const p = linePath.node().getPointAtLength(t * l);

        // Move the marker to that point
        markerSelected.attr('transform', 'translate(' + p.x + ',' + p.y + ')'); // move marker
        textmarkerSelect.attr('transform', 'translate(' + p.x + ',' + p.y + ')'); // move marker

        return interpolate(t);
      };
    }

    // when the user zooms in or out you need to reset
    // the view
    this.mapContainer.on('moveend', reset);

    // this puts stuff on the map!
    reset();
    transition();

  }


}
