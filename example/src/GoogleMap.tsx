import React, { useEffect, useState } from 'react';
import { Loader } from 'google-maps';
import MapsGL from './MapsGL';
import { MAP_OPTS } from './constants';

const GoogleMap = (props: any): React.ReactElement => {
    const [map, setMap] = useState<any>();
    const containerRef = React.useRef<any>(null);

    const className = '';
    const containerStyle = {
        width: '800px',
        height: '600px'
    };

    useEffect(() => {
        const loader = new Loader(`${process.env.GOOGLE_KEY}`);
        loader.load().then((google) => {
            const mapEl = new google.maps.Map(containerRef.current, {
                center: { lat: MAP_OPTS.center.lat, lng: MAP_OPTS.center.lon },
                zoom: MAP_OPTS.zoom,
                mapId: `${process.env.GOOGLE_MAP_ID}`
            });
            setMap(mapEl);
        });
    }, []);

    return (
        <div>
            <div
                ref={containerRef}
                className={className}
                style={{ ...containerStyle }}
            ></div>
            <MapsGL strategy="google" map={map} {...props} />
        </div>
    );
};

export default GoogleMap;
