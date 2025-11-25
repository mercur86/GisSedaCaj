const {
    Fuga,
    CausaFuga,
    MantenimientoTuberia,
    FugaTuberia,
    MaterialTuberia,
    FuncionTuberia,
    TipoTuberia,
    PropiedadNombreId,
    TipologiaProblemaOperacional,
    DetalleProblemaOperacional,
    TipoAlcanceProblemaOperacional,
    LecturaControlCalidad,
    ParametroCalidad,
    TipoFuenteAbastecimiento,
    FuenteAbastecimientoLite,
    LecturaPuntoMuestreo,
    /* Paralizaciones */
    MotivoParalizacionFuenteAbastecimiento,
    FuenteAbastecimiento,
    ParalizacionFuenteAbastecimiento,
    ParalizacionGraphRecord,
    MotivosParalizacionGraphRecord,
    /* Puntos de muestreo */
    ZonaTrabajo,
    PuntoMuestreo,
    Cisterna,
    ValvulaPA,
    TipologiaReclamoProblema,
    /*reservorios*/
    reservorioTO,
    LimpMantReservorioTO,
    EstadosUsuariosI3
} = require('./types');
const {
    GraphQLObjectType,
    GraphQLList,
    GraphQLNonNull,
    GraphQLString,
    GraphQLInt,
    GraphQLFloat
} = require('graphql');

const db = require('../../dbconexion');
const fetch = require('node-fetch');
const { usuarioEstaAutorizado } = require('../../auth/authorization');

