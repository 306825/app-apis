const express = require('express');
const passport = require('passport');
const session = require('express-session');
const mongoose = require('mongoose');
require('dotenv').config()
console.log(process.env)
const wagner = require('wagner-core');
const MongoStore = require('connect-mongo');
var PORT;

const app = express();

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true }))

app.use(session({
    secret: 'secrete',
    store: MongoStore.create({
        //mongoUrl: 'mongodb://localhost/test',
        mongoUrl: process.env.MONGODB_CONNECTION,
        collectionName: 'sessions'
    }),
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());


//Plugging in auth service
app.use('/v1', require('./usecases/auth')(express, passport, mongoose));
//Plugging in another service
app.get('/test', (req, res) => {
    console.log('you are not logged in');
    res.send('failed')
});

main().catch(err => console.log(err));

async function main() {

    PORT = 6000;
    console.log(process.env.SERVER_ENV);
    if (process.env.SERVER_ENV == "PROD") {
        console.log(process.env.SERVER_ENV);
        PORT = 80;
    } else {
        console.log(process.env.SERVER_ENV);
        PORT = 7000;
    }
    await mongoose.connect(process.env.MONGODB_CONNECTION);
}


app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true }));

app.get('/', async (req, res) => {
    res.send('hello world');
})

app.post('/sellmycar', (req, res) => {
    const Lead = mongoose.model('Lead', require('./schema/leads.js'), 'leads');
    const sellCarLead = new Lead(req.body);
    sellCarLead.save().then((doc) => {
        console.log(doc)
        res.send(doc);
    }).catch((err) => {
        console.log(err);
    })
});

app.post('/sellmycarleads', async (req, res) => {
    const Lead = mongoose.model('Lead', require('./schema/leads.js'), 'leads');
    const sellCarLead = new Lead(req.body);
    sellCarLead.save().then((doc) => {
        console.log(doc)
        res.send(doc);
    }).catch((err) => {
        console.log(err);
    })
});

app.post('/reportaccident', async (req, res) => {
    console.log(req.body);
    const Accident = mongoose.model('Accident', require('./schema/accidents.js'), 'accidents');
    const accident = await new Accident(req.body);
    console.log(accident);
    try {

        await accident.save();
        res.json({ msg: 'Towing is being arranged' })
    } catch (error) {
        res.json(error);
    }


});

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});