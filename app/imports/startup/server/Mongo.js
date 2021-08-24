import { Meteor } from 'meteor/meteor';
import { Stuffs } from '../../api/stuff/Stuff.js';
import { CheckIn } from '../../api/check-in/CheckInCollection';

/* eslint-disable no-console */

function addCheckIn(data) {
  console.log(`  Adding: ${data.status} status for ${data.email} on ${data.date}`);
  CheckIn.define(data);
}

if (CheckIn.find({}).count() === 0) {
  if (Meteor.settings.defaultCheckIn) {
    console.log('Creating default check-ins');
    Meteor.settings.defaultCheckIn.map(data => addCheckIn(data));
  }
}

// Initialize the database with a default data document.
function addData(data) {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Stuffs.collection.insert(data);
}

// Initialize the StuffsCollection if empty.
if (Stuffs.collection.find().count() === 0) {
  if (Meteor.settings.defaultData) {
    console.log('Creating default data.');
    Meteor.settings.defaultData.map(data => addData(data));
  }
}


