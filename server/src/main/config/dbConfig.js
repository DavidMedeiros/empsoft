let mongoose = require('mongoose');
const _ = require('./../util/util.js');

let db = mongoose.connection;

module.exports = () => {

        const profile = 'SOS-REDACAO';

    /**
     * Caso não haja uma variável de ambiente informando o endereço do banco de dados,
     * utilizar endereço local.
     */
    const db_string = process.env.MONGODB_ADDRESS || 'mongodb://127.0.0.1:27017/' + profile;
    if (!db.readyState) {
        const conn = mongoose.connect(db_string);
    }

    db.once('error', console.error.bind(console, 'Something really strange happened...'));
    db.once('open', () => {
        db.opened = true;
        console.log('DB Ready to go! ' + db_string);
    });

    return db;
};