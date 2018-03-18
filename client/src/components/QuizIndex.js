import React, { Component } from "react";
import { Quiz } from "../lib/requests";

class QuizIndex extends Component {
  constructor(props) {
    super(props);

    this.state = {
      quizzes: [],
      loading: true
    };
  }

  componentDidMount() {
    Quiz.all().then(quizzes => {
      this.setState({
        quizzes: quizzes,
        loading: false
      });
    });
  }

  render() {
    const { quizzes, loading } = this.state;
    return (
      <div>
        <h2>QuizIndex Placeholder</h2>
        {quizzes.map(quiz => (
          <div>
            <h4 key={quiz.id}>{quiz.name}</h4>
            <p>{quiz.description}</p>
            <br />
          </div>
        ))}
      </div>
    );
  }
}

export default QuizIndex;
