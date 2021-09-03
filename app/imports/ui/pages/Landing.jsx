import React from 'react';
import { useParams } from 'react-router';
import { withTracker } from 'meteor/react-meteor-data';
import { Button, Container, Grid, Header, Loader, Segment } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import ListUsers from '../pages/ListUsers';
import CheckInStatus from '../components/Check-In/CheckInStatus';
import { CheckIn as CheckInCollection } from '../../api/check-in/CheckIn';
import PropTypes from 'prop-types';
import { Vaccine } from '../../api/Vaccine/Vaccine';

/** A simple static component to render some text for the landing page. */

class Landing extends React.Component {
  render() {
    const { checkInReady, vaccineReady } = this.props;

    return (checkInReady && vaccineReady) ? this.renderPage() : <Loader active>Getting data...</Loader>;
}

  renderPage() {
    const { recentCheckIn, vaccineExists, username } = this.props;
    // if user is logged in return home page
    if (Meteor.userId()) return (
      <Container id="landing-page" style={{ padding: '50px' }}>
        <Grid textAlign="center" verticalAlign="middle" centered>
          <Grid.Column mobile={16} tablet={12} computer={10}>
            <Segment className="raised" >
              <Header as="h2" textAlign="center">
                Status
              </Header>
              <Grid textAlign="center" verticalAlign="middle" centered>
                <Grid.Column textAlign="left" mobile={15} tablet={15} computer={13}>
                  Your status listed here.
                  <CheckInStatus
                    status={recentCheckIn.status ? recentCheckIn.status : 'Not Clear'}
                    vaccination={vaccineExists ? 'Approved' : 'Not Approved'}
                    health={recentCheckIn.health ? recentCheckIn.health : 'Not Clear'}
                  />
                </Grid.Column>
              </Grid>
            </Segment>
            <Segment className="raised" >
              <Header as="h2" textAlign="center">
                Daily Check In
              </Header>
              <Grid textAlign="center" verticalAlign="middle" centered>
                <Grid.Column textAlign="left" mobile={15} tablet={15} computer={13}>
                  Don't forget to do your daily check-in.
                  Help keep our community safe by completing your daily health check-in:
                  <ol>
                    <li>Check your symptoms.</li>
                    <li>Keep track of your symptoms everyday.</li>
                  </ol>
                </Grid.Column>
              </Grid>
              <Grid textAlign="center" verticalAlign="middle" centered>
                <Grid.Column textAlign="center">
                  <Button id="btn-custom" content="Check Your Symptoms" as={NavLink} exact to={'/checkin/:username'} />
                </Grid.Column>
              </Grid>
            </Segment>
            <Segment className="raised" >
              <Header as="h2" textAlign="center">
                Vaccination Card Submission
              </Header>
              <Grid textAlign="center" verticalAlign="middle" centered>
                <Grid.Column textAlign="left" mobile={15} tablet={15} computer={13}>
                  <ListUsers/>
                </Grid.Column>
              </Grid>
            </Segment>
          </Grid.Column>
        </Grid>
      </Container >
    );
    // if user is not logged in return landing page
    if (Meteor.userId() === null) return (
      <Grid id='landing-page' verticalAlign='middle' textAlign='center' container>
        <img className="ui centered image" src={'/images/FULL_LOGO.png'} alt={'Image not found'} />
        <div className="ui buttons">
          <Button as={NavLink} exact to='/signin' className="ui button" id="greenButton">
            Login
          </Button>
          <div className="or" />
          <Button as={NavLink} exact to={'/signup'} className="ui button" id="blueButton">
            Signup
          </Button>
        </div>
      </Grid>
    );
  }
}

Landing.propTypes = {
  checkInReady: PropTypes.bool,
  vaccineReady: PropTypes.bool,
  username: PropTypes.string,
  recentCheckIn: PropTypes.object,
  vaccineExists: PropTypes.bool,
};

export default withTracker(() => {
  const checkInSubscribe = Meteor.subscribe(CheckInCollection.userPublicationName);
  const vaccineSubscribe = Meteor.subscribe(Vaccine.userPublicationName);
  const { username } = useParams();

  const recentCheckIn = CheckInCollection.getRecentCheckIn(username);
  const vaccineExists = Vaccine.recordExists(username);
  
  return {
    checkInReady: checkInSubscribe.ready(),
    vaccineReady: vaccineSubscribe.ready(),
    username,
    recentCheckIn,
    vaccineExists,
  };
})(Landing);