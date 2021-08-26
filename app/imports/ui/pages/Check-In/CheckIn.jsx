import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import React from 'react';
import { useParams } from 'react-router';
import PropTypes from 'prop-types';
import { Button, Grid, Header, Loader } from 'semantic-ui-react';
import { CheckIn as CheckInCollection } from '../../../api/check-in/CheckIn';

class CheckIn extends React.Component {

  handleClick() {
    console.log(this.props.username);
  }

  render() {
    return (this.props.checkInReady) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  renderPage() {
    return (
      <Grid>
        <Grid.Row>
          <Header>Daily Check-In</Header>
        </Grid.Row>
        <Grid.Row>
          <Button onClick={this.handleClick.bind(this)}>Check Status</Button>
        </Grid.Row>
      </Grid>
    );
  }
}

CheckIn.propTypes = {
  checkInReady: PropTypes.bool,
  username: PropTypes.string,
};

export default withTracker(() => {
  const checkInSubscribe = Meteor.subscribe(CheckInCollection.userPublicationName);
  const { username } = useParams();
  console.log(CheckInCollection.getStatus(username));
  return {
    checkInReady: checkInSubscribe.ready(),
    username,
  };
})(CheckIn);
