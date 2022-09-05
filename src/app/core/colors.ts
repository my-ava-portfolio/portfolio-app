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