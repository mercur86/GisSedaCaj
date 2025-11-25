const {
    PuntoControl
} = require('./types');

const {
    GraphQLObjectType,
    GraphQLList,
    GraphQLNonNull,
    GraphQLInt,
} = require('graphql');

const db = require('../../dbconexion');
const { usuarioEstaAutorizado } = require('../../auth/authorization');

const Telemetria = new GraphQLObjectType({
    name: 'TelemetriaQuery',
    fields: {
        puntosControl: {
            type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(PuntoControl))),
            args: {
                tipo: { type: GraphQLInt }
            },
            resolve: usuarioEstaAutorizado((_, args) => {
                const query = "SELECT * FROM gis.fn_obtener_puntos_control($1)";
                return db.manyOrNone(query, [args.tipo])
                    .then(data => data)
                    .catch(error => error);
            })
        },
        puntoControl: {
            type: new GraphQLNonNull(PuntoControl),
            args: {
                id: { type: new GraphQLNonNull(GraphQLInt) }
            },
            resolve: usuarioEstaAutorizado((_, args) => {
                const query = "SELECT * FROM gis.v_tb2_punto_control WHERE id = $1";
                return db.oneOrNone(query, [args.id])
                    .then(data => data)
                    .catch(error => error);
            })
        }
    }
})

module.exports = Telemetria;