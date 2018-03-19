import React, { Component } from "react";
import { Question, Quiz } from "../lib/requests";
import QuestionForm from "./QuestionForm";

class QuizShow extends Component {
  constructor(props){
    super(props);
    const quizId = this.props.match.params.quizId

    this.state = {
      quiz: {},
      questions: {},
      quizId: quizId,
      loading: true
    };
    this.deleteQuestion = this.deleteQuestion.bind(this);
    this.quizConfirmed = this.quizConfirmed.bind(this);

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
    Question.destroy(questionId);
  }

  quizConfirmed() {
    this.props.history.push("/quizzes/")
  }

  componentDidMount(){
    Quiz.one(this.state.quizId)
      .then( quiz => {
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
    const {quizID} = this.state
    console.log('quizxx:', quiz);
    return (
      <main className="QuizShow" style={{ margin: '0 1rem' }}>
        <h2>Quiz Name: {quiz.name}</h2>
        <p>Description for quiz: {quiz.description}</p>
        <strong>Quiz Difficulty: {quiz.difficulty}</strong><br />
        <strong>Quiz Total Points: {quiz.quit_points}</strong>
        <ul className="quiz-list">
          {this.state.questions.map( question => {
            return (
              <li className="questionList" key={question.id}>
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
      <QuestionForm
        quizId={this.state.quizId}
      />
      <button
        onClick={this.quizConfirmed}>
        Confirm Quiz
      </button>
    </main>
    );
  }
}

export default QuizShow;
{/* <a
  href={`quizzes/${quiz.id}/question/${question.id}/edit`}
  onClick={() => { console.log(question.id) }}>
  Edit
</a> */}
