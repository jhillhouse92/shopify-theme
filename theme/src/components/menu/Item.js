import React, { Component } from 'react';

class Item extends Component {
    constructor(props){
        super(props);
        
        this.handleMouseOver = this.handleMouseOver.bind(this);
    }
    
    handleMouseOver() {
        //notify the parent that this item has been hovered so it can notify all the children who should be hovered
        if (this.props.id) {
            this.props.handleMouseOver(this.props.id);
        }
    }
    
    render() {
        return (
            <li onMouseOver={this.handleMouseOver}>
                <a href={this.props.href}>
                    {this.props.title}
                </a>
            </li>
        );
    }
}

Item.propTypes = {
    id: React.PropTypes.string,
    title: React.PropTypes.string.isRequired,
    href: React.PropTypes.string.isRequired,
    handleMouseOver: React.PropTypes.func
};

export default Item;
