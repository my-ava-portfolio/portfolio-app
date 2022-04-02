export class CoordinatesType {
  x!: number;
  y!: number;
}

export class CommonProperties {

  private _name!: string;
  private _tag: string = "noTag"
  private _editStatus: boolean = false;

  constructor(
    name: string,
  ) {
    this._name = name;
  }

  get edited(): boolean {
    return this._editStatus;
  }
  set edited(editStatus: boolean) {
    this._editStatus = editStatus;
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

// points
export class PointGeom extends CommonProperties {
  _x!: number;
  _y!: number;

  constructor(
    name: string,
    coords: CoordinatesType
  ) {
    super(name);
    this._x = coords.x;
    this._y = coords.y;
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

  toWkt(): string {
    return `POINT(${this.x} ${this.y})`;
  };

}


export class Point extends PointGeom {
  id: string = `feat_${Date.now()}`;
  private _color: string = "#FF0000"

  constructor(
    name: string,
    coords: CoordinatesType,
  ) {
    super(name, coords);
  }

  get color(): string {
    return this._color;
  }
  set color(colorValue: string) {
    this._color = colorValue;
  }
  // TODO add more styles getter and setter

}



// lines
export class Line extends CommonProperties {
  id: string = `feat_${Date.now()}`;
  nodes: Point[] = [];
  nodesIdx: number = -1;

  constructor(
    name: string,
  ) {
    super(name);
  }

  addNode(coords: CoordinatesType) {
    this.nodesIdx += 1;
    this.nodes.push(
      new Point('PointLine-' + this.nodesIdx, coords)
    )
  }

  toWkt(): string {
    let nodesLineCoordinates: string[] = []

    this.nodes.forEach(
      (node: any): void => {
        nodesLineCoordinates.push([node.x, node.y].join(' '))
      }
    );
    return `LINESTRING(${nodesLineCoordinates.join(',')})`;
  };

}




export function getattr(obj: any, prop: string, def = null ): any {
  return prop in obj ? obj[prop] : def;
}
