import React, { Component } from 'react';
import Question from './Question';
import QuestionPagination from './QuizPagination';
import QuizRegistration from './QuizRegistration';

class Quiz extends Component {
    constructor(props){
        super(props);
        
        this.state = { 
            currentQuestion: 0, 
            score: { 
                'classic-beauty': 0, 
                'la-femme-fatale': 0, 
                'fun-flashy-flirty': 0, 
                'boho-glam': 0, 
                'uptown-girl': 0, 
                'fierce-fresh':0
            }, 
            answers: [],
            modalIsOpen: false    
        };
        
        this.handleAnswerQuestion = this.handleAnswerQuestion.bind(this);
        this.goBack = this.goBack.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }
    
    handleAnswerQuestion(answer) {
        //get the score object from the state
        let scoreObj = Object.assign({}, this.state.score); //this copies the object instead of the reference
        let score = 0; //initialize score
        let currentQuestion = this.state.currentQuestion;
        let answers = this.state.answers.slice(0);
        
        //update the current score and answers
        if (answer instanceof Array){
            answer.map( key => {
                score = scoreObj[key] + 1; //this gets the specific style score from the state and increases it by 1
                scoreObj[key] = score; 
            });
            answers.push(...answer);
        } else {
            score = scoreObj[answer] + 1; //this gets the specific style score from the state and increases it by 1
            scoreObj[answer] = score;
            answers.push(answer);
        }
        
        
        //if this is the end of the quiz, do not update the state as that will break it without a question being there
        //the currentQuestion will be 5 because it hasn't updated to 6 (which would be question 7 since the question is 0-based)
        if (currentQuestion === 5) {
            let winner = {};
            let runnerUp = [];
            
            //go through all the keys and find the maximum
            Object.keys(scoreObj).map( key => {
                //set winner to a default
                if (typeof winner.style === 'undefined' ) {
                    winner.style = key;
                    winner.score = scoreObj[key];
                } else {
                    //compare the current style against winning style
                    //when: scoreObj for this style is > the winner, we replace winner
                    //else if: the scoreObj for this style is equal to the winner, we add a runner up
                    if (scoreObj[key] > winner.score) {
                        winner.style = key;
                        winner.score = scoreObj[key];
                    }   
                }
            });
            
            //go through all the keys and find any ties
            Object.keys(scoreObj).map( key => {
                //only evaluate items that are not the winner's style because this would always match
                if (winner.style !== key && scoreObj[key] === winner.score){
                    let scoreForRunnerUp = {};
                    scoreForRunnerUp.style = key;
                    scoreForRunnerUp.score = scoreObj[key];
                    
                    runnerUp.push(scoreForRunnerUp);         
                } 
            });
            
            
            if (runnerUp.length === 0) {
                console.log('You\'re style is:' + winner.style);  
                this.openModal();
            } else {
                //there is a tie breaker
                console.log('You have a tie with: ');
                console.log(winner);
                console.log(runnerUp);
            }
            
        } else {
            //update the currentQuestion
            currentQuestion++;
            
            this.setState({ answers: answers });
            this.setState({ score: scoreObj });
            this.setState({ currentQuestion: currentQuestion });
        }
    }
    
    goBack() {
        //when we go back we need to reduce the score for the last answer
        let scoreObj = this.state.score;
        let answers = this.state.answers.slice(0);
        let answer = answers.pop();
        scoreObj[answer] = scoreObj[answer] - 1;
        
        this.setState({ answers: answers });
        this.setState({ score: scoreObj });
        this.setState({ currentQuestion: this.state.currentQuestion - 1 });
    }
 
    openModal() {
        this.setState({modalIsOpen: true});
    }

    closeModal() {
        this.setState({modalIsOpen: false});
    }
    
    render() {
        return (
            <div className="quiz">
                <div className="vvv-page-header-div">
                    <img className="arrow" src="//cdn.shopify.com/s/files/1/1182/4752/t/3/assets/vvv-arrow.png?7191418824142841717" />
                    <h1 className="page-header">The Quiz</h1>
                    <div className="divider"></div>
                </div>
                <div className="row">
                    <div className="col-md-12 col-centered" id="questionnaire-container">
                        <div id="questionnaire-body">
                            <Question question={this.props.questions[this.state.currentQuestion]} answerQuestion={this.handleAnswerQuestion} />
                        </div>
                        <div className="questionnaire-footer"></div>
                    </div>
                </div>
                <div className="questionnaire__pagination">
                    <QuestionPagination currentQuestion={this.state.currentQuestion} handlePrevious={this.goBack} />
                    <div className="quiz-pagination-bg">
                        <img src="//cdn.shopify.com/s/files/1/1182/4752/t/3/assets/vvv-background__triangle--right.png?15194898095247088915" alt="" className="quiz__background--box" />
                    </div>
                </div>
                <QuizRegistration modalIsOpen={this.state.modalIsOpen} onRequestClose={this.closeModal} closeModal={this.closeModal}/>
            </div>
        );
    }
}

Quiz.propTypes = {
    questions: React.PropTypes.array.isRequired
};

export default Quiz;
