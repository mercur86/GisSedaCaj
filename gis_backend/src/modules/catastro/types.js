const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLNonNull,
    GraphQLString,
    GraphQLBoolean,
    GraphQLInt
} = require('graphql');

const Calle = new GraphQLObjectType({
    name: 'Calle',
    fields: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        nombre: { type: new GraphQLNonNull(GraphQLString) }
    }
});

const HabilitacionUrbana = new GraphQLObjectType({
    name: 'HabilitacionUrbana',
    fields: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        nombre: { type: new GraphQLNonNull(GraphQLString) }
    }
});

const Distrito = new GraphQLObjectType({
    name: 'Distrito',
    fields: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        nombre: { type: new GraphQLNonNull(GraphQLString) }
    }
});

const DatosDefectoUsuarioPotencial = new GraphQLObjectType({
    name: 'DatosDefectoUsuarioPotencial',
    fields: {
        id_prov: { type: GraphQLInt },
        id_dist: { type: GraphQLInt },
        sector: { type: GraphQLInt },
        id_manzana: { type: GraphQLInt },
        manzana_municipal: { type: new GraphQLNonNull(GraphQLString) },
        nombre_zona: { type: new GraphQLNonNull(GraphQLString) }
    }
});


const Suministro = new GraphQLObjectType({
    name: 'Suministro',
    fields: {
        num_inscripcion: { type: new GraphQLNonNull(GraphQLID) },
        nombre_titular: { type: new GraphQLNonNull(GraphQLString) },
        esta_georeferenciado: { type: new GraphQLNonNull(GraphQLBoolean) }
    }
});

const Manzana = new GraphQLObjectType({
    name: 'Manzana',
    fields: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        nombre_municipal: { type: new GraphQLNonNull(GraphQLString) }
    }
});


const RespuestaMensaje = new GraphQLObjectType({
    name: 'RespuestaMensaje',
    fields: {
        mensaje: { type: new GraphQLNonNull(GraphQLString) },
        codigo_respuesta: { type: new GraphQLNonNull(GraphQLInt) }
    }
});

const PropiedadNombre = new GraphQLObjectType({
    name: 'PropiedadNombre',
    fields: {
        nombre: { type: new GraphQLNonNull(GraphQLString) }
    }
});

module.exports = {
    Calle,
    HabilitacionUrbana,
    Distrito,
    Suministro,
    Manzana,
    RespuestaMensaje,
    PropiedadNombre,
    DatosDefectoUsuarioPotencial
};