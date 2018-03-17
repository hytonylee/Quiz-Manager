
import React from "react";
import jwtDecode from "jwt-decode";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Homepage from "./components/Homepage";
import SignInPage from "./components/SignInPage";
import QuestionShow from "./components/QuestionShow";
import AuthRoute from "./components/AuthRoute";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    };
    this.signIn = this.signIn.bind(this);
    this.signOut = this.signOut.bind(this);
  }

  componentWillMount() {
    this.signIn();
  }

  signIn() {
    const jwt = localStorage.getItem("jwt");

    if (jwt) {
      const payload = jwtDecode(jwt);
      this.setState({
        user: payload
      });
    }
  }

  signOut() {
    localStorage.removeItem("jwt");
    this.setState({
      user: null
    });
  }

  isSignedIn() {
    return !!this.state.user;
  }

  render() {
    console.log(this.state.quiz);
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route exact path="/sign_in" component={SignInPage} />
          <AuthRoute
            isAuthenticated={this.isSignedIn()}
            exact
            path="/quizzes/:quizId/question/:questionId"
            component={QuestionShow}
          />
        </Switch>
      </Router>
    );
  }
}

export default App;
