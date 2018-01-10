import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { placeShip } from '../actions/player';
import _ from 'lodash';

import Block from '../components/block/container';

require('./sass/playerBoard.scss');

class PlayerBoard extends Component {

    state = {
        currentlyHoveredOverBlock: null
    };

    blockMouseEnter = (blockID) => {
        this.setState({currentlyHoveredOverBlock: blockID});
    };

    blockMouseLeave = (blockID) => {
        this.setState({currentlyHoveredOverBlock: null});
    };

    placeShipAttempt = (selectedBlocks, selectedShip) => {
        if (selectedShip &&selectedBlocks.length === selectedShip.shipLength) {
            this.props.placeShip(selectedShip.Id, selectedBlocks)
        }
    }

    setSelectedBlocksOnHover = (selectedShip) => {
        // this is used to highlight where the player is trying to place the selected ship on the player board.
        let selectedBlocks = [];
        const { currentlyHoveredOverBlock } = this.state;
        if (selectedShip !== undefined && currentlyHoveredOverBlock !== null) {
            for (let x=0; x < selectedShip.shipLength; x++) {
                if (selectedShip.rotation === 'horizontal') {
                    if (currentlyHoveredOverBlock.toString().length === 1) {
                        if (currentlyHoveredOverBlock + x < 10) {
                            // fits on the board
                            selectedBlocks.push(currentlyHoveredOverBlock + x);
                        }
                    } else {
                        if (currentlyHoveredOverBlock.toString().charAt(0) === (currentlyHoveredOverBlock + x).toString().charAt(0)) {
                            // fits on the board
                            selectedBlocks.push(currentlyHoveredOverBlock + x);
                        }
                    };
                } else {
                    if (currentlyHoveredOverBlock + (x * 10) <= 99) {
                        // fits on the board
                        selectedBlocks.push(currentlyHoveredOverBlock + (x * 10));                        
                    }
                }
            };

            // removes block from selectedBlocks if it is already used by another ship.
            for (let x=0; x<selectedBlocks.length; x++ ) {
                const selectedBlock = selectedBlocks[x];
                if (this.props.board[selectedBlock].containsShip) {
                    selectedBlocks.splice(x, 1);
                }
            }

            if (currentlyHoveredOverBlock === null) {
                selectedBlocks = [];
            };
        };

        return selectedBlocks;
    };

    renderBoard = () => {
        let { board } = this.props;
        const selectedShip = _.find(this.props.ships, function(ship) {return ship.selected});
        const selectedBlocks = this.setSelectedBlocksOnHover(selectedShip);
        let isSelectedError = false;
        if (selectedShip && selectedBlocks.length) {
            if (selectedBlocks.length < selectedShip.shipLength) {
                isSelectedError = true;
            }
        }

        return Object.keys(board).map((block) => {
            return (
                <Block
                    {...board[block]}
                    key={board[block].id}
                    type={"player"}
                    blockMouseEnter={this.blockMouseEnter}
                    blockMouseLeave={this.blockMouseLeave}
                    isSelected={_.find(selectedBlocks, function(selectedBlock) {return board[block].id === selectedBlock})}
                    isSelectedError={isSelectedError}
                    placeShipAttempt={() => {this.placeShipAttempt(selectedBlocks, selectedShip)}}
                />
            );
        });
    };

    render() {
        return (
            <div className="PlayerBoard">
                { this.renderBoard() }
            </div>
        );
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ placeShip }, dispatch)
}

function mapStateToProps(state) {
    return { board: state.player.board, ships: state.player.ships }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayerBoard);
