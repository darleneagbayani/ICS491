import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Table, Header, Loader } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Vaccine } from '../../api/Vaccine/Vaccine';
import UserInfoAdmin from '../components/UserInfoAdmin';

/** Renders a table containing all of the User documents. Use <userInfo> to render each row. */
class ListUserAdmin extends React.Component {

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the page once subscriptions have been received.
  renderPage() {
    return (
      <Container>
        <Header as="h2" textAlign="center">List Users (Admin)</Header>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>firstName</Table.HeaderCell>
              <Table.HeaderCell>lastName</Table.HeaderCell>
              <Table.HeaderCell>Owner</Table.HeaderCell>
              <Table.HeaderCell>Edit</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {this.props.vaccine.map((userInfo) => <UserInfoAdmin key={userInfo._id} userInfo={userInfo} />)}
          </Table.Body>
        </Table>
      </Container>
    );
  }
}

// Require an array of user documents in the props.
ListUserAdmin.propTypes = {
  vaccine: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to User documents.
  const subscription = Meteor.subscribe(Vaccine.adminPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the User documents
  const vaccine = Vaccine.collection.find({}).fetch();
  return {
    vaccine,
    ready,
  };
})(ListUserAdmin);
