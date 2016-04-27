import React, { Component } from 'react';

class LuxeSubscriptionPlan extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <div id="lux-plan" className={this.props.className}>
                <h5 className="subscription-choice-title">Pick  your plan</h5>
                <div className="choice">
                    <input type="radio" name="subscription" value="1" id="sub_l_1" checked={this.props.subscriptionPlan === 5} />
                    <label className="lbl-plan" htmlFor="sub_l_1" onClick={this.props.setPlan.bind(undefined, 5)}>
                        <strong>Monthly</strong> $65/month
                    </label>
                </div>
                <div className="choice">
                    <input type="radio" name="subscription" value="2" id="sub_l_2" checked={this.props.subscriptionPlan === 6} />
                    <label className="lbl-plan" htmlFor="sub_l_2" onClick={this.props.setPlan.bind(undefined, 6)}>
                        <strong>3 month</strong> $195
                    </label>
                </div>
                <div className="choice">
                    <input type="radio" name="subscription" value="3" id="sub_l_3" checked={this.props.subscriptionPlan === 7} />
                    <label className="lbl-plan" htmlFor="sub_l_3" onClick={this.props.setPlan.bind(undefined, 7)}>
                        <strong>6 month</strong> $369 (save $21!)
                    </label>
                </div>
                <div className="choice">
                    <input type="radio" name="subscription" value="4" id="sub_l_4" checked={this.props.subscriptionPlan === 8} />
                    <label className="lbl-plan" htmlFor="sub_l_4" onClick={this.props.setPlan.bind(undefined, 8)}>
                        <strong>Yearly</strong> $708 (save $72! That's 1 month free!)
                   </label>
                </div>
            </div>
        );
    }
}

LuxeSubscriptionPlan.propTypes = {
    className: React.PropTypes.string,
    subscriptionPlan: React.PropTypes.number.isRequired,
    setPlan: React.PropTypes.func.isRequired
};

export default LuxeSubscriptionPlan;
