import React, { useContext, useEffect, useRef } from 'react';
import { MapControllerContext } from './Context';

export interface LayerOptions {
    id: string;
    type: string;
    source?: Record<string, any>;
    sourceId?: string;
    sourceType?: string;
    sourceLayer?: string;
    paint: Record<string, any>;
}

const Layer = ({
    id, type, source, sourceId, sourceType, sourceLayer, paint
}: LayerOptions) => {
    const controller = useContext(MapControllerContext);
    const sourceRef = useRef<any>();
    const layerRef = useRef<any>();

    if (!source && !sourceId) return <></>;

    useEffect(() => {
        let layerSourceId = sourceId;

        if (source) {
            sourceRef.current = controller.addSource(`${id}-source`, source);
            layerSourceId = `${id}-source`;
        }

        layerRef.current = controller.addLayer(`${id}`, {
            type,
            source: layerSourceId,
            sourceType,
            sourceLayer,
            paint
        });

        return () => {
            if (layerRef.current) {
                controller.removeLayer(layerRef.current.id);
            }

            if (sourceRef.current) {
                controller.removeSource(sourceRef.current.id);
            }
        };
    }, []);

    return <></>;
};

export default Layer;
