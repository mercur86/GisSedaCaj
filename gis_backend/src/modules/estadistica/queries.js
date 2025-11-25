const {
    IntervaloConsumoUsuarios,
    IntervaloConsumoHabUrbanas
} = require('./types');

const {
    GraphQLObjectType,
    GraphQLList,
    GraphQLNonNull,
    GraphQLString,
    GraphQLInt
} = require('graphql');

const db = require('../../dbconexion');

const Estadistica = new GraphQLObjectType({
    name: 'EstadisticaQuery',
    fields: {
        consumoUsuarios: {
            /* 
                Distribución del consumo de usuarios que habitan
                un área determinada
            */
            type: new GraphQLList(IntervaloConsumoUsuarios),
            args: {
                idProvincia: { type: GraphQLInt },
                idDistrito: { type: GraphQLInt },
                area: { type: GraphQLString }, // en formato WKT
                anio: { type: new GraphQLNonNull(GraphQLInt) },
                mes: { type: new GraphQLNonNull(GraphQLInt) },
                intervalos: { type: new GraphQLNonNull(GraphQLInt), defaultValue: 10 }
            },
            resolve: (_, args) => {
                const query = "select * from gis.fn_stats_distribucion_consumo_usuarios($1,$2,$3,$4,$5,$6)"
                return db.manyOrNone(query, [
                    args.idProvincia,
                    args.idDistrito,
                    args.area,
                    args.anio,
                    args.mes,
                    args.intervalos
                ]).then(data => data)
                    .catch(error => error);
            }
        },
        consumoHabilitacionesUrbanas: {
            type: new GraphQLList(IntervaloConsumoHabUrbanas),
            args: {
                idProvincia: { type: GraphQLInt },
                idDistrito: { type: GraphQLInt },
                anio: { type: new GraphQLNonNull(GraphQLInt) },
                mes: { type: new GraphQLNonNull(GraphQLInt) }
            },
            resolve: (_, args) => {
                const query = "select * from gis.fn_stats_distribucion_consumo_habilitaciones_urbanas($1,$2,$3,$4);";
                return db.manyOrNone(query, [
                    args.idProvincia,
                    args.idDistrito,
                    args.anio,
                    args.mes
                ]).then(data => data)
                    .catch(error => error);
            }
        }
    }
});

module.exports = Estadistica;