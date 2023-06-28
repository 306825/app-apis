module.exports = function(mongoose){

    const carSchema = new mongoose.Schema({
        make: String,
        model: String,
        registration: String,
        licenseRenewDate: Date,
        images:[String] //Add AI to check dents and scratches
      });
    const UserSchema = new mongoose.Schema({
        username: {
            type: String,
            required: true
        },
        password: {
            type: String,
            require: true
        },
        firstName:{
            type: String,
            required: false
        },
        surname:{
            type: String,
            required: false
        },
        brokerName:{
            type: String,
            required: false
        },
        cellphone:{
            type: String,
            required: false
        },
        vehicles:{
            type:[carSchema]
        },
        AccountBalance:{
            type: Number,
            default: 0
        }
    })

    return UserSchema;
}