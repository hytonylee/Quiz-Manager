import React, { Component } from 'react';
import { Quiz } from '../lib/requests';
import { Redirect } from 'react-router'
import { Radio, Form, Container, TextArea} from 'semantic-ui-react';
import QuizShow from './QuizShow';

class QuizEdit extends Component {
  constructor (props) {

    super(props);
    // this.createQuiz = this.createQuiz.bind(this);
    const EditId = this.props.match.params.quizId;
    console.log(Quiz.one(this.props.match.params.quizId));

    this.state = {
      name: "",
      description: "",
      difficulty: "",
      points: 0
    }
    this.handleSubmit = this.handleSubmit.bind(this);

    Quiz.one(this.props.match.params.quizId).then(quiz => {
      this.setState({
        name: quiz.name,
        description: quiz.description,
        difficulty: quiz.difficulty,
        points: quiz.quiz_points
      })
    })
  }

  componentDidMount() {
    Quiz.one(this.props.match.params.quizId).then((data) => {
      this.setState( state => {
        state.Quiz = data;
        return state;
      });
    })
    .cath((err) => {
      console.err('err',err);
    });
  }




  handleChange = (e, { value }) => this.setState({ value })

  handleSubmit(data) {
    const { onSignUp = () => {} } = this.props;
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    // debugger
    Quiz.create({
      quiz: {
        name: formData.get("name"),
        description: formData.get("description"),
        difficulty: formData.get("difficulty"),
        quiz_points: formData.get("quiz_points"),
      }
    }).then(data => {

      if (!data.errors) {
        // const jwt = data.jwt;
        // localStorage.setItem("jwt", jwt);
        // onSignUp();
        // debugger
        // history.push("/quizzes");
        // return <Redirect to="/" push={true} />
        this.props.history.push(`/quizzes/${data.id}/questions`);

      }
    });
  }


  componentDidMount

  render() {
    const { value } = this.state
    return (
      <Container>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group widths='equal'>
            <Form.Input fluid label='Quiz name' value={this.state.name} placeholder='ex. JavaScript Recurring Method'  name="name" />
            <Form.Input fluid label='Points' value={this.state.points} placeholder='ex. 800' name="quiz_points" />
          </Form.Group>
          <Form.Group inline>
          <label>Difficulty</label>
          <Form.Field control={Radio} label='Beginner' value='1'  onChange={this.handleChange} name="difficulty" checked={this.state.difficulty === "Beginner" ? "checked": ""} />
          <Form.Field checked={this.state.difficulty === "Intermediate" ? "checked": ""} control={Radio} label='Intermediate' value='2' onChange={this.handleChange} name="difficulty"/>
          <Form.Field checked={this.state.difficulty === "Advanced" ? "checked": ""} control={Radio} label='Advanced' value='3'  onChange={this.handleChange} name="difficulty"/>
        </Form.Group>
          <Form.TextArea label='Description' value={this.state.description}  placeholder='Description on the quiz.' name="description"/>
          <Form.Button>Submit</Form.Button>
        </Form>
      </Container>
    )
  }
}

export default QuizEdit;
