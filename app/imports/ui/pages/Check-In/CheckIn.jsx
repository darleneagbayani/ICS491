import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import React from 'react';
import { useParams } from 'react-router';
import PropTypes from 'prop-types';
import { Button, Card, Container, Header, Loader } from 'semantic-ui-react';
import { CheckIn as CheckInCollection } from '../../../api/check-in/CheckIn';

class CheckIn extends React.Component {

  constructor(props) {
    super(props);

    // bind event callbacks.
    this.handleCheckInAnswer = this.handleCheckInAnswer.bind(this);
  }

  handleCheckInAnswer(data) {
    console.log(data);
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
      </Container>
    );
  }

  renderCard() {
    return (
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
    );
  }

  renderHealthCheck() {
    return (
      <Container text>
        <Header>Covid Symptoms Checklist</Header>
        <p>
          - Have you tested positive for COVID-19 and are on home isolation?
        </p>
        <p>
          - Check for symptoms of illness: If you have any symptoms of illness,
          do not come to campus or the workplace. Do you currently have any of
          the following symptoms that are {' '}
          <i><strong>new, worsening, and not attributable to a pre-existing condition?</strong></i>
        </p>
        <ul>
          <li>Fever greater than 100.4 °F or feeling feverish (chills, sweating)</li>
          <li>Cough</li>
          <li>Shortness of breath/difficulty breathing</li>
          <li>Sore throat</li>
          <li>Unexplained muscle/body aches</li>
          <li>Nausea/vomiting or diarrhea</li>
          <li>Loss of senses of taste or smell</li>
          <li>Runny or congested nose</li>
          <li>Headache</li>
          <li>Skin rash</li>
          <li>Chest pain or pressure</li>
        </ul>
        <p>
          - Check for recent COVID-19 exposure:
        </p>
        <ul>
          <li>
            Have you traveled out of the state and are currently under quarantine orders by the {' '}
            <i><strong>Department of Health</strong></i> {' '} or {' '}
            <i><strong>your medical care provider</strong></i>?
          </li>
          <li>
            Are you unvaccinated and have been in close contact ({'< '}6 feet for ≥ 15 nutes, cumulatively, over a 24-hour period)
            with anyone who has an active, diagnosed case of COVID-19? {' '}
            <i>
              <strong>
                Note: Healthcare students/personnel wearing appropriate PPE at ALL TIMES while caring for a patient
                with COVID-19 would NOT be considered a close contact (ref. DOH medical advisory #16)
              </strong>
            </i>
          </li>
          <li>
            Has the Department of Health told you that you have been in contact with a person with COVID-19 AND you are UNvaccinated?
          </li>
        </ul>
        <Button id='checkin-answer-yes' onClick={(event, data) => this.handleCheckInAnswer(data)}>Yes</Button>
        <Button id='checkin-answer-no' onClick={this.handleCheckInAnswer}>No</Button>
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
