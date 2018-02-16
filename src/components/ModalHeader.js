import React from 'react'
import PropTypes from 'prop-types'

import IconDismiss from './IconDismiss'

export class ModalHeader extends React.Component {

    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        const { title, onDismiss, toolsRef } = this.props

        return (
            <div className="ModalHeader">
                <div className="tools" ref={toolsRef}></div>

                <div className="title">{title}</div>

                <div className="icon-dismiss" onClick={onDismiss}>
                    <IconDismiss />
                </div>
            </div>
        )
    }

}

ModalHeader.propTypes = {
    children: PropTypes.element,
    title: PropTypes.string,
    onDismiss: PropTypes.func,
    toolsRef: PropTypes.func
}
