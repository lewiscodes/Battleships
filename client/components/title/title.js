import React, { Component } from 'react'

export default (props) => {
    return (
        <div className={props.classes}>{props.text}</div>
    );
}