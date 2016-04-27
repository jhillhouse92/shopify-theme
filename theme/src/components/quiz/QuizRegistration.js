import React, { Component } from 'react';
import Modal from '../shared/modal';
import { Register } from '../../actions/index';

class QuizRegistration extends Component {
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
              className="Modal__Bootstrap modal-dialog registration-modal" ref="modal">
                <div className="modal-content">
                    <div className="modal-header">
                        <button type="button" className="close" data-dismiss="modal">×</button>
                    </div>
                    <div className="modal-body">
                        <section className="reveal__create-profile">
                            <div className="container">
                                <h6>Create your profile to view your quiz results</h6>
                                <div className="col-md-8">
                                    <form method="post" action="https://vavavoo-2.myshopify.com/account" id="create_ajax_customer">
                                        <input type="hidden" value="create_customer" name="form_type" />
                                        <div className="row">
                                            <div className="col-md-5 col-sm-12">
                                                <input type="text" name="customer[first_name]" placeholder="First Name"
                                                value={this.state.firstName} onChange={this.onFirstNameChange}/>
                                            </div>
                                            <div className="col-md-5 col-sm-12">
                                                <input type="text" name="customer[last_name]" placeholder="Last Name"
                                                value={this.state.lastName} onChange={this.onLastNameChange} />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-5 col-sm-12">
                                                <input type="text" name="customer[email]" placeholder="Email"
                                                value={this.state.email} onChange={this.onEmailChange} />
                                            </div>
                                            <div className="col-md-5 col-sm-12">
                                                <input type="password" id="customer_pwd" name="customer[password]" placeholder="Password"
                                                value={this.state.password} onChange={this.onPasswordChange}/>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-5 col-sm-12">
                                                <input type="password" id="customer_password_confirm" name="customer_password_confirm" placeholder="Retype Password" />
                                            </div>
                                            <div className="col-md-5 col-sm-12 text-right">
                                                <button type="submit">SUBMIT</button>
                                            </div>
                                        </div>

                                        <input type="hidden" name="customer[note][subscribe]" id="selected_style_input" />
                                        <input type="hidden" name="return_to" id="frm_return_to" value="/pages/welcome-box-classic-beauty" />
                                        <input type="hidden" name="checkout_url" id="frm_checkout_url" value="/pages/welcome-box-classic-beauty" />

                                    </form>
                                </div>
                                <div className="col-md-4 signin-buttons">
                                    <form method="post" action="https://vavavoo-2.myshopify.com/account" id="create_customer">
                                        <input type="hidden" name="checkout_url" value="https://vavavoo-2.myshopify.com/pages/welcome-box-classic-beauty"/>
                                        { /* social login will go here because it has the acceptCharset which is the official liquid create-customer form */ }
                                    </form>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </Modal>
        );
    }
}

QuizRegistration.propTypes = {
    modalIsOpen: React.PropTypes.bool.isRequired,
    onRequestClose: React.PropTypes.func,
    closeModal: React.PropTypes.func.isRequired
};

export default QuizRegistration;
