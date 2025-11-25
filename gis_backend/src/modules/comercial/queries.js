const {
    LecturaSuministro,
    FacturacionSuministro,
    ConsumoSuministro,
    InspeccionVMASuministro,
    Archivo,
    Reclamo,
    FichaCatastral,
    TransaccionCtaCorriente
} = require('./types');

const {
    GraphQLObjectType,
    GraphQLList,
    GraphQLNonNull,
    GraphQLString,
    GraphQLInt
} = require('graphql');

const db = require('../../dbconexion');
const fetch = require('node-fetch');
const { usuarioEstaAutorizado } = require('../../auth/authorization');

const Comercial = new GraphQLObjectType({
    name: 'ComercialQuery',
    fields: {
        lecturasUsuario: {
            type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(LecturaSuministro))),
            args: {
                suministro: { type: new GraphQLNonNull(GraphQLInt) }
            },
            resolve: usuarioEstaAutorizado((_, args) => {
                const query = 'select * from gis.fn_listar_lecturas_suministro($1)';
                return db.manyOrNone(query, [args.suministro])
                    .then(data => data)
                    .catch(error => error);
            })
        },
        facturacionUsuario: {
            type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(FacturacionSuministro))),
            args: {
                suministro: { type: new GraphQLNonNull(GraphQLInt) }
            },
            resolve: usuarioEstaAutorizado((_, args) => {
                const query = 'select * from gis.fn_listar_facturacion_suministro($1)';
                return db.manyOrNone(query, [args.suministro])
                    .then(data => data)
                    .catch(error => error);
            })
        },
        consumosUsuario: {
            type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(ConsumoSuministro))),
            args: {
                suministro: { type: new GraphQLNonNull(GraphQLInt) }
            },
            resolve: usuarioEstaAutorizado((_, args) => {
                const query = 'select * from gis.fn_listar_consumo_suministro($1)';
                return db.manyOrNone(query, [args.suministro])
                    .then(data => data)
                    .catch(error => error);
            })
        },
        inspeccionesVMA: {
            type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(InspeccionVMASuministro))),
            args: {
                suministro: { type: new GraphQLNonNull(GraphQLInt) }
            },
            resolve: usuarioEstaAutorizado((_, args) => {
                const query = 'select * from gis.fn_listar_inspeccionesvma_suministro($1)';
                return db.manyOrNone(query, [args.suministro])
                    .then(data => data)
                    .catch(error => error);
            })
        },
        reclamo: {
            type: Reclamo,
            args: {
                numReclamo: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve: (_, args) => {
                const query = `select
                                "numReclamo" as num_reclamo,
                                suministro,
                                "nombreReclamante" as nombre_reclamante,
                                "direccionPredio" as direccion_predio
                                from public.sp_ope_buscar_reclamo_informe_tecnico_operacional($1)
                                limit 1
                            `;
                return db.oneOrNone(query, [args.numReclamo])
                    .then(data => data)
                    .catch(error => error);
            }
        },
        listarArchivos: {
            type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(Archivo))),
            args: {
                featureGid: { type: new GraphQLNonNull(GraphQLInt) },
                idCapa: { type: new GraphQLNonNull(GraphQLInt) }
            },
            resolve: (_, args) => {
                const query = 'select * from gis.fn_listar_archivos($1, $2)';
                return db.manyOrNone(query, [args.featureGid, args.idCapa])
                    .then(data => data)
                    .catch(error => error);
            }
        },
        listarImagenes: {
            type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(Archivo))),
            args: {
                featureGid: { type: new GraphQLNonNull(GraphQLInt) },
                idCapa: { type: new GraphQLNonNull(GraphQLInt) }
            },
            resolve: (_, args) => {
                const query = 'select * from gis.fn_listar_imagenes($1, $2)';
                return db.manyOrNone(query, [args.featureGid, args.idCapa])
                    .then(data => data)
                    .catch(error => error);
            }
        },
        fichaCatastral: {
            type: new GraphQLNonNull(FichaCatastral),
            args: {
                suministro: { type: new GraphQLNonNull(GraphQLInt) }
            },
            resolve: usuarioEstaAutorizado((_, args) => {
                const query = "select * from public.sp_datos_ficha_catastral_cuenta_corriente($1)";
                return db.oneOrNone(query, [args.suministro])
                    .then(data => data)
                    .catch(error => error);
            })
        },
        cuentaCorriente: {
            type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(TransaccionCtaCorriente))),
            args: {
                suministro: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve: (_, args) => {
                return fetch(`https://sisgeco.epsgrau.pe/sisgeco-ws/sisgeco/cuenta?num_suministro=${args.suministro}`)
                    .then(response => response.json())
                    .then(resp => JSON.parse(resp.data))
                    .then(resp => resp.data)
                    .catch(error => error);
            }
        }

    }
});

module.exports = Comercial;