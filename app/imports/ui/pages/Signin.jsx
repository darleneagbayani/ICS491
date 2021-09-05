import React from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
// eslint-disable-next-line import/no-duplicates
import { withRouter } from 'react-router-dom';

import { Container, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';

/**
 * Signin page overrides the form’s submit event and call Meteor’s loginWithPassword().
 * Authentication errors modify the component’s state to be displayed
 */
 class Signin extends React.Component {

  // Initialize component state with properties for login and redirection.
  constructor(props) {
    super(props);
    this.state = { email: '', password: '', error: '', redirectToReferer: false };
  }

  // Update the form controls each time the user interacts with them.
  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  }

  // Handle Signin submission using Meteor's account mechanism.
  submit = () => {
    const { email, password } = this.state;
    Meteor.loginWithPassword(email, password, (err) => {
      if (err) {
        this.setState({ error: err.reason });
      } else {
        this.setState({ error: '', redirectToReferer: true });
      }
    });
  }

  // Render the signin form.
  render() {
    // if correct authentication, redirect to page instead of login screen
    if (this.state.redirectToReferer) {
      return <Redirect exact to={`/home/${this.state.email}`} />;
    }
    // Otherwise return the Login form.
    return (
      <Container id="signin-page" style={{padding: '50px'}}>
        <Grid textAlign="center" verticalAlign="middle" centered>
          <Grid.Column  mobile={16} tablet={8} computer={5}>
            <Form onSubmit={this.submit}>
              <Segment className="raised" >
                <Header as="h2" textAlign="center">
                  Sign In
                </Header>
                <Form.Input
                  label="Email"
                  id="signin-form-email"
                  icon="user"
                  iconPosition="left"
                  name="email"
                  type="email"
                  placeholder="E-mail address"
                  onChange={this.handleChange}
                />
                <Form.Input
                  label="Password"
                  id="signin-form-password"
                  icon="lock"
                  iconPosition="left"
                  name="password"
                  placeholder="Password"
                  type="password"
                  onChange={this.handleChange}
                />
                Don't have an account? Register<Link to="/signup"> here</Link>.
                <Container style={{padding: '10px'}} textAlign="center">
                <Form.Button  id="signin-form-submit" content="Submit" />
                </Container>
              </Segment>
            </Form>
            {this.state.error === '' ? (
              ''
            ) : (
              <Message
                error
                header="Login was not successful"
                content={this.state.error}
              />
            )}
          </Grid.Column>
        </Grid>
      </Container >
    );
  }
}


// Declare the types of all properties.
Signin.propTypes = {
  location: PropTypes.object,
  currentUser: PropTypes.string,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
const SigninContainer = withTracker(() => ({
  currentUser: Meteor.user() ? Meteor.user().username : '',
}))(Signin);

// Enable ReactRouter for this component. https://reacttraining.com/react-router/web/api/withRouter
export default withRouter(SigninContainer);

