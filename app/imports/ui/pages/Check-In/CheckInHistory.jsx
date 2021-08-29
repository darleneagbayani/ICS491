import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import React from 'react';
import { useParams } from 'react-router';
import PropTypes from 'prop-types';
import { Container, Header, Loader, Table } from 'semantic-ui-react';
import { CheckIn as CheckInCollection } from '../../../api/check-in/CheckIn';
import HistoryItem from '../../components/Check-In/HistoryItem';

class CheckInHistory extends React.Component {

  render() {
    return (this.props.checkInReady) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  renderPage() {
    const { allCheckIns } = this.props;
    return (
      <Container>
        <Header as='h2' textAlign='center'>Daily Check-In History</Header>
        <Table stackable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Date</Table.HeaderCell>
              <Table.HeaderCell>Vaccination</Table.HeaderCell>
              <Table.HeaderCell>Health Symptom</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            { allCheckIns.map((checkIn) => <HistoryItem key={checkIn._id} checkIn={checkIn}/>) }
          </Table.Body>
        </Table>
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
