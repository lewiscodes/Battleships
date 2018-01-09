import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import cx from 'classnames';

import DeckComponent from './deck';
import Block from '../block/container';
import { selectShip, toggleShipRotation } from '../../actions/player';

require('./sass/deck.scss');

class Deck extends Component {

    state = {
        selectedShip: null
    }

    shipClickHandler = (shipIndex) => {
        if (!this.props.ships[shipIndex].placed) {
            this.props.selectShip(shipIndex);
            this.setState({selectedShip: shipIndex});
        }
    }

    renderPlayerShips = () => {
        const { ships } = this.props;
        const playerShips = React.createElement("div", {className: "ships"}, Object.keys(ships).map((shipIndex) => {
            let ship = [];
            for (let x=0; x<ships[shipIndex].shipLength; x++) {
                ship.push(<Block key={shipIndex.toString + x}/>);
            }

            const classes = cx({
                'ship': true,
                'ship--selected': this.props.ships[shipIndex].selected,
                'ship--placed': this.props.ships[shipIndex].placed
            });

            const shipProps = {
                className: classes,
                key: shipIndex,
                onClick: () => {this.shipClickHandler(shipIndex)}
            };

            return React.createElement("div", shipProps, ship);
        }));

        return playerShips;
    };

    render () {
        const classes = cx({
            'deck': true,
            [`deck--style-${this.props.style}`]: this.props.style !== undefined
        });

        const title = "Click on a ship to select it, and place it on the board. Click the rotate button to rotate the ship.";
        const playerShips = this.renderPlayerShips();
        const rotateButtonProps = {
            className: 'rotate',
            onClick: () => {this.props.toggleShipRotation(this.state.selectedShip)}
        };
        const rotateButton = React.createElement('div', rotateButtonProps, 'rotate');

        return (
            <DeckComponent
                classes={classes}
                title={title}
                playerShips={playerShips}
                rotateButton={rotateButton}
                {...this.props}
            />
        )
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ selectShip, toggleShipRotation }, dispatch)
}

function mapStateToProps(state) {
    return { blockSize: state.meta.blockSize, ships: state.player.ships }
}

export default connect(mapStateToProps, mapDispatchToProps)(Deck);