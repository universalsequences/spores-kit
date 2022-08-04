import React, { useRef, useEffect } from 'react';
import {useSporeLoader} from '../hooks/useSporeLoader.js';
import {useSporeCrossFader} from '../hooks/useSporeCrossFader.js';
import {SporeControls} from './SporeControls.js';
import styles from './spore-embed.module.css';

const CID = "QmRVUMVcmrfcD6z8mcrFe2a6aod9RHERTdVwtVeCXFeJ3y";
const SPORE_URL = `https://zequencer.mypinata.cloud/ipfs/${CID}?token=26&gallery=true`;

export const SporeEmbed = ({backgroundColor, main, alternate, juiceSamples, skin, className, color="black", crossFade}) => { 
    let ref = useRef();

    useSporeLoader({ref, main, alt: alternate, juiceSamples, skin});

    let {setCrossFade} = useSporeCrossFader(ref);

    useEffect(() => {
        if (crossFade !== undefined) {
            setCrossFade(crossFade);
        }
    }, [crossFade, setCrossFade]);

    return (
        <div className={styles["spore-embed-container"] + " " + className}>
          <iframe
            ref={ref}
            style={{backgroundColor, border: "none", borderRadius: "30px"}}
            className={styles["spore-embed"]}
            src={SPORE_URL}
            width={340}
            height={400}/>
          <SporeControls color={color} playerRef={ref}/>
        </div>);
};
