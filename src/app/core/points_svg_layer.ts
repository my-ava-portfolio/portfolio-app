import * as d3 from 'd3';
import * as L from 'leaflet';

import { getattr } from '../core/inputs';


export class Point {
  id: string = `feat_${Date.now()}`;
  _name!: string;
  _tag: string = "noTag"
  _color: string = "#FF0000"
  _editStatus: boolean = false;
  private _x!: number;
  private _y!: number;

  constructor(
    name: string,
    coordsX: number,
    coordsY: number,
  ) {
    this._name = name;
    this._x = coordsX;
    this._y = coordsY;
  }

  get x(): number {
    return this._x;
  }
  set x(coord: number) {
    this._x = coord;
  }
  get y(): number {
    return this._y;
  }
  set y(coord: number) {
    this._y = coord;
  }

  get tag(): string {
    return this._tag;
  }
  set tag(tagValue: string) {
    this._tag = tagValue;
  }

  get name(): string {
    return this._name;
  }
  set name(nameValue: string) {
    this._name = nameValue;
  }

  get color(): string {
    return this._color;
  }
  set color(colorValue: string) {
    this._color = colorValue;
  }

  get edited(): boolean {
    return this._editStatus;
  }
  set edited(editStatus: boolean) {
    this._editStatus = editStatus;
  }

  toWkt(): string {
    return `POINT(${this._x} ${this._y})`;
  };

  getProperties(): any {
    let properties: any = {};

    let propertiesKeys: string[] = Object.getOwnPropertyNames(this);
    propertiesKeys.forEach(
      (property: any): void => {
        properties[property] = getattr(this, property)
      }
    );
    return properties;
  }



}


export class PointsSvgLayerOnLeaflet {

  private mapContainer: any;
  private layerName: string;
  private pointCount: number = -1;
  private addActionEnabled!: boolean;

  private currentGeomEdited: string = '';

  points: any[] = [];

  constructor(mapContainer: any, layerName: string) {
    this.mapContainer = mapContainer;
    this.layerName = layerName;

  }

  addPoints(coordinates: any): void {
    this.addActionEnabled = true

    this.pointCount += 1
    this.points.push(
      new Point(`Point ${this.pointCount.toString()}`,
       coordinates.x,
        coordinates.y
      )
    );
    this.buildPointsLayer()
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


  buildPointsLayer() {
    this.removeSvgLayer();
    this.initSvgLayer()

    d3.select('#' + this.layerName + '-container')
      .selectAll("circle")
      .data(this.points)
      .enter()
      .append("circle")
      .style("r", 14)
      .style("fill", (d: any) => {return d.color})
      .attr("id", (d: any) => {return d.id})
      .attr("class", "cursor")
      .attr("stroke", (d: any) => {return d.color})
      .attr("stroke-width", "3px")
      .attr("fill-opacity", .4)
      .attr('transform', (point: any, event: any) => {
        console.log(point, event)
        return 'translate(' +
          this.mapContainer.latLngToLayerPoint([point.x, point.y]).x + ',' +
          this.mapContainer.latLngToLayerPoint([point.x, point.y]).y + ')';
      })

    let dragHandler = d3.drag()
      .on("start", (e: any, d: any) => {
        this.mapContainer.dragging.disable();

      })
      .on("drag", (e: any, d: any) => {
        let pointsCurrentlyEdited = this.getPointCurrentlyEdited()

        pointsCurrentlyEdited.forEach((element: Point, index: number) => {
          if (element.id ===  d.id) {
            let coordsUpdated = this.mapContainer.layerPointToLatLng([e.sourceEvent.clientX, e.sourceEvent.clientY])

            let currentPoints: Point = e.subject;
            currentPoints.x = coordsUpdated.lat
            currentPoints.y = coordsUpdated.lng

            this.updateMapLayer()
          }
        });

      })
      .on("end", (e: any, d: any) => {
        this.mapContainer.dragging.enable();
      });

    dragHandler(
      d3.select('#' + this.layerName + '-container')
        .selectAll("circle")
    );

    this.mapContainer.on("moveend", this.updateMapLayer.bind(this))

    this.updateMapLayer()
    this.initTooltip()

  };

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
    this.buildPointsLayer()
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
    d3.select('#' + idToSelect)
    .transition()
    .duration(1000)
    .ease(d3.easeElastic)
      .style("r", 25)

  };

  unHighLightPointById(idToSelect: string): void {
    d3.select('#' + idToSelect)
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
      .attr('id', this.layerName + '-container');
  };

  private updateMapLayer(): void {

    d3.select('#' + this.layerName + '-container')
      .selectAll("circle")
      .attr('transform', (d: any) => {
        return 'translate(' +
          this.mapContainer.latLngToLayerPoint([d.x, d.y]).x + ',' +
          this.mapContainer.latLngToLayerPoint([d.x, d.y]).y + ')';
      })
  }

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

    d3.select('#' + this.layerName + '-container')
      .selectAll("circle")
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

  addButtonStatus(status: boolean): void {
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


