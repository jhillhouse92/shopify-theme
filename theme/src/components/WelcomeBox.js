import React, { Component } from 'react';
import BoxAccordion from './shared/BoxAccordion';
import BoxItem from './shared/BoxItem';
import BoxHeader from './shared/BoxHeader';
import BoxContent from './shared/BoxContent';
import Subscription from './Subscription';
import ChangeStyle from './ChangeStyle';
import WelcomeLuxeBox from './WelcomeLuxeBox';
import Cart from '../containers/Cart';

class WelcomeBox extends Component {
    constructor(props){
        super(props);

        this.state = { openWizard: false, modalIsOpen: false, luxebox: false, selectedProduct: -1 };

        this.selectBox = this.selectBox.bind(this);
        this.scrollTo = this.scrollTo.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.selectProduct = this.selectProduct.bind(this);
        this.getSelectedProduct = this.getSelectedProduct.bind(this);

    }

    componentWillMount(){
        /* luxebox state is defined only once at initial load time */
        if (this.props.luxebox) {
            this.setState({luxebox: true, openWizard: true});
        }
    }

    selectBox(event) {
        event.preventDefault();

        this.setState({ openWizard: true });

        //we want to scroll to the first step header, we know the DOM element ID of the first step is collapse0
        //while this is not best practice to hardcode in id instead of using React
        //React doesn't make it easy to access child component DOM elements
        this.scrollTo(document.getElementById('collapse0'), 300);
    }

    openModal(event) {
        event.preventDefault();

        this.setState({modalIsOpen: true});
    }

    closeModal() {
        this.setState({modalIsOpen: false});
    }

    scrollTo(to, duration) {
        if (duration <= 0) {
            return;
        }

        let difference = to.offsetTop - window.pageYOffset - 94; //94 is the fixed menu offset
        let perTick = difference / duration * 10;

        setTimeout( () => {
            top.window.scroll(0, window.scrollY + perTick);

            this.scrollTo(to, duration - 10);
        }, 10);
    }

    selectProduct(index) {
        this.setState({ selectedProduct: index});
    }

    getSelectedProduct(index) {
        return 'prd-info product-info ' + ((index === this.state.selectedProduct) ? 'active' : '');
    }

    getProductInfo(){
        if (!this.state.luxebox) {
            return (
            <div className="standard-box">
                <section className="product-info">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <img className="light-divider" src="//cdn.shopify.com/s/files/1/0956/5006/t/2/assets/reveal__line-seperation.png?557292905641376507" alt="" />
                            </div>
                        </div>
                    </div>
                    <h2 className="text-center welcome-box-title">Your Welcome Box</h2>
                    <div className="row product-row">
                        <div className={this.getSelectedProduct(0)} onClick={this.selectProduct.bind(this, 0)}>
                            <img src="//cdn.shopify.com/s/files/1/0956/5006/products/50_2_large.JPG?v=1459646580" />
                            <h4>Turquoise Pendant and Tassel Necklace</h4>
                        </div>
                        <div className={this.getSelectedProduct(1)} onClick={this.selectProduct.bind(this, 1)}>
                            <img src="//cdn.shopify.com/s/files/1/0956/5006/products/50_2_large.JPG?v=1459646580" />
                            <h4>Turquoise Pendant and Tassel Necklace</h4>
                        </div>
                        <div className={this.getSelectedProduct(2)} onClick={this.selectProduct.bind(this, 2)}>
                            <img src="//cdn.shopify.com/s/files/1/0956/5006/products/50_2_large.JPG?v=1459646580"/>
                            <h4>Turquoise Pendant and Tassel Necklace</h4>
                        </div>
                    </div>
                </section>
                <section className="welcome-box-footer">
                    <div className="row actions">
                        <div className="btn-container">
                            <a href="#" className="select_box" onClick={this.selectBox}>SELECT THIS BOX</a>
                        </div>
                        <a href="#" className="style-action" onClick={this.openModal}>Try a New Style</a>
                    </div>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <img className="light-divider" src="//cdn.shopify.com/s/files/1/0956/5006/t/2/assets/reveal__line-seperation.png?557292905641376507" alt="" />
                            </div>
                        </div>
                    </div>
                </section>
            </div>
           );
        }

        return '';
    }

