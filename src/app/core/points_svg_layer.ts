import * as d3 from 'd3';
import * as L from 'leaflet';


export class PointsSvgLayerOnLeaflet {

  private mapContainer: any;
  private layerName: string;

  points: any[] = [];

  constructor(mapContainer: any, layerName: string) {
    this.mapContainer = mapContainer;
    this.layerName = layerName;

  }

  initialize(): this {
    this.mapContainer.on('click', this.addNodeOnLayer.bind(this));
    return this
  };

  private addPoints(newPoint: any): void {
    let idValue: number = Date.now();
    let pointProperties: any = {
      id: idValue,
      coords : newPoint.latlng,

    }
    this.points.push(pointProperties);
    console.log(this.points)
  };

  private addNodeOnLayer(event: any) {

    this.addPoints(event);
    this.removeSvgLayer();
    this.initSvgLayer()

    d3.select('#' + this.layerName + '-container')
      .selectAll("circle")
      .data(this.points)
      .enter()
      .append("circle")
      .attr("r", 14)
      .style("fill", "red")
      .attr("class", "cursor")
      .attr("stroke", "red")
      .attr("stroke-width", 3)
      .attr("fill-opacity", .4);

    let dragHandler = d3.drag()
      .on("drag", (e: any, d: any) => {
        this.mapContainer.dragging.disable();
        let coordsUpdated = this.mapContainer.layerPointToLatLng([e.x, e.y])

        let pointToUpdate: number = this.points.findIndex(
          (node: any): boolean =>
              node.id === d.id
        );
        this.points[pointToUpdate].coords = coordsUpdated;
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
  };

  removeSvgLayer(): void {
    d3.select('#' + this.layerName).remove()
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
          this.mapContainer.latLngToLayerPoint([d.coords.lat, d.coords.lng]).x + ',' +
          this.mapContainer.latLngToLayerPoint([d.coords.lat, d.coords.lng]).y + ')';
      });
  }





}
