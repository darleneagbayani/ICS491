import React from 'react';
import { Grid, Segment, Header } from 'semantic-ui-react';
import { AutoForm, ErrorsField, NumField, SelectField, SubmitField, TextField, DateField } from 'uniforms-semantic';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Vaccine } from '../../api/Vaccine/Vaccine';
import S3FileUpload from 'react-s3';
import * as Buffer from "Buffer";
import { useState } from 'react'

// Create a schema to specify the structure of the data to appear in the form.
const formSchema = new SimpleSchema({
  firstName: String,
  lastName: String,
  patientNumber: Number,
  firstDoseManufacturerLotNumber: String,   //MLN = Manufacturer Lot Number
  firstDoseDate: Date,
  secondDoseManufacturerLotNumber: String,
  secondDoseDate: Date,
  vaccineSite: String,
  vaccineName: {
    type: String,
    allowedValues: ['Pfizer-BioNTech',
      'Moderna COVID-19',
      'Janssen COVID-19 (Johnson &)',
      'AstraZeneca-AZD1222',
      'Sinopharm BIBP-SARS-CoV-2',
      'Sinovac-SARS-CoV-2',
      'Gamelya-Sputnik V',
      'CanSinoBio',
      'Vector-EpiVacCorona',
      'Zhifei Longcom-Recombinant Novel',
      'IMBCAMS-SARS-CoV-2'
    ],
  },
});

const bridge = new SimpleSchema2Bridge(formSchema);

/** Renders the Page for adding a document. */
class SubmitVaccine extends React.Component {

  // On submit, insert the data.
  submit(data, formRef) {
    const { firstName, lastName, patientNumber, vaccineName, firstDoseDate, firstDoseManufacturerLotNumber, secondDoseManufacturerLotNumber, secondDoseDate, vaccineSite } = data;
    const owner = Meteor.user().username;
    Vaccine.collection.insert({ firstName, lastName, patientNumber, vaccineName, firstDoseManufacturerLotNumber, firstDoseDate, secondDoseManufacturerLotNumber, secondDoseDate, vaccineSite, owner },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Item added successfully', 'success');
          formRef.reset();
        }
      });
  }

  state = {
    imageUrl: null,
    imageAlt: null,
  }


  openWidget = () => {
    // create the widget
    window.cloudinary.createUploadWidget(
      {
        cloudName: 'dvg9mftur',
        uploadPreset: 'hgeg6xlm',
      },
      (error, { event, info }) => {
        if (event === 'success') {
          this.setState({
            imageUrl: info.secure_url,
            imageAlt: `An image of ${info.original_filename}`
          })
        }
      },
    ).open(); // open up the widget after creation
  };

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  render() {
    const { imageUrl, imageAlt } = this.state;
    let fRef = null;
    return (
      <Grid container centered>
        <Grid.Column>
          <Header as="h2" textAlign="center">UPLOAD VACCINATION CARD</Header>

          <section className="right-side">
            <button type="button" className="btn widget-btn" onClick={this.openWidget}>Upload Image</button>
            <p>The resulting image will be displayed here</p>
            {imageUrl && (<img src={imageUrl} alt={imageAlt} className="displayed-image"/>)}
          </section>

          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => this.submit(data, fRef)}>
            <Segment>
              <TextField name='firstName' label='First Name'/>
              <TextField name='lastName' label='Last Name'/>
              <NumField name='patientNumber' label="Patient Number (medical record or IIS record number)" decimal={false}/>
              <SelectField name='vaccineName' label='Vaccine Name'/>
              <TextField name='firstDoseManufacturerLotNumber' label='1st Dose Manufacturer Lot Number'/>
              <DateField name='firstDoseDate' label='1st Dose Date'/>
              <TextField name='secondDoseManufacturerLotNumber' label='2nd Dose Manufacturer Lot Number'/>
              <DateField name='secondDoseDate' label='2nd Dose Date'/>
              <TextField name='vaccineSite' label='Clinic Site Or Helath Care Professional'/>
              <SubmitField value='Submit'/>
              <ErrorsField/>
            </Segment>
          </AutoForm>
        </Grid.Column>
      </Grid>
    );
  }
}

export default SubmitVaccine;
