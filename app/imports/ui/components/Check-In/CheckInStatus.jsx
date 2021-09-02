import PropTypes from 'prop-types';
import { Card } from 'semantic-ui-react';
import React from 'react';

class CheckInStatus extends React.Component {

  render() {
    const { status, vaccination, health } = this.props;
    return (
      <Card id='checkin-card'>
        <Card.Content>
          <Card.Header className='checkin-header'>Status</Card.Header>
          <Card.Description>{status}</Card.Description>
        </Card.Content>
        <Card.Content>
          <Card.Header className='checkin-header'>
              Vaccination
          </Card.Header>
          <Card.Description>{vaccination}</Card.Description>
        </Card.Content>
        <Card.Content>
          <Card.Header className='checkin-header'>
              Health Symptoms
          </Card.Header>
          <Card.Description>{health}</Card.Description>
        </Card.Content>
      </Card>
    );
  }
}

CheckInStatus.propTypes = {
  status: PropTypes.string,
  vaccination: PropTypes.string,
  health: PropTypes.string,
};

export default CheckInStatus;
