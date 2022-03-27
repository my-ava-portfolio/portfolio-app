import * as d3 from 'd3';
import * as L from 'leaflet';

import { Point } from './core-geom';




export class PointsSvgLayerOnLeaflet {

  private containerTag: string = "-container"
  private mapContainer: any;
  private layerName: string;
  private pointCount: number = -1;
  private addActionEnabled!: boolean;

  points: any[] = [];

  constructor(mapContainer: any, layerName: string) {
    this.mapContainer = mapContainer;
    this.layerName = layerName;

    // init it only one time
    this.mapMoveEndEvent()

  }

  addPoints(coordinates: any): void {
    this.addActionEnabled = true
    console.log(coordinates)
    this.pointCount += 1
    this.points.push(
      new Point(`Point ${this.pointCount.toString()}`,
       coordinates
      )
    );
    console.log( this.points)
    this.buildLayer()
  };

  setCurrentGeomEdited(geomId: string): void {
    let currentPoint = this.getPointById(geomId)
    console.log(currentPoint)
    if (currentPoint) {
      currentPoint.edited = !currentPoint.edited

    }
  }
  unsetCurrentGeomEdited(geomId: string): void {
    this.getPointById(geomId).edited = false
  }


  buildLayer() {
    this.removeSvgLayer();
    this.initSvgLayer()


    d3.select('#' + this.layerName + this.containerTag)
      .selectAll(".feature")
      .data(this.points)
      .enter()
      .append("g")
      .attr("class", "feature")
      .attr("id", (d: any) => {return d.id})
      .append("circle")
      .style("r", 14)
      .style("fill", (d: any) => {return d.color})
      .attr("class", "cursor")
      .attr("stroke", (d: any) => {return d.color})
      .attr("stroke-width", "3px")
      .attr("fill-opacity", .4)

    let dragHandler = d3.drag()
      .on("start", (e: any, d: any) => {
        this.mapContainer.dragging.disable();

      })
      .on("drag", (e: any, d: any) => {
        let currentPoint: Point = e.subject;

        if (currentPoint.edited) {
          let pointsGroup = d3.select('#' + this.layerName + this.containerTag)
          // WARNING we have to get the event coordinates based on the upper <g> to be compatible with the leaflet translation (panning)
          let divCoords: number[] = d3.pointer(e, pointsGroup.node()); // WARNING we have to get the event coordinates based on the upper <g> to be compatible with the leaflet translation (panning)

          let coordsUpdated = this.mapContainer.layerPointToLatLng(divCoords)

          let currentPoint: Point = e.subject;
          currentPoint.x = coordsUpdated.lat
          currentPoint.y = coordsUpdated.lng

          this.updateMapLayer()
        }

      })
      .on("end", (e: any, d: any) => {
        this.mapContainer.dragging.enable();
      });

    dragHandler(
      d3.select('#' + this.layerName + '-container')
        .selectAll("circle")
    );

    this.updateMapLayer()
    this.initTooltip()

  };

  private updateMapLayer(): void {
    console.log("haha")
    d3.selectAll('.feature')
      .attr('transform', (d: any) => {
        console.log(d)
        return 'translate(' +
          this.mapContainer.latLngToLayerPoint([d.x, d.y]).x + ',' +
          this.mapContainer.latLngToLayerPoint([d.x, d.y]).y + ')';
      })
  }

  mapMoveEndEvent(): void {
    this.mapContainer.on("moveend", this.updateMapLayer.bind(this))
  }

  removeSvgLayer(deletePoints: boolean = false): void {
    d3.select('#' + this.layerName).remove()
    d3.selectAll("[id^='tooltip-]").remove()
    if (deletePoints) {
      this.points = [];
    }
  };

  removePointById(idToRemove: string): void {

    this.points.forEach((element, index) => {
      if (element.id === idToRemove) {
        this.points.splice(index, 1);
      }
    });
    this.buildLayer()
  };

  getPointById(idToSelect: string): Point {
    let pointFound!: Point;

    this.points.forEach((element: Point, index: number) => {
      if (element.id === idToSelect) {
        pointFound = this.points[index];
      }
    });

    return pointFound;
  };

  getPointCurrentlyEdited(): Point[] {
    let pointEditedFound: Point[] = [];

    this.points.forEach((element: Point, index: number) => {
      if ( element.edited ) {
        pointEditedFound.push(this.points[index]);
      }
    });

    return pointEditedFound;
  };

