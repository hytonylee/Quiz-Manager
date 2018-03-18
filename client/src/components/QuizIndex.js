import React, { Component } from "react";
import { Quiz } from "../lib/requests";
import { Link } from "react-router-dom";
import {
  Card,
  Button,
  CardTitle,
  CardText,
  Row,
  Col,
  Container
} from "reactstrap";

class QuizIndex extends Component {
  constructor(props) {
    super(props);

    this.state = {
      quizzes: []
    };
    this.deleteQuiz = this.deleteQuiz.bind(this);
    this.addQuiz = this.addQuiz.bind(this);
  }

  componentDidMount() {
    Quiz.all().then(quizzes => {
      this.setState({
        quizzes: quizzes
        // ,
        // loading: false
      });
    });
  }

  addQuiz(addQuiz) {
    const { quizzes } = this.state;
  }

  deleteQuiz(event) {
    const { currentTarget } = event;
    const { quizzes } = this.state;
    const quizId = parseInt(currentTarget.dataset.id, 10);

    this.setState({
      quizzes: quizzes.filter(quiz => quiz.id !== quizId)
    });
  }

  render() {
    //     const { quizzes } = this.state;
    //     console.log(quizzes);
    //     return (
    //       <div>
    //         <h2>QuizIndex Placeholder</h2>
    //         {quizzes.map(quiz => (
    //           <div key={quiz.id}>
    //             <h4>{quiz.name}</h4>
    //             <p>{quiz.description}</p>
    //             <br />
    //           </div>
    //         ))}
    //       </div>
    //     );
    const { quizzes, loading } = this.state;

    if (loading) {
      return (
        <main className="QuizIndex">
          <Container>
            <Row>
              <Col xs="6">
                <h2> Quiz Group </h2>
              </Col>
              <Col xs="6">
                <Button outline color="secondary" onClick={this.addQUiz}>
                  Add Quiz
                </Button>
              </Col>
            </Row>
            <Row>
              <Col>
                {" "}
                <h4> Loading... </h4>{" "}
              </Col>
            </Row>
          </Container>
        </main>
      );
    }

    return (
      <main className="QuizIndex">
        <Container>
          <Row>
            <Col xs="6">
              <h2> Quiz Group </h2>
            </Col>
            <Col xs="6">
              <Button outline color="secondary" onClick={this.addQUiz}>
                Add Quiz
              </Button>
            </Col>
          </Row>
          <Row>
            {quizzes.map(quiz => (
              <Col sm="6">
                <Card body key={quiz.id}>
                  <CardTitle>
                    <Link to={`/quizzes/${quiz.id}`} />
                    {quiz.name}
                  </CardTitle>
                  <CardText>
                    <p>{quiz.description}</p>
                  </CardText>
                  <button data-id={quiz.id} onClick={this.deleteQuiz}>
                    Delete
                  </button>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </main>
    );
  }
}

export default QuizIndex;
