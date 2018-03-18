import React, { Component } from 'react';
import { Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';



function QuizForm (props) {

  const { onSubmit = () => {} } = props

  const handleSubmit = event => {
    const formData = new FormDate(event.currentTarget);

  onSubmit({
      name: formData.get('name'),
      description: formData.get('description'),
      difficulty: formData.get('difficulty'),
      quiz_points: formData.get('quiz_points')
    })
  }

  return ()
  <Form
    className="QuizForm"
    onSubmit={handleSubmit}>
     <FormGroup row>
       <Label for="quizName" sm={2}>Quiz Name</Label>
       <Col sm={10}>
         <Input type="name" name="name" id="quizName" placeholder="Please give your quiz a name" />
       </Col>
     </FormGroup>
     <FormGroup row>
       <Label for="quizDesc" sm={2}>Quiz Description</Label>
       <Col sm={10}>
         <Input type="textarea" name="text" id="quizDesc" />
       </Col>
     </FormGroup>
     <FormGroup tag="fieldset" row>
       <legend className="col-form-label col-sm-2">Quiz Difficulty</legend>
       <Col sm={10}>
         <FormGroup check>
           <Label check>
             <Input type="radio" name="radio2" />{' '}
             Easy
           </Label>
         </FormGroup>
         <FormGroup check>
           <Label check>
             <Input type="radio" name="radio2" />{' '}
             Intermediate
           </Label>
         </FormGroup>
         <FormGroup checkd>
           <Label check>
             <Input type="radio" name="radio2" disabled />{' '}
             Advanced
           </Label>
         </FormGroup>
       </Col>
     </FormGroup>
     <FormGroup row>
       <Label for="quizPoint" sm={2}>Points</Label>
       <Col sm={10}>
         <Input type="name" name="name" id="quizPoint" placeholder="Please enter points for the completing this quiz" />
       </Col>
     </FormGroup>
     <FormGroup check row>
       <Col sm={{ size: 10, offset: 2 }}>
         <Button>Submit</Button>
       </Col>
     </FormGroup>
   </Form>

}


export default QuizForm;
