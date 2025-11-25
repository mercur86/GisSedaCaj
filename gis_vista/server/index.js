/*const sslOptions = {
    key: fs.readFileSync(__dirname + "/ssl/epsgrau.key"),
    cert: fs.readFileSync(__dirname + "/ssl/ssl_certificate.crt"),
    ca: fs.readFileSync(__dirname + "/ssl/IntermediateCA.crt")
};

const server = https.createServer(sslOptions, app);*/

const express = require('express');
const path = require('path');
const app = express();
const port = 7777;
app.use(express.static(path.join(__dirname, '../build')));
app.get('/*', function (_, res) {
    res.sendFile(path.join(__dirname, '../build', 'index.html'));
});
app.listen(port, () => {
    console.log(`Servidor cliente corriendo en http://localhost:${port}`)
});