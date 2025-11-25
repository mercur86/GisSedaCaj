const {
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLString,
    GraphQLInt,
    GraphQLBoolean
} = require('graphql');

const db = require('../../dbconexion');

const mutation = new GraphQLObjectType({
    name: 'PublicMutation',
    fields: {
        registrarSolicitudCreacionUsuario: {
            type: GraphQLBoolean,
            args: {
                dni: { type: new GraphQLNonNull(GraphQLString) },
                nombreCompleto: { type: new GraphQLNonNull(GraphQLString) },
                correo: { type: new GraphQLNonNull(GraphQLString) },
                cargo: { type: new GraphQLNonNull(GraphQLString) },
                dependencia: { type: new GraphQLNonNull(GraphQLString) },
                zonal: { type: new GraphQLNonNull(GraphQLInt) }
            },
            resolve: (_, args) => {
                const { dni: dni_usuario, nombreCompleto, correo, cargo, dependencia, zonal } = args;
                const query = 'select * from gis.fn_registrar_usuario_solicitud($1,$2,$3,$4,$5,$6)';
                return db.one(query, [dni_usuario, nombreCompleto, correo, cargo, dependencia, zonal])
                    .then(data => data.fn_registrar_usuario_solicitud)
                    .catch(error => error);
            }
        }
    }
});

module.exports = mutation;