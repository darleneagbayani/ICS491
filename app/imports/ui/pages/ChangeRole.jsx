import React from 'react';
import { Grid, Segment, Header } from 'semantic-ui-react';
import { AutoForm, ErrorsField, SubmitField, SelectField, TextField } from 'uniforms-semantic';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';

const options = [
  { label: 'Verified User', value: 'verifiedUser' },
  { label: 'Unverified User', value: 'unverifiedUser' },
  { label: 'Admin', value: 'admin' },
];

const formSchema = new SimpleSchema({
  userId: String,
  role: {
    type: String,
    allowedValues: ['verifiedUser', 'unverifiedUser', 'admin'],
  },
});

const bridge = new SimpleSchema2Bridge(formSchema);

/** Renders the Page for adding a document. */
class ChangeRole extends React.Component {

  /** On submit, insert the data. */
  submit(data, formRef) {
    const { role, userId } = data;
    if (this.props.users.find(user => user.username === userId)) {
      const user1 = this.props.users.find(user => user.username === userId);
      Meteor.call("changeRoles", user1._id, role);
      swal('Success', 'Role Updated successfully', 'success');
      formRef.reset();
    } else {
      swal('Error', 'Role NOT Updated successfully', 'error');
    }
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  render() {
    const changeRolePage = { paddingTop: '15px', paddingBottom: '20px' };
    let fRef = null;
    return (
        <Grid container centered style={changeRolePage} id='editrole-page'>
          <Grid.Column>
            <Header as="h2" textAlign="center">Verify Users</Header>
            <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => this.submit(data, fRef)} >
              <Segment>
                <TextField name='userId'/>
                <SelectField name="role" options={options} />
                <SubmitField value='Submit'/>
                <ErrorsField/>
              </Segment>
            </AutoForm>
          </Grid.Column>
        </Grid>
    );
  }
}

/** Require the presence of a Stuff document in the props object. Uniforms adds 'model' to the props, which we use. */
ChangeRole.propTypes = {
  users: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('adminPermission');
  return {
    users: Meteor.users.find({}).fetch(),
    ready: subscription.ready(),
  };
})(ChangeRole);