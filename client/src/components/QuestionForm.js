import React from 'react';
import { Form } from 'semantic-ui-react';
import { Question } from '../lib/requests'
import AnswerShow from './AnswerShow'

class QuestionForm extends React.Component {
  constructor(props){
    super(props)
    this.addAnswer = this.addAnswer.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      numOfAnswers: 1
    }
  }

  addAnswer(){
    let numOfAnswers = this.state.numOfAnswers;
    this.setState({
      numOfAnswers: numOfAnswers + 1
    })
  }

  handleSubmit(event) {
    event.preventDefault();

    const questionBody = document.querySelector(".questionBody textarea").value
    let answerBodies = []
    document.querySelectorAll(".answerBody textarea").forEach( ab => answerBodies.push(ab.value))

    const outputObj = {
      'body': "qb",
      answers_attributes: { }
    }

    for (let i = 0; i < answerBodies.length; i += 1) {
      answers_attribute[`${i}`] = answerBodies[i]
    }

    Question.create(outputObj)
    // const formData = new FormData(event.target);
    // // const question = formData.get('question')
    // // console.log('question: ', question);
    // console.log(
    //   Array.from(formData.entries())
    // );
  //   const newQuestion = {
  //     body: formData.get('body'),
  //     quiz_id: formData.get
  //   };
  //   onSubmit(newQuestion);
  }
 render() {
  return (
    <div className='QuestionForm'>
      <Form onSubmit={this.handleSubmit}>
        {/* <Form.Field className="questionBody"
                    label='Qestion Description'
                    control='textarea'
                    row='5'
                    name='question'
        /> */}
        <div className="questionBody" >
          <label>Question</label>
          <textarea  name="question" />
        </div>
        <AnswerShow {...this.state} />
        <input className="addAnswerButton" type="button" value="Additional Answer" onClick={this.addAnswer} />


        <Form.Field className="saveQuestionButton" control='button'>Save Question</Form.Field>
      </Form>
      </div>
  )
}
}

export default QuestionForm;
