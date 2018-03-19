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
    this.questionsRefresh = this.questionsRefresh.bind(this);
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
                <button
                  data-question-id={question.id}
                  onClick={this.editQuestion}>
                  Edit
                </button>
              </li>
            )
          })}
        </ul>
      <QuestionForm
        quizId={this.state.quizId}
      />
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
