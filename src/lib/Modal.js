import React from 'react'
import PropTypes from 'prop-types'
import Modals from './Modals'
import IconDismiss from './IconDismiss'

export default class Modal extends React.Component {

    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <div className="Modal">
                {this.renderHeader()}
                {this.renderContent()}
            </div>
        )
    }

    renderHeader() {
        if (!this.props.component) {
            return
        }

        const { title } = this.props.options

        return (
            <div className="modal-header">
                <div className="title">{title}</div>

                <div className="icon-dismiss" onClick={this.dismiss}>
                    <IconDismiss />
                </div>
            </div>
        )
    }

    renderContent() {
        if (this.props.component) {
            const Content = this.props.component

            return (
                <div className="modal-content">
                    <Content />
                </div>
            )
        }
    }

    dismiss() {
        Modals.dismiss()
    }

}

Modal.propTypes = {
    component: PropTypes.any,
    options: PropTypes.object
}
