import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Block from '../components/block/container';

require('./sass/playerBoard.scss');

class PlayerBoard extends Component {
    renderBoard = () => {
        let { board } = this.props;
        
        return Object.keys(board).map((block) => {
            return <Block {...board[block]} key={board[block].id} type={"player"} />;
        })
    }

    render() {
        return (
            <div className="PlayerBoard">
                { this.renderBoard() }
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({  }, dispatch)
}

function mapStateToProps(state) {
    return { board: state.player.board }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayerBoard);
