const mongoose = require('mongoose');
const _ = require('../util/util');
var Schema = mongoose.Schema;

var categorySchema = new Schema({
    content: {
        type: String,
        required: [true, "A redação nao pode ser vazia."]
    },

    comments: {
        type: String
    },

    status: {
        type: String,
        required: [true, "A redação deve ter um status."]
    },

    rateI: {
        type: Number
    },

    rateII: {
        type: Number
    },

    rateIII: {
        type: Number
    },

    rateIV: {
        type: Number
    },

    rateV: {
        type: Number
    },

});

categorySchema.static('findById', function (id, callback) {
    return this.find({_id : id}, function (err, result) {
        if(err) return callback("Não pôde recuperar redação. Invalid id.", null);
        if(_.isEmpty(result)) return callback("Não há redação com id informado.", null);
        return callback(err, _.first(result));
    });
});

categorySchema.pre('validate', function(next){
   //Construir validação adicional aqui caso desejado
    next();
});

categorySchema.pre('save', function (next) {
    // http://stackoverflow.com/questions/7327296/how-do-i-extract-the-created-date-out-of-a-mongo-objectid
    this.createDate = this._id.getTimestamp().getTime();
    this.editDate = Date.now();
    next();
});

categorySchema.post('save', function(err, doc, next) {
    if (err.name === 'ValidationError') {
        return next(new Error(err.message || err));
    }
    return next(err);
});

module.exports = mongoose.model('Redacao', categorySchema);