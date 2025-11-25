const session = require('express-session');

const createSession = (timeOfLife) => {
    const config = {
        secret: 'gisteco',
        rolling: true,
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 1000 * 60 * timeOfLife
        }
    };
    return session(config)
}

module.exports.createSession = createSession;