const protocol = 'https'
const domain = ".amaury-valorge.com"
const resumeApiSubdomain = "resume";
const gtfsVierwerApiSubdomain = "gtfs-viewer";
const networkApiSubdomain = "network";

export const environment = {
  production: false,
  resumeApiUrl: protocol + '://' + resumeApiSubdomain + domain + '/api/v1/',
  gtfsViewerApiUrl: protocol + '://' + gtfsVierwerApiSubdomain + domain + '/api/v2/',
  networkApiUrl: protocol + '://' + networkApiSubdomain + domain + '/api/v1/'
};
