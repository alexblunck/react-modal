import React from 'react'
import PropTypes from 'prop-types'
import PerfectScrollbar from 'perfect-scrollbar'
import Modals from './Modals'
import IconDismiss from './IconDismiss'

export default class Modal extends React.Component {

    constructor(props) {
        super(props)

        this.state = {}
        this.componentInstance = null

        this.handleButtonClick = this.handleButtonClick.bind(this)
        this.handleScrollDown = this.handleScrollDown.bind(this)
        this.handleScrollUp = this.handleScrollUp.bind(this)
    }

    componentDidMount() {
        this.contentElem = this.elem.querySelector('.react-modal-content')

        this.ps = new PerfectScrollbar(this.contentElem, {
            suppressScrollX: true
        })

        this.contentElem.addEventListener('ps-scroll-down', this.handleScrollDown)
        this.contentElem.addEventListener('ps-y-reach-start', this.handleScrollUp)
    }

    componentDidUpdate(prevProps) {
        // Update scrollbar / header border if component changes
        if(prevProps.component !== this.props.component) {
            this.ps.update()
            this.handleScrollUp()
        }
    }

    componentWillUnmount() {
        this.ps.destroy()
        this.ps = null
        this.contentElem.removeEventListener('ps-scroll-down', this.handleScrollDown)
        this.contentElem.removeEventListener('ps-y-reach-start', this.handleScrollUp)
    }

    /**
     * Handle header button click event.
     */
    handleButtonClick() {
        if (this.componentInstance.handleModalButtonClick) {
            this.componentInstance.handleModalButtonClick.call(this.componentInstance)
        }
    }

    /**
     * Handle ps-scroll-down event.
     */
    handleScrollDown() {
        this.elem.classList.add('show-header-border')
    }

    /**
     * Handle ps-y-reach-star event.
     */
    handleScrollUp() {
        this.elem.classList.remove('show-header-border')
    }

    /**
     * Dismiss modal.
     */
    dismiss() {
        Modals.dismiss()
    }

    render() {
        const { width, height, padding } = this.props.options
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

        return (
            <div className='Modal' style={style} ref={e => this.elem = e}>
                {this.renderHeader()}

                <div className="react-modal-content" style={contentStyle}>
                    {this.renderContent()}
                </div>
            </div>
        )
    }

    renderHeader() {
        if (!this.props.component) {
            return
        }

        const { title, button } = this.props.options

        return (
            <div className="react-modal-header">
                {button && <button onClick={this.handleButtonClick}>{button}</button>}

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
            const props = this.props.options.props

            return <Content {...props} ref={e => this.componentInstance = e} />
        }
    }

}

Modal.propTypes = {
    component: PropTypes.any,
    options: PropTypes.object.isRequired
}
