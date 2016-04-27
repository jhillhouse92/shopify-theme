import React, { Component } from 'react';
import classNames from 'classnames';
import Item from './Item';
import Dropdown from './Dropdown';

class MenuItems extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        const className = classNames(
            'nav navbar-nav',
            {'navbar-right': this.props.secondary}
        );
        
        const items = this.props.items.map((item, index) => this.itemElement(item, `i${index}`));
        
        return (
            <ul className={className}>
                {items}
            </ul>
        );
    }
    
    itemElement(item, ref) {
        return (
            item.items ?
            <Dropdown {...item} id={ref} ref={ref} key={ref} hover={this.props.hover === ref} handleMouseOver={this.props.handleMouseOver} /> :
            <Item {...item} id={ref} ref={ref} key={ref} handleMouseOver={this.props.handleMouseOver}/>
        );
    }
}
            
MenuItems.propTypes = {
    items: React.PropTypes.array.isRequired,
    secondary: React.PropTypes.bool,
    hover: React.PropTypes.string.isRequired,
    handleMouseOver: React.PropTypes.func.isRequired
            
};

export default MenuItems;
