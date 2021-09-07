import { Mongo } from 'meteor/mongo';
import { Tracker } from 'meteor/tracker';
import SimpleSchema from 'simpl-schema';
import { _ } from 'lodash';
import { compareDate } from '../utilities/Utilities';

class CheckInCollection {
  constructor() {
    this.name = 'CheckInCollection';
    this.collection = new Mongo.Collection(this.name);
    this.schema = new SimpleSchema({
      owner: String,
      date: Date,
      status: {
        type: String,
        defaultValue: 'Not Clear',
      },
      vaccination: {
        type: String,
        defaultValue: 'Not Approved',
      },
      health: {
        type: String,
        defaultValue: 'Not Clear',
      },
    }, { tracker: Tracker });
    this.collection.attachSchema(this.schema);
    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
  }

  // Returns an array containing all the check-ins from the user.
  getAllCheckIns(owner) {
    const checkIns = this.collection.find({ owner }).fetch();
    const checkInList = [];

    _.forEach(checkIns, function (data) {
      const { _id, date, status, vaccination, health } = data;

      const dateOptions = { dateStyle: 'medium', hour12: true, timeStyle: 'short' };
      const dateString = date.toLocaleString('default', dateOptions);

      checkInList.push({
        dateString,
        date,
        status,
        vaccination,
        health,
        _id,
      });
    });

    return checkInList;
  }

  // Returns the most recent check-in.
  getRecentCheckIn(owner) {
    return _.last(this.collection.find({ owner }).fetch());
  }

  // Check if the user has a record of a completed health check-in for the day.
  // Returns true if they have completed it for the day, otherwise false.
  getHealthStatus(owner, date) {
    const checkIns = this.collection.find({ owner }).fetch();
    const index = _.findIndex(checkIns, function (data) {
      return compareDate(data.date, date);
    });
    return !(index === -1);
  }
}

export const CheckIn = new CheckInCollection();