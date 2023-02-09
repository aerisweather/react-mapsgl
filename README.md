[<img width="300" alt="MapsGL" src="https://www.aerisweather.com/img/graphics/mapsgl-logo.png">](https://www.aerisweather.com/products/mapsgl/)

# react-mapsgl

**react-mapsgl** is a React wrapper for our [MapsGL service and SDK](https://www.aerisweather.com/products/mapsgl/), a Javascript SDK that allows you to easily customize and integrate a variety of high-quality, vector-based weather data, imagery, and visualizations into your applications and custom solutions.

### Supported Mapping Libraries

MapsGL supports the following third-party mapping libraries:

- [Mapbox](https://docs.mapbox.com/mapbox-gl-js/guides/) (direct or via [react-mapbox-gl](https://github.com/alex3165/react-mapbox-gl))
- [Maplibre](https://maplibre.org/projects/maplibre-gl-js/)
- [Google Maps](https://developers.google.com/maps/documentation/javascript)
- [Leaflet](https://leafletjs.com)

## Getting Started

```bash
yarn add @aerisweather/react-mapsgl
```

### Examples

ES6 with `react-mapbox-gl`:

```typescript
import React, { useState } from 'react';
import ReactMapboxGL from 'react-mapbox-gl';
import * as mapsgl from '@aerisweather/mapsgl';
import ReactMapsGL, { 
    Timeline,
    WeatherLayer,
    DataInspector,
    LegendControl 
} from '@aerisweather/react-mapsgl';

import 'mapbox-gl/dist/mapbox-gl.css';
import '@aerisweather/mapsgl/dist/mapsgl.css';

// Mapbox factory
const Map = ReactMapboxGL({
    accessToken: `MAPBOX_TOKEN`
});

// MapsGL factory
const MapController = ReactMapsGL({
    accessKeys: {
        id: `AERIS_CLIENT_ID`,
        secret: `AERIS_CLIENT_SECRET`
    }
});

interface Props {
    center?: { lat: number; lon: number; };
    zoom?: number;
}

const MapView = ({
    center = { lat: 40, lon: -93 },
    zoom = 3
}: Props): React.ReactElement => {
    const [map, setMap] = useState<any>();
    const [playing, setPlaying] = useState(false);

    // store the Mapbox map reference when loaded so it can be provided to the MapsGL controller
    const onMapLoad = (mapEl: any) => {
        setMap(mapEl);
    };

    return (
        <>
            <Map
                center={[center.lon, center.lat]}
                zoom={[zoom]}
                onStyleLoad={onMapLoad}
                style='mapbox://styles/mapbox/light-v9'
                containerStyle={{
                    width: '800px',
                    height: '600px'
                }}
            >
                <MapController strategy="mapbox" map={map}>
                    <Timeline
                        start={new Date(Date.now() - (3600 * 12 * 1000))}
                        duration={6}
                        isPlaying={playing}
                        onPlay={() => console.log('playing')}
                        onStop={() => console.log('stopped')}
                    />
                    <DataInspector event="move" />
                    <LegendControl />
                    <WeatherLayer id="temperatures" quality={mapsgl.DataQuality.low} paint={{
                        sample: {
                            colorscale: {
                                interval: 1,
                                interpolate: false
                            }
                        }
                    }} />
                    <WeatherLayer id="wind-particles" />
                </MapController>
            </Map>
        </>
    );
};

export default MapView;
```

#### Custom Layers

The following example adds a custom GeoJSON data source and associated layers to the map, similar to the [example from our documentation]().

```typescript
import React, { useState } from 'react';
import ReactMapboxGL from 'react-mapbox-gl';
import * as mapsgl from '@aerisweather/mapsgl';
import ReactMapsGL, { 
    Source,
    Layer 
} from '@aerisweather/react-mapsgl';

import 'mapbox-gl/dist/mapbox-gl.css';
import '@aerisweather/mapsgl/dist/mapsgl.css';

// Mapbox factory
const Map = ReactMapboxGL({
    accessToken: `MAPBOX_TOKEN`
});

// MapsGL factory
const MapController = ReactMapsGL({
    accessKeys: {
        id: `AERIS_CLIENT_ID`,
        secret: `AERIS_CLIENT_SECRET`
    }
});

interface Props {
    center?: { lat: number; lon: number; };
    zoom?: number;
}

const MapView = ({
    center = { lat: 40, lon: -8 },
    zoom = 5
}: Props): React.ReactElement => {
    const [map, setMap] = useState<any>();

    // store the Mapbox map reference when loaded so it can be provided to the MapsGL controller
    const onMapLoad = (mapEl: any) => {
        setMap(mapEl);
    };

    return (
        <>
            <Map
                center={[center.lon, center.lat]}
                zoom={[zoom]}
                onStyleLoad={onMapLoad}
                style='mapbox://styles/mapbox/light-v9'
                containerStyle={{
                    width: '800px',
                    height: '600px'
                }}
            >
                <MapController strategy="mapbox" map={map}>
                    <Source
                        id="country-region"
                        type="geojson"
                        options={{
                            data: {
                                type: 'FeatureCollection',
                                features: [{
                                    type: 'Feature',
                                    properties: {
                                        type: 'Sovereign country',
                                        name: 'Portugal',
                                        continent: 'Europe',
                                        region_un: 'Europe',
                                        subregion: 'Southern Europe',
                                        region_wb: 'Europe & Central Asia'
                                    },
                                    geometry: {
                                        type: 'Polygon',
                                        coordinates: [
                                            [
                                                [-9.034817674180246, 41.88057058365967],
                                                [-8.67194576662672, 42.13468943945496],
                                                [-8.263856980817792, 42.28046865495034],
                                                [-8.013174607769912, 41.790886135417125],
                                                [-7.422512986673795, 41.79207469335983],
                                                [-7.251308966490824, 41.91834605566505],
                                                [-6.668605515967656, 41.883386949219584],
                                                [-6.389087693700915, 41.381815497394655],
                                                [-6.851126674822552, 41.11108266861753],
                                                [-6.864019944679385, 40.33087189387483],
                                                [-7.026413133156595, 40.184524237624245],
                                                [-7.066591559263529, 39.71189158788277],
                                                [-7.498632371439725, 39.62957103124181],
                                                [-7.098036668313128, 39.03007274022378],
                                                [-7.374092169616318, 38.37305858006492],
                                                [-7.029281175148796, 38.07576406508977],
                                                [-7.166507941099865, 37.803894354802225],
                                                [-7.537105475281024, 37.42890432387623],
                                                [-7.453725551778092, 37.09778758396607],
                                                [-7.855613165711985, 36.83826854099627],
                                                [-8.382816127953689, 36.97888011326246],
                                                [-8.898856980820327, 36.86880931248078],
                                                [-8.746101446965554, 37.65134552667661],
                                                [-8.839997524439879, 38.26624339451761],
                                                [-9.287463751655224, 38.3584858261586],
                                                [-9.526570603869715, 38.73742910415491],
                                                [-9.446988898140232, 39.39206614842837],
                                                [-9.048305223008427, 39.75509308527877],
                                                [-8.977353481471681, 40.15930613866581],
                                                [-8.768684047877102, 40.76063894303019],
                                                [-8.79085323733031, 41.18433401139126],
                                                [-8.99078935386757, 41.54345937760364],
                                                [-9.034817674180246, 41.88057058365967]
                                            ]
                                        ]
                                    }
                                }]
                            }
                        }}
                    />
                    <Layer
                        id="region-fill"
                        type="fill"
                        sourceId="country-region"
                        paint={{
                            fill: {
                                color: '#ff0000',
                                opacity: 0.5
                            }
                        }}
                    />
                    <Layer
                        id="region-outline"
                        type="line"
                        sourceId="country-region"
                        paint={{
                            stroke: {
                                color: '#ff0000',
                                thickness: 5
                            }
                        }}
                    />
                </MapController>
            </Map>
        </>
    );
};

export default MapView;
```

### Example Project

For basic examples of how to use React MapsGL with the different third-party mapping libraries currently supported, run the project under the `/examples` directory:

```bash
> cd ./examples
> yarn install
> yarn develop
```

Open the `examples/src/index.ts` file and swap out the rendered component based on your desired mapping library: 

```typescript
import { createRoot } from 'react-dom/client';
import ReactMapboxMap from './ReactMapboxMap';
// import MapboxMap from './MapboxMap';
// import MaplibreMap from './MaplibreMap';
// import GoogleMap from './GoogleMap';
// import LeafletMap from './LeafletMap';

const container = document.querySelector('#app');
const root = createRoot(container!);

root.render(<ReactMapboxMap />);
```

## Usage

Since React MapsGL is written in Typescript, you can refer to the options interface corresponding to each component that's part of the library within the `src/` directory (e.g. `MapControllerOptions`, `DataInspectorControlOptions`, `LegendControlOptions` and `TimelineOptions`) for the list of supported properties and their requirements. 

Also refer to the [MapsGL documentation](https://www.aerisweather.com/docs/mapsgl/) for the complete usage documentation and information regarding working with and using MapsGL.

## MapsGL Resources

Use the following MapsGL resources to learn more about the SDK and the wide range of customization options, or to view a variety of demos and examples:

- [Getting started](https://www.aerisweather.com/docs/mapsgl/getting-started/)
- [MapsGL Documentation](https://www.aerisweather.com/docs/mapsgl/)
- Demos: [Media](https://demos.aerisweather.com/map-app/mapsgl-media/), [Severe](https://demos.aerisweather.com/map-app/mapsgl-severe/)
- [Examples](https://www.aerisweather.com/docs/mapsgl/)

## Support

For issues and feature requests related to this **react-mapsgl** library, please submit a Github issue. 

For all MapsGL-specific support, [submit a new ticket](https://helpdesk.aerisweather.com/) with any questions, bug reports or feature suggestions you have. You can also reach out to us on Twitter at [@AerisWeather](https://twitter.com/AerisWeather).
	