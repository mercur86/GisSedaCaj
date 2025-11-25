const express = require('express'),
    bodyParser = require('body-parser'),
    db = require('../dbconexion'),
    { configCORS } = require('../auth/cors');

const router = express.Router();

configCORS(router, 'http://181.65.142.123:8080');
router.use(bodyParser.urlencoded({ extended: false }));
router.put("/mantenimiento/:tipo_elemento/:gid_elemento", (req, res) => {
    const query = "select * from gis.rest_new_maintenance_action($1,$2,$3)";
    db.one(query, [req.params.tipo_elemento, req.params.gid_elemento, req.body.estado])
        .then(data => res.json(data).end())
        .catch(error => res.status(400).json({ message: error.message }).end());
});

module.exports = router;