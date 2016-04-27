import React, { Component } from 'react';
import Modal from './shared/modal';

class ChangeStyle extends Component {
    constructor(props){
        super(props);

        this.state = { firstName: '', lastName: '', email: '', password: '' };

        this.customStyles = {
          overlay : {
            backgroundColor   : 'rgba(0, 0, 0, 0.5)'
          },
          content : {
            border                     : '0',
            background                 : 'transparent'
          }
        };

        this.onFirstNameChange = this.onFirstNameChange.bind(this);
        this.onLastNameChange = this.onLastNameChange.bind(this);
        this.onEmailChange = this.onEmailChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);

        this.onSubmit = this.onSubmit.bind(this);
    }

    onFirstNameChange(event) {
        this.setState({ firstName: event.target.value });
    }

    onLastNameChange() {
        this.setState({ lastName: event.target.value });
    }

    onEmailChange() {
        this.setState({ email: event.target.value });
    }

    onPasswordChange() {
        this.setState({ password: event.target.value });
    }

    onSubmit(event) {
        event.preventDefault();

        /*Register({
            'customer[email]': this.state.email,
            'customer[password]': this.state.password,
            'customer[first_name]': this.state.firstName,
            'customer[last_name]': this.state.lastName,
            'form_type': 'create_customer',
            utf8: '✓'
        }).then((result) => {
            console.log(result);
        });*/
    }

    render() {
        return (
            <Modal
              isOpen={this.props.modalIsOpen}
              onRequestClose={this.props.closeModal}
              style={this.customStyles}
              className="Modal__Bootstrap modal-dialog style-modal" ref="modal">
                <div className="modal-content">
                    <div className="modal-header">
                        <button type="button" className="close" data-dismiss="modal" onClick={this.props.closeModal}>×</button>
                        <h4 className="modal-title">Choose A Different Style</h4>
                    </div>
                    <div className="modal-body">
                        <div className="flex-row space-around">
                            <a className="change-style flex-col" data-id="1" data-label="Classic Beauty" href="/pages/welcome-box-classic-beauty">
                                <img className="selected" src="//cdn.shopify.com/s/files/1/0956/5006/t/2/assets/reveal-icon-classic-beauty.png?557292905641376507" />
                                <h4>Classic Beauty</h4>
                            </a>
                            <a className="change-style flex-col" data-id="1" data-label="Bohemian Glam" href="/pages/welcome-box-bohemian-glam">
                                <img className="" src="//cdn.shopify.com/s/files/1/0956/5006/t/2/assets/reveal-icon-bohemian-glam.png?557292905641376507" />
                                <h4>Bohemian Glam</h4>
                            </a>
                            <a className="change-style flex-col" data-id="6" data-label="Uptown Girl" href="/pages/welcome-box-uptown-girl">
                                <img className="" src="//cdn.shopify.com/s/files/1/0956/5006/t/2/assets/reveal-icon-uptown-girl.png?557292905641376507" />
                                <h4>Uptown Girl</h4>
                            </a>
                            <a className="change-style flex-col" data-id="4" data-label="Fun, Flashy, Flirty" href="/pages/welcome-box-fun-flashy-flirty">
                                <img className="" src="//cdn.shopify.com/s/files/1/0956/5006/t/2/assets/reveal-icon-funflashyflirty.png?557292905641376507" />
                                <h4>Fun, Flashy, Flirty</h4>
                            </a>
                            <a className="change-style flex-col" data-id="2" data-label="La Femme Fatal" href="/pages/welcome-box-la-femme-fatale">
                                <img className="" src="//cdn.shopify.com/s/files/1/0956/5006/t/2/assets/reveal-icon-lafemme.png?557292905641376507" />
                                <h4>La Femme Fatal</h4>
                            </a>
                            <a className="change-style flex-col" data-id="3" data-label="Fierce &amp; Fresh" href="/pages/welcome-box-fierce-and-fresh">
                                <img className="" src="//cdn.shopify.com/s/files/1/0956/5006/t/2/assets/reveal-icon-fiercefresh.png?557292905641376507" />
                                <h4>Fierce &amp; Fresh</h4>
                            </a>
                            <a className="change-style flex-col" href="/pages/welcome-box-luxe-box">
                              <img className="" src="//cdn.shopify.com/s/files/1/0956/5006/t/2/assets/reveal-icon-luxebox.png?557292905641376507" />
                              <h4>Luxe Box</h4>
                            </a>
                        </div>
                    </div>
                </div>
            </Modal>
        );
    }
}

ChangeStyle.propTypes = {
    modalIsOpen: React.PropTypes.bool.isRequired,
    onRequestClose: React.PropTypes.func,
    closeModal: React.PropTypes.func.isRequired
};

export default ChangeStyle;
