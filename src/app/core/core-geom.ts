export class coordinates {
  x!: number;
  y!: number;
  constructor() {}
}

export class Point {
  id: string = `feat_${Date.now()}`;
  _name!: string;
  _tag: string = "noTag"
  _color: string = "#FF0000"
  _editStatus: boolean = false;
  private _coords!: coordinates;

  constructor(
    name: string,
    coords: coordinates,
  ) {
    this._name = name;
    this._coords = coords;
  }

  get x(): number {
    return this._coords.x;
  }
  set x(coord: number) {
    this._coords.x = coord;
  }
  get y(): number {
    return this._coords.y;
  }
  set y(coord: number) {
    this._coords.y = coord;
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
    return `POINT(${this._coords.x} ${this._coords.y})`;
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


export function getattr(obj: any, prop: string, def = null ): any {
  return prop in obj ? obj[prop] : def;
}
