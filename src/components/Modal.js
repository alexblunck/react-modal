import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { Modals } from './Modals'
import { ModalHeader } from './ModalHeader'
import { ModalBody } from './ModalBody'

export class Modal extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            headerBorder: false
        }

        this.handleScrollDown = this.handleScrollDown.bind(this)
        this.handleScrollUp = this.handleScrollUp.bind(this)
    }

    componentDidUpdate(prevProps) {
        // Update scrollbar / header border if component changes
        if(prevProps.component !== this.props.component) {
            this.bodyInstance.updateScrollbar()
            this.handleScrollUp()
        }
    }

    /**
     * Handle body scroll down.
     */
    handleScrollDown() {
        this.setState({ headerBorder: true })
    }

    /**
     * Handle body scroll up.
     */
    handleScrollUp() {
        this.setState({ headerBorder: false })
    }

    /**
     * Dismiss modal.
     */
    handleDismiss() {
        Modals.dismiss()
    }

    render() {
        const { width, height, padding, title } = this.props.options
        const style = {}
        const contentStyle = {}

        if (width) {
            style.width = `${width}px`
        }

        if (height) {
            style.maxHeight = `${height}px`
        }

        if (typeof padding === 'number') {
            contentStyle.padding = `${padding/2}px ${padding}px`
        }

        const classes = classNames('Modal', {
            'show-header-border': this.state.headerBorder
        })

        return (
            <div className={classes} style={style} ref={e => this.elem = e}>
                {/* Header */}
                <ModalHeader
                    title={title}
                    toolsRef={e => this.headerTools = e}
                    onDismiss={this.handleDismiss}
                />

                {/* Body */}
                <ModalBody
                    ref={e => this.bodyInstance = e}
                    onScrollUp={this.handleScrollUp}
                    onScrollDown={this.handleScrollDown}
                >
                    {this.renderContentComponent()}
                </ModalBody>
            </div>
        )
    }

    renderContentComponent() {
        if (this.props.component) {
            const ContentComponent = this.props.component
            const props = this.props.options.props

            // Pass reactModal prop to content component
            props.reactModal = {
                headerTools: this.headerTools
            }

            return <ContentComponent {...props} />
        }
    }

}

Modal.propTypes = {
    component: PropTypes.any,
    options: PropTypes.object.isRequired
}
