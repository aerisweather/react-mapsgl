import { createRoot } from 'react-dom/client';
// import ReactMapboxMap from './ReactMapboxMap';
import ReactMapGLMap from './ReactMapGLMap';
// import MapboxMap from './MapboxMap';
// import MaplibreMap from './MaplibreMap';
// import GoogleMap from './GoogleMap';
// import LeafletMap from './LeafletMap';

const container = document.querySelector('#app');
const root = createRoot(container!);

root.render(<ReactMapGLMap />);
