import React from 'react'
import PropTypes from 'prop-types'
import PerfectScrollbar from 'perfect-scrollbar'

export class ModalBody extends React.Component {

    constructor(props) {
        super(props)

        this.state = {}
    }

    componentDidMount() {
        this.ps = new PerfectScrollbar(this.elem, {
            suppressScrollX: true
        })

        this.elem.addEventListener('ps-scroll-down', this.props.onScrollDown)
        this.elem.addEventListener('ps-y-reach-start', this.props.onScrollUp)
    }

    componentWillUnmount() {
        this.ps.destroy()
        this.ps = null
        this.contentElem.removeEventListener('ps-scroll-down', this.props.onScrollDown)
        this.contentElem.removeEventListener('ps-y-reach-start', this.props.onScrollUp)
    }

    /**
     * Updated perfect scrollbar.
     */
    updateScrollbar() {
        this.ps.update()
    }

    render() {
        return (
            <div className="ModalBody" ref={e => this.elem = e}>
                {this.props.children}
            </div>
        )
    }

}

ModalBody.propTypes = {
    children: PropTypes.element,
    onScrollUp: PropTypes.func.isRequired,
    onScrollDown: PropTypes.func.isRequired
}
