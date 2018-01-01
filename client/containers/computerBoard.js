import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Block from '../components/block/container';

require('./sass/computerBoard.scss');

class ComputerBoard extends Component {
    renderBoard = () => {
        let { board } = this.props;

        return Object.keys(board).map((block) => {
            return <Block {...board[block]} key={board[block].id} type={"computer"} />;
        })
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
    return bindActionCreators({  }, dispatch)
}

function mapStateToProps(state) {
    return { board: state.computer.board }
}

export default connect(mapStateToProps, mapDispatchToProps)(ComputerBoard);
