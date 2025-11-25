const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull,
    GraphQLList
} = require('graphql');
const db = require('../../dbconexion');
const { Cisterna } = require('../operaciones/types.js');
const { Cliente } = require('./types');

const query = new GraphQLObjectType({
    name: 'PublicQuery',
    fields: {
        appname: { type: GraphQLString, resolve: () => 'GISTECO V2.0' },
        listaCisternas: {
            type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(Cisterna))),
            args: {
                visibilityFilter: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve: (_, args) => {
                const query = "select * from gis.fn_get_cisternas($1)";
                return db.manyOrNone(query, [args.visibilityFilter])
                    .then(data => data)
                    .catch(error => error);
            }
        },
        infoCliente: {
            type: Cliente,
            args: {
                suministro: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve: (_, args) => {
                const query = `
                    select
                    suministro as id,
                    direccion_predio,
                    nombre_usuario,
                    st_x(st_transform(geom,4326))::numeric(10,8) as longitud,
                    st_y(st_transform(geom,4326))::numeric(10,8) as latitud
                    from gis.piloto_piura_sig_usuario
                    where suministro = $1
                `;
                return db.oneOrNone(query, [args.suministro])
                    .then(data => data)
                    .catch(error => error);
            }
        }
    }
});

module.exports = query;