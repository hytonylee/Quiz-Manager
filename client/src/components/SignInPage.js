import React, { Component } from "react";
import { Button, Form } from "semantic-ui-react";
import { Token } from "../lib/requests";

class SignInPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: []
    };

    this.createToken = this.createToken.bind(this);
  }

  createToken(event) {
    const { onSignIn = () => {} } = this.props;
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    Token.create({
      email: formData.get("email"),
      password: formData.get("password")
    }).then(data => {
      if (!data.errors) {
        localStorage.setItem("jwt", data.jwt);
        onSignIn();
        this.props.history.push("/");
      } else {
        this.setState({
          errors: [
            {
              message: "Invalid username or password"
            }
          ]
        });
      }
    });
  }

  render() {
    return (
      <main className="SignInPage">
        <h1>Sign In</h1>
        <Form onSubmit={this.createToken}>
          <Form.Field>
            <label>Email</label>

            <input
              palceholder="youremail@gmail.com"
              id="email"
              type="email"
              name="email"
            />
          </Form.Field>

          <Form.Field>
            <label>Password</label>
            <input type="password" id="password" name="password" />
          </Form.Field>
          <Button type='submit'>Sign In</Button>
        </Form>
        <div />
      </main>
    );
  }
}

export default SignInPage;
