import React, { Component } from "react";
import { Quiz, QuizTaken } from "../lib/requests";
import { Link } from "react-router-dom";
import { Card, Button, Container } from "semantic-ui-react";


class QuizIndex extends Component {
  constructor(props) {
    super(props);

    this.state = {
      quizzes: [],
      quizTakens: []
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

  findQuiz(id) {}

  allQuizzes() {
    Quiz.all.then(quizzes => {
      this.setState({
        quizzes: quizzes
      });
    });
  }

  filterQuizzes(event) {
    QuizTaken.all(39).then(quizzes => {
      console.log(quizzes);
    });
  }

  deleteQuiz(event) {
    const { currentTarget } = event;
    let quizId = currentTarget.id;
    Quiz.delete(quizId).then(quizzes => this.setState({ quizzes }));
  }

  render() {
    const { quizzes } = this.state;
    const { user } = this.props;

    if (user.is_admin) {
      return (
        <Container>
          <Button
            basic
            floated="right"
            color="blue"
            style={{
              marginTop: "20px",
              marginBottom: "20px"
            }}
          >
            New Quiz
          </Button>
          <div
            className="ui two buttons"
            style={{
              marginTop: "75px",
              marginLeft: "25px",
              borderRadius: "0px",
              display: "flex",
              alignItems: "center"
            }}
          />
          <main
            className="QuizIndex"
            style={{
              display: "flex",
              flexWrap: "wrap",
              flexDirection: "row",
              justifyContent: "center"
            }}
          >
            <div
              style={{
                width: "1100px",
                borderRadius: "10px",
                border: "1px solid grey",
                display: "flex",
                flexWrap: "wrap",
                flexDirection: "row",
                justifyContent: "center"
              }}
            >
              {quizzes.map(quiz => (
                <Card
                  key={quiz.id}
                  style={{
                    minWidth: "240px",
                    margin: "10px"
                  }}
                >
                  <Card.Content header={quiz.name} />
                  <Card.Content description={quiz.description} />
                  <Card.Content extra>
                    <div className="ui two buttons">
                      <Button id={quiz.id} basic color="green">
                        View/Edit
                      </Button>
                      <Button
                        id={quiz.id}
                        basic
                        color="red"
                        onClick={this.deleteQuiz}
                      >
                        Delete
                      </Button>
                    </div>
                  </Card.Content>
                </Card>
              ))}
            </div>
          </main>
        </Container>

      );
    } else {
      return (
        <Container>
          <div
            className="ui two buttons"
            style={{
              marginTop: "75px",
              marginLeft: "25px",
              borderRadius: "0px",
              display: "flex",
              alignItems: "center"
            }}
          >
            <Button
              style={{ maxWidth: "150px", margin: "2px" }}
              onClick={this.filterQuizzes}
            >
              My Quizzes
            </Button>
            <Button.Or />
            <Button
              style={{ maxWidth: "150px", margin: "2px" }}
              onClick={this.allQuizzes}
            >
              All Quizzes
            </Button>
          </div>
          <main
            className="QuizIndex"
            style={{
              display: "flex",
              flexWrap: "wrap",
              flexDirection: "row",
              justifyContent: "center"
            }}
          >
            <div
              style={{
                width: "1100px",
                borderRadius: "10px",
                border: "1px solid grey",
                display: "flex",
                flexWrap: "wrap",
                flexDirection: "row",
                justifyContent: "center"
              }}
            >
              {quizzes.map(quiz => (
                <Card
                  key={quiz.id}
                  style={{
                    minWidth: "240px",
                    margin: "10px"
                  }}
                >
                  <Card.Content header={quiz.name} />
                  <Card.Content description={quiz.description} />
                  <Card.Content extra style={{ textAlign: "center" }}>
                    <strong>
                      Taken: {3} times | Score {34}%
                    </strong>
                  </Card.Content>

                  <Card.Content extra>
                    <div className="ui two buttons">
                      <Button id={quiz.id} basic color="green">
                        Start
                      </Button>
                      <Button id={quiz.id} basic color="red">
                        Remove
                      </Button>
                    </div>
                  </Card.Content>
                  <Card.Content extra>
                    <div>
                      <Button id={quiz.id} basic fluid color="green">
                        Add to My Quizzes
                      </Button>
                    </div>
                  </Card.Content>

                </Card>
              ))}
            </div>
          </main>
        </Container>
      );
    }
  }
}

export default QuizIndex;
