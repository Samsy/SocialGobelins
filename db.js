// db.js

// Module chargé des interactions avec la base Mongo.


// tableau de test
var jsonInfo = {

    "sprites": [
        "sprites/sprite-lowki93.png",
        "sprites/sprite-Sylvar.png",
        "sprites/sprite-Lory.png",
        "sprites/sprite-leo.png",
        "sprites/sprite-Samsy.png"

    ],
    // pour l'instant l'user est affecté selon l'ordre de connexion
    "usernames": [
        "Lowki93",
        "Sylvar",
        "Lory",
        "Leo",
        "Samsy"
    ],
    // dernières positions enregistrées pour chaque user
    "positions": [],

    "gamers": 0,

    "heronumber": 1
};


// Ici la connexion avec mongoDB doit se faire.
// De préférence une connexion persistante, pour ne pas à
// ré-établir la connexion à chaque chargement du module.



// Enregistre la dernière position d'un user.
exports.registerLastPosition = function(username, x, y) {
    // enregistrer x et y...
}


// Renvoie le tableau json d'un seul user.

exports.getByUsername = function(username) {
    // renvoyer les vraies données ici...
    return {
        foo : 'bar'
    };
}


// Renvoie le tableau json de tous les users (a.k.a jsonInfo)
exports.getAll = function() {
    return jsonInfo;
}