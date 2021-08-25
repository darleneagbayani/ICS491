import { Roles } from 'meteor/alanning:roles';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

Meteor.methods({
  changeRoles: function (userId, role) {
    check(userId, String);
    check(role, String);

    const user = Meteor.user();

    if (!user || !Roles.userIsInRole(user, 'admin')) {
      throw new Meteor.Error('access-denied', 'Access Denied');
    }

    Roles.setUserRoles(userId, role);
  },
});