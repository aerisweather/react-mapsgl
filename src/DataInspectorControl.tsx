import React, { useContext, useEffect, useState } from 'react';
import * as mapsgl from '@aerisweather/mapsgl';
import { MapControllerContext } from './Context';

export interface DataInspectorControlOptions {
    event?: 'click' | 'move';
    enabled?: boolean;
}

const DataInspectorControl = ({ event = 'click', enabled }: DataInspectorControlOptions) => {
    const [control, setControl] = useState<mapsgl.DataInspectorControl>();
    const controller = useContext(MapControllerContext);

    useEffect(() => {
        const el = controller.addDataInspectorControl({ event });
        setControl(el);
        return () => {
            controller.removeDataInspectorControl();
        };
    }, []);

    useEffect(() => {
        if (control) {
            if (enabled) {
                control.enable();
            } else {
                control.disable();
            }
        }
    }, [enabled]);

    return <></>;
};

export default DataInspectorControl;
