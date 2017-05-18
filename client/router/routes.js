// Routes of the app

Router.route('/', function () {
    this.render('index');
});

Router.route('/contactlist', function () {
    this.render('contactList');
});

Router.route('/addcontact', function () {
    this.render('addContact');
});