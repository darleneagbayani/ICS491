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
        defaultValue: 'No submission',
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
      firstDoseManufacturer: {
        type: String,
        defaultValue: 'No submission',
      },
      firstDoseDate: {
        type: String,
        defaultValue: 'No submission',
      },
      firstDoseHealthcare: {
        type: String,
        defaultValue: 'No submission',
      },
      secondDoseManufacturer: {
        type: String,
        defaultValue: 'No submission',
      },
      secondDoseDate: {
        type: String,
        defaultValue: 'No submission',
      },
      secondDoseHealthcare: {
        type: String,
        defaultValue: 'No submission',
      },
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
      const { _id, vaccineName, firstDoseManufacturer, firstDoseDate, firstDoseHealthcare, secondDoseManufacturer, secondDoseDate, secondDoseHealthcare } = data;

      // const dateOptions = { dateStyle: 'medium', hour12: true, timeStyle: 'short' };
      const dateOptions = {  year: 'numeric', month: 'long', day: 'numeric' }
      const dateString1 = firstDoseDate.toLocaleString('default', dateOptions);
      const dateString2 = secondDoseDate.toLocaleString('default', dateOptions);

      checkInList.push({
        dateString1,
        dateString2,
        vaccineName,
        firstDoseManufacturer,
        firstDoseDate,
        firstDoseHealthcare,
        secondDoseManufacturer,
        secondDoseDate,
        secondDoseHealthcare,
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
