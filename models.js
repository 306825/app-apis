let mongoose = require('mongoose');

module.exports = function (wagner){

    //await mongoose.connect(process.env.MONGODB_ATLAS_CONNECION);
    connectToMongo().catch(err=> console.log(err)).then(()=>{
        console.log('the connection is successfull');
    });

    var Lead = mongoose.model('Lead', require('./schema/leads.js'), 'leads');
    

    wagner.factory('Lead', function(){
        return Lead;
    });

    // wagner.factory('Property', function(){
    //     return Property
    // })

    return {
        Lead:Lead
    }
        

}

async function connectToMongo(){

    await mongoose.connect(process.env.MONGODB_CONNECION)
}