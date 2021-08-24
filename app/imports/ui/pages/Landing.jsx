import React from 'react';
import { Grid, Image } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    return (
      <Grid id='landing-page' verticalAlign='middle' textAlign='center' container>

          <img className="ui centered image" src={'/images/FULL LOGO.png'} alt={''}/>
          <div className="ui buttons">
              <button className="ui green button">
                  Login
              </button>
              <div className="or"/>
              <button className="ui blue button">
                  Signup
              </button>
          </div>

      </Grid>
    );
  }
}

export default Landing;
