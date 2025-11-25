const {
    Calle,
    HabilitacionUrbana,
    Distrito,
    Suministro,
    Manzana,
    PropiedadNombre,
    DatosDefectoUsuarioPotencial
} = require('./types');

const {
    GraphQLObjectType,
    GraphQLList,
    GraphQLNonNull,
    GraphQLString,
    GraphQLInt
} = require('graphql');

const db = require('../../dbconexion');
const { usuarioEstaAutorizado } = require('../../auth/authorization');

const Catastro = new GraphQLObjectType({
    name: 'catastroQuery',
    fields: {
        buscarCalle: {
            type: new GraphQLNonNull(new GraphQLList(Calle)),
            args: {
                calle: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve: usuarioEstaAutorizado((_, args) => {
                const query = 'select * from gis.fn_buscar_calle($1)';
                return db.manyOrNone(query, [args.calle])
                    .then(data => data)
                    .catch(error => error);
            })
        },
        buscarHabilitacionUrbana: {
            type: new GraphQLNonNull(new GraphQLList(HabilitacionUrbana)),
            args: {
                habilitacionUrbana: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve: usuarioEstaAutorizado((_, args) => {
                const query = 'select * from gis.fn_buscar_habilitacion_urbana($1)';
                return db.manyOrNone(query, [args.habilitacionUrbana])
                    .then(data => data)
                    .catch(error => error);
            })
        },
        buscarSuministroPorNombreTitular: {
            type: new GraphQLNonNull(new GraphQLList(Suministro)),
            args: {
                nombreTitular: { type: new GraphQLNonNull(GraphQLString) },
                idProvincia: { type: GraphQLInt },
                idDistrito: { type: GraphQLInt }
            },
            resolve: usuarioEstaAutorizado((_, args) => {
                const query = 'select * from gis.fn_buscar_suministro_por_nombre_titular($1,$2,$3)';
                const { nombreTitular, idProvincia, idDistrito } = args;
                return db.manyOrNone(query, [nombreTitular, idProvincia, idDistrito])
                    .then(data => data)
                    .catch(error => error);
            })
        },
        buscarDatosDefectoUsuarioPotencial: {
            type: new GraphQLNonNull(new GraphQLList(DatosDefectoUsuarioPotencial)),
            args: {
                numInscripcion: { type: new GraphQLNonNull(GraphQLInt) }
            },
            resolve: usuarioEstaAutorizado((_, args) => {
                const query = 'select * from gis.fn_buscar_datos_defecto_usuario_potencial($1)';
                const { numInscripcion } = args;
                return db.manyOrNone(query, [numInscripcion])
                    .then(data => data)
                    .catch(error => error);
            })
        },
        buscarSuministroPorCodigoCatastral: {
            type: new GraphQLNonNull(new GraphQLList(Suministro)),
            args: {
                idProvincia: { type: new GraphQLNonNull(GraphQLInt) },
                idDistrito: { type: new GraphQLNonNull(GraphQLInt) },
                idSector: { type: new GraphQLNonNull(GraphQLInt) },
                idManzana: { type: new GraphQLNonNull(GraphQLInt) },
                lote: { type: new GraphQLNonNull(GraphQLInt) },
                sublote: { type: new GraphQLNonNull(GraphQLInt) }
            },
            resolve: usuarioEstaAutorizado((_, args) => {
                const query = 'select * from gis.fn_buscar_suministro_por_codigo_catastral($1,$2,$3,$4,$5,$6)';
                const { idProvincia, idDistrito, idSector, idManzana, lote, sublote } = args;
                return db.manyOrNone(query, [idProvincia, idDistrito, idSector, idManzana, lote, sublote])
                    .then(data => data)
                    .catch(error => error);
            })
        },
        buscarSuministroPorNumInscription: {
            type: new GraphQLNonNull(new GraphQLList(Suministro)),
            args: {
                numInscripcion: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve: usuarioEstaAutorizado((_, args) => {
                const query = 'select * from gis.fn_buscar_suministro_por_num_inscripcion($1)';
                return db.manyOrNone(query, [args.numInscripcion])
                    .then(data => data)
                    .catch(error => error);
            })
        },
        buscarManzana: {
            type: new GraphQLNonNull(new GraphQLList(Manzana)),
            args: {
                idProvincia: { type: new GraphQLNonNull(GraphQLInt) },
                idDistrito: { type: new GraphQLNonNull(GraphQLInt) },
                idSector: { type: new GraphQLNonNull(GraphQLInt) },
                idManzana: { type: new GraphQLNonNull(GraphQLInt) }
            },
            resolve: usuarioEstaAutorizado((_, args) => {
                const query = 'select * from gis.fn_buscar_manzana($1,$2,$3,$4)';
                const { idProvincia, idDistrito, idSector, idManzana } = args;
                return db.manyOrNone(query, [idProvincia, idDistrito, idSector, idManzana])
                    .then(data => data)
                    .catch(error => error);
            })
        },
        buscarSuministroPorNumMedidor: {
            type: new GraphQLNonNull(new GraphQLList(Suministro)),
            args: {
                numMedidor: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve: usuarioEstaAutorizado((_, args) => {
                const query = 'select * from gis.fn_buscar_suministro_por_num_medidor($1)';
                return db.manyOrNone(query, [args.numMedidor])
                    .then(data => data)
                    .catch(error => error);
            })
        },
        obtenerCodCatastralSisgeco: {
            type: new GraphQLNonNull(GraphQLString),
            args: {
                suministro: { type: new GraphQLNonNull(GraphQLInt) }
            },
            resolve: usuarioEstaAutorizado((_, args) => {
                const query = 'select gis.fn_obtener_codigo_catastral_usuario_segun_sisgeco($1) as codigo_catastral';
                return db.one(query, [args.suministro])
                    .then(data => data.codigo_catastral)
                    .catch(error => error);
            })
        },
        obtenerCodCatastralGisteco: {
            type: new GraphQLNonNull(GraphQLString),
            args: {
                suministro: { type: new GraphQLNonNull(GraphQLInt) }
            },
            resolve: usuarioEstaAutorizado((_, args) => {
                const query = 'select gis.fn_obtener_codigo_catastral_usuario_segun_gisteco($1) as codigo_catastral';
                return db.one(query, [args.suministro])
                    .then(data => data.codigo_catastral)
                    .catch(error => error);
            })
        },
        obtenerCodCatastralUsuarioPotencial: {
            type: new GraphQLNonNull(GraphQLString),
            args: {
                gid: { type: new GraphQLNonNull(GraphQLInt) }
            },
            resolve: usuarioEstaAutorizado((_, args) => {
                const query = 'select gis.fn_obtener_codigo_catastral_usuario_potencial($1) as codigo_catastral';
                return db.one(query, [args.gid])
                    .then(data => data.codigo_catastral)
                    .catch(error => error);
            })
        },
        listaEstadoPredio: {
            type: new GraphQLNonNull(new GraphQLList(PropiedadNombre)),
            resolve: (_) => {
                const query = "select descripcion as nombre from public.tb_objeto_tipo where id_tabla_tipo = '3002'";
                return db.any(query)
                    .then(data => data)
                    .catch(error => error);
            }
        },
        listaTipoServicio: {
            type: new GraphQLNonNull(new GraphQLList(PropiedadNombre)),
            resolve: (_) => {
                const query = "select descripcion as nombre from public.tb_objeto_tipo where id_tabla_tipo = '3006'";
                return db.any(query)
                    .then(data => data)
                    .catch(error => error);
            }
        },
        listaTipoConstruccion: {
            type: new GraphQLNonNull(new GraphQLList(PropiedadNombre)),
            resolve: (_) => {
                const query = "select descripcion as nombre from public.tb_objeto_tipo where id_tabla_tipo = '3016' ORDER BY id_objeto_tipo";
                return db.any(query)
                    .then(data => data)
                    .catch(error => error);
            }
        },
        listaEstadoUsuarioSinSuministro: {
            type: new GraphQLNonNull(new GraphQLList(PropiedadNombre)),
            resolve: (_) => {
                const query = "select descripcion as nombre from public.tb_objeto_tipo where id_tabla_tipo = '3002' ORDER BY id_objeto_tipo";
                return db.any(query)
                    .then(data => data)
                    .catch(error => error);
            }
        },
        listaCategoriaPredio: {
            type: new GraphQLNonNull(new GraphQLList(PropiedadNombre)),
            resolve: (_) => {
                const query = "select descripcion_categoria as nombre from public.tb_categoria";
                return db.any(query)
                    .then(data => data)
                    .catch(error => error);
            }
        },
        tiposOrigenConsumo: {
            type: new GraphQLNonNull(new GraphQLList(PropiedadNombre)),
            resolve: () => {
                const query = "select descripcion as nombre from public.tb_objeto_tipo where id_tabla_tipo = '4007'";
                return db.any(query)
                    .then(data => data)
                    .catch(error => error);
            }
        },
        getDistritosDeProvincia: {
            type: new GraphQLNonNull(new GraphQLList(Distrito)),
            args: {
                idProvincia: { type: new GraphQLNonNull(GraphQLInt) }
            },
            resolve: (_, args) => {
                const query = 'select * from gis.fn_get_distritos_de_provincia($1)';
                return db.manyOrNone(query, [args.idProvincia])
                    .then(data => data)
                    .catch(error => error);
            }
        }
    }
});

module.exports = Catastro;