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

const MapsGL = ({ strategy, map }: { strategy: MapStrategyType; map: unknown; }): React.ReactElement => (
    <MapController strategy={strategy} map={map}>
        <Timeline
            start={new Date(Date.now() - (3600 * 12 * 1000))}
            duration={6}
            isPlaying={true}
            onPlay={() => console.log('playing')}
            onStop={() => console.log('stopped')}
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
    </MapController>
);

export default MapsGL;
