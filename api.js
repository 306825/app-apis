
let express = require('express');
//const res = require('express/lib/response');


module.exports = (wagner) => {
    let api = express.Router();


    api.post('/lead', wagner.invoke((Lead) => {
        return (req, res) => {
            Lead.create(req.body, (err, newlead) => {
                if (err) {
                    res.send(err);
                }
                res.json(newlead)
            });
        }
    }));

  
    return api
}