const passport = require('./passport');
const { createSession } = require('./session')

const configAuthentication = (router) => {
    const session = createSession(45);
    router.use(session);
    router.use(passport.initialize());
    router.use(passport.session());
}

const validateAuthentication = (req, res, next) => {
    if (!req.user) return res.status(401).end();
    next();
}

const regenerateSession = (req, res) => {
    req.session.regenerate(err => {
        if (err) return res.status(500).send(err);
        res.json({ loggedOut: true }).end();
    });
}

module.exports.configAuthentication = configAuthentication;
module.exports.validateAuthentication = validateAuthentication;
module.exports.regenerateSession = regenerateSession;