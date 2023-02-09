import React, { useContext, useEffect, useState } from 'react';
import * as mapsgl from '@aerisweather/mapsgl';
import { MapControllerContext } from './Context';
import { AnyMapController } from './MapController';

export interface LegendControlOptions {
    metric?: boolean;
    width?: number;
    insets?: number | [number, number, number, number];
    toggleOnClick?: boolean;
}

const LegendControl = ({ metric, width = 300, insets, toggleOnClick = true }: LegendControlOptions) => {
    const [control, setControl] = useState<mapsgl.LegendControl>(); // eslint-disable-line no-unused-vars
    const controller = useContext<AnyMapController>(MapControllerContext);

    if (!controller.container) return <></>;

    useEffect(() => {
        const el = controller.addLegendControl(controller.container, {
            metric,
            width,
            insets,
            toggleOnClick
        });
        setControl(el!);
        return () => {
            controller.removeLegendControl();
        };
    }, []);

    return <></>;
};

export default LegendControl;
