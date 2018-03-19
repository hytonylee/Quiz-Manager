import React from "react";
import { User } from "../lib/requests";
import { Container, Table } from "reactstrap";

class AdminDashboard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      users: []
    }
  }

  componentDidMount() {
    User
      .all()
      .then(
        users => {
          this.setState({
            users: users
          })
        }
      );
  }

  render() {
    const { users} = this.state;

    return (
      <Container>
              <p></p>
              <h1>Admin Dashboard</h1>
              <Table bordered responsive size="sm">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Total Score</th>
                    <th>Badges</th>
                  </tr>
                </thead>
              </Table>
              {
                users.map(
                  user => (
                    <Table bordered striped size="sm">
                      <tbody>
                        <tr>
                          <td>{user.first_name} {user.last_name}</td>
                          <td>{user.email}</td>
                          <td>{user.total_score}</td>
                          <td>{user.number_of_badges}</td>
                        </tr>
                      </tbody>
                    </Table>
                  )
                )
              }
      </Container>
    );
  }
}

export default AdminDashboard;
