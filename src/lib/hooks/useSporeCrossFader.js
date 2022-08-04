import {useEffect, useCallback, useState} from 'react';

export const useSporeCrossFader = (ref) => {
    let [crossFade, _setCrossFade] = useState(0);

    useEffect(() => {
        window.addEventListener("message", onMessage);
        return () => window.removeEventListener("message", onMessage);
    }, [_setCrossFade]);

    const onMessage = useCallback((e) => {
        if (e.data.type === "cross-fade-value") {
            _setCrossFade(e.data.body);
        }
    }, [_setCrossFade]);

    const setCrossFade = useCallback((value) => {
        if (isNaN(value)) {
            return;
        }

        ref.current.contentWindow.postMessage({
            type: "set-cross-fade",
            body: value
        }, "*");
    }, []);

    return {setCrossFade, crossFade};
};
