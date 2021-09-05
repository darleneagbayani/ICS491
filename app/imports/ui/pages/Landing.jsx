import React from 'react';
import { useParams } from 'react-router';
import { withTracker } from 'meteor/react-meteor-data';
import { Link, Button, Container, Grid, Header, Loader, Segment } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import ListUsers from '../pages/ListUsers';
import { Redirect } from 'react-router-dom';
import CheckInStatus from '../components/Check-In/CheckInStatus';
import { CheckIn as CheckInCollection } from '../../api/check-in/CheckIn';
import PropTypes from 'prop-types';
import { Vaccine } from '../../api/Vaccine/Vaccine';
import Home from '../pages/Home';


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
          <Grid.Column mobile={16} tablet={8} computer={10}>
            <Segment className="raised" >
              <Header as="h2" textAlign="center">
                Status
              </Header>
              <Grid textAlign="center" verticalAlign="middle" centered>
                <Grid.Column textAlign="left" mobile={15} tablet={15} computer={13}>
                  <CheckInStatus
                    status={recentCheckIn ? recentCheckIn.status : 'Not Clear'}
                    vaccination={vaccineExists ? 'Approved' : 'Not Approved'}
                    health={recentCheckIn ? recentCheckIn.health : 'Not Clear'}
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
                  <Button id="btn-custom" content="Check Your Symptoms" as={NavLink} exact to={`/checkin/${username}`} />
                </Grid.Column>
              </Grid>
            </Segment>
            <Segment className="raised" >
              <Header as="h2" textAlign="center">
                Vaccination Card Submission
              </Header>
              <Grid textAlign="center" verticalAlign="middle" centered>
                <Grid.Column textAlign="left" mobile={15} tablet={15} computer={13}>
                  Your vaccine card status listed here.
                </Grid.Column>
              </Grid>
            </Segment>
          </Grid.Column>
        </Grid>
      </Container>
    );
    // if user is not logged in return landing page
    if (Meteor.userId() === null) return (
      <Grid className="ui one column grid" id='landing-page' verticalAlign='middle' textAlign='center' container>
        <Grid.Column>
          <img className="ui huge centered image" src={'/images/FULL_LOGO.png'} alt={'Image not found'} />
        </Grid.Column>
        <Grid.Column textAlign="center">
          <Button as={NavLink} exact to='/signup' id="btn-custom">
            Sign Up
          </Button>
        </Grid.Column>
        <Grid.Column textAlign="center">
          Already have an account? Sign in<NavLink exact to={'/signin'}> here.</NavLink>
        </Grid.Column>
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