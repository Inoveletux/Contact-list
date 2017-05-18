Flowrouter.route('/', {
name : 'home',
action() {
    BlazeLayout.render('loginForm')
    }
});

Flowrouter.route('/insertcontact', {
name : 'newcontact',
action() {
    BlazeLayout.render('addContact')
    }
});