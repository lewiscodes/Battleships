import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PlayerBoard from './playerBoard';
import ComputerBoard from './computerBoard';
import Title from '../components/title/container'
import Deck from '../components/deck/container'
import { setWidth, setBlockSize } from '../actions/meta';
import { initialiseComputerShips, makeGuess } from '../actions/computer';

require('./sass/main.scss');

class Main extends Component {

    componentDidMount() {
        window.addEventListener('resize', this.props.setWidth.bind(this));
        window.addEventListener('resize', this.props.setBlockSize.bind(this));
        // these functions need to be async so they dont fire before the board has finished generating
        this.props.initialiseComputerShips(this.props.computerShips);
        // this needs to move to a different lifecycle event
        this.props.makeGuess(this.props.playerBoard, this.props.playerShips);
    }

    render() {
        return (
            <div className={"main"}>
                <Title text={"Battleships"} type={"header"} />
                <div className={"boardContainer"}>
                    <div className={"player"}>
                        <Title text={"Player"} type={"subheader"} />
                        <PlayerBoard />
                    </div>
                    <div className={"computer"}>
                        <Title text={"Computer"} type={"subheader"} />
                        <ComputerBoard />
                    </div>
                </div>
                <Deck />
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ setWidth, setBlockSize, initialiseComputerShips, makeGuess }, dispatch)
}

function mapStateToProps(state) {
    return { computerShips: state.computer.ships, playerBoard: state.player.board, playerShips: state.player.ships }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
