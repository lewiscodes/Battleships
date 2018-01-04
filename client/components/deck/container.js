import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import cx from 'classnames';

import DeckComponent from './deck';
import Block from '../block/container';

require('./sass/deck.scss');

class Deck extends Component {

    renderPlayerShips = () => {
        const { ships } = this.props;
        // let playerShips = [];
        const playerShips = React.createElement("div", Object.keys(ships).map((shipIndex) => {
            let ship = [];
            for (let x=0; x<ships[shipIndex].shipLength; x++) {
                ship.push(<Block key={shipIndex.toString + x}/>);
            }

            // playerShips.push(React.createElement("div", ship));
            return React.createElement("div", ship)
        }))

        return playerShips;
    };

    render () {
        const classes = cx({
            'deck': true,
            [`deck--style-${this.props.style}`]: this.props.style !== undefined
        });

        const title = "Click on a ship to select it, and place it on the board. Click the rotate button to rotate the ship.";
        const playerShips = this.renderPlayerShips();

        return (
            <DeckComponent
                classes={classes}
                title={title}
                playerShips={playerShips}
                {...this.props}
            />
        )
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ }, dispatch)
}

function mapStateToProps(state) {
    return { blockSize: state.meta.blockSize, ships: state.player.ships }
}

export default connect(mapStateToProps, mapDispatchToProps)(Deck);