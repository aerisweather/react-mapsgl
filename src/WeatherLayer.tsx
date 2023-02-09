import * as mapsgl from '@aerisweather/mapsgl';
import React, { useContext, useEffect } from 'react';
import { MapControllerContext } from './Context';

export interface WeatherLayerOptions {
    id: string;
    paint?: Partial<mapsgl.PaintStyleSpec>;
    data?: Record<string, any>;
    quality?: mapsgl.DataQuality;
    evaluator?: Partial<mapsgl.DataEvaluator>;
}

const WeatherLayer = ({
    id, data, paint, quality, evaluator
}: WeatherLayerOptions) => {
    const controller = useContext(MapControllerContext);

    useEffect(() => {
        controller.addWeatherLayer(id, {
            data: {
                ...data,
                quality,
                evaluator
            },
            paint
        });
        return () => {
            controller.removeWeatherLayer(id);
        };
    }, []);

    return <></>;
};

export default WeatherLayer;
