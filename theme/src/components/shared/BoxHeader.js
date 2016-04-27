import React, { Component } from 'react';

class BoxHeader extends Component {
    constructor(props){
        super(props);

        this.state = { complete: false };

        this.openHeader = this.openHeader.bind(this);
    }

    //gets fired everytime props change except for initial load
    componentWillReceiveProps(nextProps) {
        if ('complete' in nextProps) {
            this.setState({ complete: nextProps.complete});
        }
    }

    openHeader(event) {
        event.preventDefault();

        if (this.state.complete) {
            this.props.onItemClick();
        }
    }

    render() {
        let id = `heading${this.props.reactKey}`;

        let titleClass = 'panel-title';
        let edit = '';

        if (this.state.complete) {
            titleClass += ' visited';

            edit = <a className="pull-right" href="#" onClick={this.openHeader}>Edit</a>;
        }

        return (
            <div className="panel-heading" role="tab" id={id}>
              <h4 className={titleClass}>
                <a href="#" onClick={this.openHeader}>{this.props.children}</a>
                {edit}
              </h4>
            </div>
        );
    }
}

BoxHeader.propTypes = {
    reactKey: React.PropTypes.string,
    isActive: React.PropTypes.bool,
    children: React.PropTypes.node,
    onItemClick: React.PropTypes.func
};

export default BoxHeader;
