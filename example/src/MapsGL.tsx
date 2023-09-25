import React from 'react';
import * as mapsgl from '@aerisweather/mapsgl';

import ReactMapsGL, { MapStrategyType,
    Timeline,
    WeatherLayer,
    DataInspector,
    LegendControl } from '@aerisweather/react-mapsgl';

import '@aerisweather/mapsgl/dist/mapsgl.css';

const MapController = ReactMapsGL({
    accessKeys: {
        id: `${process.env.AERIS_CLIENT_ID}`,
        secret: `${process.env.AERIS_CLIENT_SECRET}`
    }
});

type Props = {
    strategy: MapStrategyType;
    map: unknown;
    children?: any;
};

const MapsGL = ({
    strategy,
    map,
    children
}: Props): React.ReactElement => (
    <MapController strategy={strategy} map={map}>
        <Timeline
            start={new Date(Date.now() - (3600 * 12 * 1000))}
            duration={6}
            isPlaying={true}
            onPlay={() => console.log('playing')} // eslint-disable-line no-console
            onStop={() => console.log('stopped')} // eslint-disable-line no-console
        />
        <DataInspector event="move" />
        <LegendControl />
        <WeatherLayer id="temperatures" quality={mapsgl.DataQuality.low} paint={{
            sample: {
                colorscale: {
                    interval: mapsgl.units.CtoFUnit(1)
                }
            }
        }} />
        <WeatherLayer id="wind-particles" paint={{
            particle: {
                density: mapsgl.ParticleDensity.normal,
                size: 1
            },
            sample: {
                colorscale: {
                    stops: [
                        0, '#ffffff',
                        1, '#ffffff'
                    ],
                    normalized: true
                }
            }
        }} />
        <WeatherLayer id="alerts-outline" />
        {children}
    </MapController>
);

export default MapsGL;
