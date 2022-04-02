import * as d3 from 'd3';
import * as L from 'leaflet';

import { Line, CoordinatesType } from './core-geom';



export class LinesSvgLayerOnLeaflet {

  private containerTag: string = "-container"
  private mapContainer: any;
  private layerName: string;
  private lineCount: number = -1;
  private addActionEnabled!: boolean;

  lines: any[] = [];

  constructor(mapContainer: any, layerName: string) {
    this.mapContainer = mapContainer;
    this.layerName = layerName;

  }

  addLine(): void {
    // to init the line
    this.addActionEnabled = true

    this.lineCount += 1;
    this.lines.push(
      new Line(`Ligne ${this.lineCount.toString()}`)
    )
  };

  addPoints(coordinates: CoordinatesType): void {
    console.log(this.lines)
    // TODO only 1 !
    let currentLineEdited = this.getLineCurrentlyEdited()[0]

    currentLineEdited.addNode(coordinates)
    this.buildLayer()
  };

  setCurrentGeomEdited(geomId: string): void {
    // got the id ! let's go to add node
    let currentLine = this.getLineById(geomId)
    if (currentLine) {
      currentLine.edited = !currentLine.edited
    }
  }
  unsetCurrentGeomEdited(geomId: string): void {
    this.getLineById(geomId).edited = false
  }

  getLineCurrentlyEdited(): Line[] {
    // todo WARNING : should be only 1 editing
    let pointEditedFound: Line[] = [];

    this.lines.forEach((element: Line, index: number) => {
      if ( element.edited ) {
        pointEditedFound.push(this.lines[index]);
      }
    });

    return pointEditedFound;
  };


  getLineById(idToSelect: string): Line {
    let lineFound!: Line;

    this.lines.forEach((element: Line, index: number) => {
      if (element.id === idToSelect) {
        lineFound = this.lines[index];
      }
    });

    return lineFound;
  };

  buildLayer() {
    this.removeSvgLayer();
    this.initSvgLayer()

    // function to generate a line
    let toLine: any = d3.line()
      // .interpolate("linear")
      .x((d: any): number => {
        console.log(d)
        return this.mapContainer.latLngToLayerPoint([d.x, d.y]).x
      })
      .y((d: any): number => this.mapContainer.latLngToLayerPoint([d.x, d.y]).y);

      let path = d3.select('#' + this.layerName + this.containerTag)
      .selectAll(".feature")
      .data(this.lines)
        .enter()
        .append("g")
        .selectAll("nodes")
        .attr("class", "feature")
        .data(function (d: any): any[] { return [d.nodes] })
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
      .x((d: any): number => {
        return this.mapContainer.latLngToLayerPoint([d.coords.x, d.coords.y]).x
      })
      .y((d: any): number => this.mapContainer.latLngToLayerPoint([d.coords.x, d.coords.y]).y);

      d3.select('#' + this.layerName + this.containerTag)
      .selectAll(".lines").attr('d', toLine);
  }


  mapMoveEndEvent(): void {
    this.mapContainer.on("moveend", this.updateMapLayer.bind(this))
  }


  removeSvgLayer(deletePoints: boolean = false): void {
    d3.select('#' + this.layerName).remove()
    d3.selectAll("[id^='tooltip-" + this.layerName + "']").remove()

    if (deletePoints) {
      this.lines = [];
    }
  };

  removeLineById(idToRemove: string): void {

    this.lines.forEach((element, index) => {
      if (element.id === idToRemove) {
        this.lines.splice(index, 1);
      }
    });
    this.buildLayer()
  };

  private initSvgLayer(): void {
    const svgLayerContainer: any = L.svg().addTo(this.mapContainer);
    const svgLayerObject = d3.select(svgLayerContainer._container)
      .attr('id', this.layerName)
      .attr('pointer-events', 'auto');
    svgLayerObject.select('g')
      .attr('class', 'leaflet-zoom-hide')
      .attr('id', this.layerName + this.containerTag);
  };

  setAddButtonStatus(status: boolean): void {
    this.addActionEnabled = status;
  }

  disableMapClick(): void {
    this.mapContainer.off('click');
  }

  nodeMapClick(): void {
    this.mapContainer.on('click', this.setCoordsOnMap.bind(this));
  }

  addLineClick(): void {
    if (this.addActionEnabled) {
      this.mapContainer.on('click', this.addLine.bind(this));
    }

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
