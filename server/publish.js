
Meteor.publish('contacts-list', function () {
    return Contacts.find({});
});