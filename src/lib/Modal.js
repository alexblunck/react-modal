import React from 'react'
import PropTypes from 'prop-types'
import PerfectScrollbar from 'perfect-scrollbar'
import Modals from './Modals'
import IconDismiss from './IconDismiss'

export default class Modal extends React.Component {

    constructor(props) {
        super(props)

        this.state = {}

        this.onScrollDown = this.onScrollDown.bind(this)
        this.onScrollToTop = this.onScrollToTop.bind(this)
    }

    componentDidMount() {
        this.contentElem = this.elem.querySelector('.modal-content')

        this.ps = new PerfectScrollbar(this.contentElem, {
            suppressScrollX: true
        })

        this.contentElem.addEventListener('ps-scroll-down', this.onScrollDown)
        this.contentElem.addEventListener('ps-y-reach-start', this.onScrollToTop)
    }

    componentDidUpdate(prevProps) {
        // Update scrollbar / header border if component changes
        if(prevProps.component !== this.props.component) {
            this.ps.update()
            this.onScrollToTop()
        }
    }

    componentWillUnmount() {
        this.ps.destroy()
        this.ps = null
        this.contentElem.removeEventListener('ps-scroll-down', this.onScrollDown)
        this.contentElem.removeEventListener('ps-y-reach-start', this.onScrollToTop)
    }

    render() {
        return (
            <div className='Modal' ref={e => this.elem = e}>
                {this.renderHeader()}

                <div className="modal-content">
                    {this.renderContent()}
                </div>
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

            return <Content />
        }
    }

    /**
     * dismiss modal.
     */
    dismiss() {
        Modals.dismiss()
    }

    /**
     * Handle ps-scroll-down event.
     *
     * @param {Event} event
     */
    onScrollDown (event) {
        this.elem.classList.add('show-header-border')
    }

    /**
     * Handle ps-y-reach-star event.
     *
     * @param {Event} event
     */
    onScrollToTop (event) {
        this.elem.classList.remove('show-header-border')
    }

}

Modal.propTypes = {
    component: PropTypes.any,
    options: PropTypes.object
}
