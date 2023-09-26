'use client';

import { createRoot } from 'react-dom/client';
import { useState } from 'react';
import { WeatherLayer } from '@aerisweather/react-mapsgl';
import { ErrorBoundary } from 'react-error-boundary';
import ReactMapboxMap from './ReactMapboxMap';
import ReactMapGLMap from './ReactMapGLMap';
import MapboxMap from './MapboxMap';
import MaplibreMap from './MaplibreMap';
import GoogleMap from './GoogleMap';
import LeafletMap from './LeafletMap';

const container = document.querySelector('#app');
const root = createRoot(container!);

interface AppProps {
    type: 'mapbox' | 'maplibre' | 'google' | 'leaflet' | 'react-map-gl' | 'react-mapbox-gl';
}

const App = ({ type, ...rest }: Partial<AppProps>) => {
    const [isHidden, setIsHidden] = useState(false);

    let MapSlot = MapboxMap;

    switch (type) {
        case 'maplibre': {
            MapSlot = MaplibreMap;
            break;
        }
        case 'google': {
            MapSlot = GoogleMap;
            break;
        }
        case 'leaflet': {
            MapSlot = LeafletMap;
            break;
        }
        case 'react-map-gl': {
            MapSlot = ReactMapGLMap;
            break;
        }
        case 'react-mapbox-gl': {
            MapSlot = ReactMapboxMap;
            break;
        }
        default:
    }

    return (
        <>
            <div style={{ marginBottom: '8px' }}>
                <button onClick={() => setIsHidden(!isHidden)}>{isHidden ? 'Show' : 'Hide'} Map</button>
            </div>
            <ErrorBoundary fallback={<div>Something went wrong</div>}>
                {!isHidden && (
                    <MapSlot />
                )}
            </ErrorBoundary>
        </>
    );
};

root.render(<App type="mapbox" />);
