import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Container, Grid, Image, Menu } from 'semantic-ui-react';
import { withRouter, NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
class ActionSelector extends React.Component {
  render() {
    const menuStyle = { marginBottom: '15px', marginTop: '0px', border: '0px' };
    const colStyle = { backgroundColor: '#1a8945' };
    const textStyle = { color: '#FFFFFF' };
    return (
      <div className="ui stackable three item menu" style={menuStyle}>
        <a className="active item" style={colStyle}>
          <Container as={NavLink} activeClassName="active" exact to={`/checkin/${this.props.currentUser}`} key='add'>
            <div className="row">
              <Image className="ui fluid middle aligned tiny image" src="/images/calendar.png"></Image>
            </div>
            <div className="row" style={textStyle}>DAILY CHECK IN</div>
          </Container>
        </a>
        <a className="item" style={colStyle}>

          <Container as={NavLink} activeClassName="active" exact to="/add" key='add'>
            <div className="row">
              <Image className="ui fluid middle aligned tiny image" src="/images/calendar.png" ></Image>
            </div>
            <div className="row" style={textStyle}>DAILY CHECK IN</div>
          </Container>
        </a>
        <a className="item" style={colStyle}>
          <Container>
            <div className="center aligned row">
              <Image className="ui fluid middle aligned tiny image" src="/images/history.png"></Image>
              <div className="row" style={textStyle}>VIEW HISTORY</div>
            </div>
          </Container>
        </a>
      </div>
    );
  }
}

// Declare the types of all properties.
ActionSelector.propTypes = {
  currentUser: PropTypes.string,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
const ActionSelectorContainer = withTracker(() => ({
  currentUser: Meteor.user() ? Meteor.user().username : '',
}))(ActionSelector);

// Enable ReactRouter for this component. https://reacttraining.com/react-router/web/api/withRouter
export default withRouter(ActionSelectorContainer);
