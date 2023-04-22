import Map from 'ol/Map';
import { Draw, Modify, Snap, Translate } from 'ol/interaction';
import Select from 'ol/interaction/Select';
import { altKeyOnly, click } from 'ol/events/condition';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { geomLayerTypes } from '../data-types';
import { refreshFeatureStyle } from './layer-handler';
import { v4 as uuidv4 } from 'uuid';
import { Feature } from 'ol';
import { LineString, LinearRing, Polygon } from 'ol/geom';


export class layerEdit {
    private _map!: Map;
    private _featuresCounter: number = 0

    private _vectorLayer!: VectorLayer<any>;
    private _sourceFeatures!: VectorSource;
    private _allFeatures: any[] = [];
    
    // var for polygon holes
    private holePolygonDrawingStatus = false;  // TODO add GUI option to play with it
    private polygonIntersected!: Feature | undefined;
    private coordsLength!: number;
    private previousPolygonGeometry!: any;

    private _draw!: Draw;
    private _snap!: Snap;
    private _translate!: Translate;
    private _modifier!: Modify;
    select!: Select;


    _zoomPadding = [100, 100, 100, 100];  // TODO set as a global var (use by layer-manager)
    _maxZoom = 14;
    
    constructor(
        map: Map,
        layerName: string,
        geomType: geomLayerTypes,
        zIndexValue: number,
        groupId: string | null = null
    ) {
        
        this._map = map
        this._initLayer(layerName, geomType, zIndexValue);

        this._initSelect();
        this._initTranslate();
        this._initSnap();
        this._initModifier();

        this._map.addLayer(this._vectorLayer);

    }
    get layer(): VectorLayer<any> {
        return this._vectorLayer
    }

    private _initLayer(layerName: string, geomType: geomLayerTypes, zIndexValue: number): void {
        this._sourceFeatures = new VectorSource();
    
        this._vectorLayer = new VectorLayer({
          source: this._sourceFeatures,
          style: (feature: any, _: any): any => {
            return refreshFeatureStyle(feature)
          }
        });

        this.layerName = layerName
        this.layer.set('uuid', uuidv4())
        this.layer.set('geom_type', geomType, true)
        this.zIndex = zIndexValue;

    }

    get sourceFeatures(): VectorSource {
        return this._sourceFeatures
    }
    get zIndex(): number {
        return this.layer.getZIndex()
    }
    set zIndex(value: number) {
        this.layer.setZIndex(value)
    }

    get uuid(): string {
        return this._getLayerAttributes('uuid');
    }
    get geomType(): geomLayerTypes {
        return this._getLayerAttributes('geom_type')
    }
    get layerName(): string {
        return this._getLayerAttributes('name')
    }
    set layerName(name: string) {
        this.layer.set('name', name)
    }

    get features(): Feature[] {
        return  this._sourceFeatures.getFeatures().sort((feat1: Feature, feat2: Feature) => {
            return feat1.get('no') - feat2.get('no');
        });
    }

    featureById(featureId: string) : Feature[] {
        const featureFound = this.sourceFeatures.getFeatureById(featureId)
        if (featureFound !== null) {
            return [featureFound]
        }
        return []
    }

    // att
    private _getLayerAttributes(attribute: string): any {
        return this.layer.get(attribute)
    }

    removeLayer(): void {
        this._map.removeLayer(this.layer)
    }
    

  enableTranslating(): void {
    this._map.addInteraction(this._translate)
  }

  disableTranslating(): void {
    this._map.removeInteraction(this._translate)
  }

  enableSelecting(): void {
    this._map.addInteraction(this.select)
  }

  disableSelecting(): void {
    this._map.removeInteraction(this.select)
  }

  enableSnapping(): void {
    this._map.addInteraction(this._snap);
  }

  disableSnapping(): void {
    this._map.removeInteraction(this._snap);
  }

  private _initSelect(): void {
      this.select = new Select({
        condition: click,
        multi: false,
        layers: [this.layer],
      })
    }
    
    private _initSnap(): void {
      this._snap = new Snap({
        source: this._sourceFeatures
      });
    }
    
    private _initTranslate(): void {
      this._translate = new Translate({
        features: this.select.getFeatures(),
      });
    }
    
