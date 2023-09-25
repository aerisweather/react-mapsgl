import React, { useEffect, useState } from 'react';
import * as L from 'leaflet';
import MapsGL from './MapsGL';
import { MAP_OPTS } from './constants';

import 'leaflet/dist/leaflet.css';

const LeafletMap = (props: any): React.ReactElement => {
    const [map, setMap] = useState<any>();
    const containerRef = React.useRef<HTMLDivElement>(null);

    const className = '';
    const containerStyle = {
        width: '800px',
        height: '600px'
    };

    useEffect(() => {
        const target = containerRef.current as HTMLDivElement;
        // eslint-disable-next-line unicorn/no-array-callback-reference
        const mapEl = L.map(target).setView([MAP_OPTS.center.lat, MAP_OPTS.center.lon], MAP_OPTS.zoom);
        const leafletBase = L.tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        });
        leafletBase.addTo(mapEl);
        setMap(mapEl);
    }, []);

    return (
        <div>
            <div
                ref={containerRef}
                className={className}
                style={{ ...containerStyle }}
            ></div>
            <MapsGL strategy="leaflet" map={map} {...props} />
        </div>
    );
};

export default LeafletMap;
