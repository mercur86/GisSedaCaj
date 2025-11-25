const express = require('express'),
    expressGraphql = require('express-graphql'),
    router = express.Router();
const { usuarioEstaLogueado } = require('../auth/authorization');
const main = require('../schemes/main');
const public = require('../schemes/public');

router.use('/main',
    usuarioEstaLogueado,
    expressGraphql({
        schema: main,
        graphiql: true
    })
);

router.use('/public',
    expressGraphql({
        schema: public,
        graphiql: true
    })
);

module.exports = router;