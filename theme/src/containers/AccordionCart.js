import React, { Component } from 'react';

class AccordionCart extends Component {
    constructor(props){
        super(props);
    }

    render() {
        let id = `heading${this.props.reactKey}`;
        return (
            <div className="panel-heading" role="tab" id={id}>
              <h4 className="panel-title">
                <a href="#">{this.props.children}</a>
              </h4>
            </div>
        );
    }
}

AccordionCart.propTypes = {
    reactKey: React.PropTypes.string,
    isActive: React.PropTypes.bool,
    children: React.PropTypes.node,
    onItemClick: React.PropTypes.func
};

export default AccordionCart;
