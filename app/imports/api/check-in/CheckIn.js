import { Mongo } from 'meteor/mongo';
import { Tracker } from 'meteor/tracker';
import SimpleSchema from 'simpl-schema';

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
}

export const CheckIn = new CheckInCollection();