  updateGeomByProperty(filterPropertyName: any, filterPropertyValue: any, updatedPropertyName: any, updatedPropertyValue: any): void {
    this.points.forEach((element: any, index: number) => {
      // element is a Point...
      if (element[filterPropertyName] === filterPropertyValue) {
        console.log(element[updatedPropertyName], updatedPropertyValue)
        element[updatedPropertyName] = updatedPropertyValue;
      }
    });

  };

  highLightPointById(idToSelect: string): void {
    d3.select('#' + idToSelect + " circle")
    .transition()
    .duration(1000)
    .ease(d3.easeElastic)
      .style("r", 25)

  };

  unHighLightPointById(idToSelect: string): void {
    d3.select('#' + idToSelect + " circle")
    .transition()
    .duration(1000)
    .ease(d3.easeElastic)
      .style("r", 14)

  };

  private initSvgLayer(): void {
    const svgLayerContainer: any = L.svg().addTo(this.mapContainer);
    const svgLayerObject = d3.select(svgLayerContainer._container)
      .attr('id', this.layerName)
      .attr('pointer-events', 'auto');

    svgLayerObject.select('g')
      .attr('class', 'leaflet-zoom-hide')
      .attr('id', this.layerName +  this.containerTag);

  };

  initTooltip(): any {
    d3.select("html")
      .selectAll(".tooltip")
      .remove()

    let toolTip = d3.select("html")
      .selectAll(".tooltip")
      .data(this.points)
      .enter()
      .append("div")
      .style("opacity", 1)
      .attr("class", "tooltip d-none") // mandatory, css adapted
      .attr("id", (d: any) => { return "tooltip-" + this.layerName + d.id })
      .style("background-color", "white")
      .style("border", "solid")
      .attr("stroke", "red")
      .style("border-width", "3px")
      .style("padding", "5px");

    d3.select('#' + this.layerName + this.containerTag)
      .selectAll(".feature")
      .on("click", this.mouseClickCircle.bind(this))
      .on("mouseover", this.mouseOverCircle.bind(this))
      .on("mousemove", this.mouseMoveCircle.bind(this))
      .on("mouseleave", this.mouseLeaveCircle.bind(this))

    return toolTip

  }

  mouseOverCircle(e: any, d: any): void {
    this.enableToolTip(e, d);
    this.highLightPointById(d.id);
    // disable map event in order to click
    this.disableMapClick()

    d3.select(e.currentTarget)
      .style("opacity", 1);
  }

  mouseMoveCircle(e: any, d: any): void {
    d3.select("#tooltip-" + this.layerName + d.id)
      .html(d.toWkt())
      .style("left", e.x + 15 + "px")
      .style("top", e.y + 15 + "px");

      d3.select("#menus #" + d.id).style("background-color", "lightgrey")

  }

  mouseLeaveCircle(e: any, d: any): void {
    // enable map event in order to click
    d3.select("#menus #" + d.id).style("background-color", "white")


    if ( this.addActionEnabled ) {
      this.enableMapClick()
    }
    this.disableToolTip(e, d)
    this.unHighLightPointById(d.id)
  }

  mouseClickCircle(e: any, d: any): void {
    this.disableToolTip(e, d)

    d3.select("#" + d.id + ' .info-button').dispatch('click');
  }

  disableToolTip(e: any, d: any): void {
    let tooltip = d3.select("#tooltip-" + this.layerName + d.id)
    // to prevent display conflic if geom are near of each other
    if (!tooltip.classed('d-none')) {
      tooltip.classed('d-none', !tooltip.classed('d-none'));
    }
  }

  enableToolTip(e: any, d: any): void {
    let tooltip = d3.select("#tooltip-" + this.layerName + d.id)
    tooltip.classed('d-none', !tooltip.classed('d-none'));
  }

  enableMapClick(): void {
    this.mapContainer.on('click', this.setCoordsOnMap.bind(this));
  }

  setAddButtonStatus(status: boolean): void {
    this.addActionEnabled = status;
  }

  disableMapClick(): void {
    this.mapContainer.off('click');
  }

  setCoordsOnMap(event: any): void {
    // get coordinates from map click
    const coordinates: any = {
      x: event.latlng.lat,
      y: event.latlng.lng
    };
    this.addPoints(coordinates)
  }


}


