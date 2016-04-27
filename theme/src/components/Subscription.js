import React, { Component } from 'react';
import LuxeSubscrptionPlan from './LuxeSubscriptionPlans';
import { connect } from 'react-redux';
import { addToCart, removeFromCart } from '../actions/index';
import { bindActionCreators } from 'redux';

class Subscription extends Component {
    constructor(props){
        super(props);

        this.state = { standardSelected: true, subscriptionPlan: 0 };

        this.setPlan = this.setPlan.bind(this);
    }

    setSusbscription(subscription) {
        switch (subscription) {
            case 'standard':
                //no point re-rendering unless state is different
                if (!this.state.standardSelected) {
                    this.setState({ standardSelected: true});
                }

                break;
            case 'luxe':
                //no point re-rendering unless state is different
                if (this.state.standardSelected) {
                    this.setState({ standardSelected: false});

                    //if the subscriptPlan is <= 4 then need to invalidate the component
                    //the user must chose a luxe plan
                    if (this.state.subscriptionPlan <= 4) {
                        this.props.isValid(null, false);
                    }
                }

                break;
        }
    }

    setPlan(planId) {
        //old subscription object
        let oldSubscription = {
            id: this.state.subscriptionPlan
        };
        
        //for now, will hard code a sample cart item
        //all items have the same format
        //properties have custom data options that the cart has to handle
        //{{ }} in the title denotes string variable, it will be replaced in the cart render... IE Standard Box - Classic Beauty Monthly Subscription
        let subscription = {
            id: planId, //this is also the variant id of the product, in this case it's different because its the subscription id
            quantity: 1,
            title: 'Standard Box',
            description: 'Monthly Subscription',
            price: 32,
            properties: {
                term: 'month',
                priceLabel: '$32/monthly'
            }
        };
        
        //remove the prior subscription from the cart since can only have one subscription
        this.props.removeFromCart(oldSubscription);
        
        //this adds the item to the cart
        this.props.addToCart(subscription);
        
        this.setState({subscriptionPlan: planId});

        //this component is now valid
        //there is no key on this component
        this.props.isValid(null, true);
    }

    render() {
        let standardCssClasses = 'flex-item-col subscription-box';
        let luxeCssClasses = 'flex-item-col subscription-box';

        let standardSubscriptionChoices = 'flex-item-col subscription-choices';
        let luxeSubscriptionChoices = 'flex-item-col subscription-choices';

        if (this.state.standardSelected) {
            standardCssClasses += ' selected';
            luxeSubscriptionChoices += ' invisible';

        } else {
            luxeCssClasses += ' selected';
            standardSubscriptionChoices += ' invisible';
        }
        

        //TO DO: The subscriptions will at some point be load from the subscription app
        //The subscription app will be parsed from liquid then passed as a JSON object
        /*
            [{
              id: 1,
              subscriptionName: 'Standard Monthly',
              subscriptionLabel: 'Monthly',
              subscriptionPriceLabel: '$32/monthly',
              price: 32,
              term: month
            }]
        
        */
        return (
            <div id="subscription">
                <div className="flex-row">
                    <div className={standardCssClasses} onClick={this.setSusbscription.bind(this, 'standard')}>
                        <div className="gift-bow margin-line-offset">
                            <img src="//cdn.shopify.com/s/files/1/0956/5006/t/2/assets/vvv-gift-bow.png?557292905641376507" />
                        </div>
                        <div className="subscription-title">Standard Box</div>
                        <div className="subscription-description">1-3 beautiful complementary jewelry pieces personalized for her style.</div>
                        <div className="blurb">As low as $28/month</div>
                        <div className="blurb">for over $60 of value</div>
                    </div>
                    <div className={luxeCssClasses} onClick={this.setSusbscription.bind(this, 'luxe')}>
                        <div className="gift-bow">
                            <img src="//cdn.shopify.com/s/files/1/0956/5006/t/2/assets/vvv-gift-bow.png?557292905641376507" />
                        </div>
                        <div className="subscription-title">Luxe Box</div>
                        <div className="subscription-description">1-3 complementary jewelry pieces with semi-precious materials such as genuine freshwater pearls and sterling silver in intricate designs.</div>
                        <div className="blurb">As low as $59/month</div>
                        <div className="blurb">for over $120 of value</div>
                    </div>
                </div>
                <div className="flex-row">
                    <div className={standardSubscriptionChoices}>
                        <h5 className="subscription-choice-title">Pick your plan</h5>
                        <div className="choice">
                            <input type="radio" name="subscription" value="1" id="sub_s_1" checked={this.state.subscriptionPlan === 1} />
                            <label className="lbl-plan" htmlFor="sub_s_1" onClick={this.setPlan.bind(this, 1)}>
                                <strong>Monthly</strong> $32/month
                            </label>
                        </div>
                        <div className="choice">
                            <input type="radio" name="subscription" value="2" id="sub_s_2" checked={this.state.subscriptionPlan === 2} />
                            <label className="lbl-plan" htmlFor="sub_s_2" onClick={this.setPlan.bind(this, 2)}>
                                <strong>3 Month</strong> $96
                            </label>
                        </div>
                        <div className="choice">
                            <input type="radio" name="subscription" value="3" id="sub_s_3" checked={this.state.subscriptionPlan === 3} />
                            <label className="lbl-plan" htmlFor="sub_s_3" onClick={this.setPlan.bind(this, 3)}>
                                <strong>6 Month</strong> $180 (save $12!)
                            </label>
                        </div>
                        <div className="choice">
                            <input type="radio" name="subscription" value="4" id="sub_s_4" checked={this.state.subscriptionPlan === 4} />
                            <label className="lbl-plan" htmlFor="sub_s_4" onClick={this.setPlan.bind(this, 4)}>
                                <strong>Yearly</strong> $336 (save $48!)
                            </label>
                        </div>
                    </div>
                    <LuxeSubscrptionPlan className={luxeSubscriptionChoices} subscriptionPlan={this.state.subscriptionPlan} setPlan={this.setPlan} />
                </div>
           </div>
        );
    }
}

Subscription.propTypes = {
    isValid: React.PropTypes.func,
    addToCart: React.PropTypes.func,
    removeFromCart: React.PropTypes.func
};

// Anything returned from this function will end up as props
// on the BookList container
function mapDispatchToProps(dispatch) {
  // Whenever selectBook is called, the result shoudl be passed
  // to all of our reducers
  return bindActionCreators({ addToCart, removeFromCart }, dispatch);
}

// Promote BookList from a component to a container - it needs to know
// about this new dispatch method, selectBook. Make it available
// as a prop.
export default connect(null, mapDispatchToProps)(Subscription);
