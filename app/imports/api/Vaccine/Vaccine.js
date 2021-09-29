import { Mongo } from 'meteor/mongo';
import { Tracker } from 'meteor/tracker';
import SimpleSchema from 'simpl-schema';
import { _ } from 'lodash';

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
      owner: String,
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
      }

    }, { tracker: Tracker });

    // Attach the schema to the collection, so all attempts to insert a document are checked against schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
  }

  // Returns an array containing all the check-ins from the user.
  getAllCheckIns(owner) {
    const checkIns = this.collection.find({ owner }).fetch();
    const checkInList = [];

    _.forEach(checkIns, function (data) {
      const { _id,  firstName, lastName, vaccineName, patientNumber, firstDoseManufacturer, firstDoseDate, firstDoseHealthcare, secondDoseManufacturer, secondDoseDate, secondDoseHealthcare, imageUrl } = data;

      // const dateOptions = { dateStyle: 'medium', hour12: true, timeStyle: 'short' };
      const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' }
      const dateString1 = firstDoseDate.toLocaleString('default', dateOptions);
      const dateString2 = secondDoseDate.toLocaleString('default', dateOptions);

      checkInList.push({
        dateString1,
        dateString2,
        firstName,
        lastName,
        patientNumber,
        vaccineName,
        firstDoseManufacturer,
        firstDoseDate,
        firstDoseHealthcare,
        secondDoseManufacturer,
        secondDoseDate,
        secondDoseHealthcare,
        imageUrl,
        _id,
      });
    });

    return checkInList;
  }

  // Returns the most recent check-in.
  getRecentCheckIn(owner) {
    return _.last(this.collection.find({ owner }).fetch());
  }

  recordExists(owner) {
    const vaccineRecord = this.collection.find({ owner }).fetch();
    if (vaccineRecord.length === 0) {
      return false;
    }
    return true;
  }
}


/**
 * The singleton instance of the VaccineCollection.
 * @type {VaccineCollection}
 */
export const Vaccine = new VaccineCollection();
