import React from 'react';
import { Button, Grid } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

/** A simple static component to render some text for the landing page. */

class Landing extends React.Component {
  render() {
    return (
      <Grid className="ui one column grid" id='landing-page'verticalAlign='middle' textAlign='center' container>
        <Grid.Column className="mobile only" style={{ padding: '80px 0px 0px 0px' }} >
          <img className="ui large centered image" src={'images/fulllogostacked.png'} alt={'Image not found'} />
        </Grid.Column>
        <Grid.Column className="computer tablet only" style={{ padding: '100px 0px 0px 0px' }} >
          <img className="ui huge centered image" src={'images/FULL_LOGO.png'} alt={'Image not found'} />
        </Grid.Column>
        <Grid.Column textAlign="center">
          <Button as={NavLink} exact to='/signup' id="btn-custom">
            Sign Up
          </Button>
        </Grid.Column>
        <Grid.Column textAlign="center">
          Already have an account? Sign in<NavLink exact to={'/signin'}> here.</NavLink>
        </Grid.Column>
      </Grid>
    );
  }
}

export default (Landing);
