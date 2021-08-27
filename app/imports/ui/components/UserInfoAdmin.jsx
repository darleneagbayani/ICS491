import React from 'react';
import { Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';

/** Renders a single row in the List userInfo (Admin) table. See pages/ListUsersAdmin.jsx. */
class UserInfoAdmin extends React.Component {
  render() {
    return (
      <Table.Row>
        <Table.Cell>{this.props.userInfo.firstName}</Table.Cell>
        <Table.Cell>{this.props.userInfo.lastName}</Table.Cell>
        <Table.Cell>{this.props.userInfo.owner}</Table.Cell>
        <Table.Cell>
          <Link to={`/edit/${this.props.userInfo._id}`}>Edit</Link>
        </Table.Cell>
      </Table.Row>
    );
  }
}

// Require a document to be passed to this component.
UserInfoAdmin.propTypes = {
  userInfo: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    _id: PropTypes.string,
    owner: PropTypes.string,
  }).isRequired,
};

export default UserInfoAdmin;
