import React, { Component, Children } from 'react';

class BoxContent extends Component {
    constructor(props){
        super(props);

        this.state = { valid: true, showError: false, errorMsg: ''};

        this.handleValid = this.handleValid.bind(this);
        this.handleNextStep = this.handleNextStep.bind(this);
        this.getErrorMsg = this.getErrorMsg.bind(this);
        this.getValid = this.getValid.bind(this);
    }

    componentWillMount() {
        //need to determine if we are setting the initial state of valid false
        Children.map(this.props.children, (child) => {
            //if any children require validation, set it to false
            if (child.props && child.props.validate) {
                if (child.props.validateMsgs) {
                    //set valid to be an array of false of how many validate msgs
                    let validArr = [];
                    Object.keys(child.props.validateMsgs).map((key) => {
                        let validObj = {};
                        validObj[key] = false;
                        validObj.errorMsg = child.props.validateMsgs[key]; //copy the error message

                        validArr.push(validObj);
                    });

                    this.setState({ valid: validArr});
                } else {
                    this.setState({ valid: false, errorMsg: child.props.errorMsg });
                }
            }
        });
    }

    handleValid(key, value) {
        if (this.state.valid instanceof Array) {
            let validArr = this.state.valid.slice(0);

            validArr.map( (valid) => {
               valid[key] = value;
            });

            let validObj = { valid: validArr };

            if(value) {
                validObj.showError = false;
            }

            this.setState(validObj);
        } else {
            let validObj = { valid: value };

            if(value) {
                validObj.showError = false;
            }

            this.setState(validObj);
        }

        console.log('content is now valid');
    }

    handleNextStep(event) {
        event.preventDefault();

        if (!this.getValid().isValid) {
            this.setState({ showError: true });
        } else {
            //if everything is valid, go to next step
            this.props.onNextClick();
        }
    }

    getValid() {
        let error = { isValid: true};

        if (this.state.valid instanceof Array) {
            let validArr = this.state.valid.slice(0);

            for (let err of validArr) {
                for (let key in err) {
                    if (key !== 'errorMsg') {
                        //parse through valid array until get a valid that is false
                        if (!err[key]) {
                            error.isValid = false;
                            error.errorMsg = err.errorMsg;

                            return error;
                        }
                    }
                }
            }
        } else {
            error.isValid = this.state.valid;
            error.errorMsg = this.state.errorMsg;
        }

        return error;
    }

    processChildren() {
        return Children.map(this.props.children, (child) => {

            if (child.props && child.props.validate) {
                let props = {
                    isValid: this.handleValid,
                    ...child.props
                };

                return <child.type {...props} />;
            } else {
                return child;
            }


        });
    }

    getErrorMsg() {
        let valid = this.getValid();

        if (!valid.isValid) {
            return (
                <div className="help-block">{valid.errorMsg}</div>
            );
        }

        return '';
    }

    render() {
        let id = `collapse${this.props.reactKey}`;
        let classNames = 'panel-collapse collapse ';

        if (this.props.isActive) {
            classNames += 'in';
        }

        let showErrorCss = 'has-error ';

        if (!this.state.showError) {
            showErrorCss += 'hide';
        }

        return (
            <div id={id} className={classNames}>
                <div className="panel-body">
                    <div className="panel-content">
                        {this.processChildren()}
                    </div>
                    {   /*
                        should have an object of the validation groups and error messages, implementing the validation is the reponsbility of the
                        component, the only purpose this serves is to enforce that validation and convey the message
                        */
                    }
                    <div className={showErrorCss}>
                        {this.getErrorMsg()}
                    </div>
                    <a href="#" id="step1-next" className="btn btn-primary" onClick={this.handleNextStep}>NEXT</a>
                </div>
            </div>
        );
    }
}

BoxContent.propTypes = {
    reactKey: React.PropTypes.string,
    isActive: React.PropTypes.bool,
    children: React.PropTypes.node,
    onNextClick: React.PropTypes.func
};

export default BoxContent;
