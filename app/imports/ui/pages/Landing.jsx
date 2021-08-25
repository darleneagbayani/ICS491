import React from 'react';
import { Grid } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    return (
      <Grid id='landing-page' verticalAlign='middle' textAlign='center' container>
        <img className="ui centered image" src={'/images/FULL LOGO.png'} alt={'Image not found'}/>
        <div className="ui buttons">
          <button className="ui button" id="greenButton">
                  Login
          </button>
          <div className="or"/>
          <button className="ui button" id="blueButton">
                  Signup
          </button>
        </div>
      </Grid>
    );
  }
}

export default Landing;
