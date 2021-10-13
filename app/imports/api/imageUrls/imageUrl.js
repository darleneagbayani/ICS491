import { Mongo } from 'meteor/mongo';
import { Tracker } from 'meteor/tracker';
import SimpleSchema from 'simpl-schema';
import { _ } from 'lodash';

/**
 * The urlCollection. It encapsulates state and variable values for stuff.
 */

class urlCollection {
  constructor() {
    this.name = 'urlCollection';
    this.collection = new Mongo.Collection(this.name);
    this.schema = new SimpleSchema({
      owner: String,
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


  recordExists(owner) {
    const vaccineRecord = this.collection.find({ owner }).fetch();
    if (vaccineRecord.length === 0) {
      return false;
    }
    return true;
  }

  getRecentCheckIn(owner) {
    return _.last(this.collection.find({ owner }).fetch());
  }


}


export const imageUrl = new urlCollection();
