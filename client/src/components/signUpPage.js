import React from 'react';
import { Form, Input, Button } from 'semantic-ui-react';
// import {User} from '../lib/requests';

function SignUpPage(props) {
  const {onSignUp = () => {} } = props
  // Another way of writing the same thing:
  // function emptyFunction() {}
  // const onSubmit = props.onSubmit || emptyFunction;
  function handleSubmit(event){
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    User.create({
      first_name: formData.get('form-input-control-first-name'),
      last_name: formData.get('form-input-control-last-name'),
      email: formData.get('form-imput-control-email'),
      password: formData.get('form-imput-control-password'),
      password_confirmation: formData.get('form-imput-control-password-confirmation')
    }).then(data => {
      if(!data.error) {
        const jwt = data.jwt;
        localStorage.setItem('jwt', jwt);
        onSignUp();
        props.history.push('/');
      }
    });
  }

  return(
    <div>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <Form.Group widths='equal'>
          <Form.Field id='form-input-control-first-name'
                      control={Input}
                      label='First name'
                      placeholder='First name'
          />
          <Form.Field id='form-imput-control-last-name'
                      control={Input}
                      label='Last name'
                      placeholder='Last name'
          />
          </Form.Group>

            <Form.Field id='form-imput-control-email'
                        control={Input}
                        label='Email'
                        placeholder='youremail@gmail.com'
            />
          <Form.Group widths='equal'>
            <Form.Field id='form-imput-control-password'
                        control={Input}
                        label='Password'
                        type='password'
            />
            <Form.Field id='form-imput-control-password-confirmation'
                        control={Input}
                        label='Password Confirmation'
                        type='password'
            />
          </Form.Group>
            <Form.Field id='form-button-control-public'
                        control={Button}
                        content='Create Account'
                        //label='Label with htmlFor'
            />
      </form>
    </div>
  )
}

export default SignUpPage;
