import React, { useRef, useEffect, useCallback, useState} from 'react';
import {useSporeLoader} from '../hooks/useSporeLoader.js';
import {SporeControls} from './SporeControls.js';
import styles from './spore-embed.module.css';

const CID = "Qmct5dRh4EUQWMpWQYdD2DcU99MZPtsqAU1EVpWrDYKsFa";
const SPORE_URL = `https://zequencer.mypinata.cloud/ipfs/${CID}?token=26&gallery=true`;

export const SporeEmbed = ({main, alternate, className, color="black"}) => { 
    let ref = useRef();

    useSporeLoader({ref, main, alt: alternate});

    return (
        <div className={styles["spore-embed-container"]}>
          <iframe
            ref={ref}
            style={{border: "none", borderRadius: "30px"}}
            className={styles["spore-embed"]}
            src={SPORE_URL}
            width={340}
            height={400}/>
          <SporeControls color={color} playerRef={ref}/>
        </div>);
};
