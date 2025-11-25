const {
    GraphQLSchema
} = require('graphql');

const mutation = require('../modules/public/mutations');
const query = require('../modules/public/queries');

module.exports = new GraphQLSchema({ query, mutation });