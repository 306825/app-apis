module.exports = function authentication(express, passport, mongoose) {

    const LocalStrategy = require('passport-local');
    const User = mongoose.model('User', require('../entities/userSchema')(mongoose));
    const api = express.Router();

    //Configure the strategy
    passport.use(new LocalStrategy(async (username, password, done) => {

        try {
            const user = await User.findOne({ 'username': username }).exec();
            if (user) {
                
                if (user.password == password) {
                    console.log(user.password +" "+ password);
                    return done(null, user);
                } else if (user.passpwod != passport) {
                    console.log('incorrect password');
                    return done(Error('incorrect passwrd'));
                }else{
                    return 'Opps something went wrong';
                }

            }
        } catch (error) {
            return error

        }

        User.findOne({ 'username': username }, (err, user) => {
            if (err) {
                print(err);
                return done(err, null);
            }

        });
    }));

    passport.serializeUser(function (user, cb) {
        process.nextTick(function () {
            cb(null, { id: user.id, username: user.username });
        });
    });

    passport.deserializeUser(function (user, cb) {
        process.nextTick(function () {
            return cb(null, user);
        });
    });



    api.post('/register', async (req, res, next) => {

        try {
            console.log(req.body);
            var newUser = await User.create({
                username: req.body.username,
                password: req.body.password,
                firstName: req.body.firstName,
                surname: req.body.surname,
                brokerName: req.body.brokerName,
                cellphone: req.body.cellphone
            })
            res.send(newUser);
        } catch (error) {
            res.send(error);
        }
    });

    api.post('/login', passport.authenticate('local', { failureRedirect: '/test'}), (req, res) => {
        res.send(req.user);
    });

    api.get('/test', (req, res)=>{
        console.log('you are logged in');
        res.send('failed')
    });

    api.post('/test', (req, res)=>{
        console.log('you are logged in');
        res.send('failed')
    });

    api.get('/logout', (req, res, next) => {
        req.logout((err) => {
            if (err) {
                return next(err);
            }
            res.send('<h1>You are logged out</h1>');
        })
    });

    return api;
}