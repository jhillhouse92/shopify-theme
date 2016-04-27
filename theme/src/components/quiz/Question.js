import React, { Component } from 'react';
import classNames from '../util/classnames';

class Question extends Component {
    constructor(props){
        super(props);

        this.state = { selectedItems: []};
        this.getQuestionBasedOnType = this.getQuestionBasedOnType.bind(this);
        this.handleOnClick = this.handleOnClick.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        //need to make sure this state is cleared of selected items
        if (this.state.selectedItems.length > 0 && nextProps.question.id !== 6) {
            this.setState({ selectedItems: []});
        }
    }

    handleOnClick(answer) {
        this.props.answerQuestion(answer);
    }

    toggleSelect(answer) {
        let selectedItems = this.state.selectedItems.splice(0);
        let set = new Set(selectedItems);
        //we need to remove this item
        if (set.has(answer)) {
            set.delete(answer);
        } else {
            set.add(answer);
        }

        this.setState({ selectedItems: [...set]});
    }

    getQuestionBasedOnType(){
        if (this.props.question.questionType === 'single-image') {

            let answers1 = [...Array(3)].map((x, i) => {
                    let clickHandler = this.handleOnClick.bind(this, this.props.question.answers[i].style);

                    return (
                        <li key={i + 0} >
                            <input key={i + 1} type="radio" id={'radio-' + i} name="quiz-question" value={this.props.question.answers[i].style} />
                            <label key={i + 2} onClick={clickHandler}>
                                <span key={i + 3} ></span>{this.props.question.answers[i].text}
                            </label>
                        </li>
                    );
                }
            );

            let answers2 = [...Array(3)].map((x, i) => {
                    let clickHandler = this.handleOnClick.bind(this, this.props.question.answers[i + 3].style);

                    return (
                        <li key={i + 0} >
                            <input key={i + 1} type="radio" id={'radio-' + (i + 3)} name="quiz-question" value={this.props.question.answers[i + 3].style} />
                            <label key={i + 2} onClick={clickHandler}>
                                <span key={i + 3} ></span>{this.props.question.answers[i + 3].text}
                            </label>
                        </li>
                    );
                }
            );

            return (
                <section className="row quiz__questions quiz__question1">
                    <div className="col-md-5 col-lg-6">
                        <img src="//cdn.shopify.com/s/files/1/1182/4752/t/3/assets/quiz__q1main1.jpg?13287881187101057458" />
                    </div>
                    <div className="col-md-7 col-lg-6">
                        <div className="col-md-11">
                            <div id="qmcontentText" className="ta-left">{this.props.question.text}</div>
                        </div>
                        <div className="col-md-6 col-lg-5">
                            {answers1}
                        </div>
                        <div className="col-md-6 col-lg-5">
                            {answers2}
                        </div>
                    </div>
                </section>
            );
        } else {

            let finishQuiz = this.handleOnClick.bind(this, this.state.selectedItems);

            let nextBtn = (this.props.question.id === 6) ? (
                <div className="col-md-12 btn-container">
                    <a href="#" className="select_box" onClick={finishQuiz}>Next</a>
                </div>
            ) : '';

            let answers = [...Array(6)].map((x, i) => {
                    let className = classNames(
                        'label-quiz', this.props.question.answers[i].image, 'q' + this.props.question.id,
                        {'image-no-border-radius': this.props.question.id >= 4},
                        {'selectedItem': new Set(this.state.selectedItems).has(this.props.question.answers[i].style)}
                    );

                    let clickHandler = null;

                    if (this.props.question.id === 6) {
                        clickHandler = this.toggleSelect.bind(this, this.props.question.answers[i].style);
                    } else {
                        clickHandler = this.handleOnClick.bind(this, this.props.question.answers[i].style);
                    }

                    return (
                        <div key={i + 0} className="col-md-2 quiz-radio">
                            <input key={i + 1} id={'q2o' + i} type="radio" name="quiz-question" value={i} />
                            <label key={i + 2} className={className} htmlFor={'q2o' + i} onClick={clickHandler}></label>
                            <p key={i + 3} onClick={this.handleOnClick}>{this.props.question.answers[i].text}</p>
                            <p key={i + 4} className='lighter'>{ (this.props.question.answers[i].subText) ? this.props.question.answers[i].subText : ''}</p>
                        </div>
                    );
                }
            );

            return (
                <section className="row quiz__questions quiz__question2">
                    <div className="col-md-12 col-centered">
                        <div id="qmcontentText" className="ta-center">{this.props.question.text}</div>
                        {answers}
                    </div>
                    {nextBtn}
                </section>
            );
        }
    }

    render() {
        return (
            this.getQuestionBasedOnType()
        );
    }
}

Question.propTypes = {
    question: React.PropTypes.object.isRequired,
    answerQuestion: React.PropTypes.func.isRequired
};

export default Question;
