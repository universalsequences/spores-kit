import {useEffect, useCallback, useState} from 'react';

export const useSporeData = () => {
    let [currentBeat, setCurrentBeat] = useState(0);
    let [playing, setPlaying] = useState(false);
    let [bpm, setBPM] = useState(undefined);
    let [currentStep, setCurrentStep] = useState(undefined);
    let [isStuttering, setIsStuttering] = useState(undefined);
    let [stutterRate, setStutterRate] = useState(undefined);
    let [progress, setProgress] = useState(0);

    useEffect(() => {
        window.addEventListener("message", onMessage);
        return () => window.removeEventListener("message", onMessage); 
    }, [setCurrentBeat, setPlaying, setBPM]);

    const onMessage = useCallback((e) => {
        if (e.data.type === "current-beat") {
            setCurrentBeat(e.data.body);
        }
        if (e.data.type === "jacker-playback-status") {
            setPlaying(e.data.body ? true : false);
        }
        if (e.data.type === "bpm-updated") {
            setBPM(e.data.body);
        }
        if (e.data.type === "current-step") {
            setCurrentStep(e.data.body);
        }
        if (e.data.type === "is-stuttering") {
            setIsStuttering(e.data.body);
        }
        if (e.data.type === "stutter-rate") {
            setStutterRate(e.data.body);
        }
        if (e.data.type === "song-player-progress") {
            setProgress(e.data.body);
        }
    }, [setCurrentBeat, setPlaying, setBPM, setProgress]);

    return {
        currentStep,
        currentBeat,
        playing,
        bpm,
        stutterRate,
        isStuttering,
        progress
    };
};
