import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { playerMakeGuess } from '../actions/player'
import Block from '../components/block/container';

require('./sass/computerBoard.scss');

class ComputerBoard extends Component {
    guessAttempt = (blockId) => {
        if (!this.props.board[blockId].targeted) {
            if (this.props.meta.currentTurn === 'player') {
                this.props.playerMakeGuess(blockId, this.props.board[blockId].containsShip);
            }
        }
    }

    renderBoard = () => {
        let { board } = this.props;

        return Object.keys(board).map((block) => {
            return <Block {...board[block]} key={board[block].id} id={board[block].id} hoverable={this.props.meta.currentTurn === 'player'} type={"computer"} playerGuessAttempt={(blockId) => {this.guessAttempt(blockId)}} />;
        });
    }

    render() {
        return (
            <div className="ComputerBoard">
                { this.renderBoard() }
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ playerMakeGuess }, dispatch)
}

function mapStateToProps(state) {
    return { board: state.computer.board, meta: state.meta }
}

export default connect(mapStateToProps, mapDispatchToProps)(ComputerBoard);
