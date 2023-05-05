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



export const dataProcessingInfo = {
  "title": "Pre-processing",
  "color": "dark",
  "language": "Python 3.11",
  "language_icon": "https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg",
  "framework": null,
  "libs": [
    ...dbLibs,
    {
      "name": "Pandas",
      "url": "https://pandas.pydata.org/docs/getting_started/overview.html",
      "icon": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Pandas_logo.svg/300px-Pandas_logo.svg.png"
    },
    {
      "name": "GeoPandas",
      "url": "https://geopandas.org/en/stable/",
      "icon": "https://geopandas.org/en/stable/_static/geopandas_logo_web.svg"
    },
    {
      "name": "psycopg2",
      "url": "https://www.psycopg.org/",
      "img": "https://www.psycopg.org/img/logo/psycopg-100.png"
    }
  ]
}

export const backEndInfo = {
  "title": "Back-end",
  "color": "danger",
  "language": "Python 3.11",
  "language_icon": "https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg",
  "framework": [
    {
    "name": "Starlite",
    "url": "https://github.com/starlite-api/starlite",
    "icon": "https://raw.githubusercontent.com/starlite-api/starlite/000800b1ff2f1fddbd5e2d23f29f1c9709ea5de3/docs/images/SVG/starlite-banner.svg"
    }
  ],
  "libs": [
    ...dbLibs,
    {
      "name": "BeautifulSoup4",
      "url": "https://www.crummy.com/software/BeautifulSoup/bs4/doc/#",
      "icon": null
    }
  ]
}

export const frontEndInfo = {
  "title": "Front-end",
  "color": "success",
  "language": "TypeScript",
  "language_icon": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/220px-Typescript_logo_2020.svg.png",
  "framework": [
    {
    "name": "Angular",
    "url": "https://angular.io/",
    "img": "https://angular.io/assets/images/logos/angular/angular.svg"
    }
  ],
  "libs": [
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
  ]
}
