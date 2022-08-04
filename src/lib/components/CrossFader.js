import React, { useRef, useEffect, useCallback, useState} from 'react';
import styles from './cross-fader.module.css';

export const CrossFader = ({setCrossFade, crossFade}) => { 
    let ref = useRef();
    let [scrubbing, setScrubbing] = useState(false);

    useEffect(() => {
        window.addEventListener('mouseup', clear);
        window.addEventListener('mousemove', onMouseMove);
        return () => {
            window.removeEventListener('mouseup', clear);
            window.removeEventListener('mousemove', onMouseMove);
        };
    }, [setScrubbing, scrubbing, setCrossFade]);

    const clear = useCallback(() => {
        setScrubbing(false);
    }, [setScrubbing]);

    const onMouseMove = useCallback((e) => {
        if (!scrubbing) {
            return;
        }
        let rect = ref.current.getBoundingClientRect();
        let x = e.clientX - rect.left;
        let width = rect.width;
        let nuCross = x / width;
        setCrossFade(Math.max(Math.min(1, nuCross), 0));
    }, [setCrossFade, scrubbing]);

    return (
        <div
          ref={ref} className={styles["cross-fader"]}>
          <div
            onMouseDown={() => setScrubbing(true)}
            style={{left: crossFade*100 + '%'}}
            className={styles["cross-fade-scrubber"]}/>
        </div>);
};

const mapStateToProps = (state, props) => {
  return {
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
  };
};
