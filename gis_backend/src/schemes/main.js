const {
    GraphQLSchema,
    GraphQLObjectType
} = require('graphql');

const catastroQ = require('../modules/catastro/queries');
const sistemaQ = require('../modules/sistema/queries');
const sistemaM = require('../modules/sistema/mutations.js');
const operacionesQ = require('../modules/operaciones/queries');
const operacionesM = require('../modules/operaciones/mutations');
const comercialQ = require('../modules/comercial/queries');
const comercialM = require('../modules/comercial/mutations.js');
const catastroM = require('../modules/catastro/mutations.js');
const telemetriaQ = require('../modules/telemetria/queries.js');
const estadistica = require('../modules/estadistica/queries.js');

const query = new GraphQLObjectType({
    name: 'Query',
    fields: {
        catastro: { type: catastroQ, resolve: () => true },
        sistema: { type: sistemaQ, resolve: () => true },
        operaciones: { type: operacionesQ, resolve: () => true },
        comercial: { type: comercialQ, resolve: () => true },
        telemetria: { type: telemetriaQ, resolve: () => true },
        estadistica: { type: estadistica, resolve: () => true }
    }
});

const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        catastro: { type: catastroM, resolve: () => true },
        sistema: { type: sistemaM, resolve: () => true },
        operaciones: { type: operacionesM, resolve: () => true },
        comercial: { type: comercialM, resolve: () => true }
    }
})

module.exports = new GraphQLSchema({ query, mutation });