    private _initModifier(): void {
        this._modifier = new Modify({
            features: this.select.getFeatures(),
            deleteCondition: altKeyOnly,
        });

        this._modifier.on('modifyend', (e: any) => {

            // to remove hole on polygon (select the polygon, press ctr + start to edti a vertice + release)
            if (e.mapBrowserEvent.originalEvent.ctrlKey) {
            this._removeHoles(e)
            }

            // to update value definitively (especially during hole drawing)
            if (e.features.getArray().length > 0) {
            e.features.getArray().forEach((element: Feature) => {
                this._updateMetadataFeature(element)
            });
            }
        })
    }

    private _removeHoles(event: any): void {

        // we suppose that we have only one feature!
        const featureFound: any = event.features.getArray()[0];
        const mouseCoordinate: number[] = event.mapBrowserEvent.coordinate;
    
        if (featureFound.getGeometry().getType() == "Polygon") {
    
          // get the linearing composing the polygon & convert them into LineString to compare them
          const linearRingsFound = featureFound.getGeometry().getLinearRings()
    
          if (linearRingsFound.length > 1) {
            let linearRingVectorSource = new VectorSource();
            linearRingsFound.forEach((geom: any, index: number) => {
              const line: LineString = new LineString(geom.getCoordinates())
              let featureLine: Feature = new Feature({
                geometry: line
              });
              featureLine.setId(index)
              linearRingVectorSource.addFeature(featureLine);
            })
            // get the closest LineString from the mouse coords
            const closestFeature = linearRingVectorSource.getClosestFeatureToCoordinate(mouseCoordinate);
            let coordsCleaned: number[] = []
            linearRingsFound.forEach((ring: any, index: number) => {
              if (index !== closestFeature.getId()) {
                coordsCleaned.push(ring.getCoordinates());
              }
            })
            // let go to remove the linearing found
            featureFound.getGeometry().setCoordinates(coordsCleaned)
          }
    
        };
    
    }
    enableEditing(): void {
      this.disableEditing()
      this._map.addInteraction(this._modifier);
      this._map.addInteraction(this._snap);
      this.disableSelecting()

    }
    
    disableEditing(): void {
      this._map.removeInteraction(this._modifier);
      this._map.removeInteraction(this._snap);
      this.enableSelecting()
    }
    
    cleanEvents(): void {
        this.disableDrawing();
        this.disableEditing();
        this.disableSelecting();
    }
    
    enableDrawing(holeStatus = false): void {
      this.holePolygonDrawingStatus = holeStatus;
    
      this._draw = new Draw({
        type: this.geomType,
        stopClick: false,
        source: this._sourceFeatures,
        condition: (e: any) => e.originalEvent.buttons === 1,  // draw only with left click
      });
    
      this._map.addInteraction(this._draw);
      this._map.addInteraction(this._snap);
      this.disableSelecting()
      
      this._draw.on('drawstart', this._onDrawStart.bind(this));
      this._draw.on('drawend', this._onDrawEnd.bind(this));
    
      this._draw.on('drawabort', this._onDrawAborting.bind(this));
      }
    
    disableDrawing(): void {
      this._map.removeInteraction(this._draw);
      this._map.removeInteraction(this._snap);
      this.enableSelecting()
    }

    // att
    private _updateMetadataFeature(feature: Feature): void {
        feature.setProperties({
          'updated_at': new Date().toISOString(),
          "status": "modified",
        }, true)
    }
    
    private _onDrawStart(e: any): void {

        //to build hole on polygon
        if (this.holePolygonDrawingStatus) {
            if (e.feature.getGeometry()?.getType() === "Polygon") {

                let featureFound: Feature | undefined = this.checkIfCoordIntersectLayer(e.feature)
                this.polygonIntersected = featureFound
                if (this.polygonIntersected === undefined) {
                    e.target.abortDrawing();
                    this._onDrawAborting(e)
                    alert('An hole is possible only on a polygon!')
                    return;
                }

                if (this.polygonIntersected !== undefined) {
                    this.previousPolygonGeometry = this.polygonIntersected.getGeometry()
                    const polygonIntersectedGeom: any = this.polygonIntersected.getGeometry()
                    this.coordsLength = polygonIntersectedGeom.getCoordinates().length;
                    e.feature.getGeometry().on('change', this._onGeomChangeBuildHole.bind(this));
                }
            }
        }
    
    }
    
