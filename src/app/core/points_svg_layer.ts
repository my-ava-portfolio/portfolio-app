import * as d3 from 'd3';
import * as L from 'leaflet';



export class Point {

  id: string = `feat_${Date.now()}`;
  position!: number;
  _tag: string = "noTag"
  private _x!: number;
  private _y!: number;

  constructor(
    position: number,
    coordsX: number,
    coordsY: number,
  ) {
    this.position = position;
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

  updateCoord(x: number, y: number) {
    this._x = x;
    this._y = y;
  }

  to_array(): number[] {
    return [this._x, this._y];
  };

  to_wkt(): string {
    return `POINT(${this._x} ${this._y})`;
  };

  getProperties(): any {
    let properties: any = {};

    let propertiesKeys: string[] = Object.getOwnPropertyNames(this);
    propertiesKeys.forEach(
      (property: any): void => {
        properties[property] = this.getattr(this, property)
      }
    );
    return properties;
  }

  private getattr(obj: any, prop: string, def = null ): any {
    return prop in obj ? obj[prop] : def;
  }

}


export class PointsSvgLayerOnLeaflet {

  private mapContainer: any;
  private layerName: string;
  private pointCount: number = -1

  points: any[] = [];

  constructor(mapContainer: any, layerName: string) {
    this.mapContainer = mapContainer;
    this.layerName = layerName;

  }


  addPoints(coordinates: any): void {
    this.pointCount += 1
    this.points.push(new Point(this.pointCount, coordinates.x, coordinates.y));
    this.buildPointsLayer()
  };

  buildPointsLayer() {
    this.removeSvgLayer();
    this.initSvgLayer()

    d3.select('#' + this.layerName + '-container')
      .selectAll("circle")
      .data(this.points)
      .enter()
      .append("circle")
      .style("r", 14)
      .style("fill", "red")
      .attr("id", (d: any) => {return d.id})
      .attr("class", "cursor")
      .attr("stroke", "red")
      .attr("stroke-width", "3px")
      .attr("fill-opacity", .4)
      .attr('transform', (point: any, event: any) => {
        console.log(point, event)
        return 'translate(' +
          this.mapContainer.latLngToLayerPoint([point.x, point.y]).x + ',' +
          this.mapContainer.latLngToLayerPoint([point.x, point.y]).y + ')';
      });

    let dragHandler = d3.drag()
      .on("start", (e: any, d: any) => {
        this.mapContainer.dragging.disable();

      })
      .on("drag", (e: any, d: any) => {

        let coordsUpdated = this.mapContainer.layerPointToLatLng([e.sourceEvent.clientX, e.sourceEvent.clientY])

        let currentPoints: Point = e.subject;
        currentPoints.x = coordsUpdated.lat
        currentPoints.y = coordsUpdated.lng

        this.updateMapLayer()
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
    d3.selectAll("[id^='tooltip-" + this.layerName + "']").remove()

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

  highLightPointById(idToSelect: string): void {
    console.log("pouette", d3.select('#' + idToSelect))
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

    console.log(this.points)
    d3.select('#' + this.layerName + '-container')
      .selectAll("circle")
      .attr('transform', (d: any) => {
        console.log([d.x, d.y])
        return 'translate(' +
          this.mapContainer.latLngToLayerPoint([d.x, d.y]).x + ',' +
          this.mapContainer.latLngToLayerPoint([d.x, d.y]).y + ')';
      })
  }

  initTooltip(): any {
    let toolTip = d3.select("html")
      .selectAll(".tooltip")
      .data(this.points)
      .enter()
      .append("div")
      .style("opacity", 0)
      .attr("class", "tooltip") // mandatory, css adapted
      .attr("id", (d: any) => { return "tooltip-" + this.layerName + d.id })
      .style("background-color", "white")
      .style("border", "solid")
      .attr("stroke", "red")
      .style("border-width", "3px")
      .style("padding", "5px");

    d3.select('#' + this.layerName + '-container')
      .selectAll("circle")
      // .on("click", this.mouseClick.bind(this))
      .on("mouseover", this.mouseOver.bind(this))
      .on("mousemove", this.mouseMove.bind(this))
      .on("mouseleave", this.mouseLeave.bind(this))

    return toolTip

  }

  mouseOver(e: any, d: any): void {
    d3.select("#tooltip-" + this.layerName + d.id)
      .style("opacity", 1)

    d3.select(e.currentTarget)
      .style("opacity", 1)
  }

  mouseMove(e: any, d: any): void {
    d3.select("#tooltip-" + this.layerName + d.id)
      .html(d.to_wkt())
      .style("left", e.x + 15 + "px")
      .style("top", e.y + 15 + "px")

    console.log("aaa")
  }

  mouseLeave(e: any, d: any): void {
    d3.select("#tooltip-" + this.layerName + d.id)
      .style("opacity", 0)

  }

  mouseClick(e: any, d: any): void {
    d3.select("#tooltip-" + this.layerName + d.id)
      .html(d.to_wkt())
      .style("left", e.x + 15 + "px")
      .style("top", e.y + 15 + "px")
      .style("opacity", 1)

    console.log("aaa")
  }

}


