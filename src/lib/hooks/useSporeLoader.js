import React, { useRef, useEffect, useCallback, useState} from 'react';

export const useSporeLoader = ({ref, main, alt}) => {

    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        window.addEventListener("message", onMessage);
        return () => window.removeEventListener("message", onMessage);
    }, []);

    const onMessage = useCallback((e) => {
        switch (e.data) {
        case "Finished Loading Project":
            setLoaded(true);
            return;
        }
    }, []);

    useEffect(() => {
        if (!loaded) {
            return;
        }

        ref.current.contentWindow.postMessage({
            type: "load-tracks",
            body: [main, alt || main]
        }, "*");
    }, [loaded, main, alt]);

};
