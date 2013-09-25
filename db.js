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


exports.getJson = function() {
    return jsonInfo;
}