const fetch = require('node-fetch');
const path = require('path');
const fs = require('fs');

const API_HOST = 'http://localhost:3030';
const RUTA_FRAGMENTOS = './src/pages/Mapa/apollo/fragmentTypes.json';

const buildFragmentsFile = () => {
    console.log('Extrayendo tipos de fragmentos...');
    fetch(`${API_HOST}/graphql`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            variables: {},
            query: `
      {
        __schema {
          types {
            kind
            name
            possibleTypes {
              name
            }
          }
        }
      }
    `,
        }),
    })
        .then(result => result.json())
        .then(result => {
            // here we're filtering out any type information unrelated to unions or interfaces
            const filteredData = result.data.__schema.types.filter(
                type => type.possibleTypes !== null,
            );
            result.data.__schema.types = filteredData;
            fs.writeFile(RUTA_FRAGMENTOS, JSON.stringify(result.data), err => {
                if (err) {
                    console.error('Error mientras se escribía el archivo fragmentTypes.json', err);
                } else {
                    console.log('Los tipos de fragment fueron exitosamente extraídos en fragmentTypes.json!');
                }
            });
        });
}

const setServerUrl = () => {
    /* Determinación del cliente */
    const [, mode] = process.argv.map((arg) => arg.split("="))
        .find(([name]) => name === 'mode') || [null, 'development'];

    const serverUrl = mode === 'production' ? 'http://gisteco.epsgrau.pe:3030' : 'http://localhost:3030';

    console.log('Creando archivo de configuración...')
    fs.writeFile(path.resolve(__dirname, '../config.js'), `
        export const WEB_API_URL = '${serverUrl}/web';
        export const GRAPHQL_API_URL = '${serverUrl}/web/graphql/main';
        export const PUBLIC_GRAPHQL_API_URL = '${serverUrl}/web/graphql/public';
    `, (err) => {
        if (err) {
            console.error('Error mientras se escribía el archivo', err);
        } else {
            console.log('Archivo de configuración creado exitosamente!');
        }
    });
    /* fin de la determinación del cliente */
}

module.exports = { buildFragmentsFile, setServerUrl };