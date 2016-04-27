import React, { Component } from 'react';
import LuxeSubscrptionPlan from './LuxeSubscriptionPlans';

class WelcomeLuxeBox extends Component {
    constructor(props){
        super(props);

        //subscriptionPlan for now for luxe is 5 - 8, will refactor this when adding redux and cart
        this.state = {luxeSelected: '', subscriptionPlan: 0 };

        this.selectLuxeBox = this.selectLuxeBox.bind(this);
        this.changeLuxeBox = this.changeLuxeBox.bind(this);
        this.setPlan = this.setPlan.bind(this);
    }

    selectLuxeBox(color) {
        this.setState({ luxeSelected: color });

        //invoke valid
        this.props.isValid('no-luxe-box', true);

        this.props.scrollTo(document.getElementById('lux-plan'), 300);
    }

    changeLuxeBox(event) {
        event.preventDefault();

        //invoke valid
        this.props.isValid('no-luxe-box', false);

        //reset the selected luxe box
        this.setState({ luxeSelected: '' });

        //scroll to the top
        this.props.scrollTo(document.getElementById('blue'), 300);
    }

    setPlan(planId) {
        this.setState({subscriptionPlan: planId});

        //this component is now valid
        this.props.isValid('no-luxe-plan', true);
    }

    render() {
        let blueLuxeCss = 'product-info luxe luxe-blue flex-col';
        let pinkLuxeCss = 'product-info luxe luxe-pink flex-col';
        let luxeSubscriptionChoices = 'flex-item-col subscription-choices';

        if (this.state.luxeSelected === 'blue') {
            blueLuxeCss += ' selected';
            pinkLuxeCss += ' hide';
        } else if (this.state.luxeSelected === 'pink') {
            pinkLuxeCss += ' selected';
            blueLuxeCss += ' hide';
        } else {
            //nothing has been chosen so hide luxe subscription choices
            luxeSubscriptionChoices += ' hide';
        }

        return (
            <div className="luxe-welcome-container">
                <h2 className="step-title luxe-title">Choose Your Luxe Box</h2>
                <div className="luxe-box">
                    <section className={blueLuxeCss}>
                        <img id='blue' src="//cdn.shopify.com/s/files/1/0956/5006/t/2/assets/lux-box__package-1.png?557292905641376507" alt="" className="lux-package lux-package-blue" />
                        <button className="lux-box-option" data-variant="12691185988" onClick={this.selectLuxeBox.bind(this, 'blue')}>Luxe Box Option 1</button>
                        <div className="row product-row">
                            <div className="prd-info product-info">
                                <img src="//cdn.shopify.com/s/files/1/0956/5006/products/50_2_large.JPG?v=1459646580" />
                                <h4>Turquoise Pendant and Tassel Necklace</h4>
                            </div>
                            <div className="prd-info product-info active">
                                <img src="//cdn.shopify.com/s/files/1/0956/5006/products/50_2_large.JPG?v=1459646580" />
                                <h4>Turquoise Pendant and Tassel Necklace</h4>
                            </div>
                            <div className="prd-info product-info">
                                <img src="//cdn.shopify.com/s/files/1/0956/5006/products/50_2_large.JPG?v=1459646580"/>
                                <h4>Turquoise Pendant and Tassel Necklace</h4>
                            </div>
                        </div>
                    </section>
                    <section className={pinkLuxeCss}>
                        <img id='pink' src="//cdn.shopify.com/s/files/1/0956/5006/t/2/assets/lux-box__package-2.png?557292905641376507" alt="" className="lux-package lux-package-pink" />
                        <button className="lux-box-option pink" data-variant="12691185988" onClick={this.selectLuxeBox.bind(this, 'pink')}>Luxe Box Option 2</button>
                        <div className="row product-row luxe-pink">
                            <div className="prd-info product-info">
                                <img src="//cdn.shopify.com/s/files/1/0956/5006/products/50_2_large.JPG?v=1459646580" />
                                <h4>Turquoise Pendant and Tassel Necklace</h4>
                            </div>
                            <div className="prd-info product-info active">
                                <img src="//cdn.shopify.com/s/files/1/0956/5006/products/50_2_large.JPG?v=1459646580" />
                                <h4>Turquoise Pendant and Tassel Necklace</h4>
                            </div>
                            <div className="prd-info product-info">
                                <img src="//cdn.shopify.com/s/files/1/0956/5006/products/50_2_large.JPG?v=1459646580"/>
                                <h4>Turquoise Pendant and Tassel Necklace</h4>
                            </div>
                        </div>
                    </section>
                </div>
                <div className="action flex-row flex-end">
                    <a className={(this.state.luxeSelected !== '') ? 'welcomebox__change-luxe-selection' : 'hide welcomebox__change-luxe-selection'} href="#" onClick={this.changeLuxeBox}>Change Your Luxe Box</a>
                    <a className="welcomebox__change-luxe-selection" href="#" onClick={this.props.openModal}>Change Your Style Selection</a>
                </div>
                <LuxeSubscrptionPlan className={luxeSubscriptionChoices} subscriptionPlan={this.state.subscriptionPlan} setPlan={this.setPlan} />
            </div>
        );
    }
}

WelcomeLuxeBox.propTypes = {
    openModal: React.PropTypes.func,
    scrollTo: React.PropTypes.func,
    isValid: React.PropTypes.func
};

export default WelcomeLuxeBox;
