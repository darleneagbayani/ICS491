import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import React from 'react';
import { useParams } from 'react-router';
import PropTypes from 'prop-types';
import { Container, Header, Loader, Grid, Segment, Table } from 'semantic-ui-react';
import { CheckIn as CheckInCollection } from '../../../api/check-in/CheckIn';
import HistoryItem from '../../components/Check-In/HistoryItem';

class CheckInHistory extends React.Component {

  render() {
    return (this.props.checkInReady) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  renderPage() {
    const { allCheckIns } = this.props;
    return (
      <Container style={{ padding: '10px' }}>
        <Header as='h2' textAlign='center'>Daily Check-In History</Header>
        <Grid textAlign="center" >
          <Grid.Column mobile={16} tablet={8} computer={8}>
              {allCheckIns.map((checkIn) => <HistoryItem key={checkIn._id} checkIn={checkIn} />)}
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}

CheckInHistory.propTypes = {
  checkInReady: PropTypes.bool,
  allCheckIns: PropTypes.array,
};

export default withTracker(() => {
  const checkInSubscribe = Meteor.subscribe(CheckInCollection.userPublicationName);
  const { username } = useParams();
  const allCheckIns = CheckInCollection.getAllCheckIns(username);
  return {
    checkInReady: checkInSubscribe.ready(),
    allCheckIns,
  };
})(CheckInHistory);
