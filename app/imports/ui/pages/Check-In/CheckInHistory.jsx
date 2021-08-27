import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import React from 'react';
import { useParams } from 'react-router';
import PropTypes from 'prop-types';
import { Header } from 'semantic-ui-react';
import { CheckIn as CheckInCollection } from '../../../api/check-in/CheckIn';

class CheckInHistory extends React.Component {

  render() {
    return (
      <Header>Testing</Header>
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
