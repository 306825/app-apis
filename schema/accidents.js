let mongoose = require('mongoose');

var accidentSchema = new mongoose.Schema({
    make: {type: String, required: true},
    model: {type:String},
    Registration:{type:String},
    colour: {type:String},
});

module.exports = accidentSchema;
module.exports.accidentSchema = accidentSchema;