import React from 'react'
import classNames from 'classnames'
import isolatedScroll from 'isolated-scroll'
import Modal from './Modal'

export default class Modals extends React.Component {

    /**
     * Singleton instance.
     *
     * @type {Modals}
     */
    static instance = null;

    /**
     * Display modal.
     *
     * @param {Component} component     - Component to use as modal content
     * @param {Object}    options
     * @param {String}    options.title - Header title
     * @param {Object}    options.props - Props to pass to component
     */
    static display(component, options = {}) {
        Modals.instance.display(component, options)
    }

    /**
     * Dismiss modal.
     */
    static dismiss() {
        Modals.instance.dismiss()
    }

    constructor(props) {
        super(props)

        this.state = {
            animating: false,
            visible: false,
            component: null
        }
    }

    componentDidMount() {
        if (Modals.instance) {
            console.warn('@blunck/react-modal: You can only add a single <Modals /> component')
            return
        }

        Modals.instance = this
    }

    render() {
        const classes = classNames('Modals', {
            'visible': this.state.visible
        })

        return (
            <div className={classes} ref={e => this.elem = e}>
                <div className="overlay" onClick={this.dismiss.bind(this)}></div>
                <Modal component={this.state.component} options={this.state.options} />
            </div>
        )
    }

    /**
     * Display modal.
     *
     * @param {Component} component     - Component to use as modal content
     * @param {Object}    options
     * @param {String}    options.title - Header title
     */
    display(component, options = {}) {
        if (this.state.animating || this.state.visible) {
            return
        }

        options = Object.assign({}, {
            title: null,
            props: {}
        }, options)

        this.isolate(true)

        this.setState({
            component,
            options,
            visible: true,
            animating: true
        })
    }

    /**
     * Dismiss modal.
     */
    dismiss() {
        this.setState({
            visible: false
        })

        // Wait for animation to finish to reset state
        setTimeout(() => {
            this.isolate(false)

            this.setState({
                animating: false,
                component: null,
                options: {}
            })
        }, 400)
    }

    /**
     * Isolate scroll.
     *
     * @param {Boolean} enable
     */
    isolate(enable) {
        if (enable && !this.unbindIsolatedScroll) {
            this.unbindIsolatedScroll = isolatedScroll(this.elem)
        } else if(!enable && this.unbindIsolatedScroll) {
            this.unbindIsolatedScroll()
            this.unbindIsolatedScroll = null
        }
    }

}
