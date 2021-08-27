import React from 'react';
import { Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

class HistoryItem extends React.Component {

  render() {
    const { checkIn } = this.props;
    return (
      <Table.Row>
        <Table.Cell>{checkIn.dateString}</Table.Cell>
        <Table.Cell>{checkIn.vaccination}</Table.Cell>
        <Table.Cell>{checkIn.health}</Table.Cell>
      </Table.Row>
    );
  }
}

HistoryItem.propTypes = {
  checkIn: PropTypes.object.isRequired,
};

export default withRouter(HistoryItem);
