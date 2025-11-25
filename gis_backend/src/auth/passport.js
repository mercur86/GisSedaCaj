const passport = require('passport'),
    LocalStrategy = require('passport-local');

const db = require('../dbconexion');
const authenticate = (req, usuario, clave, done) => {
    const { mode = 'pwd' } = req.body;
    const query = 'select * from gis.fn_autenticar_usuario($1,$2,$3)';

    console.log('--- INICIO AUTENTICACIÓN ---');
    console.log('Parámetros recibidos:', { usuario, clave, mode });
    console.log('Query a ejecutar:', query);

    // Verificar que db está inicializado
    console.log('Objeto db:', db ? 'db inicializado' : 'db NO inicializado');

    return db.oneOrNone(query, [usuario, clave, mode])
        .then(data => {
            console.log('--- RESULTADO QUERY ---');
            if (data) {
                console.log('Data devuelta por fn_autenticar_usuario:', data);
            } else {
                console.log('La función no devolvió ningún resultado (null)');
            }
            console.log('--- FIN AUTENTICACIÓN EXITOSA ---');
            return done(null, data);
        })
        .catch(error => {
            console.error('--- ERROR EN AUTENTICACIÓN ---');
            console.error('Detalles del error:', error);
            console.error('Stack:', error.stack);
            console.log('--- FIN AUTENTICACIÓN CON ERROR ---');
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