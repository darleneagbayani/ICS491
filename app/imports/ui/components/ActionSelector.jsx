import React from 'react';
import { Container, Image, Menu } from 'semantic-ui-react';
// eslint-disable-next-line import/no-duplicates
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
// eslint-disable-next-line import/no-duplicates
import { withRouter } from 'react-router-dom';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
class ActionSelector extends React.Component {
  render() {
    const menuStyle = { marginBottom: '15px', marginTop: '0px', border: '0px' };
    const colStyle = { backgroundColor: '#1a8945' };
    const textStyle = { color: '#FFFFFF' };
    return (
      <div>
        {this.props.currentUser ? (
          <Menu style={menuStyle} className="ui stackable three item menu">
            <Menu.Item style={colStyle} as={NavLink} activeClassName="" exact to="/">
              <Container>
                <div className="row">
                  <Image className="ui fluid middle aligned tiny image" src="/images/calendar.png"></Image>
                </div>
                <div className="row" style={textStyle}>DAILY CHECK IN</div>
              </Container>
            </Menu.Item>

            <Menu.Item style={colStyle} as={NavLink} activeClassName="" exact to="/">
              <Container>
                <div className="row">
                  <Image className="ui fluid middle aligned tiny image" src="/images/calendar.png"></Image>
                </div>
                <div className="row" style={textStyle}>DAILY CHECK IN</div>
              </Container>
            </Menu.Item>

            <Menu.Item style={colStyle} as={NavLink} activeClassName="" exact to="/">
              <Container>
                <div className="center aligned row">
                  <Image className="ui fluid middle aligned tiny image" src="/images/history.png"></Image>
                  <div className="row" style={textStyle}>VIEW HISTORY</div>
                </div>
              </Container>
            </Menu.Item>
          </Menu>
        ) : ''}
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

// export default ActionSelector;
export default withRouter(ActionSelectorContainer);
