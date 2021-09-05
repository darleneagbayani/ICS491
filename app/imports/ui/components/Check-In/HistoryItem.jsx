import React from 'react';
import { Segment, Container, Grid, GridColumn } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

class HistoryItem extends React.Component {

  render() {
    const { checkIn } = this.props;
    return (
      <Container textAlign="left" style={{padding: "10px"}}>
      <Segment className="raised">
          <Grid.Column mobile={16} tablet={8} computer={10}>
            <Grid.Row>
              <Grid.Column textAlign="left"><h4>{checkIn.dateString}</h4><hr/></Grid.Column>
              </Grid.Row>
        <Grid className="ui two column grid" style={{padding: "10px 0px 0px 0px"}}>
          <Grid.Row>
            <Grid.Column textAlign="left">Vaccination: </Grid.Column>
            <Grid.Column textAlign="left">{checkIn.vaccination}</Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column textAlign="left">Health Sympton: </Grid.Column>
            <Grid.Column textAlign="left">{checkIn.health}</Grid.Column>
          </Grid.Row>
        </Grid>
          </Grid.Column>
      </Segment>
      </Container>
    );
  }
}

HistoryItem.propTypes = {
  checkIn: PropTypes.object.isRequired,
};

export default withRouter(HistoryItem);
