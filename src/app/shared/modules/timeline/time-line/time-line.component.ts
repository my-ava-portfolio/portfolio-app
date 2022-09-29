import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewEncapsulation } from '@angular/core';

import * as d3 from 'd3';

import { backwardIcon, forwardIcon, tagsIcon } from '@modules/map-gtfs-viewer/shared/core';


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
  @Input() startDate!: Date;
  @Input() endDate!: Date;
  @Input() timelineDateFormat: string = 'year';

  @Input() currentDate!: Date; // optional: startDate will be used
  @Input() currentDateFormat: string = 'dd MMMM y HH:mm';

  @Input() defaultDate!: Date;
  @Input() stepValue: number = 4000

  @Output() currentDateEvent = new EventEmitter<Date>();

  // icons
  backwardIcon = backwardIcon;
  forwardIcon = forwardIcon;
  tagIcon = tagsIcon;

  // speed
  minStepValue = 50;
  private timerStep = 25;
  maxStepValue!: number;

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
  private displayedDatePixelValue: number = 0;
  private fontSize = '14px';
  width = 500;
  height = 75;
  private maxDatePosition: number = this.width - this.margin.left - this.margin.right;

  private timer!: any;

  constructor(
  ) { }

  ngOnInit(): void {
    this.maxStepValue = this.stepValue * 2 - this.minStepValue
  }


  ngOnChanges(changes: SimpleChanges) {

    if (changes.currentDate) {
      // const tParser = d3.timeParse("%Y-%m-%d %H:%M:%S")
      this.defaultDate = changes.currentDate.currentValue
    }

    if (changes.startDate || changes.enDate) {
      if (changes.startDate.currentValue < changes.endDate.currentValue) {
        this.startDate = changes.startDate.currentValue
        this.endDate = changes.endDate.currentValue

        if (!changes.currentDate) {
          this.defaultDate = changes.startDate.currentValue;
        }

        this.buildTimeline()
      }
    }

  }

  ngOnDestroy(): void {
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


          this.displayedDatePixelValue = e.x;
          this.update(this.dateRange.invert(this.displayedDatePixelValue));

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
            if (this.dateRange.invert(this.displayedDatePixelValue).toTimeString() === this.endDate.toTimeString()
              || this.dateRange.invert(this.displayedDatePixelValue).toTimeString() === this.startDate.toTimeString()
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
      .text((d: any) => this.formatTimeLineDate(d));

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

    // update to current date ; in the past it was the end date (with endDate attribute)
    this.update(this.defaultDate);
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

  private formatTimeLineDate(time: Date): string {
    if (this.timelineDateFormat === 'hour') {
      return time.getHours() + 'h.'
    } else if (this.timelineDateFormat === 'year') {
      return time.getFullYear().toString();
    }
    return time.getFullYear().toString();
  };


  private formatDate(time: Date): string {
    return d3.timeFormat('%Y-%m-%d %H:%M:%S')(time);
  };

  update(date: Date): void {

    const pixelDate: number = this.dateRange(date)

    // return an event to indicate that the date has been updated, so we'll update the data
    this.currentDateEvent.emit(date)

    // update position and text of label according to slider scale
    d3.select('#trace').attr('x2', pixelDate); // trace

    if (this.sliderDayStyleEnabled) {
      // we have to use a svg text object
      d3.select('#handle-timeline').attr('x', pixelDate); // handle
      this.updateHandleTimelineStyleFromTime(date)
    } else {
      // we have to use a svg circle object
      d3.select('#handle-timeline').attr('cx', pixelDate); // handle
    }

  };

  step(): void {
    this.update(this.dateRange.invert(this.displayedDatePixelValue));
    this.displayedDatePixelValue = this.displayedDatePixelValue + (this.maxDatePosition / this.stepValue);
    if (this.displayedDatePixelValue > this.maxDatePosition) {
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
    this.update(this.startDate);

    this.displayedDatePixelValue = 0;
    clearInterval(this.timer);
  }

  forwardTimeLine(): void {
    d3.select('#play-button').html('Play');
    this.update(this.endDate);

    this.displayedDatePixelValue = 0;
    clearInterval(this.timer);
  }

}
