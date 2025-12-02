const fetch = require('node-fetch');

fetch('http://gisteco.epsgrau.pe:8080/geoserver/pdf/info.json').then(response=>response.json())
.then(console.log)
.catch(console.log);s
