import React, { Component } from 'react';

class Modal extends Component {
    constructor(props){
        super(props);

        this.customStyles = {
          overlay : {
            backgroundColor   : 'rgba(0, 0, 0, 0.5)'
          },
          content : {
            border                     : '0',
            background                 : 'transparent'
          }
        };

        this.state = { isOpen: false, afterOpen: false, beforeClose: false};
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        this.closeWithTimeout = this.closeWithTimeout.bind(this);
        this.closeWithoutTimeout = this.closeWithoutTimeout.bind(this);
        this.handleOverlayClick = this.handleOverlayClick.bind(this);
        this.focusContent = this.focusContent.bind(this);
        this.requestClose = this.requestClose.bind(this);
        this.ownerHandlesClose = this.ownerHandlesClose.bind(this);
        this.shouldBeClosed = this.shouldBeClosed.bind(this);

    }

    componentDidMount() {
        if (this.props.isOpen) {
            this.open();
        }
    }

    componentWillReceiveProps(newProps) {
        // Focus only needs to be set once when the modal is being opened
        if (!this.props.isOpen && newProps.isOpen) {
          this.open();
        } else if (this.props.isOpen && !newProps.isOpen) {
          this.close();
        }
    }

    close() {
        if (!this.ownerHandlesClose()) {
            return;
        }

        if (this.props.closeTimeoutMS > 0) {
            this.closeWithTimeout();
        }

        else {
            this.closeWithoutTimeout();
        }
    }

    closeWithTimeout() {
        this.setState({beforeClose: true}, function() {
            this.closeTimer = setTimeout(this.closeWithoutTimeout, this.props.closeTimeoutMS);
        }.bind(this));
    }

    closeWithoutTimeout() {
        this.setState({
            isOpen: false,
            afterOpen: false,
            beforeClose: false
        });
    }

    handleOverlayClick(event) {
        var node = event.target;

        while (node) {
            if (node === this.refs.content) {
                return;
            }

            node = node.parentNode;
        }

        if (this.props.shouldCloseOnOverlayClick) {
            if (this.ownerHandlesClose()) {
                this.requestClose();
            }
            else {
                this.focusContent();
            }
        }
    }

    focusContent() {
        this.refs.content.focus();
    }

    requestClose() {
        if (this.ownerHandlesClose()) {
            this.props.onRequestClose();
        }
    }

    ownerHandlesClose() {
        return this.props.onRequestClose;
    }

    shouldBeClosed() {
        return !this.props.isOpen && !this.state.beforeClose;
    }

    open() {
        this.setState({isOpen: true}, function() {
          setTimeout( () => this.setState({afterOpen: true}), 500);
        }.bind(this));
    }

    render() {
        let modalOverlayStyle = {
            position: 'fixed',
            top: '0px',
            left: '0px',
            right: '0px',
            bottom: '0px',
            backgroundColor: 'rgba(0, 0, 0, 0.5)'
        };

        let modalContentStyle = {
            position: 'fixed',
            top: '134px', //there is an additional 94px offset for the fixed menu
            left: '40px',
            right: '40px',
            border: '0px',
            background: 'transparent',
            overflow: 'auto',
            overflowScrolling: 'touch',
            outline: 'none',
            padding: '20px'
        };

        let modalClasses = '';

        modalClasses += (this.state.isOpen) ? 'ReactModal__Overlay' : '';

        modalClasses += (this.state.afterOpen) ? ' ReactModal__Overlay--after-open' : '';

        modalClasses += (this.state.beforeClose) ? ' ReactModal__Overlay--before-close' : '';

        let modalContentClasses = this.props.className;

        modalContentClasses += (this.state.isOpen) ? ' ReactModal__Content' : '';

        modalContentClasses += (this.state.afterOpen) ? ' ReactModal__Content--after-open' : '';

        modalContentClasses += (this.state.beforeClose) ? ' ReactModal__Content--before-close' : '';

        return (
            <div className={this.state.isOpen ? '' : 'hide ' + 'ReactModalPortal'}>
                <div className={modalClasses} style={modalOverlayStyle} onClick={this.handleOverlayClick}>
                    <div style={modalContentStyle} className={modalContentClasses} tabIndex="-1" ref="content">
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
}

Modal.propTypes = {
    className: React.PropTypes.string,
    isOpen: React.PropTypes.bool,
    children: React.PropTypes.element,
    closeTimeoutMS: React.PropTypes.number,
    shouldCloseOnOverlayClick: React.PropTypes.bool,
    onRequestClose: React.PropTypes.func
};

Modal.defaultProps = {
    shouldCloseOnOverlayClick: true
};

export default Modal;
