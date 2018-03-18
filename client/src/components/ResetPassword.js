import React from 'react';
import { Col, Button, Label, Input, Form, FormGroup, Alert } from 'reactstrap';

class ResetPassword extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: true
    };

    this.onDismiss = this.onDismiss.bind(this);
  }

  onDismiss() {
    this.setState({ visible: false });
  }
  

  render() {
    return (
      <div className="container">
        <main className='ResetPassword'>

          <h1>Reset Password</h1>

          <Alert color="success" isOpen={this.state.visible} toggle={this.onDismiss} className="Alert">
            <p>Password Reset Instruction has been sent to your
              email address.</p>
          </Alert>

          <Form className="form_border">
            <FormGroup row>
                <Label for="exampleEmail" sm={2}>Email</Label>
                <Col sm={10}>
                  <Input type="email" name="email" id="exampleEmail" placeholder="please enter your email address here" />
                </Col>
              </FormGroup>
            <Button>Submit</Button>
          </Form>

        </main>
      </div>
    );
  }
}

export default ResetPassword;
