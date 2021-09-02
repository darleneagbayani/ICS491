import React from 'react';
import { Container, Button, Grid, Segment, Header } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

/** A simple static component to render some text for the landing page. */

class VaccineStatus extends React.Component {
    render() {
        // if user is logged in return home page
        if (Meteor.userId()) return (
            <Container id="vaccine-status-page" style={{ padding: '50px' }}>
                <Grid textAlign="center" verticalAlign="middle" centered>
                    TEST
                </Grid>
            </Container>
        );
    }
}

export default VaccineStatus;