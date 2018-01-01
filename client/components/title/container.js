import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import cx from 'classnames';

import TitleComponent from './title';

require('./sass/title.scss');

class Title extends Component {
    render () {
        const classes = cx({
            'title': true,
            [`title--${this.props.type}`]: true,
            [`title--style-${this.props.style}`]: this.props.style !== undefined
        });

        return (
            <TitleComponent
                classes={classes}
                {...this.props}
            />
        )
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ }, dispatch)
}

function mapStateToProps(state) {
    return { }
}

export default connect(mapStateToProps, mapDispatchToProps)(Title);