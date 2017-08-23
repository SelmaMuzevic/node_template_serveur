const express = require('express')
let app = express();

// acceder au fichier dans le dossier public qu'on a partagé sur internet et qu'on a lancé
// au serveur web 
app.use(express.static("public"));

// on a  lancer serveur web sur port 80
app.listen(80, "localhost", function() {
    console.log('Server listening on port 80!');
});