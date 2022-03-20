import * as d3 from 'd3';
import * as L from 'leaflet';


export class LinesSvgLayerOnLeaflet {

  private mapContainer: any;
  private layerName: string;

  lines: any[] = [];
  linesCounter: number = 0;

  constructor(mapContainer: any, layerName: string) {
    this.mapContainer = mapContainer;
    this.layerName = layerName;

  }

  addLines(): void {
    // to init
    console.log("line added")
    let idValue: number = Date.now();
    let lineProperties: any = {
      id: idValue,
      points : [],

    }
    this.lines.push(lineProperties)
    this.linesCounter += 1;
  };

  addPoints(idxLine: number, newPoint: any): void {
    let idValue: number = Date.now();
    let pointProperties: any = {
      id: idValue,
      coords : newPoint,

    }
    this.lines[idxLine].points.push(pointProperties)
    this.buildLineLayer()
  };

  buildLineLayer() {
    this.removeSvgLayer();
    this.initSvgLayer()

    // function to generate a line
    let toLine: any = d3.line()
      // .interpolate("linear")
      .x((d: any): number => {
        console.log(d)
        return this.mapContainer.latLngToLayerPoint([d.coords.x, d.coords.y]).x
      })
      .y((d: any): number => this.mapContainer.latLngToLayerPoint([d.coords.x, d.coords.y]).y);

      let path = d3.select('#' + this.layerName + '-container')
      .selectAll("path")
      .data(this.lines)
      .enter()
        .selectAll("points")
        .data(function (d: any): any[] { return [d.points] })
        .enter()
          .append('path')
          // .attr('id', 'lines' + line.id)
          .attr('class', 'lines')
          .style('fill', 'none')
          .style('opacity', '1') // add 0 to hide the path
          .style('stroke', "blue")
          .style('stroke-width', '3px')
          .style('overflow', 'overlay')
          .attr('d', toLine)

    this.mapContainer.on('moveend', this.updateMapLayer.bind(this));

  };


  updateMapLayer(): void {

    // function to generate a line
    let toLine: any = d3.line()
      // .interpolate("linear")
      .x((d: any): number => {
        console.log(d)
        return this.mapContainer.latLngToLayerPoint([d.coords.x, d.coords.y]).x
      })
      .y((d: any): number => this.mapContainer.latLngToLayerPoint([d.coords.x, d.coords.y]).y);

      d3.select('#' + this.layerName + '-container')
      .selectAll(".lines").attr('d', toLine);


  }

  removeSvgLayer(deletePoints: boolean = false): void {
    d3.select('#' + this.layerName).remove()
    d3.selectAll("[id^='tooltip-" + this.layerName + "']").remove()

    if (deletePoints) {
      this.lines = [];
    }
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
}
