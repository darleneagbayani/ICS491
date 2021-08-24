import { Meteor } from 'meteor/meteor';
import _ from 'lodash';
import SimpleSchema from 'simpl-schema';
import BaseCollection from '../base/BaseCollection';
import { compareDates } from '../utilities/Utilities';

export const CheckInPublications = {
  checkIn: 'Check-In',
};

class CheckInCollection extends BaseCollection {
  constructor() {
    super('CheckIn', new SimpleSchema({
      email: String,
      date: Date,
      status: { type: Boolean },
    }));
  }

  define({ email, date, status }) {
    const checkinID = this._collection.insert({ email, date, status });
    return checkinID;
  }

  update(docID, { email, date, status }) {
    const data = {};
    if (email) {
      data.email = email;
    }
    if (date) {
      data.date = date;
    }
    if (_.isBoolean(status)) {
      data.status = status;
    }
    this._collection.update(docID, { $set: data });
  }

  removeIt(id) {
    const doc = this.findDoc(id);
    this._collection.remove(doc._id);
    return true;
  }

  publish() {
    if (Meteor.isServer) {
      const instance = this;
      Meteor.publish(CheckInPublications.checkIn, function publish() {
        if (this.userId) {
          const email = Meteor.users.findOne(this.userId).username;
          return instance._collection.find({ email });
        }
        return this.ready();
      });
    }
  }

  subscribe() {
    if (Meteor.isClient) {
      return Meteor.subscribe(CheckInPublications.checkIn);
    }
    return null;
  }

  getStatus(email, date) {
    const userCheckIns = this._collection.find({ email }).fetch();
    const index = _.findIndex(userCheckIns, function (data) {
      return compareDates(data.date, date);
    });
    if (index !== -1) {
      const currentCheckIn = userCheckIns[index];
      return currentCheckIn.status;
    }
    return false;
  }
}

export const CheckIn = new CheckInCollection();
