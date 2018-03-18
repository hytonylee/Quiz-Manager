import React, { Component } from "react";
import NavBarUser from "./NavBarUser";
import { Form, Button } from "semantic-ui-react";
import { Question, Quiz, QuizTaken } from "../lib/requests";

class QuestionShow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      question: [],
      quiz: [],
      quizzes: [],
      answered: false,
      answers: [],
      errors: []
    };
  }

  componentDidMount() {
    console.log(this.props.match.params);
    const questionId = this.props.match.params.questionId;
    const quizId = this.props.match.params.quizId;
    Question.one(questionId).then(question => {
      this.setState({ question: question });
    });
    Quiz.all().then(quizzes => {
      this.setState({ quizzes: quizzes });
    });
    Quiz.one(quizId).then(quiz => {
      this.setState({ quiz: quiz });
    });
    console.log(this.state);
  }

  // createToken(event) {
  //   const { onSignIn = () => {} } = this.props;
  //   event.preventDefault();
  //   const formData = new FormData(event.currentTarget);
  //   Token.create({
  //     email: formData.get("email"),
  //     password: formData.get("password")
  //   }).then(data => {
  //     if (!data.errors) {
  //       localStorage.setItem("jwt", data.jwt);
  //       onSignIn();
  //       this.props.history.push("/quizzes");
  //     } else {
  //       this.setState({
  //         errors: [
  //           {
  //             message: "Invalid username or password"
  //           }
  //         ]
  //       });
  //     }
  //   });
  // }

  answerQuestion(event) {
    const { tbdFunc = () => {} } = this.props;
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    QuizTaken.patch({
      //add QuizTaken.patch to requests
      correct: true,
      questionIndex: 1
    }).then(data => {
      if (!data.errors) {
        this.setState({
          answers: [{ body: "one" }, { body: "two" }],
          answered: true
        });
      } else {
        this.setState({
          errors: [
            {
              message: "Error Message"
            }
          ]
        });
      }
    });
  }

  nextQuestion() {}

  render() {
    return (
      <div>
        <NavBarUser />
        <h2>Quiz: #QUIZ NAME PLACEHOLDER#</h2>
        <h3>Question: {this.state.question.body}</h3>

        <Form onSubmit={this.answerQuestion}>
          <Form.Field>
            <label>Submit your Answer:</label>

            <input
              placeholder="Enter your answer here"
              id="Answer"
              type="text"
              name="Answer"
            />
          </Form.Field>
          <Button type="submit">Sign In</Button>
        </Form>
        <div
          style={
            this.state.answered ? { display: "block" } : { display: "none" }
          }
        >
          <h4>#YOUR ANSWER#</h4>
          <h4>Answers:</h4>
          <p>• Answer</p>
          <p>• Answer</p>
          <p>• Answer</p>
          <p>• Answer</p>
          <Button onClick={this.nextQuestion}>Next Question</Button>
        </div>
        {/* {this.state.question.answers.map(answer => (
          <div key={answer.id}>
            <p>{answer.body}</p>
            <br />
          </div>
        ))} */}
      </div>
    );
  }
}

export default QuestionShow;
