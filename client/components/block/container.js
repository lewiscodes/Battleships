// CODE CLEANUP
// 'block--containsShip': this.props.containsShip && this.props.type === "computer"
// const textToDisplay = this.props.containsShip ? this.props.shipID : null;
// these can be removed on completion, they are just so i can see where the computers ships are located during development.

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import cx from 'classnames';
import { setBlockSize } from '../../actions/meta';
import BlockComponent from './block';

require('./sass/block.scss');

class Block extends Component {

    state = {
        hovering: false
    }

    mouseEnterEventHandler = () => {
        this.setState({hovering: true})
    }

    mouseLeaveEventHandler = () => {
        this.setState({hovering: false})
    }

    render () {
        const classes = cx({
            'block': true,
            [`block--style-${this.props.style}`]: this.props.style !== undefined,
            'block--hover': this.state.hovering && this.props.type === "computer",
            'block--containsShip': this.props.containsShip && this.props.type === "computer"
        });

        const styles = { width: this.props.blockSize, height: this.props.blockSize}
        const textToDisplay = this.props.containsShip ? this.props.shipID : null;

        return (
            <BlockComponent
                classes={classes}
                styles={styles}
                mouseEnterEventHandler={this.mouseEnterEventHandler}
                mouseLeaveEventHandler={this.mouseLeaveEventHandler}
                text={textToDisplay}
                {...this.props}
            />
        )
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ setBlockSize }, dispatch)
}

function mapStateToProps(state) {
    return { width: state.meta.width, blockSize: state.meta.blockSize }
}

export default connect(mapStateToProps, mapDispatchToProps)(Block);