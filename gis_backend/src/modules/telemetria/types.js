const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLNonNull,
    GraphQLString,
    GraphQLInt,
    GraphQLFloat,
    GraphQLList,
    GraphQLUnionType
} = require('graphql');

const db = require('../../dbconexion');
const CAUDAL = 'caudal',
    CONSUMO = 'consumo';

const Medidor = new GraphQLObjectType({
    name: "Medidor",
    fields: {
        id_medidor: { type: new GraphQLNonNull(GraphQLID) },
        variable: { type: new GraphQLNonNull(GraphQLString) },
        unidad_medida: { type: new GraphQLNonNull(GraphQLString) },
        tipo: { type: new GraphQLNonNull(GraphQLString) }
    }
});

const Lectura = new GraphQLObjectType({
    name: "Lectura",
    fields: {
        fecha: { type: new GraphQLNonNull(GraphQLString) },
        valor_leido: { type: new GraphQLNonNull(GraphQLFloat) }
    }
});

const LecturasSebalog = new GraphQLObjectType({
    name: "LecturasSebalog",
    fields: {
        id_datalogger: { type: new GraphQLNonNull(GraphQLString) },
        canal: { type: new GraphQLNonNull(GraphQLString) },
        variable_control: { type: new GraphQLNonNull(GraphQLString) },
        volumen_total: {
            type: GraphQLFloat,
            resolve: (source, _, __, info) => {
                const variables = info.variableValues,
                    { propiedadFisica } = variables;

                if (propiedadFisica !== CAUDAL && propiedadFisica !== CONSUMO) return null;

                const query = "select * from gis.fn_volumen_total_lecturas_sebalog($1,$2,$3,$4,$5)";
                return db.one(query, [source.id_datalogger, source.canal, variables.fechaInicio, variables.fechaFin, variables.unidades])
                    .then(data => data.fn_volumen_total_lecturas_sebalog)
                    .catch(error => error);
            }
        },
        lecturas: {
            type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(Lectura))),
            resolve: (source, _, __, info) => {
                const variables = info.variableValues;
                let query = "select * from gis.fn_lecturas_sebalog($1,$2,$3,$4,$5)";
                if (variables.propiedadFisica === CONSUMO) {
                    query = "select * from gis.fn_consumos_sebalog($1,$2,$3,$4,$5)";
                }
                return db.manyOrNone(query, [source.id_datalogger, source.canal, variables.fechaInicio, variables.fechaFin, variables.unidades])
                    .then(data => data)
                    .catch(error => error);
            }
        }
    }
});

const LecturasCello = new GraphQLObjectType({
    name: "LecturasCello",
    fields: {
        id_medidor: { type: new GraphQLNonNull(GraphQLString) },
        tipo_medidor: { type: new GraphQLNonNull(GraphQLString) },
        volumen_total: {
            type: GraphQLFloat,
            resolve: (source, _, __, info) => {
                const variables = info.variableValues,
                    { propiedadFisica } = variables;

                if (propiedadFisica !== CAUDAL && propiedadFisica !== CONSUMO) return null;

                const query = "select * from gis.fn_volumen_total_lecturas_medidor($1,$2,$3,$4)";
                return db.one(query, [source.id_medidor, variables.fechaInicio, variables.fechaFin, variables.unidades])
                    .then(data => data.fn_volumen_total_lecturas_medidor)
                    .catch(error => error);
            }
        },
        lecturas: {
            type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(Lectura))),
            resolve: (source, _, __, info) => {
                const variables = info.variableValues;
                let query = "select * from gis.fn_lecturas_medidor($1,$2,$3,$4)";
                if (variables.propiedadFisica === CONSUMO) {
                    query = "select * from gis.fn_consumos_medidor($1,$2,$3,$4)";
                }
                return db.manyOrNone(query, [source.id_medidor, variables.fechaInicio, variables.fechaFin, variables.unidades])
                    .then(data => data)
                    .catch(error => error);
            }
        }
    }
});

const Lecturas = new GraphQLUnionType({
    name: 'Lecturas',
    types: [LecturasCello, LecturasSebalog],
    resolveType: (data) => {
        if (data.id_datalogger) return LecturasSebalog;
        return LecturasCello;
    }
});

const PuntoControl = new GraphQLObjectType({
    name: "PuntoControl",
    fields: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        id_tipo_punto_control: { type: new GraphQLNonNull(GraphQLInt) },
        nombre: { type: new GraphQLNonNull(GraphQLString) },
        codigo: { type: new GraphQLNonNull(GraphQLInt) },
        medidores: {
            type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(Medidor))),
            resolve: (source) => {
                const query = "SELECT * FROM gis.tb_medidor WHERE id_punto_control = $1";
                return db.manyOrNone(query, [source.id])
                    .then(data => data)
                    .catch(error => error);
            }
        },
        lecturas: {
            type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(Lecturas))),
            args: {
                fechaInicio: { type: new GraphQLNonNull(GraphQLString) },
                fechaFin: { type: new GraphQLNonNull(GraphQLString) },
                propiedadFisica: { type: new GraphQLNonNull(GraphQLString) },
                unidades: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve: (source, args) => {
                const query = "select * from gis.fn_acumulado_lecturas_punto_control($1,$2,$3,$4,$5)";
                return db.manyOrNone(query, [source.id, args.fechaInicio, args.fechaFin, args.propiedadFisica, args.unidades])
                    .then(data => data)
                    .catch(error => error);
            }
        }
    }
});

module.exports = {
    PuntoControl
}