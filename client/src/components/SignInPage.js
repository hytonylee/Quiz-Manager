import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Form } from 'semantic-ui-react';
import { Token } from '../lib/requests';

class SignInPage extends Component {
  constructor(props) {
    super(props);
  }

  createToken(event) {
    const { onSignIn = () => {} } = this.props;
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    Token.create({
      email: formData.get('email'),
      password: formData.get('password')
    }).then(data => {
      if(!data.error) {
        localStorage.setItem('jwt', data.jwt);
        onSignIn();
        this.props.history.push('/');
      } else {
        alert(data.error);
      }
    });
  }

  render() {
    return (
      <main className='SignInPage'>
        <h1>Sign In</h1>
        <form on Submit={this.createToken}>
          <Form.Field>
            <label>Email</label>
            <input palceholder='youremail@gmail.com'
                   id='email'
                   type='email'
                   name='email'
            />
          </Form.Field>

          <Form.Field>
            <label>Password</label>
            <input type='password'
                   id='password'
                   name='password'
            />
          </Form.Field>
          <Button type='submit'>Sign In</Button>
        </form>
        <div>
          {/* <Link to={'/'}>forgot password?</Link>{' '}
          <Link to={'/'}>Don't have an account? Sign up!</Link>{' '} */}
        </div>
      </main>
    );
  }

}

export default SignInPage;
