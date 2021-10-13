import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import React from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router';
import { Button, Container, Grid, Header, Loader, Segment, Image } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import CheckInStatus from '../components/Check-In/CheckInStatus';
import VaccineStatus from '../components/VaccinationStatus';
import { Vaccine as VaccineCollection } from '../../api/Vaccine/Vaccine';
import { CheckIn as CheckInCollection } from '../../api/check-in/CheckIn';
import { imageUrl as urlCollection } from '../../api/imageUrls/imageUrl';
/** A simple static component to render some text for the landing page. */



class Landing extends React.Component {

  render() {
    const { checkInReady, vaccineReady,  imageUrlReady} = this.props;
    return (checkInReady && vaccineReady && imageUrlReady)  ? this.renderPage() : <Loader active>Getting data...</Loader>;
  }

  renderPage() {
    const { recentCheckIn, vaccineCheckIn, vaccineExists, username, imageUrlCheckIn, imageUrlExists } = this.props;
    const options = { year: 'numeric', month: 'long', day: 'numeric' };


    return (
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
                    status={'status' in recentCheckIn ? recentCheckIn.status : 'Not Clear'}
                    vaccination={vaccineExists ? 'Approved' : 'Not Approved'}
                    health={'health' in recentCheckIn ? recentCheckIn.health : 'Not Clear'}
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
                  <VaccineStatus
                    vaccineName={vaccineCheckIn ? vaccineCheckIn.vaccineName : 'No Submission'}
                    firstDoseManufacturer={vaccineCheckIn ? vaccineCheckIn.firstDoseManufacturer : 'No Submission'}
                    dateString1={vaccineCheckIn ? vaccineCheckIn.firstDoseDate.toLocaleDateString('en-US', options) : 'No Submission'}
                    firstDoseHealthcare={vaccineCheckIn ? vaccineCheckIn.firstDoseHealthcare : 'No Submission'}
                    secondDoseManufacturer={vaccineCheckIn ? vaccineCheckIn.secondDoseManufacturer : 'No Submission'}
                    dateString2={vaccineCheckIn ? vaccineCheckIn.secondDoseDate.toLocaleDateString('en-US', options) : 'No Submission'}
                    secondDoseHealthcare={vaccineCheckIn ? vaccineCheckIn.secondDoseHealthcare : 'No Submission'}
                  />

                  <Image src={imageUrlExists ? imageUrlCheckIn.imageUrl : ''} fluid rounded/>

                </Grid.Column>
              </Grid>
            </Segment>
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}

Landing.propTypes = {
  checkInReady: PropTypes.bool,
  vaccineReady: PropTypes.bool,
  imageUrlReady: PropTypes.bool,
  username: PropTypes.string,
  recentCheckIn: PropTypes.object,
  vaccineCheckIn: PropTypes.object,
  imageUrlCheckIn: PropTypes.object,
  vaccineExists: PropTypes.bool,
  imageUrlExists: PropTypes.bool,
};

export default withTracker(() => {
  const checkInSubscribe = Meteor.subscribe(CheckInCollection.userPublicationName);
  const vaccineInformationSubscribe = Meteor.subscribe(VaccineCollection.userPublicationName);
  const imageUrlSubscription = Meteor.subscribe(urlCollection.userPublicationName)
  const { username } = useParams();

  const recentCheckIn = CheckInCollection.getRecentCheckIn(username);
  const vaccineCheckIn = VaccineCollection.getRecentCheckIn(username);
  const imageUrlCheckIn = urlCollection.getRecentCheckIn(username);
  const imageUrlExists = urlCollection.recordExists(username);
  const vaccineExists = VaccineCollection.recordExists(username);

  return {
    checkInReady: checkInSubscribe.ready(),
    vaccineReady: vaccineInformationSubscribe.ready(),
    vaccineInfoReady: vaccineInformationSubscribe.ready(),
    imageUrlReady: imageUrlSubscription.ready(),
    username,
    recentCheckIn,
    vaccineCheckIn,
    imageUrlCheckIn,
    vaccineExists,
    imageUrlExists,
  };
})(Landing);
