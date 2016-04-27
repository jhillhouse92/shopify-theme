import React, { Component, Children } from 'react';
import BoxHeader from './BoxHeader';
import BoxContent from './BoxContent';

class BoxItem extends Component {
    constructor(props){
        super(props);

        this.getItems = this.getItems.bind(this);
    }

    getItems() {
        return Children.map(this.props.children, (child) => {
            let props = {
                reactKey: this.props.reactKey,
                isActive: this.props.isActive,
                complete: this.props.complete,
                children: child.props.children,
                onItemClick: this.props.onItemClick,
                onNextClick: this.props.onNextClick
            };

            if (child.type === BoxHeader) {

               return <BoxHeader {...props} />;

           } else if (child.type === BoxContent) {

               return <BoxContent {...props} />;

           } else {
               return new Error(`You provided an invalid child type to this component of type: ${child.type}`);
           }
        });
    }

    render() {
        let classNames = 'panel panel-default ';

        if (this.props.isActive) {
            classNames += 'active';
        }

        return (
            <div className={classNames}>
                {this.getItems()}
            </div>
        );
    }
}

BoxItem.propTypes = {
    reactKey: React.PropTypes.string,
    isActive: React.PropTypes.bool,
    complete: React.PropTypes.bool,
    children: React.PropTypes.node,
    onItemClick: React.PropTypes.func,
    onNextClick: React.PropTypes.func
};

export default BoxItem;