    private _onDrawEnd(e: any): void {

        // let's go to finalize
        if (this.holePolygonDrawingStatus) {
          // disable hole editing
          setTimeout(() => {
            // we remove the polygon drawn, because it has been used to create the hole on _onGeomChangeBuildHole()
            this._sourceFeatures.removeFeature(e.feature);
          }, 5);
    
          if (this.polygonIntersected !== undefined) {
            e.feature.setGeometry(this.polygonIntersected.getGeometry())
            this.select.getFeatures().clear()
          }
    
    
          this.polygonIntersected = undefined;
          // TODO: QUESTION: no need to recreate the properties because the polygon already exists?
          return
        }
    
        this.addProperties(e.feature)
      }
    
    private _onDrawAborting(e: any): void {
        // to cancel a drawing hole (shift + left click OR shift + right click for hole )
        console.log(e)
        if (this.holePolygonDrawingStatus) {
  
        if (this.polygonIntersected !== undefined) {
          this.polygonIntersected.setGeometry(this.previousPolygonGeometry)
          this.polygonIntersected = undefined;
        }
      }
    }

    private checkIfCoordIntersectLayer(feature: any): Feature | undefined {
        let featureFound!: Feature | undefined;
        this._sourceFeatures.forEachFeatureIntersectingExtent(feature.getGeometry().getExtent(), (feature: Feature | undefined) => {
          featureFound = feature;
        });
    
        return featureFound
    }
    
    private _onGeomChangeBuildHole(e: any): void {
        //Get hole coordinates for polygon
        if (this.polygonIntersected !== undefined) {
    
          const polygonIntersectedGeom: any = this.polygonIntersected.getGeometry()
          let coordinates = polygonIntersectedGeom.getCoordinates();
          let geom = new Polygon(coordinates.slice(0, this.coordsLength));
    
          //Add hole coordinates to polygon and reset the polygon geometry
          let linearRing = new LinearRing(e.target.getCoordinates()[0]);
          geom.appendLinearRing(linearRing);
          this.polygonIntersected.setGeometry(geom);
    
        }
    }
    
    // att
    addProperties(feature: Feature): any {
        // TODO synchronize properties after the call of this func
        ++this._featuresCounter;
        const uuid = uuidv4()
        feature.setId(uuid)
    
        let name!: string;
        if (feature.get("name") !== undefined) {
          name = feature.get("name") + " copy"
        } else {
          name = 'feature ' + this._featuresCounter
        }
        // TOOD add the layerName ? 
        feature.setProperties({
          'id': feature.getId(),
          // 'layer_id': this.uuid,
          'no': this._featuresCounter,
          'name': name,
          'geom_type': feature.getGeometry()?.getType(),
          "status": "added",
          'created_at': new Date().toISOString(),
          'updated_at': new Date().toISOString(),
          // 'fill_color': this.fillColor,
          // 'stroke_width': this.strokeWidth,
          // 'stroke_color':  this.strokeColor
        }, true)
        // if (feature.get("fill_color") === undefined) {
        //   feature.set("fill_color",  this.fillColor, true)
        // }
        // if (feature.get("stroke_width") === undefined) {
        //   feature.set("stroke_width",  this.strokeWidth, true)
        // }
        // if (feature.get("stroke_color") === undefined) {
        //   feature.set("stroke_color",  this.strokeColor, true)
        // }
        return feature
    }

    zoomToLayer(): void {
        if (this.features.length > 0) {
            this._map.getView().fit(this.layer.getSource().getExtent(), { size: this._map.getSize(), maxZoom: this._maxZoom, padding: this._zoomPadding});
        }
    }
    
    zoomToFeature(featureId: string): void {

        this.features.filter((feature: any) => {
            if (feature.getId() === featureId) {
            this._map.getView().fit(feature.getGeometry(), {size:this._map.getSize(), maxZoom: this._maxZoom})
            }
        })
    }
}