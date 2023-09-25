import React, { useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import MapsGL from './MapsGL';
import { MAP_OPTS } from './constants';

import 'mapbox-gl/dist/mapbox-gl.css';

const MapboxMap = (props: any): React.ReactElement => {
    const [map, setMap] = useState<any>();
    const containerRef = React.useRef<any>(null);

    const className = '';
    const containerStyle = {
        width: '800px',
        height: '600px'
    };

    useEffect(() => {
        mapboxgl.accessToken = `${process.env.MAPBOX_TOKEN}`;
        const mapEl = new mapboxgl.Map({
            container: containerRef.current,
            style: 'mapbox://styles/mapbox/light-v9',
            center: [MAP_OPTS.center.lon, MAP_OPTS.center.lat],
            zoom: MAP_OPTS.zoom
        });
        setMap(mapEl);
    }, []);

    return (
        <div>
            <div
                ref={containerRef}
                className={className}
                style={{ ...containerStyle }}
            ></div>
            <MapsGL strategy="mapbox" map={map} {...props} />
        </div>
    );
};

export default MapboxMap;
