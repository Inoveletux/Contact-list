//template to use the contactlist
Template.contactList.helpers({
    "listContact":function(){
        return Contacts.find({userId: Meteor.userId()}).fetch();
    }
})

//template to use the logOut button
Template.logOut.events({
    'click .logout': function(event){
        event.preventDefault();
        Meteor.logout();
        Router.go('/')
    }
});