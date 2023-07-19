var Datastore = require('nedb')             // baza danych

var coll1 = new Datastore({                 // obiekt kolekcji
    filename: 'db/bazka.db',
    autoload: true
});

var object = {
    add: function (doc) {
        coll1.insert(doc, function (err, newDoc) {
            console.log("dodano dokument (obiekt):")
            console.log(newDoc)
            console.log("losowe id dokumentu: " + newDoc._id)
        });
    },
    get: function () {
        let promise = new Promise((resolve, reject) => {
            coll1.find({}, function (err, docs) {       // pobranie danych
                for (let i = 0; i < docs.length; i++) docs[i].id = i
                resolve(docs)
            });
        })
        return promise
    }
}
module.exports = object