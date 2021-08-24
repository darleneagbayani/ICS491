import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Roles } from 'meteor/alanning:roles';

/* eslint-disable no-console */

function createUser(email, userID, password, role) {
  console.log(`  Creating user ${email}.`);
  const userID = Accounts.createUser({
    username: userId,
    userId: userId,
    email: email,
    password: password,
  });
  if (role === 'admin') {
    Roles.createRole(role, { unlessExists: true });
    Roles.addUsersToRoles(userID, 'admin');
  }
  if (role === 'verfiedUser') {
    Roles.createRole(role, { unlessExists: true });
    Roles.addUsersToRoles(userID, 'verfiedUser');
  }
  if (role === 'unverfiedUser') {
    Roles.createRole(role, { unlessExists: true });
    Roles.addUsersToRoles(userID, 'unverfiedUser');
  }
}

// When running app for first time, pass a settings file to set up a default user account.
if (Meteor.users.find().count() === 0) {
  if (Meteor.settings.defaultAccounts) {
    console.log('Creating the default user(s)');
    Meteor.settings.defaultAccounts.map(({ email, userId, password, role }) => createUser(email, userId, password, role));
  } else {
    console.log('Cannot initialize the database!  Please invoke meteor with a settings file.');
  }
}
