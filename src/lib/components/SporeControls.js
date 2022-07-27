import {PlayButton} from './PlayButton.js';
import React, { useRef, useEffect, useCallback, useState} from 'react';
import styles from './controls.module.css';
import {SongWaveform} from './SongWaveform.js';

const WIDTH = 330;

export const SporeControls = ({isWaveformRainbow, color, playerRef}) => { 

    let ref = useRef();
    let scrubRef = useRef();
    let [waveform, setWaveform] = useState();
    let [progress, setProgress] = useState(0);
    let [playing, setPlaying] = useState(0);
    let [started, setStarted] = useState(false);
    let [scrubbing, setScrubbing] = useState(false);
    let off = useRef(0);
    let [scrub, setScrub] = useState(undefined);
    

    useEffect(() => {
        window.addEventListener("mouseup", finishScrub);
        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("touchmove", onMouseMove);

        return () => {
            window.removeEventListener("mouseup", finishScrub);
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("touchmove", onMouseMove);
        };
    }, [scrubbing, setScrub, setScrubbing]);

    const finishScrub = useCallback(() => {
        setScrubbing(false);
    }, [setScrubbing]);

    useEffect(() => {
        window.addEventListener("message", onMessage, false);
        return x => window.removeEventListener("message", onMessage, false);
    }, [setProgress, setPlaying, setStarted, setWaveform]);

    const onMessage = useCallback(e => {
        if (e.data.type === "waveform-data") {
            setWaveform(e.data.body);
        }
        if (e.data.type === "song-player-progress") {
            let progress = parseInt(e.data.body);
            setProgress(progress);
        }
        if (e.data.type === "jacker-playback-status") {
            let playing = parseInt(e.data.body);
            setPlaying(playing);
            if (playing) {
                setStarted(true);
            }
        }
    }, [started, setProgress, setPlaying, setStarted, setWaveform]);

    const onPlayClicked = useCallback(() => {
        playerRef.current.contentWindow.postMessage({
            type: "jacker-pause-toggle",
            body: true,
        }, "*");
    }, []);

    const onMouseMove = useCallback((e) => {
        if (!scrubbing) {
            return;
        }
        if (e.touches) {
            e = e.touches[0];
        }

        let rect = ref.current.getBoundingClientRect();
        let x = e.clientX - rect.left;
        let percent = (x / WIDTH) * 100;
        percent = Math.max(0, Math.min(100, percent));
        setScrub(percent);
        playerRef.current.contentWindow.postMessage({
            type: "jacker-seek",
            body: percent
        }, "*");
    }, [scrubbing, setScrub]);

    if (!started) {
        return '';
    }

    let style = {
        borderColor: color
    };

    progress = scrubbing && scrub ? scrub : progress;
    return (
        <div
          onMouseDown={(e) => {
              setScrubbing(true);
              onMouseMove(e);
          }}
          onTouchStart={(e) => {
              setScrubbing(true);
              onMouseMove(e);
          }}
          className={styles["shuffle-buttons"]}>
          <SongWaveform progress={progress} waveform={waveform} isWaveformRainbow={isWaveformRainbow}/>
          <div className={styles["play-and-slider"]}>
          <PlayButton color={color} style={style} isPlaying={playing} play={onPlayClicked}/>
          <div
            ref={ref}
            style={style} className={styles["slider-container"]}>
            <div
              style={{
                  backgroundColor: color,
                  width: WIDTH*(100-progress)/100,
                  left: WIDTH*progress/100}} className={styles["slider-inner"]}/>
            <div
              ref={scrubRef}
              onMouseDown={(e) => {
                  e.stopPropagation();
                  setScrubbing(true);
              }}
              onTouchStart={(e) => {
                  e.stopPropagation();
                  setScrubbing(true);
              }}
              style={{
                  backgroundColor: color,
                  left: WIDTH*progress/100
              }} className={styles["slider-scrubber"]}/>
          </div>
          </div>
        </div>
    );
};

