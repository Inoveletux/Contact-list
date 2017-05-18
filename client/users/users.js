//click to register
 if (Meteor.isClient) {
 Template.register.events({
    'submit form': function(event) {
        event.preventDefault();
        let emailVar = event.target.registerEmail.value,
            passwordVar = event.target.registerPassword.value;
            Accounts.createUser({
                email: emailVar,
                password: passwordVar
            });
    }
 });
 }

