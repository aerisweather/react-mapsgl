import React, { useState } from 'react';
import ReactMap from 'react-map-gl';
import { WeatherLayer } from '@aerisweather/react-mapsgl';
import MapsGL from './MapsGL';
import { MAP_OPTS } from './constants';

import 'mapbox-gl/dist/mapbox-gl.css';

const ReactMapGLMap = (): React.ReactElement => {
    const [map, setMap] = useState<any>();
    const [layer, setLayer] = useState(false);

    return (
        <>
            <button onClick={() => setLayer(!layer)}>Toggle</button>
            <ReactMap
                id="map"
                ref={(ref) => setMap(ref)}
                mapboxAccessToken={`${process.env.MAPBOX_TOKEN}`}
                initialViewState={{
                    longitude: MAP_OPTS.center.lon,
                    latitude: MAP_OPTS.center.lat,
                    zoom: MAP_OPTS.zoom
                }}
                mapStyle='mapbox://styles/mapbox/light-v9'
                style={{
                    width: '800px',
                    height: '600px'
                }}
            >
                <MapsGL strategy="mapbox" map={map?.getMap()}>
                    <WeatherLayer id="wind-speeds" visible={layer} />
                </MapsGL>
            </ReactMap>
        </>
    );
};

export default ReactMapGLMap;
