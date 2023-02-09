import * as mapsgl from '@aerisweather/mapsgl';
import React, { useEffect, useRef, useState } from 'react';
import { MapControllerContext } from './Context';

export type AnyMapType = any;

export type AnyMapController = (
    mapsgl.MapboxMapController |
    mapsgl.MaplibreMapController |
    mapsgl.GoogleMapController |
    mapsgl.LeafletMapController
);

const getMapController = (
    strategy: string,
    map: any,
    account: mapsgl.Account,
    options?: Record<string, any>
): AnyMapController | undefined => {
    switch (strategy) {
        case 'maplibre': {
            return new mapsgl.MaplibreMapController(map, { account, ...options });
        }
        case 'mapbox': {
            return new mapsgl.MapboxMapController(map, { account, ...options });
        }
        case 'google': {
            return new mapsgl.GoogleMapController(map, { account, ...options });
        }
        case 'leaflet': {
            return new mapsgl.LeafletMapController(map, { account, ...options });
        }
        default: {
            return undefined;
        }
    }
};

export type MapStrategyType = 'maplibre' | 'mapbox' | 'google' | 'leaflet';

export interface MapControllerOptions {
    strategy: MapStrategyType;
    map?: any;
    children?: any;
    onLoad?: () => void;
    onResize?: () => void;
    onZoom?: () => void;
    onZoomStart?: () => void;
    onZoomEnd?: () => void;
    onMove?: () => void;
    onMoveStart?: () => void;
    onMoveEnd?: () => void;
    onLoadStart?: () => void;
    onLoadComplete?: () => void;
    onSourceAdd?: () => void;
    onLayerAdd?: () => void;
    onSourceRemove?: () => void;
    onLayerRemove?: () => void;
}

export interface FactoryParameters {
    accessKeys: {
        id: string;
        secret: string;
    };
    options?: Record<string, any>;
}

const MapControllerFactory = ({
    accessKeys,
    options
}: FactoryParameters) => {
    const MapController = ({
        strategy,
        map,
        children,
        onLoad = () => {},
        onResize = () => {},
        onZoom = () => {},
        onZoomStart = () => {},
        onZoomEnd = () => {},
        onMove = () => {},
        onMoveStart = () => {},
        onMoveEnd = () => {},
        onLoadStart = () => {},
        onLoadComplete = () => {},
        onSourceAdd = () => {},
        onLayerAdd = () => {},
        onSourceRemove = () => {},
        onLayerRemove = () => {}
    }: MapControllerOptions): React.ReactElement => {
        const [isInitialized, setIsInitialized] = useState(false);

        const accountRef = useRef<mapsgl.Account>();
        const controllerRef = useRef<AnyMapController>();

        useEffect(() => {
            if (!map || map === controllerRef.current?.map) return;

            const account = new mapsgl.Account(accessKeys.id, accessKeys.secret);
            accountRef.current = account;

            try {
                const controller = getMapController(strategy, map, account, {
                    animation: {
                        repeat: true
                    },
                    ...options
                });
                controllerRef.current = controller;
                controller?.on('load', () => {
                    setIsInitialized(true);
                    onLoad();
                });
                controller?.on('resize', onResize);
                controller?.on('zoom', onZoom);
                controller?.on('zoom:start', onZoomStart);
                controller?.on('zoom:end', onZoomEnd);
                controller?.on('move', onMove);
                controller?.on('move:start', onMoveStart);
                controller?.on('move:end', onMoveEnd);
                controller?.on('load:start', onLoadStart);
                controller?.on('load:complete', onLoadComplete);
                controller?.on('source:add', onSourceAdd);
                controller?.on('layer:add', onLayerAdd);
                controller?.on('source:remove', onSourceRemove);
                controller?.on('layer:remove', onLayerRemove);
                setIsInitialized(true);
            } catch (error) {
                console.error(error);
            }
        }, [map]);

        if (!isInitialized) return <></>;

        return (
            <MapControllerContext.Provider value={controllerRef.current}>
                {children}
            </MapControllerContext.Provider>
        );
    };

    return MapController;
};

export default MapControllerFactory;
