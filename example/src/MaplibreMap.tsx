import React, { useEffect, useState } from 'react';
import maplibregl from 'maplibre-gl';
import MapsGL from './MapsGL';
import { MAP_OPTS } from './constants';

const MaplibreMap = (props: any): React.ReactElement => {
    const [map, setMap] = useState<any>();
    const containerRef = React.useRef<any>(null);

    const className = '';
    const containerStyle = {
        width: '800px',
        height: '600px'
    };

    useEffect(() => {
        const mapEl = new maplibregl.Map({
            container: containerRef.current,
            style: `https://api.maptiler.com/maps/streets-v2-light/style.json?key=${process.env.MAPTILER_KEY}`,
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
            <MapsGL strategy="maplibre" map={map} {...props} />
        </div>
    );
};

export default MaplibreMap;
