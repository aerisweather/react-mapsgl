import React, { useState } from 'react';
import ReactMapboxGL from 'react-mapbox-gl';
import * as mapsgl from '@aerisweather/mapsgl';
import ReactMapsGL, { Timeline,
    WeatherLayer,
    DataInspector,
    LegendControl } from '@aerisweather/react-mapsgl';

import 'mapbox-gl/dist/mapbox-gl.css';
import '@aerisweather/mapsgl/dist/mapsgl.css';

// Mapbox factory
const Map = ReactMapboxGL({
    accessToken: `${process.env.MAPBOX_TOKEN}`
});

// MapsGL factory
const MapController = ReactMapsGL({
    accessKeys: {
        id: `${process.env.AERIS_CLIENT_ID}`,
        secret: `${process.env.AERIS_CLIENT_SECRET}`
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
