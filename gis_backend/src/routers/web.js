const express = require('express'),
    router = express.Router(),
    bodyParser = require('body-parser');
const passport = require('../auth/passport');
const { validateAuthentication, regenerateSession, configAuthentication } = require('../auth');
const { configCORS } = require('../auth/cors');
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const graphql = require('./graphql');

/* Determinación del cliente */
const [, mode] = process.argv.map((arg) => arg.split("="))
    .find(([name]) => name === 'mode') || [null, 'development'];
 const clientUrl = mode === 'production' ? 'http://35.174.51.181:7777' : 'http://localhost:7777';

/* fin de la determinación del cliente */

configCORS(router, clientUrl);
configAuthentication(router);
router.post("/login", urlencodedParser, passport.authenticate('local'), (req, res) => res.json(req.user).end());
router.post("/logout", validateAuthentication, regenerateSession);
router.post("/isAuthenticated", validateAuthentication, (_, res) => res.status(200).end());
router.use("/graphql", graphql);

module.exports = router;