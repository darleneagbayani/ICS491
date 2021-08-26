import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import React from 'react';
import { useParams } from 'react-router';
import PropTypes from 'prop-types';
import { Button, Card, Container, Grid, Header, Loader } from 'semantic-ui-react';
import { CheckIn as CheckInCollection } from '../../../api/check-in/CheckIn';

class CheckIn extends React.Component {

  handleClick() {
    console.log(this.props.username);
    CheckInCollection.collection.insert({
      owner: this.props.username,
      date: new Date(),
      status: 'Not Clear',
      vaccination: 'Not Approved',
      health: 'Clear',
    });
  }

  render() {
    return (this.props.checkInReady) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  renderPage() {
    return (
      <Container id='checkin-page'>
        <Header id='checkin-header'>Daily Check-In</Header>
        <Card id='checkin-card'>
          <Card.Content>
            <Card.Header>Status</Card.Header>
            <Card.Description>Clear -- Not Clear</Card.Description>
          </Card.Content>
          <Card.Content>
            <Card.Header>Vaccination</Card.Header>
            <Card.Description>Clear -- Not Clear</Card.Description>
          </Card.Content>
          <Card.Content>
            <Card.Header>Health Symptom</Card.Header>
            <Card.Description>Clear -- Not Clear</Card.Description>
          </Card.Content>
        </Card>
      </Container>
    );
  }
}

CheckIn.propTypes = {
  checkInReady: PropTypes.bool,
  username: PropTypes.string,
};

export default withTracker(() => {
  const checkInSubscribe = Meteor.subscribe(CheckInCollection.userPublicationName);
  const { username } = useParams();
  console.log(CheckInCollection.getHealthStatus(username, new Date()));
  return {
    checkInReady: checkInSubscribe.ready(),
    username,
  };
})(CheckIn);
