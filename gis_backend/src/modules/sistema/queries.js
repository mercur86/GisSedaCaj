const {
    UsuarioSistema,
    OpcionSidebar,
    Capa,
    NodoArbolCapa,
    DefinicionPropiedadCapa,
    Menu,
    SolicitudUsuarioSistema,
    InformeCapa,
    PrintInfo
} = require('./types');

const {
    GraphQLObjectType,
    GraphQLList,
    GraphQLNonNull,
    GraphQLString,
    GraphQLInt,
    GraphQLBoolean,
    GraphQLID
} = require('graphql');

const db = require('../../dbconexion');
const { usuarioEstaAutorizado } = require('../../auth/authorization');
const fetch = require('node-fetch');

const Sistema = new GraphQLObjectType({
    name: 'SistemaQuery',
    fields: {
        datosUsuarioSistema: {
            type: new GraphQLNonNull(UsuarioSistema),
            resolve: (_, __, req) => {
                return req.user
            }
        },
        solicitudesPendientesCreacionUsuario: {
            type: new GraphQLNonNull(new GraphQLList(SolicitudUsuarioSistema)),
            resolve: usuarioEstaAutorizado(() => {
                const query = 'select * from gis.fn_listar_solicitudes_pendientes_creacion_usuario()';
                return db.manyOrNone(query)
                    .then(data => data)
                    .catch(error => error);
            })
        },
        usuariosActivosSistema: {
            type: new GraphQLNonNull(new GraphQLList(UsuarioSistema)),
            args: {
                filtroNombre: { type: GraphQLString, defaultValue: '' },
                filtroDni: { type: GraphQLString, defaultValue: '' }
            },
            resolve: usuarioEstaAutorizado((_, args) => {
                const query = 'select * from gis.fn_listar_usuarios_activos_sistema($1,$2)';
                const { filtroNombre, filtroDni } = args;
                return db.manyOrNone(query, [filtroNombre, filtroDni])
                    .then(data => data)
                    .catch(error => error);
            })
        },
        menuSidebar: {
            type: new GraphQLNonNull(new GraphQLList(OpcionSidebar)),
            resolve: () => {
                const query = 'select nombre, titulo, icono from gis.tb2_menu_sidebar order by orden_presentacion';
                return db.manyOrNone(query)
                    .then(data => data/*.concat([
                        {
                            nombre: 'ESTADISTICA',
                            titulo: 'Estadísticas',
                            icono: 'far fa-chart-bar'
                        }
                    ])*/)
                    .catch(error => error);
            }
        },
        listaMenu: {
            type: new GraphQLNonNull(new GraphQLList(Menu)),
            args: { todos: { type: GraphQLBoolean } },
            resolve: () => {
                const query = 'select id, titulo from gis.tb2_menu where id_menu isnull order by orden_presentacion';
                return db.manyOrNone(query)
                    .then(data => data)
                    .catch(error => error);
            }
        },
        /* RELATIVOS A PERMISOS (by Henry Vanner)*/
        arbolCapas: {
            type: new GraphQLNonNull(new GraphQLList(NodoArbolCapa)),
            args: { todos: { type: new GraphQLNonNull(GraphQLBoolean) } },
            resolve: (_, args, req) => {
                let params = [null, req.user.id];
                const query = 'select * from gis.fn_obtener_grupos_de_capas_de_grupo($1,$2)';
                if (args.todos) params = [null, null];
                return db.manyOrNone(query, params)
                .then(data => data)
                //.then(data => data.slice(0, 3))
                    .catch(error => error);
            }
        },
        permisosCapas: {
            type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(Capa))),
            resolve: (_, __, req) => {
                const query = 'select * from gis.fn_obtener_capas_usuario($1)';
                return db.any(query, [req.user.id])
                    .then(data => data)
                    .catch(error => error);
            }
        },

        menuPrincipal: {
            type: new GraphQLNonNull(new GraphQLList(Menu)),
            args: { todos: { type: new GraphQLNonNull(GraphQLBoolean) } },
            resolve: (_, args, req) => {
                let params = [req.user.id];
                const query = 'select * from gis.fn_obtener_menus_menu_principal($1)';
                if (args.todos) params = [null];
                return db.any(query, params)
                    .then(data => data)
                    .catch(error => error);
            }
        },
        opcionesMenuAutorizadasUsuario: {
            type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(GraphQLID))),
            args: { idUsuario: { type: GraphQLID } },
            resolve: (_, args, req) => {
                const idUsuario = args.idUsuario || req.user.id;
                const query = "select gis.fn_get_id_opciones_autorizadas_menu($1) as opciones_autorizadas";
                return db.one(query, [idUsuario])
                    .then(data => data.opciones_autorizadas)
                    .catch(error => error);
            }
        },
        capasAutorizadasUsuario: {
            type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(GraphQLID))),
            args: { idUsuario: { type: new GraphQLNonNull(GraphQLID) } },
            resolve: (_, args) => {
                const query = "select gis.fn_get_id_capas_autorizadas($1) as capas_autorizadas";
                return db.one(query, [args.idUsuario])
                    .then(data => data.capas_autorizadas)
                    .catch(error => error);
            }
        },
        informesCapas: {
            type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(InformeCapa))),
            args: {
                capas: { type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(GraphQLID))) }
            },
            resolve: (_, args) => {
                const query = "select * from gis.fn_get_informes_capas($1::integer[])";
                return db.manyOrNone(query, [args.capas])
                    .then(data => data)
                    .catch(error => error);
            }
        },
        informesCapaAutorizadosUsuario: {
            type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(GraphQLID))),
            args: { idUsuario: { type: GraphQLID } },
            resolve: (_, args, req) => {
                const idUsuario = args.idUsuario || req.user.id;
                const query = "select gis.fn_get_id_informes_capa_autorizados($1) as informes_autorizados";
                return db.one(query, [idUsuario])
                    .then(data => data.informes_autorizados)
                    .catch(error => error);
            }
        },
        diccionarioCapa: {
            type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(DefinicionPropiedadCapa))),
            args: {
                idCapa: { type: new GraphQLNonNull(GraphQLInt) }
            },
            resolve: (_, args) => {
                const query = 'select * from gis.fn_obtener_diccionario_capa($1)';
                return db.manyOrNone(query, [args.idCapa])
                    .then(data => data)
                    .catch(error => error);
            }
        },
        printInfo: {
            type: new GraphQLNonNull(PrintInfo),
            resolve: () => {
                return fetch('http://gisteco.epsgrau.pe:8080/geoserver/pdf/info.json')
                    .then(res => res.json())
                    // .then(data => data)
                    .then(data => {
                        data.layouts.push(
                            {
                                name: "A0 portrait",
                                map: {
                                width: 2307,
                                height: 3262
                                },
                                rotation: true
                            },
                            {
                                name: "A1 portrait",
                                map: {
                                width: 1630,
                                height: 2307
                                },
                                rotation: true
                            }
                        );
                        return data;
                    })
                    .catch(error => error);
            }
        },
        validarPIN: {
            type: GraphQLBoolean,
            args: {
                pin: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve: (_, args, req) => {
                const query = "select gis.fn_validar_pin_usuario($1,$2)";
                return db.one(query, [req.user.id, args.pin])
                    .then(data => data.fn_validar_pin_usuario)
                    .catch(error => error);
            }
        }
    }
});

module.exports = Sistema;
