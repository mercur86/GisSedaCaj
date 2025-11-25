const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLNonNull,
    GraphQLString,
    GraphQLFloat,
} = require('graphql');

const Cliente = new GraphQLObjectType({
    name: "Cliente",
    fields: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        direccion_predio: { type: new GraphQLNonNull(GraphQLString) },
        nombre_usuario: { type: new GraphQLNonNull(GraphQLString) },
        longitud: { type: new GraphQLNonNull(GraphQLFloat) },
        latitud: { type: new GraphQLNonNull(GraphQLFloat) },
    }
});

module.exports = { Cliente };