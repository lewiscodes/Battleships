import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PlayerBoard from './playerBoard';
import ComputerBoard from './computerBoard';
import Title from '../components/title/container'
import { setWidth, initialiseComputerShips } from '../actions/index';

require('./sass/main.scss');

class Main extends Component {

    componentDidMount() {
        window.addEventListener('resize', this.props.setWidth.bind(this));
        this.props.initialiseComputerShips();
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
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ setWidth, initialiseComputerShips }, dispatch)
}

function mapStateToProps(state) {
    return { }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
