import Map from 'ol/Map';
import { geomLayerTypes } from "../data-types";
import { Feature } from 'ol';
import { getRandomDefaultColor, defaultStrokeColor, defaultStrokeWidth, hexColorReg } from '../style-helper';
import { layerEdit } from './layer-edit';


export class layerCore extends layerEdit{
    // global style
    private _fillColor: string = getRandomDefaultColor();
    private _strokeColor: string = defaultStrokeColor;
    private _strokeWidth: string = ""+defaultStrokeWidth;

    constructor(
        map: Map,
        layerName: string,
        geomType: geomLayerTypes,
        zIndexValue: number,
        groupId: string | null = null
    ) {
        super(map, layerName, geomType, zIndexValue, groupId)


        this.fillColor = this._fillColor
        this.strokeColor = this._strokeColor
        this.strokeWidth = this._strokeWidth
    }

    public get fillColor(): string {
        // main style
        return this._fillColor;
    }

    public set fillColor(color: string) {
        if (hexColorReg.test(color)) {
        this.features.forEach((feature: Feature) => {
            feature.set("fill_color", color, false)
        })
        this._fillColor = color
        };
    }

    public get strokeColor(): string {
        // main style
        return this._strokeColor;
    }

    public set strokeColor(color: string) {
        if (hexColorReg.test(color)) {
        this.features.forEach((feature: Feature) => {
            feature.set("stroke_color", color, false)
        })
        this._strokeColor = color
        };
    }

    public get strokeWidth(): string {
        // main style
        return this._strokeWidth;
    }

    public set strokeWidth(width: string) {
        this._strokeWidth = width
        this.features.forEach((feature: Feature) => {
        feature.set("stroke_width", parseFloat(width), false)
        })
    }

    override addProperties(feature: Feature): Feature {
        feature = super.addProperties(feature)
        feature.set("fill_color", this.fillColor, true)
        feature.set("stroke_width", this.strokeWidth, true)
        feature.set("stroke_color", this.strokeColor, true)
        return feature
    }


    
}