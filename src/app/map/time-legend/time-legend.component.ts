import { Component, OnInit, Input, ViewEncapsulation, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';

import { currentYear, currentDate, backwardIcon, forwardIcon, svgTripIdPrefix } from '../../core/inputs';

import { MapService } from '../../services/map.service';

import * as d3 from 'd3';


@Component({
  selector: 'app-time-legend',
  templateUrl: './time-legend.component.html',
  styleUrls: ['./time-legend.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TimeLegendComponent implements OnInit, OnDestroy {
  mapContainer: any;

  geoActivitiesData!: any;
  geoTripsData!: any;

  // icons
  backwardIcon = backwardIcon;
  forwardIcon = forwardIcon;

  sliderBarId = '#slider-bar';
  margin: any = { top: 10, right: 15, bottom: 0, left: 15 };
  width = 600;
  height = 50;
  fontSize = '12px';

  endDate: Date = currentDate;
  currentYear = currentYear;
  startDate!: Date;
  selectedDatePosition = 0;  // TODO check type
  maxDatePosition: number = this.width - this.margin.left - this.margin.right;
  dateRange!: any;
  movingCursor = false;
  timer!: any;
  currentCountNodes = 0;

  svgTripIdPrefix = svgTripIdPrefix;

  pullGeoDataSubscription!: Subscription;
  mapContainerSubscription!: Subscription;

  constructor(
    private mapService: MapService,
  ) {

    this.mapContainerSubscription = this.mapService.mapContainer.subscribe(
      (element: any) => {
        this.mapContainer = element;
      }
    );

    this.pullGeoDataSubscription = this.mapService.activitiesGeoData.subscribe(
      (element) => {

        // build trip layers
        this.geoTripsData = element.trips_data; // to filter by date
        this.mapService.pullTripsGeoDataToMap(element.trips_data);

        this.geoActivitiesData = element.activities_geojson;
        const geoDataFeatures: any[] = this.geoActivitiesData.features;
        const firstActivity: any[] = geoDataFeatures.filter((feature: any) => feature.id === '0');
        const startDate: Date = new Date(firstActivity[0].properties.start_date);
        startDate.setMonth(startDate.getMonth() - 1); // start date must be smaller than the first activity start_date
        this.startDate = startDate;
        // all the data is loaded but we are going to filter it to map its features regarding datetime
        // defined on the timeline
        console.log(this.geoActivitiesData);
        this.buildTimeline(String(this.currentYear));

      }
    );
  }

  ngOnInit(): void {
    this.mapService.getMapContainer();
    this.mapService.pullActivitiesGeoData(null);
  }


  ngOnDestroy(): void {
    this.pullGeoDataSubscription.unsubscribe();
    this.mapContainerSubscription.unsubscribe();
  }

  parseTime(time: string): Date | null {
    return d3.timeParse('%Y-%m-%d')(time);
  }

  formatDate(time: Date): string {
    return d3.timeFormat('%b %Y')(time);
  }

  formatDateToYearString(time: Date): string {
    return d3.timeFormat('%Y')(time);
  }

  formatDateToString(time: Date): string {
    return d3.timeFormat('%Y-%m-%d')(time);
  }


  startTimeLine(): void {
    const button = d3.select('#play-button');
    if (button.html() === 'Pause') {
      this.movingCursor = false;
      clearInterval(this.timer);
      // var timer = 0;
      button.text('Continue');

    } else if (button.html() === 'Continue') {
      this.movingCursor = true;
      this.timer = setInterval(this.step.bind(this), 100);
      button.html('Pause');

    } else {
      // start run
      this.movingCursor = true;
      this.timer = setInterval(this.step.bind(this), 100);
      button.html('Pause');
    }
  }

  resetTimeLine(): void {
    // reset action
    d3.select('#play-button').html('Start');
    // update to start date
    d3.select('#slider-value').html(this.formatDate(this.startDate));
    this.update(this.startDate);
    this.selectedDatePosition = 0;
    this.movingCursor = false;
    clearInterval(this.timer);
  }

  forwardTimeLine(): void {
    d3.select('#play-button').html('Play');
    // update to start date
    d3.select('#slider-value').html(this.formatDate(this.endDate));
    this.update(this.endDate);
    this.selectedDatePosition = 0;
    this.movingCursor = false;
    clearInterval(this.timer);
  }


  updateTrips(h: Date): void {
    this.geoTripsData.forEach((item: any) => {
      const startDate: string = item.start_date;
      const endDate: string = item.end_date;
      const tripStartDate: Date | null = this.parseTime(startDate);
      const tripEndDate: Date | null = this.parseTime(endDate);

      const svgTrip = d3.selectAll('[id^=' + this.svgTripIdPrefix + item.name + ']');
      console.log(svgTrip)
      if (tripStartDate !== null && tripEndDate !== null) {

        if ( h >= tripStartDate && h < tripEndDate ) {
          svgTrip.style('visibility', 'visible');
        } else {
          svgTrip.style('visibility', 'hidden');
        }
      }
    });
  }

  update(h: any): void {

    // filter data set and redraw plot
    const newData = this.geoActivitiesData.features.filter((d: any) => {
      const selectedDate = this.parseTime(d.properties.start_date);
      // return parseDate(d.properties.end_date) >= h && parseDate(d.properties.start_date) < h;
      // filter by current slider date and slider start date
      if (selectedDate !== null) {
        return selectedDate >= this.startDate && selectedDate < h;
      }
      return false;
    });

    // call api only if last count is different from the current count feature
    if (newData.length !== this.currentCountNodes) {
      this.updateTrips(h);
      this.mapService.pullActivitiesGeoDataToMap(newData);
      console.log('slider done', newData);
      this.displaySliderNodes(newData);
    }

    // update count feature, to optimize api calls
    this.currentCountNodes = newData.length;





    // update position and text of label according to slider scale

    d3.select('#trace').attr('x2', this.dateRange(h)); // trace
    d3.select('#handle').attr('cx', this.dateRange(h)); // handle
    d3.select('#slider-value').text(this.formatDate(h));
  }

  step(): void {
    this.update(this.dateRange.invert(this.selectedDatePosition));
    this.selectedDatePosition = this.selectedDatePosition + (this.maxDatePosition / 151);
    if (this.selectedDatePosition > this.maxDatePosition) {
      this.movingCursor = false;
      this.selectedDatePosition = 0;
      clearInterval(this.timer);
      // timer = 0;
      d3.select('#play-button').text('Play');
    }
  }

  _initDateRange(): void {
    this.dateRange = d3.scaleTime()
      .domain([this.startDate, this.endDate])
      .range([0, this.maxDatePosition])
      .clamp(true);
  }

  buildTimeline(date: string): void {

    const svg = d3.select(this.sliderBarId);

    const playButton: any = d3.select('#play-button');

    this._initDateRange();

    const slider = svg.append('g')
      .attr('class', 'slider-bar')
      .attr('transform', 'translate(' + this.margin.left + ',' + this.height / 2 + ')');

    // slider bar creation
    slider.append('line')
      .attr('class', 'track')
      .attr('x1', this.dateRange.range()[0])
      .attr('x2', this.dateRange.range()[1])
      .select((d: any, i: any, n: any) => n[i].parentNode.appendChild(n[i].cloneNode(true))) // copying itself
      .attr('class', 'track-inset')
      .select((d: any, i: any, n: any) => n[i].parentNode.appendChild(n[i].cloneNode(true)))  // copying itself
      .attr('class', 'track-overlay')
      .call(d3.drag()
        .on('drag start', (e: any) => {
          // to avoid cursor running if track is drag...
          playButton.text('Pause');

          this.selectedDatePosition = e.x;
          this.update(this.dateRange.invert(this.selectedDatePosition));

          // disable timeline node selection
          d3.select('#slider-bar .events')
            .selectAll('circle')
            .style('pointer-events', 'none');
        })
        .on('end', () => {
          // at the drag end we enable the drap map
          this.mapContainer.dragging.enable();

          // enable timeline node selection
          d3.select('#slider-bar .events')
            .selectAll('circle')
            .style('pointer-events', 'all');

          // reset button play if animation is done and play button == continue
          if (this.dateRange.invert(this.selectedDatePosition).toTimeString() === this.endDate.toTimeString()
            || this.dateRange.invert(this.selectedDatePosition).toTimeString() === this.startDate.toTimeString()
          ) {
            playButton.text('Play');
          } else {
            playButton.text('Continue');
          }
        })
      )
      ;

    slider.insert('g', '.track-overlay')
      .attr('class', 'ticks')
      .attr('transform', 'translate(0,' + 18 + ')')
      .selectAll('text')
      .data(this.dateRange.ticks(10)) // number of label on the slider
      .enter()
      .append('text')
      .attr('x', this.dateRange)
      .attr('y', 0)
      .style('font-size', this.fontSize)
      .attr('text-anchor', 'middle')
      .text((d: any) => this.formatDateToYearString(d));

    // node trace events from geojson source
    const traceEvents = slider.insert('g', '.track-overlay')
      .attr('class', 'trace-events');
    traceEvents.selectAll('circle').data(this.geoActivitiesData.features).enter()
      .append('circle')
      .attr('class', (d: any) => {
        const selectedDate = this.parseTime(d.properties.start_date);
        if (selectedDate !== null) {
          if (selectedDate >= this.startDate) {
            return 'trace';
          }
        }
        return ''; // ?????
      })
      .attr('r', (d: any) => {
        const selectedDate = this.parseTime(d.properties.start_date);
        if (selectedDate !== null) {
          if (selectedDate >= this.startDate) {
            return 4;
          }
        }
        return 2;
      })
      .attr('cx', (d: any) => {
        const startDate = this.parseTime(d.properties.start_date);
        if (startDate !== null) {
          if (startDate >= this.startDate) {
            return this.dateRange(startDate);
          }
        } else {
          return ''; // ?????
        }
      });

    const trace = slider.insert('line', '.track-overlay')
      .attr('id', 'trace')
      .attr('x1', this.dateRange(this.startDate));

    const handle = slider.insert('circle', '.track-overlay')
      .attr('id', 'handle')
      .attr('r', 10);

    // events
    const events = slider.append('g')
      .attr('class', 'events');

    // update to end date
    d3.select('#slider-value').text(this.formatDate(this.endDate));
    this.update(this.endDate);

  }

  displaySliderNodes(geoData: any): void {
    const sliderNodes = d3.select('#slider-bar .events')
      .selectAll('circle')
      .data(geoData, (d: any) => d.properties.id);

    sliderNodes
      .enter()
      .append('circle')
      .attr('id', (d: any) => 'location_' + d.properties.id)
      .attr('class', (d: any) => d.properties.type)
      .attr('r', 5)
      .attr('cursor', 'pointer')
      .attr('cx', (d: any) => this.dateRange(this.parseTime(d.properties.start_date)))
      .on('mouseover', (e: any, d: any) => {
        this.interactionWithEventNode(e.currentTarget, d, 4);
        // to link with popup
        d3.select('#popup-feature-' + d.properties.id)
          .style('visibility', 'visible')
          .style('top', '10%')
          .style('left', '2%');
      })
      .on('mouseout', (e: any, d: any) => {
        this.interactionWithEventNode(e.currentTarget, d, 2);
        // link with popup
        d3.select('#popup-feature-' + d.properties.id)
          .style('visibility', 'hidden')
          .style('top', 'unset')
          .style('left', 'unset');
      });
    sliderNodes.exit().remove();
  }

  interactionWithEventNode(svgObject: any, data: any, scaleR: number): void {
    const currentElement: any = d3.select(svgObject);
    currentElement.classed('selected', !currentElement.classed('selected')); // toggle class

    const legendElement: any = d3.select('#theme-legend .' + data.properties.type);
    legendElement.classed('selected', !legendElement.classed('selected'));

    const currentActivityCircle = d3.select('#svgActivitiesLayer #node_location_' + data.properties.id + ' circle');
    currentActivityCircle.classed('selected', !currentActivityCircle.classed('selected')); // toggle class
    this.circleBouncer(currentActivityCircle, scaleR);
  }

  circleBouncer(object: any, rScale: number): void {
    object
      .transition()
      .duration(1000)
      .ease(d3.easeElastic)
      .attr('r', (d: any) => d.properties.months * rScale);
  }


  // computeAnimatePointsOnLine(nodesPathData: any, layerId: string): void {
  //   // this.removeFeaturesMapFromLayerId(layerId);

  //   // input Data contains nodes
  //   const inputData: any = nodesPathData.features;
  //   const convertLatLngToLayerCoords = (d: any): any => {
  //       return this.mapContainer.latLngToLayerPoint(
  //           new L.LatLng(
  //               d.geometry.coordinates[1],
  //               d.geometry.coordinates[0]
  //           )
  //       );
  //   };
  //   inputData.forEach( (feature: any) => {
  //       feature.LatLng = new L.LatLng(
  //           feature.geometry.coordinates[1],
  //           feature.geometry.coordinates[0]
  //       );
  //   });

  //   const svgMapContainer: any = L.svg().addTo(this.mapContainer);
  //   const svg: any = d3.select(svgMapContainer._container).attr('id', this.svgTripIdPrefix + layerId);
  //   // leaflet-zoom-hide needed to avoid the phantom original SVG
  //   const g: any = svg.append('g').attr('class', 'leaflet-zoom-hide path_' + layerId);

  //   // function to generate a line
  //   const toLine: any = d3.line()
  //     // .interpolate("linear")
  //     .x((d: any): number => convertLatLngToLayerCoords(d).x)
  //     .y((d: any): number => convertLatLngToLayerCoords(d).y);


  //   // Here we will make the points into a single
  //   // line/path. Note that we surround the input_data
  //   // with [] to tell d3 to treat all the points as a
  //   // single line. For now these are basically points
  //   // but below we set the "d" attribute using the
  //   // line creator function from above.
  //   const linePath: any  = g.selectAll('.lineConnect_' + layerId)
  //     .data([inputData])
  //     .enter()
  //     .append('path')
  //     .attr('class', 'train-line lineConnect_' + layerId)
  //     .style('fill', 'none')
  //     .style('opacity', 'unset') // add 0 to hide the path
  //     .style('stroke', 'black')
  //     .style('stroke-width', '3px')
  //     .style('overflow', 'overlay');

  //   // the traveling circle along the path
  //   // TODO improve style : refactoring
  //   const marker: any = g.append('circle')
  //     .attr('r', 11)
  //     .attr('id', 'marker_' + layerId)
  //     .attr('class', 'train-marker travelMarker_' + layerId);
  //     // .style('fill', 'yellow')
  //     // .style('stroke', 'black')
  //     // .style('stroke-width', '3px');

  //   const textmarker: any  = g.append('text') // uncomment line? Firefox issue?
  //     // .attr('font-family', '\'Font Awesome 5 Free\'')
  //     // .attr('font-weight', 900)
  //     // .style('color', 'black')
  //     .text(this.trainIconUnicode)
  //     // .attr('text-anchor', 'middle')
  //     // .attr('alignment-baseline', 'middle')
  //     .attr('id', 'markerText_' + layerId)
  //     .attr('class', 'train-marker-text travelMarkerText_' + layerId);

  //   // points that make the path, we'll be used to display them with the line chart
  //   // we make them transparent
  //   const ptFeatures: any = g.selectAll('circle')
  //     .data(inputData)
  //     .enter()
  //     .append('circle')
  //     .attr('class', 'waypoints_' + layerId)
  //     .style('opacity', '0');

  //   // Reposition the SVG to cover the features.
  //   const reset = (): void => {

  //     // we get the stating point
  //     marker.attr('transform', (): string => {
  //       const y: number = inputData[0].geometry.coordinates[1];
  //       const x: number = inputData[0].geometry.coordinates[0];
  //       return 'translate(' +
  //         this.mapContainer.latLngToLayerPoint(new L.LatLng(y, x)).x + ',' +
  //         this.mapContainer.latLngToLayerPoint(new L.LatLng(y, x)).y +
  //       ')';
  //     });

  //     textmarker.attr('transform', (): string => {
  //       const y: number = inputData[0].geometry.coordinates[1];
  //       const x: number = inputData[0].geometry.coordinates[0];
  //       return 'translate(' +
  //         this.mapContainer.latLngToLayerPoint(new L.LatLng(y, x)).x + ',' +
  //         this.mapContainer.latLngToLayerPoint(new L.LatLng(y, x)).y +
  //       ')';
  //     });

  //     linePath.attr('d', toLine);

  //     ptFeatures.attr('transform', (d: any): string => 'translate(' +
  //         convertLatLngToLayerCoords(d).x + ',' +
  //         convertLatLngToLayerCoords(d).y +
  //       ')'
  //     );

  //   };

  //   function transition(): void {
  //     linePath.transition()
  //       .duration(7500)
  //       .attrTween('stroke-dasharray', tweenDash)
  //       .on('end', (e: any): void => {
  //         d3.select(e.currentTarget).call(transition); // infinite loop
  //         linePath.style('stroke-dasharray', '0'); // after the first pass, the line will not disappear
  //       })
  //       ;
  //   }

  //   // this function feeds the attrTween operator above with the
  //   // stroke and dash lengths
  //   function tweenDash(): any {
  //     return (t: any): any => {
  //       // total length of path (single value)
  //       const l: any = linePath.node().getTotalLength();
  //       // t is the time converted from 0 to 1
  //       const interpolate: any = d3.interpolateString('0,' + l, l + ',' + l);
  //       // t is fraction of time 0-1 since transition began
  //       const markerSelected: any = d3.select('#marker_' + layerId);
  //       const textmarkerSelect: any = d3.select('#markerText_' + layerId);

  //       const p = linePath.node().getPointAtLength(t * l);

  //       // Move the marker to that point
  //       markerSelected.attr('transform', 'translate(' + p.x + ',' + p.y + ')'); // move marker
  //       textmarkerSelect.attr('transform', 'translate(' + p.x + ',' + p.y + ')'); // move marker

  //       return interpolate(t);
  //     };
  //   }

  //   // when the user zooms in or out you need to reset
  //   // the view
  //   this.mapContainer.on('moveend', reset);

  //   // this puts stuff on the map!
  //   reset();
  //   transition();

  // }

}
