import React, { Component } from 'react'

export default (props) => {
    return (
        <div
            className={props.classes}
            style={props.styles}
            onMouseEnter={props.mouseEnterEventHandler}
            onMouseLeave={props.mouseLeaveEventHandler}
        >{props.text}</div>
    );
}