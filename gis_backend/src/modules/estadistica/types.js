const {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLFloat,
    GraphQLString
} = require('graphql');


const IntervaloConsumoUsuarios = new GraphQLObjectType({
    name: 'IntervaloConsumoUsuarios',
    fields: {
        lim_inferior: { type: GraphQLInt },
        lim_superior: { type: GraphQLInt },
        num_usuarios: { type: GraphQLInt },
        consumo: { type: GraphQLInt },
        consumo_soles: { type: GraphQLFloat },
        num_usuarios_porcien: { type: GraphQLFloat },
        consumo_porcien: { type: GraphQLFloat },
        consumo_soles_porcien: { type: GraphQLFloat }
    }
});

const IntervaloConsumoHabUrbanas = new GraphQLObjectType({
    name: "IntervaloConsumoHabUrbanas",
    fields: {
        habilitacion_urbana: { type: GraphQLString },
        consumo: { type: GraphQLInt },
        consumo_soles: { type: GraphQLFloat },
        consumo_porcien: { type: GraphQLFloat },
        consumo_soles_porcien: { type: GraphQLFloat }
    }
});

module.exports = {
    IntervaloConsumoUsuarios,
    IntervaloConsumoHabUrbanas
}