import React, { Component } from 'react';

class Logo extends Component {
    constructor(props){
        super(props);
    }
    
    render() {
        return (
             <div className="logo-container">
                <a className="navbar-brand navbar-brand-img" href={this.props.logoHref}>
                    <img src={this.props.imgUrl} alt={this.props.imgAlt} />
                </a>
                <div className="clearfix"></div>
            </div>
        );
    }
    
}

Logo.propTypes = {
    logoHref: React.PropTypes.string.isRequired,
    imgUrl: React.PropTypes.string.isRequired,
    imgAlt: React.PropTypes.string.isRequired
};

export default Logo;
