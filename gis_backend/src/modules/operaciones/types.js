const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLNonNull,
    GraphQLString,
    GraphQLList,
    GraphQLInt,
    GraphQLFloat,
    GraphQLBoolean
} = require('graphql');

const db = require('../../dbconexion');

const NombreIdFields = {
    nombre: { type: new GraphQLNonNull(GraphQLString) },
    id: { type: new GraphQLNonNull(GraphQLInt) }
}

const reservorioTO = new GraphQLObjectType({
    name: "reservorioTO",
    fields: {
        id: { type: new GraphQLNonNull(GraphQLInt) },
        nombre: {type: new GraphQLNonNull(GraphQLString) }
    }
});

const LimpMantReservorioTO = new GraphQLObjectType({
    name: "LimpMantReservorio",
    fields: {
        provincia_s: { type: GraphQLString },
        distrito_s: { type: new GraphQLNonNull(GraphQLString) },
        reservorio_s: { type: new GraphQLNonNull(GraphQLString) },
        capacidad_reservorio_s: { type: new GraphQLNonNull(GraphQLFloat) },
        perdida_estimada_s: { type: new GraphQLNonNull(GraphQLFloat) },
        fecha_limpieza_s: {type: new GraphQLNonNull(GraphQLString) }
    }
});

const Fuga = new GraphQLObjectType({
    name: "Fuga",
    fields: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        tipo_reclamo_problema: { type: GraphQLString },
        lugar_fuga: { type: new GraphQLNonNull(GraphQLString) },
        causa: { type: GraphQLString },
        descripcion: { type: GraphQLString },
        referencia_ubicacion: { type: GraphQLString },
        id_provincia: { type: new GraphQLNonNull(GraphQLInt) },
        id_distrito: { type: new GraphQLNonNull(GraphQLInt) },
        provincia: { type: new GraphQLNonNull(GraphQLString) },
        distrito: { type: new GraphQLNonNull(GraphQLString) },
        fecha_inicio_fuga: { type: new GraphQLNonNull(GraphQLString) },//ISO 8601
        fecha_solucion_fuga: { type: new GraphQLNonNull(GraphQLString) },//ISO 8601
        fecha_inicio: { type: new GraphQLNonNull(GraphQLString) }, // formato DD-MM-YYYY HH:MI:SS am
        fecha_solucion: { type: new GraphQLNonNull(GraphQLString) }, // formato DD-MM-YYYY HH:MI:SS am
        codigo_elemento_afectado: { type: new GraphQLNonNull(GraphQLInt) },
        material_tuberia: { type: new GraphQLNonNull(GraphQLString) },
        diametro_tuberia: { type: new GraphQLNonNull(GraphQLFloat) },
        presion_estimada: { type: GraphQLFloat },
        volumen_perdido_agua: { type: new GraphQLNonNull(GraphQLFloat) },
        problemas_relacionados: { type: new GraphQLList(GraphQLInt) },
        nombre_usuario_registro: { type: new GraphQLNonNull(GraphQLString) },
        fecha_registro: { type: GraphQLString }
    }
});

const CausaFuga = new GraphQLObjectType({
    name: "CausaFuga",
    fields: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        descripcion: { type: new GraphQLNonNull(GraphQLString) }
    }
});

const AccionMantenimientoTuberia = new GraphQLObjectType({
    name: 'AccionMantenimientoTuberia',
    fields: {
        codigo: { type: new GraphQLNonNull(GraphQLString) },
        descripcion: { type: new GraphQLNonNull(GraphQLString) }
    }
});

const MantenimientoTuberia = new GraphQLObjectType({
    name: 'MantenimientoTuberia',
    fields: {
        acciones: { type: new GraphQLList(new GraphQLNonNull(AccionMantenimientoTuberia)) },
        codigo: { type: GraphQLString },
        costo_proyectado: { type: GraphQLFloat },
        costo_real: { type: GraphQLFloat },
        direccion: { type: GraphQLString },
        empresa: { type: GraphQLString },
        estado: { type: GraphQLString },
        fecha_fin: { type: GraphQLString },
        fecha_inicio: { type: GraphQLString },
        numero: { type: GraphQLString },
        serie: { type: GraphQLString },
        tipo_comprobante: { type: GraphQLString }
    }
});

