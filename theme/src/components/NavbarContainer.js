import React, { Component } from 'react';
import Navbar from './menu/Navbar';
import Logo from './Logo';

class NavbarContainer extends Component {
    constructor(props){
        super(props);
        
        this.state = { hoveredItem: '' };
        this.handleMouseOver = this.handleMouseOver.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);
    }
    
    handleMouseOver(id) {
        //set the id of the item that is hovered
        this.setState({
            hoveredItem: id
        });
        
        console.log(this.state);
    }
    
    handleMouseLeave() {
        this.setState({
            hoveredItem: ''
        });
    }
    
    render() {
        return (
            <div className="navbar-top" onMouseLeave={this.handleMouseLeave}>
                <div className="navbar-container row">
                    <div className="col-md-3 col-sm-3 col-lg-2 hidden-xs" onMouseOver={this.handleMouseLeave}>
                        <Logo logoHref={this.props.logoHref} imgUrl={this.props.imgUrl} imgAlt={this.props.imgAlt} />
                    </div>
                    <Navbar menuItems={this.props.menuItems} hover={this.state.hoveredItem} handleMouseOver={this.handleMouseOver} logoHref={this.props.logoHref} imgUrl={this.props.imgUrl} imgAlt={this.props.imgAlt}/>
                </div>
            </div>
        );
    }   
}

NavbarContainer.propTypes = { 
    menuItems: React.PropTypes.array.isRequired,
    logoHref: React.PropTypes.string.isRequired,
    imgUrl: React.PropTypes.string.isRequired,
    imgAlt: React.PropTypes.string.isRequired
};

export default NavbarContainer;
