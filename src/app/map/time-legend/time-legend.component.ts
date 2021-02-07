import { Component, OnInit, Input, ViewEncapsulation, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';

import { currentYear, currentDate, backwardIcon, forwardIcon } from '../../core/inputs';
import { ResumeService } from '../../services/resume.service';
import { MapService } from '../../services/map.service';

import * as d3 from 'd3';


@Component({
  selector: 'app-time-legend',
  templateUrl: './time-legend.component.html',
  styleUrls: ['./time-legend.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TimeLegendComponent implements OnInit, OnDestroy {
  @Input() mapContainer: any;

  geoData!: any;

  // icons
  backwardIcon = backwardIcon;
  forwardIcon = forwardIcon;

  margin: any = { top: 10, right: 15, bottom: 0, left: 15 };
  width = 500;
  height = 50;
  endDate: Date = currentDate;
  currentYear = currentYear;
  startDate!: Date;
  selectedDatePosition = 0;  // TODO check type
  maxDatePosition: number = this.width - this.margin.left - this.margin.right ;
  dateRange!: any;
  movingCursor = false;
  timer!: any;
  currentCountNodes = 0;

  pullGeoDataSubscription!: Subscription;

  constructor(
    private mapService: MapService,
  ) {


    this.pullGeoDataSubscription = this.mapService.activitiesGeoData.subscribe(
      (element) => {
        this.geoData = element;
        const geoDataFeatures: any[] = element.features;
        const firstActivity: any[] = geoDataFeatures.filter((feature: any) => feature.id === '0');
        const startDate: Date = new Date(firstActivity[0].properties.start_date);
        startDate.setMonth(startDate.getMonth() - 1); // start date must be smaller than the first activity start_date
        this.startDate = startDate;
        // all the data is loaded but we are going to filter it to map its features regarding datetime
        // defined on the timeline
        console.log(this.geoData)
        this.buildTimeline(String(this.currentYear));

      }
    );
  }

  ngOnInit(): void {
    this.mapService.pullActivitiesGeoData(null);
  }


  ngOnDestroy(): void {
    this.pullGeoDataSubscription.unsubscribe();
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

  update(h: any): void {

    // filter data set and redraw plot
    const newData = this.geoData.features.filter( (d: any) => {
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
      // build_trip(h);
      this.mapService.pullActivitiesGeoDataToMap(newData);
      console.log('slider done', newData);
      this.displaySliderNodes(newData);
    }

    // update count feature, to optimize api calls
    this.currentCountNodes = newData.length


    // update position and text of label according to slider scale

    // update_slider_elements FUNC
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

    const svg = d3.select('#slider-bar');

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
      .select( (d: any, i: any, n: any) => n[i].parentNode.appendChild(n[i].cloneNode(true))) // copying itself
      .attr('class', 'track-inset')
      .select( (d: any, i: any, n: any) => n[i].parentNode.appendChild(n[i].cloneNode(true)))  // copying itself
      .attr('class', 'track-overlay')
      .call(d3.drag()
        .on('drag start', () => {
            // to avoid cursor running if track is drag...
            playButton.text('Pause');

          this.selectedDatePosition = d3.event.x;
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
            if ( this.dateRange.invert(this.selectedDatePosition).toTimeString() === this.endDate.toTimeString()
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
        .style('font-size', '8px')
        .attr('text-anchor', 'middle')
        .text( (d: any) => this.formatDateToYearString(d));

    // node trace events from geojson source
    const traceEvents = slider.insert('g', '.track-overlay')
      .attr('class', 'trace-events');
    traceEvents.selectAll('circle').data(this.geoData.features).enter()
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
          if ( startDate >= this.startDate) {
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
      .attr('r', 4)
      .attr('cursor', 'pointer')
      .attr('cx', (d: any) => this.dateRange(this.parseTime(d.properties.start_date)))
      .on('mouseover', (d: any, i: any, n: any) => {
        this.interactionWithEventNode(n[i], d, 4);
        // to link with popup
        d3.select('#popup-feature-' + d.properties.id)
          .style('visibility', 'visible')
          .style('top', '10%')
          .style('left', '2%')
      })
      .on('mouseout', (d: any, i: any, n: any) => {
        this.interactionWithEventNode(n[i], d, 2);
        // link with popup
        d3.select('#popup-feature-' + d.properties.id)
          .style('visibility', 'hidden')
          .style('top', 'unset')
          .style('left', 'unset')
      });
    sliderNodes.exit().remove();
  }

  interactionWithEventNode(svgObject: any, data: any, scaleR: number): void {
    const currentElement: any = d3.select(svgObject);
    currentElement.classed('slider-node-selected', !currentElement.classed('slider-node-selected')); // toggle class

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
        .attr('r', (d: any) => d.properties.months * rScale)
  }

}
