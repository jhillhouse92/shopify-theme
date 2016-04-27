import React, { Component, Children } from 'react';
import BoxItem from './BoxItem';

class BoxAccordion extends Component {
    constructor(props){
        super(props);

        this.state = { activeKey: '-1', completed: []};

        this.onClickItem = this.onClickItem.bind(this);
        this.setActiveKey = this.setActiveKey.bind(this);
    }

    //gets fired once for initial prop
    componentWillMount(){
        this.setActiveKey(this.props);
    }

    //gets fired everytime props change except for initial load
    componentWillReceiveProps(nextProps) {
        this.setActiveKey(nextProps);
    }

    setActiveKey(nextProps){
        if ('activeKey' in nextProps) {
            this.setState({
                activeKey: nextProps.activeKey
            });
        }
    }

    onClickItem(key) {
        return () => {
            const activeKey = this.state.activeKey;
            let completedArr = this.state.completed.slice(0);

            //when: the new key is greater than the active key
            //then: we just completed the active key
            if (key > activeKey) {
                completedArr.push(activeKey);
            } else if (key < activeKey) {
                //we are going backwards so need to undo this item as completed
                //TO DO: need to remove all items of activeKey - key (i.e. I have completedArr [1, 2, 3] with activeKey of 3 and I go back to 1, I still have [1, 2])
                completedArr.pop();
            }

            this.setState({
                activeKey: key === activeKey ? null : key,
                completed: completedArr
            });

        };
    }

    getItems() {
        const activeKey = this.state.activeKey;

        return Children.map(this.props.children, (child, index) => {
            // If there is no key provide, use the panel order as default key
            const key = String(index);
            const nextKey = String(index + 1);
            let isActive = false;
            let complete = key === this.state.completed[index]; //this item is complete if the keys match

            //we only support the accordion mode so only one panel can be active at a given time
            isActive = activeKey === key;


            const props = {
                reactKey: key,
                isActive,
                complete,
                children: child.props.children,
                onItemClick: this.onClickItem(key).bind(this),
                onNextClick: this.onClickItem(nextKey).bind(this)
            };

          return <BoxItem {...props} />;
        });
    }

    render() {
        return (
            <section className="sign-up box-accordion container">
                <div className="panel-group">
                    {this.getItems()}
                </div>
            </section>
        );
    }
}

BoxAccordion.propTypes = {
    children: React.PropTypes.node
};

export default BoxAccordion;
