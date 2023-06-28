let mongoose = require('mongoose');

var leadSchema = new mongoose.Schema({
    firstName: {type: String, required: true},
    surname: {type:String},
    contactNumber:{type:String},
    alternativeContact: {type:String},
    email:{type: String},
    make:{type:String},
    model: {type:String},
    mileage: {type:String},
    condition: {type:String},
    runner: {type:String},
});

module.exports = leadSchema;
module.exports.leadSchema = leadSchema;