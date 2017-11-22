import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Modal from './Modal'

export default class Modals extends React.Component {

    static instance = null;

    static display(component, options = {}) {
        Modals.instance.setState({
            component,
            options,
            visible: true
        })
    }

    static dismiss() {
        Modals.instance.setState({
            visible: false
        })

        // Wait for animation to finish to reset state
    }

    constructor(props) {
        super(props)
        this.state = {
            visible: false,
            component: null
        }
    }

    componentDidMount() {
        Modals.instance = this
    }

    render() {
        const classes = classNames('Modals', {
            'visible': this.state.visible
        })

        return (
            <div className={classes}>
                <Modal component={this.state.component} options={this.state.options} />
            </div>
        )
    }

}

Modals.propTypes = {
    //
}
