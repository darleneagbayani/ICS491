import React from 'react';
import { Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class UserInfo extends React.Component {
  render() {
    return (
      <Table.Row>
        <Table.Cell>{this.props.userInfo.firstName}</Table.Cell>
        <Table.Cell>{this.props.userInfo.lastName}</Table.Cell>
        <Table.Cell>
          <Link to={`/edit/${this.props.userInfo._id}`}>Edit</Link>
        </Table.Cell>
      </Table.Row>
    );
  }
}

// Require a document to be passed to this component.
UserInfo.propTypes = {
  userInfo: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(UserInfo);
