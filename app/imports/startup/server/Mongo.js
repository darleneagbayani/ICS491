import { Meteor } from 'meteor/meteor';
import { Vaccine } from '../../api/Vaccine/Vaccine.js';

/* eslint-disable no-console */

// Initialize the database with a default data document.
function addData(data) {
  console.log(`  Adding: ${data.firstName} (${data.owner})`);
  Vaccine.collection.insert(data);
}

// Initialize the VaccineCollection if empty.
if (Vaccine.collection.find().count() === 0) {
  if (Meteor.settings.defaultData) {
    console.log('Creating default data.');
    Meteor.settings.defaultData.map(data => addData(data));
  }
}