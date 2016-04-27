import React, { Component } from 'react';
import classNames from 'classnames';
import Item from './Item';

class Dropdown extends Component {
    constructor(props){
        super(props);
        
        this.handleMouseOver = this.handleMouseOver.bind(this);
    }
    
    handleMouseOver() {
        //notify the parent that this item has been hovered so it can notify all the children who should be hovered
        this.props.handleMouseOver(this.props.id);
    }
    
    render() {
        const className = classNames(
            'dropdown',
            {'show border': this.props.hover}
        );
        
        const items = this.props.items.map((item, index) => {
            const ref = `i${index}`;
            return <Item {...item} ref={ref} key={ref} />;
        });
        
        return (
            <li className={className} onMouseOver={this.handleMouseOver}>
                <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                    {this.props.title}
                    <span className="caret"></span>
                </a>
            
                <ul className="dropdown-menu">
                    {items}
                </ul>
            </li>
        );
    }
}

Dropdown.propTypes = {
    id: React.PropTypes.string.isRequired,
    title: React.PropTypes.string.isRequired,
    items: React.PropTypes.array.isRequired,
    hover: React.PropTypes.bool.isRequired,
    handleMouseOver: React.PropTypes.func
};

export default Dropdown;
