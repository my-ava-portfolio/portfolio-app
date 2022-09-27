import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewEncapsulation } from '@angular/core';

import * as d3 from 'd3';
import { Subscription } from 'rxjs';

import { backwardIcon, forwardIcon, tagsIcon } from '@modules/map-gtfs-viewer/shared/core';
import { TimelineService } from '../shared/services/timeline.service';

@Component({
  selector: 'app-time-line',
  templateUrl: './time-line.component.html',
  styleUrls: ['./time-line.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TimeLineComponent implements OnInit, OnChanges {
  @Input() timeLineId!: string;
  @Input() timeLineSpeedSliderEnabled!: Boolean;
  @Input() sliderDayStyleEnabled!: Boolean;

  @Input() startDate!: Date | null;
  @Input() endDate!: Date | null;
  currentDate!: Date | null;

  @Output() currentDateEvent = new EventEmitter<string>();

  // icons
  backwardIcon = backwardIcon;
  forwardIcon = forwardIcon;
  tagIcon = tagsIcon;

  // var svg style
  timelineMarkerFontSize = "35"
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
      "color": "#4575b4",
      "stroke": "white",
      "description": "Le soir"

    }
  ]
  brightnessValuesAtEachHours = [0.50, 0.50, 0.50, 0.50, 0.50, 0.65, 0.74, 0.83, 0.93, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0.93, 0.83, 0.72, 0.65, 0.50, 0.50]
  private margin: any = { top: 10, right: 15, bottom: 0, left: 15 };
  private dateRange!: any;
  private selectedDatePosition = 0;  // TODO check type
  private fontSize = '14px';
  width = 500;
  height = 75;
  private maxDatePosition: number = this.width - this.margin.left - this.margin.right;

  // speed
  stepValue = 4000;
  minStepValue = 50;
  maxStepValue!: number
  private timerStep = 25;

  private timer!: any;


  mapContainerSubscription!: Subscription;
  pullRangeDateDataSubscription!: Subscription;
  notifyTimelineSubscription!: Subscription;
  defaultSpeedValueSubscription!: Subscription;
  updatedSpeedValueSubscription!: Subscription;

  constructor(
    private timelineService: TimelineService,
  ) {

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

        console.log(this.startDate)

        const tParser = d3.timeParse("%Y-%m-%d %H:%M:%S")
        this.currentDate = tParser(element.currentDate);

      }
    )

  }

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges) {
    this.startDate = changes.startDate.currentValue
    this.endDate = changes.endDate.currentValue
    this.buildTimeline()

  }

  ngOnDestroy(): void {
    this.notifyTimelineSubscription.unsubscribe();
    this.setMapTileBrightness()

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
      .attr('transform', `translate(${this.margin.left},${this.height / 2})`);

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
      .attr('transform', 'translate(0,21)')
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
      .attr('transform', 'translate(0,-6)')
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
      .attr('x1', this.dateRange(this.startDate))
      .attr('x2', this.dateRange(this.currentDate));


    if ( this.sliderDayStyleEnabled ) {
      const handle = slider.insert('text', '.track-overlay')
      .attr('id', 'handle-timeline')
      .attr('class', "marker-fontawesome fa-solid")
      .attr("font-size", this.timelineMarkerFontSize)
    } else {
      const handle = slider.insert('circle', '.track-overlay')
      .attr('id', 'handle-timeline')
      .attr('r', 10);
    }

    // events
    const events = slider.append('g')
      .attr('class', 'events');

    // update to current date ; in the past it was the end date (with this.endDate)
    // these 2 lines are mandatory to initialize the slider regarding current date
    this.update(this.currentDate);
    this.selectedDatePosition = parseInt(trace.attr("x2"));  // to set the currendDate pixel value
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

    this.setMapTileBrightness(hour)

  }

  private setMapTileBrightness(value?: number) {
    const mapTilesDiv = d3.selectAll(".ol-layer")

    if (typeof value !== 'undefined') {

      mapTilesDiv.style("filter", `brightness(${this.brightnessValuesAtEachHours[value]})`);
    } else {
      mapTilesDiv.style("filter", "unset");

    };
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


    // call api only if last count is different from the current count feature
    if (h !== null) {

      // return an event to indicate that the date has been updated, so we'll update the data
      this.currentDateEvent.emit(this.formatDate(h))
      this.timelineService.pushDateUpdated(this.formatDate(h))

     // update position and text of label according to slider scale
      d3.select('#trace').attr('x2', this.dateRange(h)); // trace

      this.currentDate = h
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
      this.forwardTimeLine()
    }
  };


  startTimeLine(): void {
    const button = d3.select('#play-button');
    if (button.html() === 'Pause') {
      clearInterval(this.timer);
      // var timer = 0;
      button.text('Continue');

    } else if (button.html() === 'Continue') {
      this.timer = setInterval(this.step.bind(this), this.timerStep);
      button.html('Pause');

    } else {
      // start run
      this.timer = setInterval(this.step.bind(this), this.timerStep);
      button.html('Pause');

    }
  }

  resetTimeLine(): void {
    // reset action
    d3.select('#play-button').html('Start');
    // update to start date
    this.currentDate = this.startDate
    this.update(this.startDate);

    this.selectedDatePosition = 0;
    clearInterval(this.timer);
  }

  forwardTimeLine(): void {
    d3.select('#play-button').html('Play');
    // update to start date
    this.currentDate = this.startDate
    this.update(this.endDate);

    this.selectedDatePosition = 0;
    clearInterval(this.timer);
  }

}
