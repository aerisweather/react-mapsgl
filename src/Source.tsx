import React, { useContext, useEffect, useRef } from 'react';
import { MapControllerContext } from './Context';

export interface LayerOptions {
    id: string;
    type: string;
    options?: Record<string, any>;
}

const Source = ({
    id, type, options
}: LayerOptions) => {
    const controller = useContext(MapControllerContext);
    const sourceRef = useRef<any>();

    if (!options) return <></>;

    useEffect(() => {
        sourceRef.current = controller.addSource(id, { type, ...options });

        return () => {
            if (sourceRef.current) {
                controller.removeSource(sourceRef.current);
            }
        };
    }, []);

    return <></>;
};

export default Source;
