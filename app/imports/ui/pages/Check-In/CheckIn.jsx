import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import React from 'react';
import { useParams } from 'react-router';
import PropTypes from 'prop-types';
import { Button, Card, Container, Header, Loader, Modal } from 'semantic-ui-react';
import { CheckIn as CheckInCollection } from '../../../api/check-in/CheckIn';

class CheckIn extends React.Component {

  constructor(props) {
    super(props);
    this.state = { editClicked: false };

    // bind event callbacks.
    this.handleCheckInAnswer = this.handleCheckInAnswer.bind(this);
  }

  handleCheckInAnswer(data) {
    const health = (data.children === 'Yes') ? 'Not Clear' : 'Clear';
    CheckInCollection.collection.insert({
      owner: this.props.username,
      date: new Date(),
      status: 'Not Clear',
      vaccination: 'Not Approved',
      health,
    });
    this.setState({ editClicked: false });
  }

  render() {
    return (this.props.checkInReady) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  renderPage() {
    const { checkHealthStatus } = this.props;
    return (
      <Container id='checkin-page'>
        <Header id='checkin-header'>Daily Check-In</Header>
        { (checkHealthStatus) ? this.renderCard() : this.renderHealthCheck() }
      </Container>
    );
  }

  renderCard() {
    const { recentCheckIn } = this.props;
    return (
      <Card id='checkin-card'>
        <Card.Content>
          <Card.Header className='checkin-header'>Status</Card.Header>
          <Card.Description>{recentCheckIn.status}</Card.Description>
        </Card.Content>
        <Card.Content>
          <Card.Header className='checkin-header'>Vaccination</Card.Header>
          <Card.Description>{recentCheckIn.vaccination}</Card.Description>
        </Card.Content>
        <Card.Content>
          <Card.Header className='checkin-header'>
            Health Symptoms
            <Modal
              closeIcon
              open={this.state.editClicked}
              onOpen={() => this.setState({ editClicked: true })}
              onClose={() => this.setState({ editClicked: false })}
              trigger={<Button id='edit-button'>Edit</Button>}
            >
              <Modal.Content>{this.renderHealthCheck()}</Modal.Content>
            </Modal>
          </Card.Header>
          <Card.Description>{recentCheckIn.health}</Card.Description>
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
            Are you unvaccinated and have been in close contact ({'< '}6 feet for ≥ 15 minutes, cumulatively, over a 24-hour period)
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
        <Container id='checkin-buttons-container'>
          <Button className='checkin-answer' id='checkin-answer-yes' onClick={(event, data) => this.handleCheckInAnswer(data)}>Yes</Button>
          <Button className='checkin-answer' id='checkin-answer-no' onClick={(event, data) => this.handleCheckInAnswer(data)}>No</Button>
        </Container>
      </Container>
    );
  }
}

CheckIn.propTypes = {
  checkInReady: PropTypes.bool,
  username: PropTypes.string,
  checkHealthStatus: PropTypes.bool,
  recentCheckIn: PropTypes.object,
};

export default withTracker(() => {
  const checkInSubscribe = Meteor.subscribe(CheckInCollection.userPublicationName);
  const { username } = useParams();
  const checkHealthStatus = CheckInCollection.getHealthStatus(username, new Date());
  const recentCheckIn = CheckInCollection.getRecentCheckIn(username);
  return {
    checkInReady: checkInSubscribe.ready(),
    username,
    checkHealthStatus,
    recentCheckIn,
  };
})(CheckIn);
