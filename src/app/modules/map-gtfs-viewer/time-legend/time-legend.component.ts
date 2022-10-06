import { Component, ViewEncapsulation, OnDestroy } from '@angular/core';
import { TimeLineComponent } from '@shared/modules/timeline/time-line/time-line.component';
import * as d3 from 'd3';

@Component({
  selector: 'app-time-legend',
  templateUrl: './../../../shared/modules/timeline/time-line/time-line.component.html',
  styleUrls: [
    './time-legend.component.scss',
    './../../../shared/modules/timeline/time-line/time-line.component.scss'
  ],
  encapsulation: ViewEncapsulation.None

})
export class TimeLegendComponent extends TimeLineComponent implements OnDestroy {

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

  constructor() {
    super();
   }


  ngOnDestroy(): void {
    this.setMapTileBrightness()
  }

  update(date: Date): void {
    super.update(date);
    this.updateHandleTimelineStyleFromTime(date)

    // if (this.sliderDayStyleEnabled) {
    //   // we have to use a svg text object
    //   const pixelDate: number = this.dateRange(date)
    //   d3.select('#handle-timeline').attr('x', pixelDate);
    //   this.updateHandleTimelineStyleFromTime(date)
    // } else {
    //   // we have to use a svg circle object
    // }
  }

  updateHandleTimelineStyleFromTime(date: any): void {

    let hour = date.getHours()
    let style = this.sliderHandleTimeStyle.filter((e) => {
      return hour >= e.from && hour < e.to;
    })[0];

    d3.select("#handle-timeline")
      .style("fill", style.color)
      .style("stroke", style.stroke)
      .style("stroke-width", "1px")
      // .text(style.font_unicode);

    this.setMapTileBrightness(hour)

  }


  setMapTileBrightness(value?: number) {
    const mapTilesDiv = d3.selectAll(".ol-layer")

    if (typeof value !== 'undefined') {

      mapTilesDiv.style("filter", `brightness(${this.brightnessValuesAtEachHours[value]})`);
    } else {
      mapTilesDiv.style("filter", "unset");

    };
  }

}
