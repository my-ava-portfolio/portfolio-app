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


  addPoints(newPoint: any): void {
    let idValue: number = Date.now();
    let pointProperties: any = {
      id: idValue,
      coords : newPoint,

    }
    this.points.push(pointProperties);
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
      .attr("r", 14)
      .style("fill", "red")
      .attr("class", "cursor")
      .attr("stroke", "red")
      .attr("stroke-width", 3)
      .attr("fill-opacity", .4)
      .attr('transform', (d: any) => {
        return 'translate(' +
          this.mapContainer.latLngToLayerPoint([d.coords.x, d.coords.y]).x + ',' +
          this.mapContainer.latLngToLayerPoint([d.coords.x, d.coords.y]).y + ')';
      });

    let dragHandler = d3.drag()
      .on("drag", (e: any, d: any) => {
        this.mapContainer.dragging.disable();
        let coordsUpdated = this.mapContainer.layerPointToLatLng([e.x, e.y])

        let pointToUpdate: number = this.points.findIndex(
          (node: any): boolean =>
              node.id === d.id
        );
        this.points[pointToUpdate].coords = {
          x: coordsUpdated.lat,
          y: coordsUpdated.lng
        };;
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

    // this.updateMapLayer()
    this.initTooltip()

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
      .style("border-width", "2px")
      .style("border-radius", "5px")
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
    d3.select("#tooltip-" + this.layerName + d.id )
      .style("opacity", 1)

    d3.select(e.currentTarget)
      .style("stroke", "black")
      .style("opacity", 1)
  }

  mouseMove(e: any, d: any): void {
    d3.select("#tooltip-" + this.layerName + d.id )
      .html(`POINT(${d.coords.x} ${d.coords.y})`)
      .style("left", e.x + 15 + "px")
      .style("top", e.y + 15 + "px")
    console.log("aaa")
  }

  mouseLeave(e: any, d: any): void {
    d3.select("#tooltip-" + this.layerName+ d.id )
      .style("opacity", 0)

    d3.select(e.currentTarget)
      .style("stroke", "none")
  }

  mouseClick(e: any, d: any): void {
    d3.select("#tooltip-" + this.layerName + d.id)
      .html(`POINT(${d.coords.x} ${d.coords.y})`)
      .style("left", e.x + 15 + "px")
      .style("top", e.y + 15 + "px")
      .style("opacity", 1)

    console.log("aaa")
  }


}