    getStep1(){
        //the order is important
        //the BoxContent component will process error messages in the order they are passed, the component will have to invoke
        //this.props.valid(key, true) when it has passed validation
        let validateMsgs = {
            'no-luxe-box': 'You must select a Luxe Box to continue!',
            'no-luxe-plan': 'You must select a Luxe Subscription Plan to continue!'
        };

        if (this.state.luxebox) {
            return (
                <BoxItem>
                    <BoxHeader>STEP 1. Choose Your Luxe Box</BoxHeader>
                    <BoxContent>
                        <WelcomeLuxeBox openModal={this.openModal} scrollTo={this.scrollTo} validate={true} validateMsgs={validateMsgs}/>
                    </BoxContent>
                </BoxItem>
            );
        } else {
            return (
                <BoxItem>
                    <BoxHeader>STEP 1. Choose your subscription plan</BoxHeader>
                    <BoxContent>
                        <h2 className="step-title">1. Choose your subscription plan</h2>
                        <Subscription validate={true} errorMsg='You must select a subcription plan'/>
                    </BoxContent>
                </BoxItem>
            );
        }

    }

    render() {
        return (
            <div className="welcome-box">
                <section className="row banner-image">
                    <div className="col-sm-12">
                        <img className="reveal__slider" src={this.props.bannerImg} />
                    </div>
                </section>
                {this.getProductInfo()}
                <BoxAccordion activeKey={ (this.state.openWizard) ? '0' : '-1' }>
                    {this.getStep1()}
                    <BoxItem>
                        <BoxHeader>STEP 2. Spice Up Your Welcome Box</BoxHeader>
                        <BoxContent>
                            <h2 className="step-title">2. Spice Up Your Welcome Box</h2>
                            <h3 className="text-center step-subtitle">Specially discounted pieces that we think you’ll love!</h3>
                            <div className="flex-row space-between addons">
                                <div className="flex-item-col center-col">
                                    <img className="prd-info product-info" src="//cdn.shopify.com/s/files/1/0956/5006/products/a3caf629-546a-44fe-adf6-34dc9695961b_73f492ec-b9de-451e-923f-d8186eff6056_2048x2048.jpg?v=1453317176" />
                                    <h5 className="title">Gold Chandelier Leaf Earrings</h5>
                                    <div className="price">
                                        <del>WAS $ 24.00</del>
                                        <span className="actual-price">$14.99</span>
                                    </div>
                                    <div className="add-to-cart">
                                        <a href="#" className="btn btn-secondary">Add to Cart</a>
                                    </div>
                                </div>
                                <div className="flex-item-col center-col">
                                    <img className="prd-info product-info" src="//cdn.shopify.com/s/files/1/0956/5006/products/a3caf629-546a-44fe-adf6-34dc9695961b_73f492ec-b9de-451e-923f-d8186eff6056_2048x2048.jpg?v=1453317176" />
                                    <h5 className="title">Gold Chandelier Leaf Earrings</h5>
                                    <div className="price">
                                        <del>WAS $ 24.00</del>
                                        <span className="actual-price">$14.99</span>
                                    </div>
                                    <div className="add-to-cart">
                                        <a href="#" className="btn btn-secondary">Add to Cart</a>
                                    </div>
                                </div>
                                <div className="flex-item-col center-col">
                                    <img className="prd-info product-info" src="//cdn.shopify.com/s/files/1/0956/5006/products/a3caf629-546a-44fe-adf6-34dc9695961b_73f492ec-b9de-451e-923f-d8186eff6056_2048x2048.jpg?v=1453317176" />
                                    <h5 className="title">Gold Chandelier Leaf Earrings</h5>
                                    <div className="price">
                                        <del>WAS $ 24.00</del>
                                        <span className="actual-price">$14.99</span>
                                    </div>
                                    <div className="add-to-cart">
                                        <a href="#" className="btn btn-secondary">Add to Cart</a>
                                    </div>
                                </div>
                                <div className="flex-item-col center-col">
                                    <img className="prd-info product-info" src="//cdn.shopify.com/s/files/1/0956/5006/products/a3caf629-546a-44fe-adf6-34dc9695961b_73f492ec-b9de-451e-923f-d8186eff6056_2048x2048.jpg?v=1453317176" />
                                    <h5 className="title">Gold Chandelier Leaf Earrings</h5>
                                    <div className="price">
                                        <del>WAS $ 24.00</del>
                                        <span className="actual-price">$14.99</span>
                                    </div>
                                    <div className="add-to-cart">
                                        <a href="#" className="btn btn-secondary">Add to Cart</a>
                                    </div>
                                </div>
                            </div>
                            <div className="flex-row space-between addons">
                                <div className="flex-item-col center-col">
                                    <img className="prd-info product-info" src="//cdn.shopify.com/s/files/1/0956/5006/products/a3caf629-546a-44fe-adf6-34dc9695961b_73f492ec-b9de-451e-923f-d8186eff6056_2048x2048.jpg?v=1453317176" />
                                    <h5 className="title">Gold Chandelier Leaf Earrings</h5>
                                    <div className="price">
                                        <del>WAS $ 24.00</del>
                                        <span className="actual-price">$14.99</span>
                                    </div>
                                    <div className="add-to-cart">
                                        <a href="#" className="btn btn-secondary">Add to Cart</a>
                                    </div>
                                </div>
                                <div className="flex-item-col center-col">
                                    <img className="prd-info product-info" src="//cdn.shopify.com/s/files/1/0956/5006/products/a3caf629-546a-44fe-adf6-34dc9695961b_73f492ec-b9de-451e-923f-d8186eff6056_2048x2048.jpg?v=1453317176" />
                                    <h5 className="title">Gold Chandelier Leaf Earrings</h5>
                                    <div className="price">
                                        <del>WAS $ 24.00</del>
                                        <span className="actual-price">$14.99</span>
                                    </div>
                                    <div className="add-to-cart">
                                        <a href="#" className="btn btn-secondary">Add to Cart</a>
                                    </div>
                                </div>
                                <div className="flex-item-col center-col">
                                    <img className="prd-info product-info" src="//cdn.shopify.com/s/files/1/0956/5006/products/a3caf629-546a-44fe-adf6-34dc9695961b_73f492ec-b9de-451e-923f-d8186eff6056_2048x2048.jpg?v=1453317176" />
                                    <h5 className="title">Gold Chandelier Leaf Earrings</h5>
                                    <div className="price">
                                        <del>WAS $ 24.00</del>
                                        <span className="actual-price">$14.99</span>
                                    </div>
                                    <div className="add-to-cart">
                                        <a href="#" className="btn btn-secondary">Add to Cart</a>
                                    </div>
                                </div>
                                <div className="flex-item-col center-col">
                                    <img className="prd-info product-info" src="//cdn.shopify.com/s/files/1/0956/5006/products/a3caf629-546a-44fe-adf6-34dc9695961b_73f492ec-b9de-451e-923f-d8186eff6056_2048x2048.jpg?v=1453317176" />
                                    <h5 className="title">Gold Chandelier Leaf Earrings</h5>
                                    <div className="price">
                                        <del>WAS $ 24.00</del>
                                        <span className="actual-price">$14.99</span>
                                    </div>
                                    <div className="add-to-cart">
                                        <a href="#" className="btn btn-secondary">Add to Cart</a>
                                    </div>
                                </div>
                            </div>
                        </BoxContent>
                    </BoxItem>
                    <BoxItem>
                        <BoxHeader>STEP 3. Confirm Your Order</BoxHeader>
                        <BoxContent>
                            <h2 className="step-title">3. Confirm Your Order</h2>    
                            <h3 className="text-center step-subtitle review-subtitle">Your Style Box - La Femme Fatale</h3>
                            <Cart />
                            <div className="text-center divider"></div>
                            <img src="//cdn.shopify.com/s/files/1/0956/5006/t/2/assets/reveal__line-seperation.png?557292905641376507" alt="" />
                        </BoxContent>
                    </BoxItem>
                </BoxAccordion>
                <ChangeStyle modalIsOpen={this.state.modalIsOpen} onRequestClose={this.closeModal} closeModal={this.closeModal}/>
            </div>
        );
    }
}

WelcomeBox.propTypes = {
    bannerImg: React.PropTypes.string,
    luxebox: React.PropTypes.bool
};

export default WelcomeBox;
