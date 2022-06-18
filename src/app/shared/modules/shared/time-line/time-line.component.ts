import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { MapService } from '@services/map.service';

import * as d3 from 'd3';
import { Subscription } from 'rxjs';

import { backwardIcon, forwardIcon, tagsIcon } from '@modules/map-gtfs-viewer/shared/inputs';
import { TimelineService } from '@shared/services/timeline.service';

@Component({
  selector: 'app-time-line',
  templateUrl: './time-line.component.html',
  styleUrls: ['./time-line.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TimeLineComponent implements OnInit {
  @Input() timeLineId!: string;
  @Input() timeLineSpeedSliderEnabled!: Boolean;
  @Input() sliderDayStyleEnabled!: Boolean;

  startDate!: Date | null;
  endDate!: Date | null;
  currentDate!: string;

  // icons
  backwardIcon = backwardIcon;
  forwardIcon = forwardIcon;
  tagIcon = tagsIcon;

  sliderHandleTimeStyle = [
    {
      "from": 0,
      "to": 7,
      "font_unicode": '\uf186',
      "color": "#4575b4",
      "stroke": "white",
      "description": "La nuit",
      "brightness": 60
    },
    {
      "from": 7,
      "to": 11,
      "font_unicode": '\uf185',
      "color": "#fdae61",
      "stroke": "black",
      "description": "Le matin"
    },
    {
      "from": 11,
      "to": 14,
      "font_unicode": '\uf185',
      "color": "#d73027",
      "stroke": "black",
      "description": "Le milieu de journée"
    },
    {
      "from": 14,
      "to": 19,
      "font_unicode": '\uf185',
      "color": "#fdae61",
      "stroke": "black",
      "description": "L'après midi"
    },
    {
      "from": 19,
      "to": 24,
      "font_unicode": '\uf186',
      "color": "#f1b6da",
      "stroke": "white",
      "description": "Le soir"

    }
  ]

  private margin: any = { top: 10, right: 15, bottom: 0, left: 15 };
  width = 600;
  height = 90;
  private dateRange!: any;
  private selectedDatePosition = 0;  // TODO check type
  private fontSize = '14px';
  private maxDatePosition: number = this.width - this.margin.left - this.margin.right;
  sliderDate!: Date | null;
  private movingCursor = false;
  private timer!: any;
  stepValue = 4000; // 4000 ok with parq ; 1500 for ter ; 4k for others // reduce to get more details
  minStepValue = 500;
  maxStepValue!: number
  private timerStep = 25; // 25 ok with parq

  private mapContainer!: any;

  mapContainerSubscription!: Subscription;
  pullRangeDateDataSubscription!: Subscription;
  notifyTimelineSubscription!: Subscription;
  defaultSpeedValueSubscription!: Subscription;
  updatedSpeedValueSubscription!: Subscription;

  constructor(
    private mapService: MapService,
    private timelineService: TimelineService,
  ) {

    this.mapContainerSubscription = this.mapService.mapContainer.subscribe(
      (element: any) => {
        this.mapContainer = element;
      }
    );

    this.defaultSpeedValueSubscription = this.timelineService.defaultSpeedValue.subscribe(
      (defaultSpeedValue: number) => {
        this.stepValue = defaultSpeedValue
        this.maxStepValue = defaultSpeedValue * 2 - this.minStepValue

      }
    )

    this.updatedSpeedValueSubscription = this.timelineService.updatedSpeedValue.subscribe(
      (speedValueUpdated: number) => {
        this.stepValue = speedValueUpdated
      }
    )

    // MANDATORY, we need these 3 variables to init the timeline
    this.notifyTimelineSubscription = this.timelineService.timeLineInputs.subscribe(
      (element: any) => {
        this.startDate = element.startDate;
        this.endDate = element.endDate;
        this.currentDate = element.currentDate;

        this.buildTimeline()
      }
    )

  }

  ngOnInit(): void {
    this.mapService.getMapContainer()
  }

  ngOnDestroy(): void {
    this.mapContainerSubscription.unsubscribe();
    this.notifyTimelineSubscription.unsubscribe();

  }

  updateStepValue(event: any): void {
    this.stepValue = event.target.value;
  }

  buildTimeline(): void {

    // clean existing slide bar
    d3.selectAll('.slider-bar').remove()

    const svg = d3.select('#' + this.timeLineId);

    const playButton: any = d3.select('#play-button');

    this.initDateRange();

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

          // to avoid cursor running if a click is done on the slider bar...
          playButton.text('Pause');
          playButton.dispatch('click')

          this.selectedDatePosition = e.x;
          this.update(this.dateRange.invert(this.selectedDatePosition));

          // disable timeline node selection
          d3.select('#timeline-slider .events')
            .selectAll('circle')
            .style('pointer-events', 'none');
        })
        .on('end', (e: any) => {
          // at the drag end we enable the drap map
          this.mapContainer.dragging.enable();

          // enable timeline node selection
          d3.select('#timeline-slider .events')
            .selectAll('circle')
            .style('pointer-events', 'all');

          // reset button play if animation is done and play button == continue
          if (this.startDate !== null && this.endDate !== null) {
            if (this.dateRange.invert(this.selectedDatePosition).toTimeString() === this.endDate.toTimeString()
              || this.dateRange.invert(this.selectedDatePosition).toTimeString() === this.startDate.toTimeString()
            ) {
              playButton.text('Play');
            } else {
              playButton.text('Continue');
            }
          }
      })
    );

    slider.insert('g', '.track-overlay')
      .attr('class', 'ticks')
      .attr('transform', 'translate(0,' + 21 + ')')
      .selectAll('text')
      .data(this.dateRange.ticks(10)) // number of label on the slider
      .enter()
      .append('text')
      .attr('x', this.dateRange)
      .attr('y', 0)
      .style('font-size', this.fontSize)
      .attr('text-anchor', 'middle')
      .text((d: any) => this.formatDateToTimeString(d));

    slider.insert('g', '.track-overlay')
      .attr('class', 'ticks-line')
      .attr('transform', 'translate(0,' + -6 + ')')
      .selectAll('line')
      .data(this.dateRange.ticks(10)) // number of label on the slider
      .enter()
      .append('line')
      .attr('x1', this.dateRange)
      .attr('x2', this.dateRange)
      .attr('y1', 0)
      .attr('y2', 12)
      .style('stroke', 'grey')
      .style('stroke-width', '2px');

    // node trace events from geojson source
    const traceEvents = slider.insert('g', '.track-overlay')
      .attr('class', 'trace-events');

    const trace = slider.insert('line', '.track-overlay')
      .attr('id', 'trace')
      .attr('x1', this.dateRange(this.startDate));

    if ( this.sliderDayStyleEnabled ) {
      const handle = slider.insert('text', '.track-overlay')
      .attr('id', 'handle-timeline')
      .attr('class', "marker-fontawesome fa-solid")
      .style("font-size", "30")
    } else {
      const handle = slider.insert('circle', '.track-overlay')
      .attr('id', 'handle-timeline')
      .attr('r', 10);
    }

    // events
    const events = slider.append('g')
      .attr('class', 'events');

    // update to end date
    this.sliderDate = this.endDate
    this.update(this.endDate);

  };

  private updateHandleTimelineStyleFromTime(date: any): void {

    let hour = date.getHours()
    let style = this.sliderHandleTimeStyle.filter((e) => {
      return hour >= e.from && hour < e.to;
    })[0];

    d3.select("#handle-timeline")
      .style("fill", style.color)
      .style("stroke", style.stroke)
      .style("stroke-width", "1px")
      .text(style.font_unicode);

    const mapDiv = d3.select("#map")
    const brightnessValues = [0.39, 0.42, 0.46, 0.51, 0.57, 0.65, 0.74, 0.83, 0.93, 1.02, 1.09, 1.13, 1.15, 1.13, 1.09, 1.02, 0.93, 0.83, 0.74, 0.65, 0.57, 0.51, 0.46, 0.42]
    mapDiv.style("filter", "brightness(" + brightnessValues[hour] + ")")

  }

  private initDateRange(): void {
    if (this.startDate !== null && this.endDate !== null) {
      this.dateRange = d3.scaleTime()
      .domain([this.startDate, this.endDate])
      .range([0, this.maxDatePosition])
      .clamp(true);
    }
  };


  private formatDateToTimeString(time: Date): string {
    return parseInt(d3.timeFormat('%H')(time)) + ' h.';
  };

  private formatDate(time: Date): string {
    return d3.timeFormat('%Y-%m-%d %H:%M:%S')(time);
  };

  update(h: any): void {

    this.currentDate = this.formatDate(h)

    // call api only if last count is different from the current count feature
    if (this.currentDate !== null) {

      // return an event to indicate that the date has been updated, so we'll update the data
      this.timelineService.pushDateUpdated(this.currentDate)

     // update position and text of label according to slider scale
      d3.select('#trace').attr('x2', this.dateRange(h)); // trace

      this.sliderDate = h
      if (this.sliderDayStyleEnabled) {
        // we have to use a svg text object
        d3.select('#handle-timeline').attr('x', this.dateRange(h)); // handle
        this.updateHandleTimelineStyleFromTime(h)
      } else {
        // we have to use a svg circle object
        d3.select('#handle-timeline').attr('cx', this.dateRange(h)); // handle
      }

    }
  };

  step(): void {
    this.update(this.dateRange.invert(this.selectedDatePosition));
    this.selectedDatePosition = this.selectedDatePosition + (this.maxDatePosition / this.stepValue);
    if (this.selectedDatePosition > this.maxDatePosition) {
      this.movingCursor = false;
      this.selectedDatePosition = 0;
      clearInterval(this.timer);
      // timer = 0;
      d3.select('#play-button').text('Play');
    }
  };


  startTimeLine(): void {
    const button = d3.select('#play-button');
    if (button.html() === 'Pause') {
      this.movingCursor = false;
      clearInterval(this.timer);
      // var timer = 0;
      button.text('Continue');

    } else if (button.html() === 'Continue') {
      this.movingCursor = true;
      this.timer = setInterval(this.step.bind(this), this.timerStep);
      button.html('Pause');

    } else {
      // start run
      this.movingCursor = true;
      this.timer = setInterval(this.step.bind(this), this.timerStep);
      button.html('Pause');

    }
  }

  resetTimeLine(): void {
    // reset action
    d3.select('#play-button').html('Start');
    // update to start date
    this.sliderDate = this.startDate
    // d3.select('#slider-value').html(this.formatDate(this.startDate));
    this.update(this.startDate);
    this.selectedDatePosition = 0;
    this.movingCursor = false;
    clearInterval(this.timer);
  }

  forwardTimeLine(): void {
    d3.select('#play-button').html('Play');
    // update to start date
    this.sliderDate = this.startDate
    // d3.select('#slider-value').html(this.formatDate(this.endDate));
    this.update(this.endDate);
    this.selectedDatePosition = 0;
    this.movingCursor = false;
    clearInterval(this.timer);
  }

}
