
let user;
// template to use the loginForm
Template.loginForm.events({
    'submit #loginForm': function(event) {
        event.preventDefault();
        let elementsVar = event.target.elements,
            usernameVar = elementsVar.username.value,
            passwordVar = elementsVar.password.value;
        Meteor.loginWithPassword(usernameVar, passwordVar);
    },
    'submit #create-user':function(event) {
      event.preventDefault();
      let elementsVar = event.target.elements,
          user={
              username : elementsVar.username.value,
              email : elementsVar.email.value,
              password : elementsVar.password.value,
              profile:{
                  firstname : elementsVar.firstname.value,
                  lastname : elementsVar.lastname.value
              }
          };
        Accounts.createUser(user)
    }
});

export {user};