const FugaTuberia = new GraphQLObjectType({
    name: 'FugaTuberia',
    fields: {
        tipo_incidencia: { type: new GraphQLNonNull(GraphQLString) },
        descripcion: { type: new GraphQLNonNull(GraphQLString) },
        referencia_ubicacion: { type: new GraphQLNonNull(GraphQLString) },
        fecha_hora_incidencia: { type: new GraphQLNonNull(GraphQLString) },
        fecha_hora_solucion: { type: new GraphQLNonNull(GraphQLString) },
        tiempo_transcurrido: { type: new GraphQLNonNull(GraphQLString) },
        volumen_perdido_agua: { type: new GraphQLNonNull(GraphQLFloat) }
    }
});

const MaterialTuberia = new GraphQLObjectType({
    name: 'MaterialTuberia',
    fields: {
        nombre: { type: GraphQLString }
    }
});

const FuncionTuberia = new GraphQLObjectType({
    name: 'FuncionTuberia',
    fields: {
        nombre: { type: new GraphQLNonNull(GraphQLString) }
    }
});

const TipoTuberia = new GraphQLObjectType({
    name: 'TipoTuberia',
    fields: {
        nombre: { type: new GraphQLNonNull(GraphQLString) }
    }
});

const TipologiaProblemaOperacional = new GraphQLObjectType({
    name: 'TipologiaProblemaOperacional',
    fields: NombreIdFields
});

const TipologiaReclamoProblema = new GraphQLObjectType({
    name: 'TipologiaReclamoProblema',
    fields: NombreIdFields
});

const DetalleProblemaOperacional = new GraphQLObjectType({
    name: 'DetalleProblemaOperacional',
    fields: NombreIdFields
});

const TipoAlcanceProblemaOperacional = new GraphQLObjectType({
    name: 'TipoAlcanceProblemaOperacional',
    fields: NombreIdFields
});

const EstadosUsuariosI3 = new GraphQLObjectType({
    name: 'EstadosUsuariosI3',
    fields: NombreIdFields
});

const PropiedadNombreId = new GraphQLObjectType({
    name: 'PropiedadNombreId',
    fields: {
        nombre: { type: new GraphQLNonNull(GraphQLString) },
        id: { type: new GraphQLNonNull(GraphQLInt) }
    }
});

const LecturaControlCalidad = new GraphQLObjectType({
    name: 'LecturaControlCalidad',
    fields: {
        fecha_lectura: { type: new GraphQLNonNull(GraphQLString) },
        parametro: { type: new GraphQLNonNull(GraphQLString) },
        valor: { type: new GraphQLNonNull(GraphQLFloat) }
    }
});

const ParametroCalidad = new GraphQLObjectType({
    name: 'ParametroCalidad',
    fields: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        nombre: { type: new GraphQLNonNull(GraphQLString) }
    }
});

const TipoFuenteAbastecimiento = new GraphQLObjectType({
    name: 'TipoFuenteAbastecimiento',
    fields: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        nombre: { type: new GraphQLNonNull(GraphQLString) }
    }
});

const FuenteAbastecimientoLite = new GraphQLObjectType({
    name: 'FuenteAbastecimientoLite',
    fields: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        nombre: { type: new GraphQLNonNull(GraphQLString) }
    }
});

const LecturaPuntoMuestreo = new GraphQLObjectType({
    name: "LecturaPuntoMuestreo",
    fields: {
        anio: { type: GraphQLInt },
        mes: { type: GraphQLString },
        presion: { type: GraphQLFloat },
        continuidad: { type: GraphQLFloat },
        valor_leido: { type: GraphQLFloat },
        fecha_toma_lectura: { type: GraphQLString },
        en_las_24_horas: { type: GraphQLBoolean },
        id: { type: GraphQLID }
    }
});

/*
    Paralizaciones de fuentes
    de abastecimiento
*/

const MotivoParalizacionFuenteAbastecimiento = new GraphQLObjectType({
    name: "MotivoParalizacionFuenteAbastecimiento",
    fields: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        descripcion: { type: new GraphQLNonNull(GraphQLString) },
        abreviatura: { type: GraphQLString }
    }
});

const FuenteAbastecimiento = new GraphQLObjectType({
    name: "FuenteAbastecimiento",
    fields: {
        id: {
            type: new GraphQLNonNull(GraphQLID),
            resolve: (parent) => `${parent.id_tipo_fuente}${parent.id_fuente}`
        },
        id_fuente: { type: new GraphQLNonNull(GraphQLString) },
        nombre: { type: new GraphQLNonNull(GraphQLString) },
        id_tipo_fuente: { type: new GraphQLNonNull(GraphQLString) },
        tipo_fuente: { type: new GraphQLNonNull(GraphQLString) },
        longitud: { type: GraphQLFloat },
        latitud: { type: GraphQLFloat }
    }
});

