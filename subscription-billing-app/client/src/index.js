import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.html';
import '../styles/shopify.css';
//import '../styles/seaff.css';
//import '../styles/seaff-dropdown.css';


class App extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            <div>Hi!</div>
        );
    }
}

ReactDOM.render(<App />, document.querySelector('.react-container-app'));
