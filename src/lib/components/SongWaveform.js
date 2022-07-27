import React, { memo, useEffect, useCallback, useState} from 'react';
import styles from './waveform.module.css';

window.RATIO = .3;
const HEIGHT = 50;

export const SongWaveform = memo(({progress, waveform, isWaveformRainbow=true, width=330}) => { 

    if (!waveform) {
        return '';
    }

    let parts = [];
    for (let i=0; i < waveform.length - 4; i+=4) {
        let height = Math.pow(waveform[i], window.RATIO)*(4/window.RATIO);
        let p = {
            height,
            y: HEIGHT/2 - height/2,
            r: waveform[i+1],
            g: waveform[i+2],
            b: waveform[i+3]
        };
        parts.push(p);
    }
    progress /= 100;
    return (
        <svg
          width={width}
          height={HEIGHT}
          className={styles["song-waveform"]}>
          {parts.map((part, i) =>
              <rect
                className={progress >= i / parts.length ? styles["elapsed"] : ""}
                x={i*(width/parts.length)}
                y={part.y}
                width={2}
                height={part.height}
              />)}
        </svg>
    );
});

