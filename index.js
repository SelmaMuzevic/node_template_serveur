const fs = require('fs');
const express = require('express');
const mustache = require('mustache');

let db = ["Toto", "Tata", "Titi", "John", "Tutu"];

let app = express();

app.get("/", function(req, resp) {
    resp.render('index', {
        name: 'Selma',
        adjective: 'happy',
        nameList: db,
        nameList2: tab
    });

});
// tableau qui contien 3 objets, qui contiennes des proprietes et des valeurs 
// et contenu dans une variable appellé 'tab'
let tab = [{
        event: "soleil",
        place: "Lyon",
        date: "2016-03-12"
    },
    {
        event: "printemps",
        place: "Paris",
        date: "2016-05-11"
    },
    {
        event: "cuisine",
        place: "Miami",
        date: "2006-03-06"
    }
];

app.get("/test", function(req, resp) {
    let str = mustache.render("Hello {{name}}!!! You are awesome!", {
        name: "Selma"
    });
    resp.send(str)
});
// creation de template engine a express
app.engine("html", function(path, options, callback) {
    // ouverture de fichier, on appelle une function quand on accede au fichier
    fs.readFile(path, function(err, content) {

        // on test si il y a l'erreur, on return function callback
        if (err) {
            console.error("fail to open template:", err);
            return callback(err);
        }
        // si tout vas bien, le mustache prend le contenu de fichier et les options
        let str = mustache.render(content.toString(), options);

        // pas d'erreur, et on donne des donnees str
        return callback(null, str);
    })
});


// specifier les directory
app.set("views", "./template");

// enregistrer la machine template
app.set("view engine", "html");

app.use(express.static("public"));
// on a  lancer serveur web sur port 80
app.listen(80, "localhost", function() {
    console.log('Server listening on port 80!');
});