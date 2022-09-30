import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

import * as d3 from 'd3';

import { backwardIcon, forwardIcon, tagsIcon } from '@modules/map-gtfs-viewer/shared/core';


@Component({
  selector: 'app-time-line',
  templateUrl: './time-line.component.html',
  styleUrls: ['./time-line.component.scss'],
})
export class TimeLineComponent implements OnInit, OnChanges {

  @Input() timeLineId: string = 'timeline-slider';
  @Input() timeLineSpeedSliderEnabled!: Boolean;
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


  brightnessValuesAtEachHours = [0.50, 0.50, 0.50, 0.50, 0.50, 0.65, 0.74, 0.83, 0.93, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0.93, 0.83, 0.72, 0.65, 0.50, 0.50]
  private margin: any = { top: 10, right: 15, bottom: 0, left: 15 };
  dateRange!: any;
  private displayedDatePixelValue: number = 0;
  private fontSize = '14px';
  width = 500;
  height = 75;
  private maxDatePosition: number = this.width - this.margin.left - this.margin.right;

  private timer!: any;

  constructor( ) { }

  ngOnInit(): void {
    this.maxStepValue = this.stepValue * 2 - this.minStepValue
  }


  ngOnChanges(changes: SimpleChanges) {
    if (changes.currentDate) {
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

        })
        .on('end', (e: any) => {

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

    const trace = slider.insert('line', '.track-overlay')
      .attr('id', 'trace')
      .attr('x1', this.dateRange(this.startDate))
      .attr('x2', this.dateRange(this.currentDate));

      const handle = slider.insert('circle', '.track-overlay')
        .attr('id', 'handle-timeline')
        .attr('r', 10);


    // Here to avoid cursor conflict between timeline and dataViz object
    // events
    const circleEvents = slider.append('g')
      .attr('class', 'circle-events')

    // update to current date ; in the past it was the end date (with endDate attribute)
    this.update(this.defaultDate);
  };

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
    d3.select('#trace')
      .attr('x2', pixelDate)
      .style('stroke', '#6c6c6c')
      .style('stroke-width', '4')
    ;

      // we have to use a svg circle object
      d3.select('#handle-timeline').attr('cx', pixelDate); // handle

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
