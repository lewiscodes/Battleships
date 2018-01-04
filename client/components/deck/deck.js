import React, { Component } from 'react'

export default (props) => {
    return (
        <div>
            <h2>{props.title}</h2>
            {props.playerShips}
        </div>
    );
}