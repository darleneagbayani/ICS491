import React from 'react';
import { Container, Grid, Image, Menu } from 'semantic-ui-react';
import { withRouter, NavLink } from 'react-router-dom';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
class ActionSelector extends React.Component {
  render() {
    const colStyle = { backgroundColor: '#1a8945' };
    const textStyle = { color: '#FFFFFF' };
    return (
      <div className="ui stackable equal width grid" textalign='center' divided>
        <div className=" ui center aligned  column" style={colStyle}>
          <Container as={NavLink} activeClassName="active" exact to="/add" key='add'>
            <div className="row">
              <Image className="ui fluid middle aligned tiny image" src="/images/calendar.png" as={NavLink} activeClassName="active" exact to="/add" key='add'></Image>
            </div>
            <div className="row" style={textStyle}>DAILY CHECK IN</div>
          </Container>
        </div>
        <div className="ui center aligned column" style={colStyle}>
          <Container as={NavLink} activeClassName="active" exact to="/add" key='add'>
            <div className="row">
              <Image className="ui fluid middle aligned tiny image" src="/images/upload.png"></Image>

            </div>
            <div className="row" style={textStyle}>UPLOAD VACCINATION CARD</div>
          </Container>
        </div>


        <div className=" ui center aligned column" style={colStyle}>
          <Container>
            <div className="center aligned row">
              <Image className="ui fluid middle aligned tiny image" src="/images/history.png"></Image>
              <div className="row" style={textStyle}>VIEW HISTORY</div>
            </div>
          </Container>
        </div>
      </div>

    )
    ;
  }
}

export default ActionSelector;
