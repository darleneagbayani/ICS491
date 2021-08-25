import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';
import { string } from 'prop-types';

/**
 * The VaccineCollection. It encapsulates state and variable values for stuff.
 */
class VaccineCollection {
  constructor() {
    // The name of this collection.
    this.name = 'VaccineCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      firstName: String,
      lastName: String,
      patientNumber: Number,
      firstDoseManufacturerLotNumber: String,   //MLN = Manufacturer Lot Number 
      firstDoseDate: Date,    
      secondDoseManufacturerLotNumber: String,
      secondDoseDate: Date,
      vaccineSite: String,
      owner: String,
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
        //defaultValue: 'good',
      },
    }, { tracker: Tracker });

    // Attach the schema to the collection, so all attempts to insert a document are checked against schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
  }
}

/**
 * The singleton instance of the VaccineCollection.
 * @type {VaccineCollection}
 */
export const Vaccine = new VaccineCollection();
