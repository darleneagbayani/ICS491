import React, { useEffect } from 'react';
import { Grid, Segment, Header, Button, Loader } from 'semantic-ui-react';
import { AutoForm, HiddenField, ErrorsField, SelectField, SubmitField, TextField, DateField } from 'uniforms-semantic';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Vaccine } from '../../api/Vaccine/Vaccine';
import { imageUrl } from '../../api/imageUrls/imageUrl';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
//import { useState } from 'react'

// Create a schema to specify the structure of the data to appear in the form.
const formSchema = new SimpleSchema({
  vaccineName: {
    type: String,
    allowedValues: [
      'Pfizer-BioNTech',
      'Moderna COVID-19',
      'Janssen COVID-19 (Johnson &)',
      'AstraZeneca-AZD1222',
      'Sinopharm BIBP-SARS-CoV-2',
      'Sinovac-SARS-CoV-2',
      'Gamelya-Sputnik V',
      'CanSinoBio',
      'Vector-EpiVacCorona',
      'Zhifei Longcom-Recombinant Novel',
      'IMBCAMS-SARS-CoV-2',
    ],
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  patientNumber: {
    type: String,
  },
  firstDoseManufacturer: {
    type: String,
  },
  firstDoseDate: {
    type: Date,
  },
  firstDoseHealthcare: {
    type: String,
  },
  secondDoseManufacturer: {
    type: String,
  },
  secondDoseDate: {
    type: Date,
  },
  secondDoseHealthcare: {
    type: String,
  },
  imageUrl: {
    type: String,
  },

});


// const bridge = new SimpleSchema2Bridge(formSchema);
const bridge = new SimpleSchema2Bridge(formSchema);

/** Renders the Page for adding a document. */
class SubmitVaccine extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      imageUrl: "test",
      imageAlt: null,
    }

    this.onInputchange = this.onInputchange.bind(this);
  }

  // onInputchange(event) {
  //   this.setState({
  //     [event.target.name]: event.target.value
  //   });
  //   console.log("ONCHANGE CALLED")
  // }

  onInputchange(name) {
    return (value) => {
      this.setState({
        [name]: value
      });
      console.log("ONCHANGE CALLED");
    }
  }

  // On submit, insert the data.
  // submit(data, formRef) {
  //   // var imageUrl = this.state.imageUrl
  //   const { firstName, lastName, patientNumber, vaccineName, firstDoseManufacturer, firstDoseDate, firstDoseHealthcare, secondDoseHealthcare, secondDoseManufacturer, secondDoseDate, vaccineSite, imageUrl } = data;
  //   const owner = Meteor.user().username;
  //
  //   Vaccine.collection.insert({ firstName, lastName, patientNumber, vaccineName, firstDoseManufacturer, firstDoseDate, firstDoseHealthcare, secondDoseHealthcare, secondDoseManufacturer, secondDoseDate, vaccineSite, imageUrl, owner },
  //     (error) => {
  //       if (error) {
  //         swal('Error', error.message, 'error');
  //       } else {
  //         swal('Success', 'Item added successfully', 'success');
  //         formRef.reset();
  //       }
  //     });
  // }

  submit(data) {
    const {  firstName, lastName, patientNumber, vaccineName, firstDoseManufacturer, firstDoseDate, firstDoseHealthcare, secondDoseHealthcare, secondDoseManufacturer, secondDoseDate, vaccineSite, imageUrl, _id, } = data;
    const owner = Meteor.user().username;
    console.log( firstName)

    // Vaccine.collection.update(_id, { $set: {  firstName, lastName, patientNumber, vaccineName, firstDoseManufacturer, firstDoseDate, firstDoseHealthcare, secondDoseHealthcare, secondDoseManufacturer, secondDoseDate, vaccineSite, imageUrl, owner } }, {upsert: true},
    Meteor.call('updateWrap', owner, { firstName, lastName, patientNumber, vaccineName, firstDoseManufacturer, firstDoseDate, firstDoseHealthcare, secondDoseHealthcare, secondDoseManufacturer, secondDoseDate, vaccineSite, imageUrl, owner },
      (error) => (error ?
        swal('Error', error.message, 'error') :
        swal('Success', 'Item updated successfully', 'success')));
  }

  // state = {
  //   imageUrl: null,
  //   imageAlt: null,
  // }


  openWidget = () => {
    // create the widget
    window.cloudinary.createUploadWidget(
      {
        cloudName: 'dvg9mftur',
        uploadPreset: 'hgeg6xlm',
      },
      (error, { event, info }) => {
        if (event === 'success') {

          const owner = Meteor.user().username;
          const imageUrl = info.secure_url
          Meteor.call('updateImageUrl', owner, { owner, imageUrl })
          // Vaccine.collection.update()

          this.setState({
            imageUrl: info.secure_url,
            imageAlt: `An image of ${info.original_filename}`
          })
        }
      },
    ).open(); // open up the widget after creation
  };

  // handleChangeURL(event) {
  //   this.setState({imageURL: event.target.value});
  //   console.log("ONCHANGE CALLED")
  // }




  // imgUrlChange(value){
  //   this.setState({
  //     url: value
  //   });
  // }

  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  renderPage() {
    const { imageUrl, imageAlt } = this.state;
    let fRef = null;
    console.log("FORM IS RENDERED")
    console.log("Curent value of imageUrl is ", imageUrl)


    return (
      <Grid container centered style={{ padding: '50px 0px 0px 0px' }}>
        <Grid.Column mobile={16} tablet={12} computer={10}>
          <Segment className="raised">
            <Header as="h2" textAlign="center">Upload Vaccination Card</Header>
            <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => this.submit(data, fRef)}>
              <ErrorsField/>
              <Segment>
                <TextField name='firstName' label='First Name'/>
                <TextField name='lastName' label='Last Name'/>
                <TextField name='patientNumber' label="Patient Number (medical record or IIS record number)"/>
                <SelectField name='vaccineName' label='Vaccine Name'/>
                <TextField name='firstDoseManufacturer' label='1st Dose Manufacturer Lot Number'/>
                <DateField name='firstDoseDate' label='1st Dose Date'/>
                <TextField name='firstDoseHealthcare' label='Clinic Site Or Health Care Professional'/>
                <TextField name='secondDoseManufacturer' label='2nd Dose Manufacturer Lot Number'/>
                <DateField name='secondDoseDate' label='2nd Dose Date'/>
                <TextField name='secondDoseHealthcare' label='Clinic Site Or Health Care Professional'/>
                <Grid className="ui one column grid">
                  <Grid.Column>
                    Upload Your COVID-19 Vaccination Record Card
                  </Grid.Column>
                  <Grid.Column textAlign="center">
                    <Button type="button" className="btn widget-btn" onClick={this.openWidget}>Upload Image</Button>
                    <Grid.Column>
                      {imageUrl && (<img src={imageUrl} alt={imageAlt} id="displayed-image"/>)}
                    </Grid.Column>
                  </Grid.Column>
                </Grid>

                {/*<TextField name='imageUrl' value={this.state.imageUrl} onChange={event => this.handleChange(event.target.value)}/>*/}
                {/*<TextField name='imageUrl' value={this.state.imageUrl} onChange={this.onInputchange}/>*/}
                {/*<TextField name='imageUrl' value={this.state.imageUrl} onChange={(value) => this.onInputchange("imageUrl", value)}/>*/}
                <TextField name='imageUrl' value={this.state.imageUrl} onChange={this.onInputchange("imageUrl")}/>
                {/*<input type="text" formControlName='imageUrl' value={this.state.imageUrl} onChange={this.onInputchange}/>*/}

              </Segment>
              <Grid>
                <Grid.Column textAlign="center">
                  <SubmitField value='Submit' id="btn-custom"/>
                </Grid.Column>
              </Grid>
            </AutoForm>
          </Segment>
        </Grid.Column>
      </Grid>
    );

  }
}

SubmitVaccine.propTypes = {
  doc: PropTypes.object,
  model: PropTypes.object,
  ready: PropTypes.bool.isRequired,
  readyUrl: PropTypes.bool.isRequired,
};

export default withTracker(({ match }) => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const documentId = match.params._id;
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Vaccine.userPublicationName);
  const urlSubscription = Meteor.subscribe(imageUrl.userPublicationName)
  // Determine if the subscription is ready
  const ready = subscription.ready();
  const readyUrl = urlSubscription.ready();
  // Get the document
  const doc = Vaccine.collection.findOne(documentId);
  return {
    doc,
    ready,
    readyUrl,
  };
})(SubmitVaccine);
