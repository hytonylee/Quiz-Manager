import React from 'react';
import { User } from '../lib/requests';
import { ListGroup, ListGroupItem, Container, Row, Col } from 'reactstrap';

class Leaderboard extends React.Component {
  constructor (props) {
    super(props)
    this.state= {
      users: [],
      loading: true
    }
  }

  comonentDidMount () {
    User
      .all()
      .then(
        users => {
          this.setState({
            users: users,
            loading: false
          });
        }
      );
  }

  render() {
    const { users, loading } = this.state;
    return (
      <Container>
        <Row>
          <Col xs="8">
            <ListGroup>
              <h1>Leaderboard</h1>
              {
                users.map(
                  user => (
                    <ListGroupItem>`${user.first_name}: ${user.total_score}`</ListGroupItem>
                  )
                )
              }
            </ListGroup>
          </Col>
          <Col xs="4">
            <div className="profile-box">
              <h1>Profile Name</h1>
              <p>500 Points</p>
              <p>5 Badgets</p>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Leaderboard
