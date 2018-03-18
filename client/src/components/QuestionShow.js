import React, { Component } from "react";
import NavBarUser from "./NavBarUser";
import { Question } from "../lib/requests";

class QuestionShow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      question: []
    };
  }

  componentDidMount() {
    console.log(this.props.match.params);
    const questionId = this.props.match.params.questionId;
    Question.one(questionId).then(question => {
      this.setState({ question: question });
    });
    console.log(this.state);
  }

  render() {
    return (
      <div>
        <NavBarUser />
        <h2>QuestionShow Placeholder</h2>
        <h3>Question: {this.state.question.body}</h3>
      </div>
    );
  }
}

export default QuestionShow;
