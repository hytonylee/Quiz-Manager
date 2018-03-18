import React, { Component } from 'react';
import QuizForm from './QuizForm';
import { Quiz } from '../lib/requests';

class QuizNew extends Component {

  constructor (props) {
    super(props) {
      super(props);
      this.createQuiz = this.createQuiz.bind(this);
    }
  }

  createQuize (quizParams) {
    Quiz
      .create(quizParams)
      .then(data => {
        const {id } = data;
      })
  }

  render () {
    return (
      <main
        className="QuizNew"
      >
        <h1>New Quiz</h1>
        <QuizForm
          onSubmit={this.createQuiz}
         />
      </main>
    );
  }
}

export default QuizNew;
