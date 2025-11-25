const express = require('express'),
    app = express(),
    port = 3030;

const web = require('./routers/web');
const rest = require('./routers/rest');

app.use("/covid19", express.static(__dirname + "/covid19"))
app.use('/web', web);
app.use('/rest', rest);

app.listen(port, () => console.log(`Servidor escuchando en el puerto ${port}`));