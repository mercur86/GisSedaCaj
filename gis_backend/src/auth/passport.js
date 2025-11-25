const passport = require('passport'),
    LocalStrategy = require('passport-local');

const db = require('../dbconexion');

const authenticate = (req, usuario, clave, done) => {
    const { mode = 'pwd' } = req.body;
    const query = 'select * from gis.fn_autenticar_usuario($1,$2,$3)';
    return db.oneOrNone(query, [usuario, clave, mode])
        .then(data => {
            return done(null, data)
        })
        .catch(error => {
            return done(null, false, { message: `Error: ${error}` });
        });
};

const saveDataOnCookie = (user, done) => {
    done(null, user);
}

const getSessionData = (user, done) => {
    done(null, user);
}

passport.use(new LocalStrategy({ passReqToCallback: true }, authenticate));
passport.serializeUser(saveDataOnCookie);
passport.deserializeUser(getSessionData);

module.exports = passport;