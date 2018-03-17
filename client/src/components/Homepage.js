import React, { Component } from 'react';
import { Button, Container, Divider, Icon } from 'semantic-ui-react';
import 'bootstrap/dist/css/bootstrap.css';
import '../index.css';


class Homepage extends Component {
  render () {
    return (
      <main className="Homepage mt-5">

        <Container className="homepage-main-container">
          <Container textAlign='center' className="homepage-container mt-5">
            <h1>Welcome to CodeCore Drills</h1>
          </Container>
          <Container textAlign='center' className="homepage-container mt-3">
            <Icon name='setting' size='huge' color='red' className='m-5' />
            <Icon name='checkmark' size='huge' color='red' className='m-5' />
            <Icon name='location arrow' size='huge' color='red' className='m-5' />
          </Container>
            <Divider />
          <Container textAlign='center' className="homepage-container mt-3">
            <Button color='black' size='huge' className="btn btn-primary btn-lg">Enter</Button>
          </Container>
        </Container>

      </main>
    )
  }
}

export default Homepage
