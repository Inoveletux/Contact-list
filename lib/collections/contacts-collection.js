Contacts = new Mongo.Collection("contacts");
Contacts.allow({
    insert(userId, doc) {
        // The user must be logged in and the document must be owned by the user.
        // return userId && doc.owner === userId;
        return true;
    },
    update(userId, doc, fields, modifier) {
        // Can only change your own documents.
        // return doc.owner === userId;
        return true;
    },
    remove(userId, doc) {
        // Can only remove your own documents.
        // return doc.owner === userId;
        return true;
    },
    // fetch: ['owner']
});
// Contacts.deny({
//     update(userId, doc, fields, modifier) {
//         // Can't change owners.
//         return _.contains(fields, 'owner');
//     },
//     remove(userId, doc) {
//         // Can't remove locked documents.
//         return doc.locked;
//     },
//     fetch: ['locked'] // No need to fetch `owner`
// });