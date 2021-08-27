import React from 'react';
import { Button, Grid } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    return (
      <Grid id='landing-page' verticalAlign='middle' textAlign='center' container>
        <img className="ui centered image" src={'/images/FULL_LOGO.png'} alt={'Image not found'}/>
        <div className="ui buttons">
          <Button as={NavLink} exact to='/signin' className="ui button" id="greenButton">
                            Login
          </Button>
          <div className="or"/>
          <Button as={NavLink} exact to={'/signup'} className="ui button" id="blueButton">
                            Signup
          </Button>
        </div>
      </Grid>
    );
  }
}

export default Landing;
