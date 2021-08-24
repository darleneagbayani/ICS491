import React from 'react';
import { Grid, Segment, Header } from 'semantic-ui-react';
import { AutoForm, ErrorsField, NumField, SelectField, SubmitField, TextField, DateField } from 'uniforms-semantic';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Vaccine } from '../../api/Vaccine/Vaccine';

// Create a schema to specify the structure of the data to appear in the form.
const formSchema = new SimpleSchema({
      firstName: String,
      lastName: String,
      patientNumber: Number,
      firstDoseManufacturerLotNumber: String,   //MLN = Manufacturer Lot Number 
      firstDoseDate: Date,    
      secondDoseManufacturerLotNumber: String,
      secondDoeseDate: Date,
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
class AddStuff extends React.Component {

  // On submit, insert the data.
  submit(data, formRef) {
    const { firstName, lastName, patientNumber, vaccineName, firstDoseDate, firstDoseManufacturerLotNumber, secondDoseManufacturerLotNumber, secondDoeseDate, vaccineSite } = data;
    const owner = Meteor.user().username;
    Vaccine.collection.insert({ firstName, lastName, patientNumber, vaccineName, firstDoseManufacturerLotNumber, firstDoseDate, secondDoseManufacturerLotNumber, secondDoeseDate, vaccineSite, owner },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Item added successfully', 'success');
          formRef.reset();
        }
      });
  }

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  render() {
    let fRef = null;
    return (
      <Grid container centered>
        <Grid.Column>
          <Header as="h2" textAlign="center">Add Stuff</Header>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => this.submit(data, fRef)} >
            <Segment>
              <TextField name='firstName'/>
              <TextField name='lastName'/>
              <NumField name='patientNumber' decimal={false}/>
              <TextField name='firstDoseManufacturerLotNumber'/>
              <DateField name='firstDoseDate'/>
              <TextField name='secondDoseManufacturerLotNumber'/>
              <DateField name='secondDoeseDate'/>
              <SelectField name='vaccineName'/>
              <TextField name='vaccineSite'/>
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
