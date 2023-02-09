import React, { useState } from 'react';
import ReactMapboxGL from 'react-mapbox-gl';
import MapsGL from './MapsGL';
import { MAP_OPTS } from './constants';

import 'mapbox-gl/dist/mapbox-gl.css';

const Map = ReactMapboxGL({
    accessToken: `${process.env.MAPBOX_TOKEN}`
});

const ReactMapboxMap = (): React.ReactElement => {
    const [map, setMap] = useState<any>();

    const onMapLoad = (mapEl: any) => {
        setMap(mapEl);
    };

    return (
        <>
            <Map
                center={[MAP_OPTS.center.lon, MAP_OPTS.center.lat]}
                zoom={[MAP_OPTS.zoom]}
                onStyleLoad={onMapLoad}
                style='mapbox://styles/mapbox/light-v9'
                containerStyle={{
                    width: '800px',
                    height: '600px'
                }}
            >
                <MapsGL strategy="mapbox" map={map} />
            </Map>
        </>
    );
};

export default ReactMapboxMap;
