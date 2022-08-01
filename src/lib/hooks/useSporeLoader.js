import React, { useRef, useEffect, useCallback, useState} from 'react';

export const useSporeLoader = ({ref, main, alt, juiceSamples, skin}) => {

    const [loaded, setLoaded] = useState(false);
    const [readyForJuice, setReadyForJuice] = useState(false);

    useEffect(() => {
        window.addEventListener("message", onMessage);
        return () => window.removeEventListener("message", onMessage);
    }, [setReadyForJuice, setLoaded]);

    const onMessage = useCallback((e) => {
        switch (e.data) {
        case "Finished Loading Project":
            setLoaded(true);
            return;
        }
        switch (e.data.type) {
        case "waveform-data":
            setReadyForJuice(true);
            return;
        }
    }, [setLoaded, setReadyForJuice]);

    useEffect(() => {
        if (!loaded) {
            return;
        }

        ref.current.contentWindow.postMessage({
            type: "load-tracks",
            body: [main, alt || main]
        }, "*");
    }, [loaded, main, alt]);

    useEffect(() => {
        if (!readyForJuice || !juiceSamples || juiceSamples.length === 0) {
            return;
        }

        ref.current.contentWindow.postMessage({
            type: "juice-samples",
            body: juiceSamples
        }, "*");
    }, [readyForJuice, juiceSamples]);

    useEffect(() => {
        if (!loaded || !skin) {
            return;
        }

        ref.current.contentWindow.postMessage({
            type: "texture-image",
            body: skin
        }, "*");
    }, [loaded, skin]);
};
