import { assetsTechPath } from "./resume-shared-data"

const dbLibs = [
  {
    "name": "SQLAlchemy",
    "url": "https://www.sqlalchemy.org/",
    "icon": "https://www.sqlalchemy.org/img/sqla_logo.png"
  },
  {
    "name": "GeoAlchemy",
    "url": "https://geoalchemy-2.readthedocs.io/en/0.3/orm_tutorial.html",
    "img": "https://geoalchemy-2.readthedocs.io/en/latest/_static/geoalchemy.png"
  },
]


export const pythonBackEndInfo = {
  "title": "Back-end",
  "color": "warning",
  "language": "Python",
  "image": assetsTechPath + "python.avif",
  "libraries": [
    {
      "name": "Starlite",
      "url": "https://github.com/starlite-api/starlite",
      "icon": "https://raw.githubusercontent.com/starlite-api/starlite/000800b1ff2f1fddbd5e2d23f29f1c9709ea5de3/docs/images/SVG/starlite-banner.svg"
    },
    {
      "name": "SQLAlchemy",
      "url": "https://www.sqlalchemy.org/",
      "icon": "https://www.sqlalchemy.org/img/sqla_logo.png"
    },
    {
      "name": "GeoAlchemy",
      "url": "https://geoalchemy-2.readthedocs.io/en/0.3/orm_tutorial.html",
      "icon": "https://geoalchemy-2.readthedocs.io/en/latest/_static/geoalchemy.png"
    },
    {
      "name": "Pandas",
      "url": "https://pandas.pydata.org/docs/getting_started/overview.html",
      "icon": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Pandas_mark.svg/langfr-800px-Pandas_mark.svg.png"
    },
    {
      "name": "GeoPandas",
      "url": "https://geopandas.org/en/stable/",
      "icon": "https://geopandas.org/en/stable/_images/geopandas_icon.png"
    },
  ],
}

export const goBackEndInfo = {
  "title": "Back-end",
  "color": "warning",
  "language": "Golang",
  "image": assetsTechPath + "go.avif",
  "libraries": [
    {
    "name": "Gin gonic",
    "url": "https://github.com/gin-gonic/gin",
    "icon": "https://raw.githubusercontent.com/gin-gonic/logo/master/color.png"
    }
  ],
}

export const frontEndInfo = {
  "title": "Front-end",
  "color": "success",
  "language": "TypeScript",
  "image": assetsTechPath + "ts.avif",
  "libraries": [
    {
      "name": "Angular",
      "url": "https://angular.io/",
      "icon": "https://angular.io/assets/images/logos/angular/angular.svg"
    },
    {
      "name": "Bootstrap",
      "url": "https://getbootstrap.com/",
      "icon": "https://getbootstrap.com/docs/5.2/assets/brand/bootstrap-logo-shadow.png"
    },
    {
      "name": "D3js",
      "url": "https://d3js.org/",
      "icon": "https://raw.githubusercontent.com/d3/d3-logo/master/d3.svg"
    },
    {
      "name": "OpenLayers",
      "url": "https://openlayers.org/",
      "icon": "https://openlayers.org/theme/img/logo-dark.svg"
    }
  ],
}
