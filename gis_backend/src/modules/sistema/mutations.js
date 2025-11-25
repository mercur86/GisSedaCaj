const {
    ResultadoImportacionType
} = require('./types');

const {
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLString,
    GraphQLInt,
    GraphQLBoolean,
    GraphQLID,
    GraphQLList
} = require('graphql');
const db = require('../../dbconexion');
const { GraphQLJSON } = require('graphql-type-json');
const { usuarioEstaAutorizado } = require('../../auth/authorization');

const Sistema = new GraphQLObjectType({
    name: 'SistemaMutation',
    fields: {
        darAltaUsuario: {
            type: GraphQLBoolean,
            args: {
                idUsuario: { type: new GraphQLNonNull(GraphQLInt) }
            },
            resolve: (_, args) => {
                const query = 'select * from gis.fn_dar_alta_usuario($1)';
                return db.one(query, [args.idUsuario])
                    .then(data => data.fn_dar_alta_usuario)
                    .catch(error => error);
            }
        },
        desaprobarSolicitudCreacionUsuario: {
            type: GraphQLBoolean,
            args: {
                idSolicitud: { type: new GraphQLNonNull(GraphQLInt) },
                motivo: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve: usuarioEstaAutorizado((_, args, req) => {
                const query = 'select * from gis.fn_desaprobar_solicitud_usuario_sistema($1,$2,$3)';
                const values = [args.idSolicitud, req.user.id, args.motivo];

                return db.one(query, values)
                    .then(data => data.fn_desaprobar_solicitud_usuario_sistema)
                    .catch(error => error);
            })
        },
        aprobarSolicitudCreacionUsuario: {
            type: GraphQLBoolean,
            args: {
                idSolicitud: { type: new GraphQLNonNull(GraphQLInt) }
            },
            resolve: usuarioEstaAutorizado((_, args, req) => {
                const query = 'select * from gis.fn_aprobar_solicitud_usuario_sistema($1,$2)';
                const values = [args.idSolicitud, req.user.id];

                return db.one(query, values)
                    .then(data => data.fn_aprobar_solicitud_usuario_sistema)
                    .catch(error => error);
            })
        },
        suspenderUsuarioSistema: {
            type: GraphQLBoolean,
            args: {
                idUsuario: { type: new GraphQLNonNull(GraphQLInt) },
                motivo: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve: usuarioEstaAutorizado((_, args, req) => {
                const query = 'select * from gis.fn_suspender_usuario_sistema($1,$2,$3)';
                const values = [args.idUsuario, args.motivo, req.user.id];

                return db.one(query, values)
                    .then(data => data.fn_suspender_usuario_sistema)
                    .catch(error => error);
            })
        },
        cambiarContraseniaUsuario: {
            type: GraphQLBoolean,
            args: {
                dniUsuario: { type: new GraphQLNonNull(GraphQLString) },
                contraseniaActual: { type: new GraphQLNonNull(GraphQLString) },
                nuevaContrasenia: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve: (_, args) => {
                const { dniUsuario, contraseniaActual, nuevaContrasenia } = args;
                const query = 'select * from gis.fn_cambiar_contrasenia_usuario_sistema($1,$2,$3)';
                return db.one(query, [dniUsuario, contraseniaActual, nuevaContrasenia])
                    .then(data => data.fn_cambiar_contrasenia_usuario_sistema)
                    .catch(error => error);
            }
        },
        /* PERMISOS HENRY VANNER */
        concederPermisosMenu: {
            type: GraphQLBoolean,
            args: {
                opcionesMenu: { type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(GraphQLID))) },
                idUsuario: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve: usuarioEstaAutorizado((_, args) => {
                const query = "select gis.fn_conceder_permiso_usuario_menu($1,$2::integer[]) as concedido";
                return db.one(query, [args.idUsuario, args.opcionesMenu])
                    .then(data => data.concedido)
                    .catch(error => error);
            })
        },
        quitarPermisosMenu: {
            type: GraphQLBoolean,
            args: {
                opcionesMenu: { type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(GraphQLID))) },
                idUsuario: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve: usuarioEstaAutorizado((_, args) => {
                const query = "select gis.fn_quitar_permiso_usuario_menu($1,$2::integer[]) as quitado";
                return db.one(query, [args.idUsuario, args.opcionesMenu])
                    .then(data => data.quitado)
                    .catch(error => error);
            })
        },
        concederPermisoACapas: {
            type: GraphQLBoolean,
            args: {
                capas: { type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(GraphQLID))) },
                idUsuario: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve: usuarioEstaAutorizado((_, args) => {
                const query = "select gis.fn_conceder_permiso_usuario_capa($1,$2::integer[]) as concedido";
                return db.one(query, [args.idUsuario, args.capas])
                    .then(data => data.concedido)
                    .catch(error => error);
            })
        },
        quitarPermisoACapas: {
            type: GraphQLBoolean,
            args: {
                capas: { type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(GraphQLID))) },
                idUsuario: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve: usuarioEstaAutorizado((_, args) => {
                const query = "select gis.fn_quitar_permiso_usuario_capa($1,$2::integer[]) as quitado";
                return db.one(query, [args.idUsuario, args.capas])
                    .then(data => data.quitado)
                    .catch(error => error);
            })
        },
        concederPermisoAInformesCapas: {
            type: GraphQLBoolean,
            args: {
                informes: { type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(GraphQLID))) },
                idUsuario: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve: usuarioEstaAutorizado((_, args) => {
                const query = "select fn_conceder_permiso_informe_capa($1,$2::integer[]) as concedido";
                return db.one(query, [args.idUsuario, args.informes])
                    .then(data => data.concedido)
                    .catch(error => error);
            })
        },
        quitarPermisoAInformesCapas: {
            type: GraphQLBoolean,
            args: {
                informes: { type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(GraphQLID))) },
                idUsuario: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve: usuarioEstaAutorizado((_, args) => {
                const query = "select gis.fn_quitar_permiso_informe_capa($1,$2::integer[]) as quitado";
                return db.one(query, [args.idUsuario, args.informes])
                    .then(data => data.quitado)
                    .catch(error => error);
            })
        },
        cambiarPIN: {
            type: GraphQLBoolean,
            args: {
                nuevoPIN: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve: (_, args, req) => {
                const query = "select gis.fn_cambiar_pin_usuario($1,$2)";
                return db.one(query, [req.user.id, args.nuevoPIN])
                    .then(data => data.fn_cambiar_pin_usuario)
                    .catch(error => error);
            }
        },
        importarCapa: {
            type: ResultadoImportacionType,
            args: {
                capaId: { type: new GraphQLNonNull(GraphQLInt) },
                data: { type: new GraphQLNonNull(new GraphQLList(GraphQLJSON)) } // <--- acepta JSON
            },
            resolve: async (_, args, req) => {
                try {
                    // Guardar JSON en PostgreSQL desde GraphQL
                    // const query = `
                    //     select * from gis.fn_importar_capa($1, $2::jsonb)`;

                    // const result = await db.one(query, [
                    //     args.capaId,
                    //     JSON.stringify(args.data) // IMPORTANTE
                    // ]);

                    // return {
                    //     ok: result.fn_importar_capa.ok,
                    //     mensaje: result.fn_importar_capa.mensaje
                    // };

                    return {
                        ok:true,
                        mensaje: "importacion correcta"
                    };

                } catch (error) {
                    return {
                        ok: false,
                        mensaje: error.message
                    };
                }
            }
        }

    }
});

module.exports = Sistema;