const ReactivacionFuenteAbastecimiento = new GraphQLObjectType({
    name: "ReactivacionFuenteAbastecimiento",
    fields: {
        fecha: { type: new GraphQLNonNull(GraphQLString) },
        hora: { type: new GraphQLNonNull(GraphQLString) },
        acciones_tomadas: { type: new GraphQLNonNull(GraphQLString) },
        justificacion_demora: { type: GraphQLString },
    }
});

const ParalizacionFuenteAbastecimiento = new GraphQLObjectType({
    name: "ParalizacionFuenteAbastecimiento",
    fields: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        motivo_paralizacion: { type: new GraphQLNonNull(GraphQLString) },
        fecha: { type: new GraphQLNonNull(GraphQLString) },
        hora: { type: new GraphQLNonNull(GraphQLString) },
        en_desarrollo: { type: new GraphQLNonNull(GraphQLBoolean) },
        datetime: { type: new GraphQLNonNull(GraphQLString) },
        fuente: {
            type: new GraphQLNonNull(FuenteAbastecimiento),
            resolve: (parent) => {
                const query = "select * from gis.fn_info_fuente_paralizada($1)";
                return db.one(query, [parent.id])
                    .then(data => data)
                    .catch(error => error);
            }
        },
        reactivacion: {
            type: ReactivacionFuenteAbastecimiento,
            resolve: (parent) => {
                const query = "select * from gis.fn_info_reactivacion($1)";
                return db.oneOrNone(query, [parent.id])
                    .then(data => data)
                    .catch(error => error);
            }
        }
    }
});

const ParalizacionGraphRecord = new GraphQLObjectType({
    name: 'ParalizacionGraphRecord',
    fields: {
        zonal: { type: new GraphQLNonNull(GraphQLString) },
        num_paralizaciones: { type: new GraphQLNonNull(GraphQLInt) }
    }
});

const MotivosParalizacionGraphRecord = new GraphQLObjectType({
    name: 'MotivosParalizacionGraphRecord',
    fields: {
        motivo: { type: new GraphQLNonNull(GraphQLString) },
        abreviatura: { type: new GraphQLNonNull(GraphQLString) },
        num_ocurrencias: { type: new GraphQLNonNull(GraphQLInt) }
    }
});

/* Puntos de muestreo */

const Coordenada = new GraphQLObjectType({
    name: "Coordenada",
    fields: {
        longitud: { type: new GraphQLNonNull(GraphQLFloat) },
        latitud: { type: new GraphQLNonNull(GraphQLFloat) }
    }
});

const GrupoAnualLecturasPM = new GraphQLObjectType({
    name: "GrupoAnualLecturasPM",
    fields: {
        anio: { type: new GraphQLNonNull(GraphQLString) },
        lecturas: { type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(LecturaPuntoMuestreo))) }
    }
});

const PuntoMuestreo = new GraphQLObjectType({
    name: 'PuntoMuestreo',
    fields: {
        suministro: { type: new GraphQLNonNull(GraphQLString) },
        nombre_usuario: { type: GraphQLString },
        zona: { type: GraphQLString },
        longitud: { type: GraphQLFloat },
        latitud: { type: GraphQLFloat },
        lecturas: {
            type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(GrupoAnualLecturasPM))),
            args: {
                variable: { type: new GraphQLNonNull(GraphQLString) },
                cantidad: { type: new GraphQLNonNull(GraphQLInt) }
            },
            resolve: (parent, args) => {
                const query = "select * from gis.fn_get_lecturas_punto_muestreo($1,$2,$3);";
                return db.manyOrNone(query, [parent.suministro, args.variable, args.cantidad])
                    .then(data => data)
                    .catch(error => error);
            }
        },
        tiene_lecturas: {
            type: new GraphQLNonNull(GraphQLBoolean),
            args: {
                periodoAnio: { type: new GraphQLNonNull(GraphQLString) },
                periodoMes: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve: (parent, args) => {
                const query = "select * from gis.fn_punto_muestreo_tiene_lecturas($1,$2,$3)";
                return db.oneOrNone(query, [parent.suministro, args.periodoAnio, args.periodoMes])
                    .then(data => data.fn_punto_muestreo_tiene_lecturas)
                    .catch(error => error);
            }
        }
    }
});

