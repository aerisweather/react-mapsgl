import * as mapsgl from '@aerisweather/mapsgl';
import React, { useContext, useEffect, useState } from 'react';
import { MapControllerContext } from './Context';

export interface WeatherLayerOptions {
    id: string;
    paint?: Partial<mapsgl.PaintStyleSpec>;
    data?: Record<string, any>;
    quality?: mapsgl.DataQuality;
    evaluator?: Partial<mapsgl.DataEvaluator>;
    visible?: boolean;
    enabled?: boolean;
}

const WeatherLayer = ({
    id, data, paint, quality, evaluator, visible = true, enabled = true
}: WeatherLayerOptions) => {
    const [layer, setLayer] = useState<mapsgl.WebGLLayer>();
    const controller = useContext(MapControllerContext);

    useEffect(() => {
        const instance = controller.addWeatherLayer(id, {
            data: {
                ...data,
                quality,
                evaluator
            },
            paint
        });
        setLayer(instance);

        if (!visible) {
            instance.hide();
        }

        return () => {
            controller.removeWeatherLayer(id);
        };
    }, []);

    useEffect(() => {
        if (layer) {
            if (visible) {
                layer.show();
            } else {
                layer.hide();
            }
        }
    }, [visible]);

    useEffect(() => {
        if (layer) {
            layer.enabled = enabled;
        }
    }, [enabled]);

    return <></>;
};

export default WeatherLayer;
