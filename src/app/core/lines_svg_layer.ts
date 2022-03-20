import * as d3 from 'd3';
import * as L from 'leaflet';


export class LinesSvgLayerOnLeaflet {

  private mapContainer: any;
  private layerName: string;

  points: any[] = [];

  constructor(mapContainer: any, layerName: string) {
    this.mapContainer = mapContainer;
    this.layerName = layerName;

  }

  addPoints(newPoint: any): void {
    let idValue: number = Date.now();
    let pointProperties: any = {
      id: idValue,
      coords : newPoint,

    }
    this.points.push(pointProperties);
    this.buildLineLayer()
  };

  buildLineLayer() {
    this.removeSvgLayer();
    this.initSvgLayer()
    console.log("coucou")

    // function to generate a line
    let toLine: any = d3.line()
      // .interpolate("linear")
      .x((d: any): number => {
        console.log(d)
        return this.mapContainer.latLngToLayerPoint([d.coords.x, d.coords.y]).x
      })
      .y((d: any): number => this.mapContainer.latLngToLayerPoint([d.coords.x, d.coords.y]).y);

    d3.select('#' + this.layerName + '-container')
      .selectAll("lines")
      .data([this.points])
      .enter()
      .append('path')
      .attr('class', 'lines')
      .style('fill', 'none')
      .style('opacity', '1') // add 0 to hide the path
      .style('stroke', "blue")
      .style('stroke-width', '3px')
      .style('overflow', 'overlay')
      .attr('d', toLine);

  };

  removeSvgLayer(deletePoints: boolean = false): void {
    d3.select('#' + this.layerName).remove()
    d3.selectAll("[id^='tooltip-" + this.layerName + "']").remove()

    if (deletePoints) {
      console.log('popo')
      this.points = [];
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

  private updateMapLayer(): void {
    d3.select('#' + this.layerName + '-container')
      .selectAll("circle")
      .attr('transform', (d: any) => {
        return 'translate(' +
          this.mapContainer.latLngToLayerPoint([d.coords.x, d.coords.y]).x + ',' +
          this.mapContainer.latLngToLayerPoint([d.coords.x, d.coords.y]).y + ')';
      });
  }

}
