
export const currentYear: number = new Date().getFullYear();
export const currentDate = now();


function now(): Date {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  return date
}


export function chunkArray(array: any[], size: number) {
  var outputArray = [];
  for(var i = 0; i < array.length; i += size) {
    outputArray.push(array.slice(i, i+size));
  }
  return outputArray;
}

