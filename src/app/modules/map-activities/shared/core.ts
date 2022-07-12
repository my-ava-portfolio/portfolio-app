import Feature from "ol/Feature";
import { Style } from "ol/style";
import CircleStyle from "ol/style/Circle";
import Fill from "ol/style/Fill";
import Stroke from "ol/style/Stroke";


export const activityLayerName = "activities"
export const travelLayerName = "travel"

export const legendActivitiesId = 'legendActivity';
export const sliderBarId = 'slider-bar';
export const travelNodespeed = 100;


export const jobColor = 'rgba(225, 0, 116, 0.6)';
export const educationColor = 'rgba(0, 144, 29, 0.6)';
export const volunteerColor = 'rgba(98, 0, 255, 0.6)';
export const strokeColor = 'white';
const strokeWidth = 2;
const radiusMultiplier = 2;


export function activitiesStyle(properties: any): Style {

  const education = new Style({
    image: new CircleStyle({
      radius: properties.months * radiusMultiplier,
      fill: new Fill({
        color: educationColor,
      }),
      stroke: new Stroke({
        color: strokeColor,
        width: strokeWidth,
      })
    })
  });

  const job = new Style({
    image: new CircleStyle({
      radius: properties.months * radiusMultiplier,
      fill: new Fill({
        color: jobColor,
      }),
      stroke: new Stroke({
        color: strokeColor,
        width: strokeWidth,
      })
    })
  });

  const volunteer = new Style({
    image: new CircleStyle({
      radius: properties.months * radiusMultiplier,
      fill: new Fill({
        color: volunteerColor,
      }),
      stroke: new Stroke({
        color: strokeColor,
        width: strokeWidth,
      })
    })
  })

  if (properties.type === "job") {
    return job
  } else if (properties.type === "education") {
    return education
  } else {
    return volunteer
  }
};


export function activitySelectedStyle(radius: number): Style {
  return new Style({
    image: new CircleStyle({
      radius: radius,
      fill: new Fill({
        color: 'rgba(255, 215, 0, 0.6)',
      }),
      stroke: new Stroke({
        color: 'black',
        width: 2,
      }),
    }),
  })
};


const travelLineStrokeWidth = 4
const travelLineStrokeColor = 'black'

const travelNodeStrokeWidth = 1
const travelNodeStrokeRadius = 2
export const travelNodeStrokeColor = 'black'
const travelNodeColor = 'black'

const travelMovingNodeWidth = 3
export const travelMovingNodeColor = 'yellow'
const travelMovingNodeRadius = 7

export const travelStyles = (featureType: string) => {

  if (featureType === "route") {
    return new Style({
      stroke: new Stroke({
        width: travelLineStrokeWidth,
        color: travelLineStrokeColor,
      }),
    })
  } else if (featureType === "limit") {
    return new Style({
      image: new CircleStyle({
        radius: travelNodeStrokeRadius,
        fill: new Fill({ color: travelNodeColor }),
        stroke: new Stroke({
          color: travelNodeStrokeColor,
          width: travelNodeStrokeWidth,
        }),
      })
    })
  } else {
    return new Style({
      image: new CircleStyle({
        radius: travelMovingNodeRadius ,
        fill: new Fill({ color: travelMovingNodeColor }),
        stroke: new Stroke({
          color: travelNodeStrokeColor,
          width: travelMovingNodeWidth,
        }),
      }),
    })
  }
}


export function getFeatureFromLayer(map: any, layerName: string, featureName: string, attribute: string): Feature {
  const layers = map.getLayers().getArray()
  const layersFound = layers.filter((layer: any) => layer.get('name') === layerName)
  const features = layersFound[0].getSource().getFeatures()
  const featuresFound = features.filter((layer: any) => layer.get(attribute) === featureName)
  return featuresFound[0]
}
