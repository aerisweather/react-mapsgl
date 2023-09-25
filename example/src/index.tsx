'use client';

import { createRoot } from 'react-dom/client';
import { useState } from 'react';
import { WeatherLayer } from '@aerisweather/react-mapsgl';
import { ErrorBoundary } from 'react-error-boundary';
import ReactMapboxMap from './ReactMapboxMap';
import ReactMapGLMap from './ReactMapGLMap';
// import MapboxMap from './MapboxMap';
// import MaplibreMap from './MaplibreMap';
import GoogleMap from './GoogleMap';
// import LeafletMap from './LeafletMap';

const container = document.querySelector('#app');
const root = createRoot(container!);

const App = () => {
    const [isHidden, setIsHidden] = useState(false);

    return (
        <>
            <div style={{ marginBottom: '8px' }}>
                <button onClick={() => setIsHidden(!isHidden)}>{isHidden ? 'Show' : 'Hide'} Map</button>
            </div>
            <ErrorBoundary fallback={<div>Something went wrong</div>}>
                {!isHidden && (
                    <ReactMapGLMap />
                )}
            </ErrorBoundary>
        </>
    );
};

root.render(<App />);
