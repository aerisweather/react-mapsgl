import React, { useContext, useEffect } from 'react';
import { MapControllerContext } from './Context';
import { AnyMapController } from './MapController';

export interface TimelineOptions {
    start?: Date;
    end?: Date;
    duration?: number;
    delay?: number;
    endDelay?: number;
    autoplay?: boolean;
    repeat?: boolean;
    enabled?: boolean;
    isPlaying?: boolean;
    onPlay?: () => void;
    onPause?: () => void;
    onResume?: () => void;
    onStop?: () => void;
    onRestart?: () => void;
    onReset?: () => void;
    onAdvance?: () => void;
    onRangeChange?: () => void;
}

const Timeline = ({
    start,
    end,
    duration,
    delay,
    endDelay,
    autoplay = false,
    repeat = true,
    enabled = true,
    isPlaying = false,
    onPlay = () => {},
    onPause = () => {},
    onResume = () => {},
    onStop = () => {},
    onRestart = () => {},
    onReset = () => {},
    onAdvance = () => {},
    onRangeChange = () => {}
}: TimelineOptions) => {
    const controller = useContext<AnyMapController>(MapControllerContext);
    const timeline = controller.timeline;

    const playIfNeeded = () => {
        if (isPlaying) {
            timeline.play();
        } else {
            timeline.stop();
        }
    };

    useEffect(() => {
        timeline.on('range:change', playIfNeeded);
        timeline.on('play', onPlay);
        timeline.on('stop', onStop);
        timeline.on('pause', onPause);
        timeline.on('resume', onResume);
        timeline.on('restart', onRestart);
        timeline.on('reset', onReset);
        timeline.on('advance', onAdvance);
        timeline.on('range:change', onRangeChange);

        return () => {
            timeline.off('play', onPlay);
            timeline.off('stop', onStop);
            timeline.off('pause', onPause);
            timeline.off('resume', onResume);
            timeline.off('restart', onRestart);
            timeline.off('reset', onReset);
            timeline.off('advance', onAdvance);
            timeline.off('range:change', playIfNeeded);
        };
    }, []);

    useEffect(() => {
        if (start) {
            timeline.startDate = start;
        }
    }, [start]);

    useEffect(() => {
        if (end) {
            timeline.endDate = end;
        }
    }, [end]);

    useEffect(() => {
        if (duration) {
            timeline.duration = duration;
        }
    }, [duration]);

    useEffect(() => {
        if (delay) {
            timeline.delay = delay;
        }
    }, [delay]);

    useEffect(() => {
        if (endDelay) {
            timeline.endDelay = endDelay;
        }
    }, [endDelay]);

    useEffect(() => {
        if (enabled === false) {
            timeline.disable();
        } else {
            timeline.enable();
        }
    }, [enabled]);

    useEffect(() => {
        playIfNeeded();
    }, [isPlaying]);

    return <></>;
};

export default Timeline;
