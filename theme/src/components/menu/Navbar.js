import React, { Component } from 'react';
import MenuItems from './MenuItems';
import Logo from '../Logo';

class Navbar extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        const secondaryMenuItems = (
            this.props.secondaryMenuItems ?
            
                <MenuItems ref="secondaryMenuItems"
                    secondary={true}
                    items={this.props.secondaryMenuItems} /> :
            
                null
        );
            
        return (
            <nav className="navbar navbar-default col-sm-7 col-md-7 col-lg-6 ">
                <div className="col-xs-6 hidden-sm hidden-md hidden-lg visible-xs-block">
                    <Logo logoHref={this.props.logoHref} imgUrl={this.props.imgUrl} imgAlt={this.props.imgAlt} />
                </div>
                <div className="navbar-header">
                    <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#react-navbar-collapse-all" aria-expanded="false">
                        <span className="sr-only">Toggle navigation</span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                    </button>
                </div>

                <div className="collapse navbar-collapse" id="react-navbar-collapse-all">
                    <MenuItems ref="menuItems" items={this.props.menuItems} hover={this.props.hover} handleMouseOver={this.props.handleMouseOver}/>
                    {secondaryMenuItems}
                </div>
            </nav>
        );
    }
}

Navbar.propTypes = { 
    menuItems: React.PropTypes.array.isRequired,
    secondaryMenuItems: React.PropTypes.array,
    hover: React.PropTypes.string.isRequired,
    handleMouseOver: React.PropTypes.func.isRequired,
    logoHref: React.PropTypes.string.isRequired,
    imgUrl: React.PropTypes.string.isRequired,
    imgAlt: React.PropTypes.string.isRequired
};

export default Navbar;
