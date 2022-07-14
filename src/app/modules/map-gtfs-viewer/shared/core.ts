import { TrainingsBarComponent } from '@modules/education/trainings-bar/trainings-bar.component';
import { faExpand, faTags, faMapMarkerAlt, faStepBackward, faStepForward } from '@fortawesome/free-solid-svg-icons';
import Feature from "ol/Feature";
import { Style } from "ol/style";
import CircleStyle from "ol/style/Circle";
import Fill from "ol/style/Fill";
import Stroke from "ol/style/Stroke";


export const backwardIcon = faStepBackward;
export const forwardIcon = faStepForward;
export const locationIcon = faMapMarkerAlt;
export const centerIcon = faExpand;
export const tagsIcon = faTags;

export const currentDate = now();

function now(): Date {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  return date
}


export const gtfsLayerName = "gtfs"

export const trainColor = 'rgb(255, 0, 0)';
export const tramColor = 'rgb(153, 76, 0)';
export const metroColor = 'rgb(102, 178, 255)';
export const strokeColor = 'white';
export const strokeWidth = 2;
export const circleRadius = 4;

const trainStyle = new Style({
  image: new CircleStyle({
    radius: circleRadius,
    fill: new Fill({
      color: trainColor,
    }),
    stroke: new Stroke({
      color: strokeColor,
      width: strokeWidth,
    })
  })
});

const tramStyle = new Style({
  image: new CircleStyle({
    radius: circleRadius,
    fill: new Fill({
      color: tramColor,
    }),
    stroke: new Stroke({
      color: strokeColor,
      width: strokeWidth,
    })
  })
});

const metroStyle = new Style({
  image: new CircleStyle({
    radius: circleRadius,
    fill: new Fill({
      color: metroColor,
    }),
    stroke: new Stroke({
      color: strokeColor,
      width: strokeWidth,
    })
  })
})

const defaultStyle = new Style({
  image: new CircleStyle({
    radius: circleRadius,
    fill: new Fill({
      color: "black",
    }),
    stroke: new Stroke({
      color: strokeColor,
      width: strokeWidth,
    })
  })
})



export function gtfsStyle(feature: any): Style {
  if (feature.get('route_type') === "0") {
    return tramStyle
  } else if (feature.get('route_type') === "1") {
    return metroStyle
  } else if (feature.get('route_type') === "2") {
    return trainStyle
  } else {
    return defaultStyle
  }
};
