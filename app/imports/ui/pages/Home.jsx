import React from 'react';
import { Button, Grid } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
/** A simple static component to render some text for the landing page. */

class Home extends React.Component {
    constructor(props) {
        super(props);
    }
  render() {
    return (
      <Grid id='home-page' verticalAlign='middle' textAlign='center' container>
        TEST HOME PAGE (LOGGED IN USER)
      </Grid>
    );
  }
}

export default Home;
