let mongoose = require('mongoose');
const _ = require('./../util/util.js');

let db = mongoose.connection;

module.exports = () => {

        const profile = 'sos-redacao';

    /**
     * Caso não haja uma variável de ambiente informando o endereço do banco de dados,
     * utilizar endereço local.
     */
    const db_string = process.env.MONGODB_ADDRESS || 'mongodb://empsoft:sosredacao@ds255258.mlab.com:55258/sos-redacao';
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