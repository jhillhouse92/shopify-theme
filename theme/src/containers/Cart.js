import React, { Component } from 'react';
import { connect } from 'react-redux';

class Cart extends Component {
    constructor(props){
        super(props);
    }

    render() {
        let formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2
        });

        let cart = this.props.lineItems.map((item, index) => {
             return (
                <div className="flex-row space-between item-review" key={ index + 0 }>
                    <div className="cell quantity">1x</div>
                    <div className="cell prod-img"><img className="prd-info product-info subcription-img" src="//cdn.shopify.com/s/files/1/0956/5006/t/2/assets/col2_icon.png?13919254826094857939" /></div>
                    <div className="cell item-cell">
                        <div className="item-title">{item.title}</div>
                        <div className="item-description">{item.description}</div>
                    </div>
                    <div className="cell price">{formatter.format(item.price)}</div>
                    <div className="cell remove"><a href="#">Remove</a></div>
                </div>
            );
        });
        
        return (
            <div>
                {cart}
                <div className="flex-row space-between item-review">
                    <div className="cell quantity">1x</div>
                    <div className="cell prod-img"><img className="prd-info product-info product-img" src="//cdn.shopify.com/s/files/1/0956/5006/products/a3caf629-546a-44fe-adf6-34dc9695961b_73f492ec-b9de-451e-923f-d8186eff6056_2048x2048.jpg?v=1453317176" /></div>
                    <div className="cell item-cell">
                        <div className="item-title">Gold Chandelier Leaf Earrings</div>
                    </div>
                    <div className="cell price">$14.99</div>
                    <div className="cell remove"><a href="#">Remove</a></div>
                </div>
            </div>
        );
    }
}

Cart.propTypes = {
    lineItems: React.PropTypes.array
};

function mapStateToProps(state) {
  // Whatever is returned will show up as props
  // inside of BookList
  return {
    lineItems: state.cart
  };
}

export default connect(mapStateToProps)(Cart);
