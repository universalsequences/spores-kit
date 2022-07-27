import React, { Component, useCallback } from 'react';
import styles from './button.module.css';

export const PlayButton = (props) => {
    const onPlayClicked = useCallback((e) => {
        e.stopPropagation();
        e.target.parentNode.blur();
        e.target.blur();
        e.currentTarget.blur();
        props.play();
    }, [props.isPlaying]);

    return (
        <div
          style={props.style || {}}
          onClick={onPlayClicked}
          onMouseDown={(e) => e.stopPropagation()}
          onTouchStart={(e) => e.stopPropagation()}
          className={styles["play-btn-wrapper"]}>
          <div
            style={{
                borderColor: props.isPlaying ? props.color: "transparent transparent transparent " + props.color,
            }}
            className={props.isPlaying ? styles["play-btn"] + " " + styles["playing"] : styles["play-btn"]}/>
        </div>
    );
}


