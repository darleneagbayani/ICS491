import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Header, Grid, Container } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

/** After the user clicks the "Signout" link in the NavBar, log them out and display this page. */
export default class Signout extends React.Component {
  render() {
    Meteor.logout();
    return (
      <Container style={{padding: '150px'}}>
      <Grid>
        <Grid.Column textAlign="center">
          <h2>You are signed out.</h2><br/>
          <NavLink exact to={'/'}>Return home.</NavLink>
        </Grid.Column>
      </Grid>
      </Container>
    );
  }
}
