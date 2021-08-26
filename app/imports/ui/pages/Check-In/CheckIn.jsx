import { Meteor } from 'meteor/meteor';
import React from 'react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { Header, Loader } from 'semantic-ui-react';
import { CheckIn as CheckInCollection } from '../../../api/check-in/CheckIn';

class CheckIn extends React.Component {

  render() {
    return (this.props.checkInReady) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  renderPage() {
    return (
      <Header>Daily Check-In</Header>
    );
  }
}

CheckIn.propTypes = {
  checkInReady: PropTypes.bool,
};

export default withTracker(() => {
  const checkInSubscribe = Meteor.subscribe(CheckInCollection.userPublicationName);
  return {
    checkInReady: checkInSubscribe.ready(),
  };
})(CheckIn);
