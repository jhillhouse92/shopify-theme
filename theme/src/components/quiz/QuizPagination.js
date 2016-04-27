import React, { Component } from 'react';
import classNames from '../util/classnames';

class QuizPagination extends Component {
    constructor(props){
        super(props);
        
    }
    
    render() {
        let items = [...Array(6)].map((x, i) => {
                const className = classNames(
                    'quiz__pagination quiz__pagination--count',
                    {' quiz__pagination--current': this.props.currentQuestion === i},
                    {'quiz__pagination--complete': this.props.currentQuestion > i}
                );
        
                return (
                    <li key={i + 1} id={'gem' + i} className={className}>
                        <span className="quiz__pagination--count">{i + 1 + '.'}</span>
                    </li>
                );
            }
        );

        return (
            <ul className="pagination">
                <li className="quiz__pagination--previous">
                  <a href="#" id="quizPrevious" onClick={this.props.handlePrevious}>PREVIOUS</a>
                </li>
                {items}
                <li id="gem7" className="quiz__pagination hide">
                  <span className="quiz__pagination--count">7.</span>
                </li>
            </ul>
        );
    }
}

QuizPagination.propTypes = {
    currentQuestion: React.PropTypes.number.isRequired,
    handlePrevious: React.PropTypes.func.isRequired
};

export default QuizPagination;