const Operaciones = new GraphQLObjectType({
    name: 'OperacionesQuery',
    fields: {
        fugasAnf: {
            type: new GraphQLNonNull(new GraphQLList(Fuga)),
            args: {
                idProvincia: { type: GraphQLInt },
                idDistrito: { type: new GraphQLList(new GraphQLNonNull(GraphQLInt)) },
                fechaInicial: { type: new GraphQLNonNull(GraphQLString) },
                fechaFinal: { type: new GraphQLNonNull(GraphQLString) },
                filtroFecha: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve: usuarioEstaAutorizado((_, args) => {
                const { idProvincia, idDistrito, fechaInicial, fechaFinal, filtroFecha } = args;
                const query = 'select * from gis.fn_fugas_anf($1,$2,$3,$4,$5)';
                return db.manyOrNone(query, [idProvincia, idDistrito, fechaInicial, fechaFinal, filtroFecha])
                    .then(data => data)
                    .catch(error => error);
            })
        },
        volumenPerdidoDeFugaEnRed: {
            type: new GraphQLNonNull(GraphQLFloat),
            args: {
                presionEstimada: { type: new GraphQLNonNull(GraphQLFloat) },
                fechaInicioFuga: { type: new GraphQLNonNull(GraphQLString) },
                fechaSolucionFuga: { type: new GraphQLNonNull(GraphQLString) },
                diametroTuberia: { type: new GraphQLNonNull(GraphQLFloat) }
            },
            resolve: (_, args) => {
                const {
                    presionEstimada,
                    fechaInicioFuga,
                    fechaSolucionFuga,
                    diametroTuberia
                } = args;
                const query = "select * from gis.fn_estimar_perdida_agua_fuga($1,$2,$3,$4)";
                return db.one(query, [presionEstimada, fechaInicioFuga, fechaSolucionFuga, diametroTuberia])
                    .then(data => data.fn_estimar_perdida_agua_fuga)
                    .catch(error => error);
            }
        },
        volumenPerdidoDeFugaEnConexionDomiciliaria: {
            type: new GraphQLNonNull(GraphQLFloat),
            args: {
                fechaInicio: { type: new GraphQLNonNull(GraphQLString) },
                fechaSolucion: { type: new GraphQLNonNull(GraphQLString) },
                diametroTuberia: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve: (_, args) => {
                const {
                    fechaInicio,
                    fechaSolucion,
                    diametroTuberia
                } = args;
                const query = "select * from gis.fn_estimar_perdida_agua_fuga_conexion_domiciliaria($1,$2,$3)";
                return db.one(query, [fechaInicio, fechaSolucion, diametroTuberia])
                    .then(data => data.fn_estimar_perdida_agua_fuga_conexion_domiciliaria)
                    .catch(error => error);
            }
        },
        listaMantenimientosTuberia: {
            type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(MantenimientoTuberia))),
            args: {
                gidTuberia: { type: new GraphQLNonNull(GraphQLInt) },
                tuberiaPertenece: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve: usuarioEstaAutorizado((_, args) => {
                return fetch(`http://181.65.142.123:8080/servicios-comunes/open/mantenimiento/elemento?tipo_elemento=${args.tuberiaPertenece}&cod_elemento=${args.gidTuberia}`)
                    .then(response => response.json())
                    .then(resp => resp.data)
                    .catch(error => error);
            })
        },
        listaFugasTuberia: {
            type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(FugaTuberia))),
            args: {
                gidTuberia: { type: new GraphQLNonNull(GraphQLInt) },
                tipoElemento: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve: usuarioEstaAutorizado((_, args) => {
                const { gidTuberia, tipoElemento } = args;
                const query = "select * from gis.fn_listar_historico_fugas_roturas($1,$2)";
                return db.any(query, [gidTuberia, tipoElemento])
                    .then(data => data)
                    .catch(error => error);
            })
        },
        causasFuga: {
            type: new GraphQLNonNull(new GraphQLList(CausaFuga)),
            resolve: () => {
                const query = "select * from gis.tb2_causas_fuga";
                return db.many(query)
                    .then(data => data)
                    .catch(error => error)
            }
        },
        listaMaterialTuberia: {
            type: new GraphQLNonNull(new GraphQLList(MaterialTuberia)),
            resolve: () => {
                const query = "select distinct material as nombre from gis.piura_sig_red_agua where material is not null";
                return db.any(query)
                    .then(data => data)
                    .catch(error => error);
            }
        },
        listaFuncionTuberia: {
            type: new GraphQLNonNull(new GraphQLList(FuncionTuberia)),
            resolve: () => {
                const query = "select distinct tipo_funcion as nombre from gis.piura_sig_red_agua where tipo_funcion is not null";
                return db.any(query)
                    .then(data => data)
                    .catch(error => error);
            }
        },
        listaTipoTuberia: {
            type: new GraphQLNonNull(new GraphQLList(TipoTuberia)),
            resolve: () => {
                const query = "select distinct tipo as nombre from gis.piura_sig_red_agua where tipo is not null";
                return db.any(query)
                    .then(data => data)
                    .catch(error => error);
            }
        },
        listaMaterialTuberiaAlcantadillado: {
            type: new GraphQLNonNull(new GraphQLList(MaterialTuberia)),
            resolve: () => {
                const query = "select distinct material as nombre from gis.piura_sig_alcantarillado_red where material is not null";
                return db.any(query)
                    .then(data => data)
                    .catch(error => error);
            }
        },
        listaTipoTuberiaAlcantarillado: {
            type: new GraphQLNonNull(new GraphQLList(TipoTuberia)),
            resolve: () => {
                const query = "select distinct tipo as nombre from gis.piura_sig_alcantarillado_red where tipo is not null";
                return db.any(query)
                    .then(data => data)
                    .catch(error => error);
            }
        },
        listaTipologiaProblema: {
            type: new GraphQLNonNull(new GraphQLList(TipologiaProblemaOperacional)),
            args: {
                area: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve: (_, args) => {
                const query = "select * from gis.fn_tipologias_problema($1)";
                return db.any(query, [args.area])
                    .then(data => data)
                    .catch(error => error);
            }
        },
        listaTipoReclamoProblema: {
            type: new GraphQLNonNull(new GraphQLList(TipologiaReclamoProblema)),
            resolve: (_, args) => {
                const query = "select * from gis.fn_tipo_reclamo_problema()";
                return db.any(query, [args.area])
                    .then(data => data)
                    .catch(error => error);
            }
        },
        listaEstadoReclamoProblema: {
            type: new GraphQLNonNull(new GraphQLList(TipologiaReclamoProblema)),
            resolve: (_, args) => {
                const query = "select * from gis.fn_estado_reclamo_problema()";
                return db.any(query, [args.area])
                    .then(data => data)
                    .catch(error => error);
            }
        },
        listaTipoAccesorio: {
            type: new GraphQLNonNull(new GraphQLList(TipologiaReclamoProblema)),
            resolve: (_, args) => {
                const query = "select * from gis.fn_tipo_accesorio()";
                return db.any(query, [args.area])
                    .then(data => data)
                    .catch(error => error);
            }
        },
        listaDetalleProblema: {
            type: new GraphQLNonNull(new GraphQLList(DetalleProblemaOperacional)),
            args: {
                area: { type: new GraphQLNonNull(GraphQLString) },
                idsTipologia: { type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(GraphQLInt))) }
            },
            resolve: (_, args) => {
                const query = "select * from gis.fn_listar_detalle_problema($1,$2)";
                return db.any(query, [args.area, args.idsTipologia])
                    .then(data => data)
                    .catch(error => error);
            }
        },
        listaTipoProblema: {
            type: new GraphQLNonNull(new GraphQLList(TipoAlcanceProblemaOperacional)),
            resolve: () => {
                const query = "select * from gis.fn_tipos_problema()";
                return db.any(query)
                    .then(data => data)
                    .catch(error => error);
            }
        },
        listaSectorComercial: {
            type: new GraphQLNonNull(new GraphQLList(TipoAlcanceProblemaOperacional)),
            resolve: () => {
                const query = "select * from gis.fn_sectores_comerciales()";
                return db.any(query)
                    .then(data => data)
                    .catch(error => error);
            }
        },
        listaEstadosUsuarioI3: {
            type: new GraphQLNonNull(new GraphQLList(EstadosUsuariosI3)),
            resolve: () => {
                const query = "select * from gis.fn_estados_usuarios_i3()";
                return db.any(query)
                    .then(data => data)
                    .catch(error => error);
            }
        },
        listaTipologiaProblemaComercial: {
            type: new GraphQLNonNull(new GraphQLList(PropiedadNombreId)),
            resolve: () => {
                const query = "select * from gis.fn_tipologias_problema($1)";
                return db.any(query)
                    .then(data => data)
                    .catch(error => error);
            }
        },
        lecturasPuntoControlCalidad: {
            type: new GraphQLNonNull(new GraphQLList(LecturaControlCalidad)),
            args: {
                codigoPunto: { type: new GraphQLNonNull(GraphQLString) },
                tipoFuente: { type: new GraphQLNonNull(GraphQLInt) }
            },
            resolve: usuarioEstaAutorizado((_, args) => {
                const query = "select * from gis.fn_lecturas_punto_control_calidad($1,$2)";
                return db.manyOrNone(query, [args.codigoPunto, args.tipoFuente])
                    .then(data => data)
                    .catch(error => error);

            })
        },
        listaParametrosCalidad: {
            type: new GraphQLNonNull(new GraphQLList(ParametroCalidad)),
            resolve: () => {
                const query = 'select id,nombre from control_calidad.tb_parametro where es_max_min = true order by nombre';
                return db.many(query)
                    .then(data => data)
                    .catch(error => error);
            }
        },
        listaTiposFuentesAbastecimiento:/* de control de calidad */ {
            type: new GraphQLNonNull(new GraphQLList(TipoFuenteAbastecimiento)),
            resolve: () => {
                const query = 'select id,nombre from control_calidad.tb_tipo_fuente_abastecimiento';
                return db.many(query)
                    .then(data => data)
                    .catch(error => error);
            }
        },
        listaFuentesAbastecimiento:/* de control de calidad */ {
            type: new GraphQLNonNull(new GraphQLList(FuenteAbastecimientoLite)),
            args: {
                idProvincia: { type: GraphQLInt },
                idDistrito: { type: GraphQLInt },
                idTipoFuente: { type: new GraphQLNonNull(GraphQLInt) }
            },
            resolve: (_, args) => {
                const query = 'select id,nombre from gis.fn_lista_fuentes_control_calidad($1,$2,$3)';
                return db.manyOrNone(query, [
                    args.idProvincia,
                    args.idDistrito,
                    args.idTipoFuente
                ])
                    .then(data => data)
                    .catch(error => error);
            }
        },
        lecturasPuntoMuestreo: {
            type: new GraphQLNonNull(new GraphQLList(LecturaPuntoMuestreo)),
            args: {
                suministro: { type: new GraphQLNonNull(GraphQLInt) }
            },
            resolve: usuarioEstaAutorizado((_, args) => {
                const query = "select * from gis.fn_lecturas_punto_muestreo($1)";
                return db.manyOrNone(query, [args.suministro])
                    .then(data => data)
                    .catch(error => error);
            })
        },
        /* Paralizaciones de fuentes de abastecimiento */
        motivosParalizacionFuenteAbastecimiento: {
            type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(MotivoParalizacionFuenteAbastecimiento))),
            resolve: () => {
                const query = `select * from gis.tb2_motivo_paralizacion_fuente_abastecimiento`;
                return db.many(query)
                    .then(data => data)
                    .catch(error => error);
            }
        },
        fuentesAbastecimientoActivas: {
            type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(FuenteAbastecimiento))),
            args: {
                idProvincia: { type: new GraphQLNonNull(GraphQLString) },
                idTipoFuente: { type: new GraphQLNonNull(GraphQLString) },
            },
            resolve: (_, args) => {
                const query = `select * from gis.fn_lista_fuentes_abastecimiento($1,$2);`;
                return db.manyOrNone(query, [args.idProvincia, args.idTipoFuente])
                    .then(data => data)
                    .catch(error => error);
            }
        },
        paralizacionesMapa: {
            type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(ParalizacionFuenteAbastecimiento))),
            resolve: () => {
                const query = "select * from gis.fn_paralizaciones_para_mapa()";
                return db.manyOrNone(query)
                    .then(data => data)
                    .catch(error => error);
            }
        },
        paralizacionesPorZonales: {
            type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(ParalizacionGraphRecord))),
            args: {
                fechaInicial: { type: new GraphQLNonNull(GraphQLString) },
                fechaFinal: { type: new GraphQLNonNull(GraphQLString) },
                tipoIncidencia: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve: (_, args) => {
                const query = "select * from gis.fn_paralizaciones_por_zonales($1,$2,$3)";
                return db.manyOrNone(query, [args.fechaInicial, args.fechaFinal, args.tipoIncidencia])
                    .then(data => data)
                    .catch(error => error);
            }
        },
        paralizacionesPorTipoFuente: {
            type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(ParalizacionGraphRecord))),
            args: {
                fechaInicial: { type: new GraphQLNonNull(GraphQLString) },
                fechaFinal: { type: new GraphQLNonNull(GraphQLString) },
                tipoFuente: { type: new GraphQLNonNull(GraphQLString) },
                tipoIncidencia: { type: GraphQLString }
            },
            resolve: (_, args) => {
                const query = "select * from gis.fn_paralizaciones_por_tipo_fuente($1,$2,$3,$4)";
                return db.manyOrNone(query, [args.fechaInicial, args.fechaFinal, args.tipoFuente, args.tipoIncidencia])
                    .then(data => data)
                    .catch(error => error);
            }
        },
        motivosFrecuentesParalizacion: {
            type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(MotivosParalizacionGraphRecord))),
            args: {
                fechaInicial: { type: new GraphQLNonNull(GraphQLString) },
                fechaFinal: { type: new GraphQLNonNull(GraphQLString) },
                idProvincia: { type: new GraphQLNonNull(GraphQLString) },
                tipoFuente: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve: (_, args) => {
                const query = "select * from gis.fn_motivos_comunes_paralizacion($1,$2,$3,$4)";
                return db.manyOrNone(query, [args.fechaInicial, args.fechaFinal, args.idProvincia, args.tipoFuente])
                    .then(data => data)
                    .catch(error => error);
            }
        },
        /* Presión y continuidad */
        zonaTrabajo: {
            type: new GraphQLNonNull(ZonaTrabajo),
            args: {
                numero: { type: GraphQLString },
                idProvincia: { type: new GraphQLNonNull(GraphQLString) },
                idDistrito: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve: (_, args) => {
                const query = "select * from gis.fn_info_zona_trabajo_puntos_muestreo($1,$2,$3)";
                return db.one(query, [args.idProvincia, args.idDistrito, args.numero])
                    .then(data => ({
                        numero: args.numero,
                        id_provincia: args.idProvincia,
                        id_distrito: args.idDistrito,
                        ...data
                    }))
                    .catch(error => error);
            }
        },
        puntoMuestreo: {
            type: new GraphQLNonNull(PuntoMuestreo),
            args: {
                suministro: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve: (_, args) => {
                const query = "select * from gis.fn_get_info_punto_muestreo($1)";
                return db.oneOrNone(query, [args.suministro])
                    .then(data => data)
                    .catch(error => error);
            }
        },
        zonasTrabajo: {
            type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(ZonaTrabajo))),
            args: {
                idProvincia: { type: new GraphQLNonNull(GraphQLString) },
                idDistrito: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve: (_, args) => {
                const query = "select * from gis.fn_get_zonas_trabajo_localidad($1,$2)";
                return db.manyOrNone(query, [args.idProvincia, args.idDistrito])
                    .then(data => data)
                    .catch(error => error);
            }
        },
        /*  Cisternas */
        listaCisternas: {
            type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(Cisterna))),
            resolve: usuarioEstaAutorizado(() => {
                const query = "select * from gis.v_tb2_cisternas order by id desc";
                return db.manyOrNone(query)
                    .then(data => data)
                    .catch(error => error);
            })
        },
        /* Válvulas de purga de aire */
        listaVPAs: {
            type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(ValvulaPA))),
            args: {
                idProvincia: { type: GraphQLString },
                idDistrito: { type: GraphQLString },
            },
            resolve: (_, args) => {
                const query = "select * from gis.fn_get_vpa($1,$2)";
                return db.manyOrNone(query, [args.idProvincia, args.idDistrito])
                    .then(data => data)
                    .catch(error => error);
            }
        },
        /* Válvulas de purga de aire */
        obtenerReservoriosByProvDist: {
                type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(reservorioTO))),
                args: {
                    idProvincia: { type: GraphQLInt },
                    idDistrito: { type: GraphQLInt },
                },
                resolve: (_, args) => {
                    const query = "select * from gis.fn_obtener_reservorios_by_prov_dist($1,$2)";
                    return db.manyOrNone(query, [args.idProvincia, args.idDistrito])
                        .then(data => data)
                        .catch(error => error);
                }
            },
        limpMantReserorios: {
                type: new GraphQLNonNull(new GraphQLList(LimpMantReservorioTO)),
                args: {
                    idProvincia: { type: GraphQLInt },
                    idDistrito: { type: GraphQLInt },
                    fechaInicial: { type: new GraphQLNonNull(GraphQLString) },
                    fechaFinal: { type: new GraphQLNonNull(GraphQLString) }                },
                resolve: usuarioEstaAutorizado((_, args) => {
                    const { idProvincia, idDistrito, fechaInicial, fechaFinal } = args;
                    const query = 'select * from gis.sp_obtener_limpiezas_mantenimientos_reservorios($1,$2,$3,$4)';
                    return db.manyOrNone(query, [idProvincia, idDistrito, fechaInicial, fechaFinal])
                        .then(data => data)
                        .catch(error => error);
                })
            },
    }
});

module.exports = Operaciones;