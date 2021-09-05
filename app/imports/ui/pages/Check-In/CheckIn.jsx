import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import React from 'react';
import { useParams } from 'react-router';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import swal from 'sweetalert';
import { Segment, Button, Container, Grid, Header, Loader, GridColumn } from 'semantic-ui-react';
import { CheckIn as CheckInCollection } from '../../../api/check-in/CheckIn';
import { Vaccine } from '../../../api/Vaccine/Vaccine';

class CheckIn extends React.Component {

  constructor(props) {
    super(props);
    this.state = { editClicked: false };

    // bind event callbacks.
    this.handleCheckInAnswer = this.handleCheckInAnswer.bind(this);
  }

  handleCheckInAnswer(data) {
    const health = (data.children === 'No') ? 'Clear' : 'Not Clear';
    const vaccination = (this.props.vaccineExists) ? 'Approved' : 'Not Approved';
    const status = (data.children === 'No' && this.props.vaccineExists) ? 'Clear' : 'Not Clear';

    CheckInCollection.collection.insert({
      owner: this.props.username,
      date: new Date(),
      status,
      vaccination,
      health,
    },
    (error) => {
      if (error) {
        swal('Error', error.message, 'error');
      } else {
        const yesMessage = 'You are NOT clear of health symptoms and must stay home.';
        const noMessage = 'You are clear of health symptoms!';
        swal('Success', data.children === 'No' ? noMessage : yesMessage, 'success');
      }
    });

    this.setState({ editClicked: false });
  }

  render() {
    const { checkInReady, vaccineReady } = this.props;
    return (checkInReady && vaccineReady) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  renderPage() {
    return (
      <Container id='checkin-page' style={{ padding: '50px' }}>
      <Grid textAlign="left" verticalAlign="middle" textAlign="center">
        <Segment className="raised" >
        <Header as='h2' id='checkin-header 'textAlign="center">Daily Check-In</Header>
        <Container textAlign="left" text>
          <Header id='checkin-health-header' textAlign="center">Covid Symptoms Checklist</Header>
          <Grid textAlign="center">
            <Grid.Column mobile={16} tablet={12} computer={14} textAlign="left">
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
          </Grid.Column>
          </Grid>
          <Container id='checkin-buttons-container'>
            <Button className='checkin-answer' id='checkin-answer-yes' onClick={(event, data) => this.handleCheckInAnswer(data)}>Yes</Button>
            <Button className='checkin-answer' id='checkin-answer-no' onClick={(event, data) => this.handleCheckInAnswer(data)}>No</Button>
          </Container>
        </Container>
        </Segment>
        </Grid>
      </Container>
    );
  }
}

CheckIn.propTypes = {
  checkInReady: PropTypes.bool,
  vaccineReady: PropTypes.bool,
  username: PropTypes.string,
  vaccineExists: PropTypes.bool,
};

export default withTracker(() => {
  const checkInSubscribe = Meteor.subscribe(CheckInCollection.userPublicationName);
  const vaccineSubscribe = Meteor.subscribe(Vaccine.userPublicationName);
  const { username } = useParams();

  const vaccineExists = Vaccine.recordExists(username);
  return {
    checkInReady: checkInSubscribe.ready(),
    vaccineReady: vaccineSubscribe.ready(),
    username,
    vaccineExists,
  };
})(CheckIn);