const {
    GraphQLObjectType,
    GraphQLList,
    GraphQLNonNull,
    GraphQLString,
    GraphQLInt,
    GraphQLBoolean,
    GraphQLFloat
} = require('graphql');

const db = require('../../dbconexion');
const { usuarioEstaAutorizado } = require('../../auth/authorization');
const {
    ParalizacionFuenteAbastecimiento,
    RegistrarLecturaResponse,
    EliminarLecturaResponse,
    Cisterna,
    ValvulaPA,
    objetoTO
} = require('./types');

const Operaciones = new GraphQLObjectType({
    name: 'OperacionesMutation',
    fields: {
        registrarFugaEnRed: {
            type: GraphQLBoolean,
            args: {
                idCorrTipoReclamoProblema: { type: new GraphQLNonNull(GraphQLInt) },
                descripcion: { type: GraphQLString },
                referenciaUbicacion: { type: GraphQLString },
                fechaInicioFuga: { type: new GraphQLNonNull(GraphQLString) },
                horaInicio: { type: new GraphQLNonNull(GraphQLString) },
                fechaSolucionFuga: { type: new GraphQLNonNull(GraphQLString) },
                horaSolucion: { type: new GraphQLNonNull(GraphQLString) },
                gidTuberiaAfectada: { type: new GraphQLNonNull(GraphQLInt) },
                materialTuberia: { type: new GraphQLNonNull(GraphQLString) },
                diametroTuberia: { type: new GraphQLNonNull(GraphQLFloat) },
                presionEstimada: { type: new GraphQLNonNull(GraphQLFloat) },
                problemasRelacionados: { type: new GraphQLList(GraphQLInt) }
            },
            resolve: usuarioEstaAutorizado((_, args, req) => {
                const query = 'select * from gis.fn_registrar_fuga_en_red($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14)';
                const values = [
                    args.idCorrTipoReclamoProblema,
                    args.descripcion,
                    args.referenciaUbicacion,
                    args.fechaInicioFuga,
                    args.horaInicio,
                    args.fechaSolucionFuga,
                    args.horaSolucion,
                    args.gidTuberiaAfectada,
                    args.materialTuberia,
                    args.diametroTuberia,
                    args.presionEstimada,
                    args.problemasRelacionados,
                    req.user.id,
                    false
                ];

                return db.one(query, values)
                    .then(data => data.fn_registrar_fuga_en_red)
                    .catch(error => error);
            })
        },
        registrarFugaEnConexionDomiciliaria: {
            type: GraphQLBoolean,
            args: {
                descripcion: { type: GraphQLString },
                referenciaUbicacion: { type: GraphQLString },
                fechaInicio: { type: new GraphQLNonNull(GraphQLString) },
                horaInicio: { type: new GraphQLNonNull(GraphQLString) },
                fechaSolucion: { type: new GraphQLNonNull(GraphQLString) },
                horaSolucion: { type: new GraphQLNonNull(GraphQLString) },
                suministro: { type: new GraphQLNonNull(GraphQLInt) },
                materialTuberia: { type: new GraphQLNonNull(GraphQLString) },
                diametroTuberia: { type: new GraphQLNonNull(GraphQLString) },
                id_causa: { type: new GraphQLNonNull(GraphQLInt) },
                otra_causa: { type: GraphQLString },
                problemasRelacionados: { type: new GraphQLList(GraphQLInt) }
            },
            resolve: usuarioEstaAutorizado((_, args, req) => {
                const query = 'select * from gis.fn_registrar_fuga_en_conexion_domiciliaria($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14)';
                const values = [
                    args.descripcion,
                    args.referenciaUbicacion,
                    args.fechaInicio,
                    args.horaInicio,
                    args.fechaSolucion,
                    args.horaSolucion,
                    args.suministro,
                    args.materialTuberia,
                    args.diametroTuberia,
                    args.id_causa,
                    args.otra_causa,
                    args.problemasRelacionados,
                    req.user.id,
                    false
                ]

                return db.one(query, values)
                    .then(data => data.fn_registrar_fuga_en_conexion_domiciliaria)
                    .catch(error => error);
            })
        },
        eliminarFugas: {
            type: GraphQLBoolean,
            args: {
                idsFugas: { type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(GraphQLInt))) }
            },
            resolve: usuarioEstaAutorizado((_, args) => {
                const query = "select * from gis.fn_eliminar_fugas($1)";
                return db.one(query, [args.idsFugas])
                    .then(data => data.fn_eliminar_fugas)
                    .catch(error => error);
            })
        },
        /* Paralizaciones de fuentes de abastecimiento */
        registrarParalizacionFuenteAbastecimiento: {
            type: new GraphQLNonNull(ParalizacionFuenteAbastecimiento),
            args: {
                fecha: { type: new GraphQLNonNull(GraphQLString) },
                hora: { type: new GraphQLNonNull(GraphQLString) },
                idTipoFuente: { type: new GraphQLNonNull(GraphQLString) },
                idFuente: { type: new GraphQLNonNull(GraphQLString) },
                idMotivo: { type: new GraphQLNonNull(GraphQLString) },
                otroMotivo: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve: (_, args, req) => {
                const query = "select * from gis.fn_registrar_paralizacion_fuente_abastecimiento($1,$2,$3,$4,$5,$6,$7)";
                return db.one(query, [
                    args.fecha,
                    args.hora,
                    args.idTipoFuente,
                    args.idFuente,
                    args.idMotivo,
                    args.otroMotivo,
                    req.user.id
                ])
                    .then(data => data)
                    .catch(error => error);
            }
        },
        registrarReactivacionFuenteAbastecimiento: {
            type: new GraphQLNonNull(ParalizacionFuenteAbastecimiento),
            args: {
                idParalizacion: { type: new GraphQLNonNull(GraphQLString) },
                fecha: { type: new GraphQLNonNull(GraphQLString) },
                hora: { type: new GraphQLNonNull(GraphQLString) },
                acciones: { type: new GraphQLNonNull(GraphQLString) },
                justificacion: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve: (_, args, req) => {
                const query = "select * from gis.fn_registrar_reactivacion_fuente_abastecimiento($1,$2,$3,$4,$5,$6)";
                return db.one(query, [
                    args.idParalizacion,
                    args.fecha,
                    args.hora,
                    args.acciones,
                    args.justificacion,
                    req.user.id
                ])
                    .then(data => data)
                    .catch(error => error);

            }
        },
        /* Lecturas de presión y continuidad */
        registrarLecturaPuntoMuestreo: {
            type: new GraphQLNonNull(RegistrarLecturaResponse),
            args: {
                suministro: { type: new GraphQLNonNull(GraphQLString) },
                variable: { type: new GraphQLNonNull(GraphQLString) },
                valorLeido: { type: new GraphQLNonNull(GraphQLFloat) },
                periodoAnio: { type: new GraphQLNonNull(GraphQLString) },
                periodoMes: { type: new GraphQLNonNull(GraphQLString) },
                fechaLectura: { type: new GraphQLNonNull(GraphQLString) },
                forzarRegistro: { type: new GraphQLNonNull(GraphQLBoolean) }
            },
            resolve: (_, args) => {
                const query = "select * from gis.fn_registrar_lectura_punto_muestreo($1,$2,$3,$4,$5,$6,$7);";
                return db.one(query, [args.suministro, args.variable, args.valorLeido, args.periodoAnio, args.periodoMes, args.fechaLectura, args.forzarRegistro])
                    .then(data => data)
                    .catch(error => error);
            }
        },
        eliminarLecturaPuntoMuestreo: {
            type: new GraphQLNonNull(EliminarLecturaResponse),
            args: {
                idLectura: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve: (_, args) => {
                const query = "select * from gis.fn_eliminar_lectura_punto_muestreo($1)";
                return db.one(query, [args.idLectura])
                    .then(data => data)
                    .catch(error => error);
            }
        },
        /* Cisternas */
        registrarCisterna: {
            type: new GraphQLNonNull(Cisterna),
            args: {
                placa: { type: new GraphQLNonNull(GraphQLString) },
                chofer: { type: new GraphQLNonNull(GraphQLString) },
                horaInicial: { type: new GraphQLNonNull(GraphQLString) },
                horaFinal: { type: new GraphQLNonNull(GraphQLString) },
                direccion: { type: new GraphQLNonNull(GraphQLString) },
                zonasAbastecidas: { type: new GraphQLNonNull(GraphQLString) },
                longitud: { type: new GraphQLNonNull(GraphQLFloat) },
                latitud: { type: new GraphQLNonNull(GraphQLFloat) }
            },
            resolve: usuarioEstaAutorizado((_, args) => {
                const query = "select * from gis.fn_registrar_nueva_cisterna($1,$2,$3,$4,$5,$6,$7,$8)";
                return db.one(query, [
                    args.placa,
                    args.chofer,
                    args.horaInicial,
                    args.horaFinal,
                    args.direccion,
                    args.zonasAbastecidas,
                    args.longitud,
                    args.latitud
                ])
                    .then(data => data)
                    .catch(error => error);
            })
        },
        actualizarInfoCisterna: {
            type: new GraphQLNonNull(Cisterna),
            args: {
                id: { type: new GraphQLNonNull(GraphQLString) },
                placa: { type: new GraphQLNonNull(GraphQLString) },
                chofer: { type: new GraphQLNonNull(GraphQLString) },
                horaInicial: { type: new GraphQLNonNull(GraphQLString) },
                horaFinal: { type: new GraphQLNonNull(GraphQLString) },
                direccion: { type: new GraphQLNonNull(GraphQLString) },
                zonasAbastecidas: { type: new GraphQLNonNull(GraphQLString) },
                longitud: { type: new GraphQLNonNull(GraphQLFloat) },
                latitud: { type: new GraphQLNonNull(GraphQLFloat) }
            },
            resolve: usuarioEstaAutorizado((_, args) => {
                const query = "select * from gis.fn_actualizar_info_cisterna($1,$2,$3,$4,$5,$6,$7,$8,$9)";
                return db.one(query, [
                    args.id,
                    args.placa,
                    args.chofer,
                    args.horaInicial,
                    args.horaFinal,
                    args.direccion,
                    args.zonasAbastecidas,
                    args.longitud,
                    args.latitud
                ])
                    .then(data => data)
                    .catch(error => error);
            })
        },
        eliminarCisterna: {
            type: GraphQLBoolean,
            args: {
                idCisterna: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve: usuarioEstaAutorizado((_, args) => {
                const query = "delete from gis.tb2_cisternas where id = $1";
                return db.oneOrNone(query, [args.idCisterna])
                    .then(() => true)
                    .catch(error => error);
            })
        },
        /* Válvulas de purga de aire */
        actualizarDatosVPA: {
            type: new GraphQLNonNull(ValvulaPA),
            args: {
                id: { type: new GraphQLNonNull(GraphQLString) },
                referenciaIdentificacion: { type: new GraphQLNonNull(GraphQLString) },
                longitud: { type: new GraphQLNonNull(GraphQLFloat) },
                latitud: { type: new GraphQLNonNull(GraphQLFloat) }
            },
            resolve: usuarioEstaAutorizado((_, args, req) => {
                const query = "select * from gis.fn_actualizar_datos_vpa($1,$2,$3,$4,$5)";
                return db.one(query, [
                    args.id,
                    args.referenciaIdentificacion,
                    args.longitud,
                    args.latitud,
                    req.user.id
                ])
                    .then(data => data)
                    .catch(error => error);
            })
        },
        registrarVPA: {
            type: new GraphQLNonNull(ValvulaPA),
            args: {
                referenciaIdentificacion: { type: new GraphQLNonNull(GraphQLString) },
                longitud: { type: new GraphQLNonNull(GraphQLFloat) },
                latitud: { type: new GraphQLNonNull(GraphQLFloat) }
            },
            resolve: usuarioEstaAutorizado((_, args, req) => {
                const query = "select * from gis.fn_registrar_vpa($1,$2,$3,$4)";
                return db.one(query, [
                    args.referenciaIdentificacion,
                    args.longitud,
                    args.latitud,
                    req.user.id
                ])
                    .then(data => data)
                    .catch(error => error);
            })
        },
        eliminarVPA: {
            type: GraphQLBoolean,
            args: {
                idVPA: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve: usuarioEstaAutorizado((_, args) => {
                const query = "delete from gis.tb2_vpa where id = $1";
                return db.oneOrNone(query, [args.idVPA])
                    .then(() => true)
                    .catch(error => error);
            })
        },
        registrarPerdidaOperacionalLimpiezaMantenimientoReservorio:{
            type: GraphQLBoolean,
            args: {
                id_provincia: { type: GraphQLInt},
                id_distrito: { type: GraphQLInt},
                id_reservorio: { type: GraphQLInt},
                capacidad: { type: new GraphQLNonNull(GraphQLFloat) },
                radio_cuba: { type: new GraphQLNonNull(GraphQLFloat) },
                perdida_estimada: { type: new GraphQLNonNull(GraphQLFloat) },
                fecha_limpieza: { type: new GraphQLNonNull(GraphQLString) },
                dni_usuario: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve: usuarioEstaAutorizado((_, args, req) => {
                const query = 'select * from gis.fn_registrar_limpieza_mantenimiento_reservorio($1,$2,$3,$4,$5,$6,$7,$8)';
                const values = [
                    args.id_provincia,
                    args.id_distrito,
                    args.id_reservorio,
                    args.capacidad,
                    args.radio_cuba,
                    args.perdida_estimada,
                    args.fecha_limpieza,
                    args.dni_usuario
                ];

                return db.one(query, values)
                    .then(data => data.fn_registrar_limpieza_mantenimiento_reservorio)
                    .catch(error => error);
            })
        }
    }
});

module.exports = Operaciones;


