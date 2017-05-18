//template to create a contact
Template.addContact.onCreated(function () {
    this.showScanner = new ReactiveVar(false);
});

//template to render the contacts submited
Template.addContact.onRendered(function () {
    Meteor.subscribe('contacts-list');
    this.$('#summernote').summernote({
        height: 100,                 // set editor height
        minHeight: null,             // set minimum height of editor
        maxHeight: null,             // set maximum height of editor
        focus: true                  // set focus to editable area after initializing summernote
    });
});

//template to put your information inside variables
Template.addContact.events({
    "submit #contact_form": function (event, tpl) {
        event.preventDefault();
        let elementsVar = event.target.elements,
            dataToInsert = {
                firstname: elementsVar.first_name.value,
                name: elementsVar.last_name.value,
                phone: elementsVar.phone.value,
                address: elementsVar.address.value,
                city: elementsVar.city.value,
                zip: elementsVar.zip.value,
                comments: tpl.$('#summernote').summernote('code'),
                userId: Meteor.userId()
            };
        Contacts.insert(dataToInsert);
        Router.go('/contactlist')
    },
    'shown.bs.modal #myModal': function (event, tpl) {
        tpl.showScanner.set(true);
        qrScanner.on('scan', function (err, message) {
            if (message) {
                console.log(message);
                // Ikbel the mastah 2 to solve a metachart problem (accent were not rendered)
                message = decodeURIComponent(escape(message));
                // Heni the mastah, used to parse the text in JS object
                let vcard = JSON.parse('{"'+message.replace(/\n/g,'","').replace(/:/g,'":"').replace(/,"$/,'')+"}");
                console.log(vcard);
                $('#myModal').modal('hide');
                let splitname = vcard.N.split(";"),
                    splitaddress = vcard.ADR.split(";");
                $("#name").val(splitname[0]);
                $("#firstname").val(splitname[1]);
                $("#phone").val(vcard["TEL;CELL"]);
                $("#address").val(splitaddress[2]);
                $("#city").val(splitaddress[3]);
                $("#zip").val(splitaddress[5]);
            }
        });
    },
    // to activate the camera via the hitchcott package
    'hide.bs.modal #myModal': function (event, tpl) {
        tpl.showScanner.set(false);
    }

});

Template.addContact.helpers({
    showQRScanner: function () {
        return Template.instance().showScanner.get();
    }
});