const RegistrarLecturaResponse = new GraphQLObjectType({
    name: "RegistrarLecturaResponse",
    fields: {
        confirmar_ingreso: { type: GraphQLBoolean },
        mensaje: { type: GraphQLString },
        id_lectura: { type: GraphQLString },
        fecha_registro: { type: GraphQLString },
        tiene_lecturas: { type: GraphQLBoolean }
    }
});

const EliminarLecturaResponse = new GraphQLObjectType({
    name: "EliminarLecturaResponse",
    fields: {
        tiene_lecturas: { type: GraphQLBoolean }
    }
});

const ZonaTrabajo = new GraphQLObjectType({
    name: "ZonaTrabajo",
    fields: {
        id: {
            type: GraphQLNonNull(GraphQLID),
            resolve: (parent) => {
                const id = `${parent.id_provincia}${parent.id_distrito}`;
                if (parent.numero) return `${id}${parent.numero}`;
                return id;
            }
        },
        numero: { type: GraphQLString },
        id_provincia: { type: GraphQLNonNull(GraphQLString) },
        id_distrito: { type: GraphQLNonNull(GraphQLString) },
        puntosMuestreo: {
            type: new GraphQLNonNull(new GraphQLList(PuntoMuestreo)),
            resolve: (parent) => {
                const query = "select * from gis.fn_get_puntos_muestreo_zona_trabajo($1,$2,$3)";
                return db.manyOrNone(query, [parent.numero, parent.id_provincia, parent.id_distrito])
                    .then(data => data)
                    .catch(error => error);
            }
        },
        coordenadas: {
            type: new GraphQLNonNull(new GraphQLList(Coordenada)),
            resolve: (parent) => {
                const query = "select * from gis.fn_get_limites_zona_trabajo($1,$2,$3)";
                return db.manyOrNone(query, [parent.numero, parent.id_provincia, parent.id_distrito])
                    .then(data => data)
                    .catch(error => error);
            }
        },
        longitud: { type: GraphQLFloat },
        latitud: { type: GraphQLFloat }
    }
});

/* Cisternas */

const Cisterna = new GraphQLObjectType({
    name: "Cisterna",
    fields: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        placa: { type: new GraphQLNonNull(GraphQLString) },
        chofer: { type: new GraphQLNonNull(GraphQLString) },
        hora_inicial: { type: new GraphQLNonNull(GraphQLString) },
        hora_final: { type: new GraphQLNonNull(GraphQLString) },
        hora_inicial_texto: { type: new GraphQLNonNull(GraphQLString) },
        hora_final_texto: { type: new GraphQLNonNull(GraphQLString) },
        horario: { type: new GraphQLNonNull(GraphQLString) },
        direccion: { type: new GraphQLNonNull(GraphQLString) },
        zonas_abastecidas: { type: new GraphQLNonNull(GraphQLString) },
        longitud: { type: new GraphQLNonNull(GraphQLFloat) },
        latitud: { type: new GraphQLNonNull(GraphQLFloat) }
    }
});

const ValvulaPA = new GraphQLObjectType({
    name: "ValvulaPA",
    fields: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        dc_id: { type: GraphQLString },
        numero: { type: GraphQLInt },
        id_provincia: { type: GraphQLString },
        id_distrito: { type: GraphQLString },
        num_zona: { type: GraphQLString },
        este: { type: GraphQLFloat },
        norte: { type: GraphQLFloat },
        referencia_identificacion: { type: GraphQLString }
    }
});

module.exports = {
    reservorioTO,
    LimpMantReservorioTO,
    Fuga,
    CausaFuga,
    MantenimientoTuberia,
    FugaTuberia,
    MaterialTuberia,
    FuncionTuberia,
    TipoTuberia,
    PropiedadNombreId,
    TipologiaProblemaOperacional,
    TipologiaReclamoProblema,
    DetalleProblemaOperacional,
    TipoAlcanceProblemaOperacional,
    EstadosUsuariosI3,
    LecturaControlCalidad,
    ParametroCalidad,
    TipoFuenteAbastecimiento,
    FuenteAbastecimientoLite,
    LecturaPuntoMuestreo,
    /* Paralizaciones */
    FuenteAbastecimiento,
    MotivoParalizacionFuenteAbastecimiento,
    ParalizacionFuenteAbastecimiento,
    ParalizacionGraphRecord,
    MotivosParalizacionGraphRecord,
    /* Puntos de muestreo */
    ZonaTrabajo,
    PuntoMuestreo,
    RegistrarLecturaResponse,
    EliminarLecturaResponse,
    /* Cisternas*/
    Cisterna,
    ValvulaPA
};