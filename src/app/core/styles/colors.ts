// should match with variables.scss

// used by openlayers style (it cannot use scss)
export const jobColor = addAlpha('#e41a1c', 0.8);
export const educationColor = addAlpha('#4daf4a', 0.8);
export const volunteerColor = addAlpha('#984ea3', 0.8);
const projectPersonalColor = addAlpha('#ff7f00', 0.8);



function addAlpha(color: string, opacity: number): string {
    //https://stackoverflow.com/questions/50890241/programmatically-add-opacity-to-a-color-in-typescript
    const opacityValue = Math.round(Math.min(Math.max(opacity || 1, 0), 1) * 255);
    return color + opacityValue.toString(16).toUpperCase();
}

export function getConstract(hexColor: string): 'black' | 'white' {
    const rgbValues: string[] | null = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hexColor)

    if (rgbValues) {
      const red = parseInt(rgbValues[1]);
      const green = parseInt(rgbValues[2]);
      const blue = parseInt(rgbValues[3]);

      const contrastLimit = Math.round((red * 299 + green * 587 + blue * 114) / 1000);

      if (contrastLimit > 125) {
        return 'black';
      } else {
        return 'white';
      }
    }

    return 'white'
}

export function stringToColor(inputText: string, seed: number): string {

  let hash = 0;
  for (let i = 0; i < inputText.length; i++) {
     hash = inputText.charCodeAt(i) + ((hash << seed) - hash);
  }
  let temp_color = (hash & 0x00FFFFFF).toString(16).toUpperCase();

  return "#" + "00000".substring(0, 6 - temp_color.length) + temp_color;

}
