import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Card, Loader } from 'semantic-ui-react';
import { CheckIn as CheckInCollection } from '../../api/check-in/CheckInCollection';

function CheckIn({ checkInReady, email, currentStatus }) {

  return (!checkInReady) ?
    <Loader active>Loading Page</Loader> :
    <div>
      <Card>
        <Card.Header>Daily Check-In</Card.Header>
        <Card.Content>
          {currentStatus ? 'Clear' : 'Not Clear'}
        </Card.Content>
      </Card>
    </div>;
}

CheckIn.propTypes = {
  checkInReady: PropTypes.bool,
  email: PropTypes.string,
  currentStatus: PropTypes.bool,
};

export default withTracker(({ match }) => {
  const checkInSubscribe = CheckInCollection.subscribe();
  const email = match.params._id;
  const currentDate = new Date();
  const currentStatus = CheckInCollection.getStatus(email, currentDate);
  return {
    checkInReady: checkInSubscribe.ready(),
    email,
    currentStatus,
  };
})(CheckIn);
