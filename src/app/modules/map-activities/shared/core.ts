import { educationColor, jobColor, volunteerColor } from "@core/styles/colors";
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

// TODO refactor these color values on app.component...
export const strokeColor = 'white';
const strokeWidth = 2;
const radiusMultiplier = 2;

const jobCircleStyle = new CircleStyle({
  radius: 0,
  fill: new Fill({
    color: jobColor,
  }),
  stroke: new Stroke({
    color: strokeColor,
    width: strokeWidth,
  })
})

const educationCircleStyle = new CircleStyle({
    radius: 0,
    fill: new Fill({
      color: educationColor,
    }),
    stroke: new Stroke({
      color: strokeColor,
      width: strokeWidth,
    })
  })




const volunteerCircleStyle = new CircleStyle({
  radius: 0,
  fill: new Fill({
    color: volunteerColor,
  }),
  stroke: new Stroke({
    color: strokeColor,
    width: strokeWidth,
  })
})

export function activitiesStyle(properties: any): Style {
  let styleBuilt!: CircleStyle;

  if (properties.get('type') === "job") {
    styleBuilt = jobCircleStyle.clone()
  } else if (properties.get('type') === "education") {
    styleBuilt = educationCircleStyle.clone()
  } else {
    styleBuilt = volunteerCircleStyle.clone()
  }

  let radius = properties.get('radius') * radiusMultiplier
  styleBuilt.setRadius(radius)

  return new Style({
    image: styleBuilt
  })
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


const routeStyle = new Style({
  stroke: new Stroke({
    width: travelLineStrokeWidth,
    color: travelLineStrokeColor,
  }),
})

const limitNodeStyle = new Style({
  image: new CircleStyle({
    radius: travelNodeStrokeRadius,
    fill: new Fill({ color: travelNodeColor }),
    stroke: new Stroke({
      color: travelNodeStrokeColor,
      width: travelNodeStrokeWidth,
    }),
  })
})

const movingNodeStyle = new Style({
  image: new CircleStyle({
    radius: travelMovingNodeRadius ,
    fill: new Fill({ color: travelMovingNodeColor }),
    stroke: new Stroke({
      color: travelNodeStrokeColor,
      width: travelMovingNodeWidth,
    }),
  }),
})

export const travelStyles = (featureType: string) => {

  if (featureType === "route") {
    return routeStyle
  } else if (featureType === "limit") {
    return limitNodeStyle
  } else if ( featureType === "movingNode") {
    return movingNodeStyle
  } else {
    return movingNodeStyle
  }
}


export function getFeatureFromLayer(map: any, layerName: string, featureName: string, attribute: string): Feature {
  const layers = map.getLayers().getArray()
  const layersFound = layers.filter((layer: any) => layer.get('name') === layerName)
  const features = layersFound[0].getSource().getFeatures()
  const featuresFound = features.filter((layer: any) => layer.get(attribute) === featureName)
  return featuresFound[0]
}
