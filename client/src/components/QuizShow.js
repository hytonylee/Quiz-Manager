import React, { Component } from "react";
import { Quiz } from "../lib/requests";
import QuestionForm from "./QuestionForm";

class QuizShow extends Component {
  constructor(props){
    super(props);
    this.state = {
      quiz: {},
      questions: {},
      loading: true
    };
    this.deleteQuestion = this.deleteQuestion.bind(this);
  }

  deleteQuestion(event) {
    event.preventDefault();
    const questionId = parseInt(event.currentTarget.dataset.questionId, 10);
    const newQuestions = this.state.questions.filter(
      question => question.id !== questionId
    );
    this.setState({
      questions: newQuestions
    });
  }

  componentDidMount(){
    const thisID = this.props.match.params.quizId
    console.log('id:',thisID);
    console.log('match:',this.props.match);
    Quiz.one(thisID)
      .then( quiz => {
        console.log("quiz: ", quiz);
        this.setState({
          quiz,
          questions: quiz.questions,
          loading: false
        });
      });
  }

  render() {
    if(this.state.loading) {
      return (
        <main className="QuizShow" style={{ margin: '0 1rem' }}>
          <h4>loading..</h4>
        </main>
      )}

    if(!this.state.quiz.id) {
      return (
        <main className="QuizShow" style={{ margin: '0 1rem' }}>
          <h2>Quiz doesn't exist</h2>
        </main>
      )}

    const { quiz } = this.state;
    return (
      <main className="QuizShow" style={{ margin: '0 1rem' }}>
        <h2>Questions for quiz: {quiz.name}</h2>
        <ul className="quiz-list">
          {this.state.questions.map( question => {
            return (
              <li key={question.id}>
                <p>{question.body}</p>
                <button
                  data-question-id={question.id}
                  onClick={this.deleteQuestion}>
                  Delete
                </button>
              </li>
            )
          })}
        </ul>
      <QuestionForm />
    </main>
    );
  }
}

export default QuizShow;
