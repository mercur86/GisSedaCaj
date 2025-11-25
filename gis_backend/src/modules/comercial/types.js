const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLNonNull,
    GraphQLString,
    GraphQLInt,
    GraphQLFloat,
    GraphQLBoolean,
    GraphQLList
} = require('graphql');

const db = require('../../dbconexion');

const LecturaSuministro = new GraphQLObjectType({
    name: 'LecturaSuministro',
    fields: {
        id_medidor: { type: new GraphQLNonNull(GraphQLID) },
        periodo: { type: new GraphQLNonNull(GraphQLString) },
        lectura_diametro_mayor: { type: new GraphQLNonNull(GraphQLInt) },
        lectura_diametro_menor: { type: new GraphQLNonNull(GraphQLInt) },
        tipo_lectura: { type: GraphQLString },
        lectura_criticada: { type: new GraphQLNonNull(GraphQLString) },
        fecha_lectura: { type: new GraphQLNonNull(GraphQLString) }
    }
});

const FacturacionSuministro = new GraphQLObjectType({
    name: 'FacturacionSuministro',
    fields: {
        codigo_recibo: { type: new GraphQLNonNull(GraphQLID) },
        fechaemision: { type: new GraphQLNonNull(GraphQLString) },
        fechavencimiento: { type: new GraphQLNonNull(GraphQLString) },
        fecha_pago: { type: new GraphQLNonNull(GraphQLString) },
        totalpendiente: { type: new GraphQLNonNull(GraphQLFloat) },
        volumen_facturado: { type: new GraphQLNonNull(GraphQLInt) },
        estado_recibo: { type: new GraphQLNonNull(GraphQLString) },
        meses_atrasados: { type: new GraphQLNonNull(GraphQLInt) }
    }
});

const ConsumoSuministro = new GraphQLObjectType({
    name: 'ConsumoSuministro',
    fields: {
        periodo: { type: new GraphQLNonNull(GraphQLID) },
        consumoaguareal: { type: new GraphQLNonNull(GraphQLInt) },
        consumoaguafacturable: { type: new GraphQLNonNull(GraphQLInt) },
        origen_consumo: { type: new GraphQLNonNull(GraphQLString) },
        origen_consumo_abrev: { type: new GraphQLNonNull(GraphQLString) }
    }
});

const InspeccionVMASuministro = new GraphQLObjectType({
    name: 'InspeccionVMASuministro',
    fields: {
        fecha_inspeccion: { type: new GraphQLNonNull(GraphQLString) },
        hora_inspeccion: { type: new GraphQLNonNull(GraphQLString) },
        num_inscripcion: { type: new GraphQLNonNull(GraphQLInt) },
        dbo: { type: new GraphQLNonNull(GraphQLInt) },
        dqo: { type: new GraphQLNonNull(GraphQLInt) },
        sst: { type: new GraphQLNonNull(GraphQLInt) },
        ayg: { type: new GraphQLNonNull(GraphQLInt) },
        estado_inspeccion: { type: new GraphQLNonNull(GraphQLString) },
        factor_ajuste_inspeccion: { type: new GraphQLNonNull(GraphQLInt) },
    }
});

const Archivo = new GraphQLObjectType({
    name: 'Archivo',
    fields: {
        gid: { type: new GraphQLNonNull(GraphQLInt) },
        nombre: { type: new GraphQLNonNull(GraphQLString) },
        tipo_archivo: { type: new GraphQLNonNull(GraphQLString) },
        ruta: { type: new GraphQLNonNull(GraphQLString) },
        fecha_subida: { type: new GraphQLNonNull(GraphQLString) },
        descripcion: { type: new GraphQLNonNull(GraphQLString) },
        creador: { type: new GraphQLNonNull(GraphQLString) }
    }
});

const Reclamo = new GraphQLObjectType({
    name: 'Reclamo',
    fields: {
        num_reclamo: { type: GraphQLInt },
        nombre_reclamante: { type: GraphQLString },
        suministro: { type: GraphQLInt },
        direccion_predio: { type: GraphQLString }
    }
});

const UnidadUso = new GraphQLObjectType({
    name: "UnidadUso",
    fields: {
        v_num_unidad_uso: { type: GraphQLInt },
        v_desc_categoria: { type: GraphQLString },
        v_num_habitantes_uu: { type: GraphQLInt },
        v_id_ciuu_t: { type: GraphQLString },
        v_desc_ciuu: { type: GraphQLString },
        v_nombre_comercial: { type: GraphQLString }
    }
});

const FichaCatastral = new GraphQLObjectType({
    name: "FichaCatastral",
    fields: {
        v_num_inscripcion: { type: GraphQLInt },
        tipo_suministro: { type: GraphQLString },
        tipo_servicio: { type: GraphQLString },
        categoria_principal: { type: GraphQLString },
        tipo_documento: { type: GraphQLString },
        id_cliente: { type: GraphQLString },
        tipo_responsable: { type: GraphQLString },
        apellido_paterno: { type: GraphQLString },
        apellido_materno: { type: GraphQLString },
        nombre_cliente: { type: GraphQLString },
        razon_social: { type: GraphQLString },
        email_cliente: { type: GraphQLString },
        telefono_cliente: { type: GraphQLString },
        celular_cliente: { type: GraphQLString },
        id_provincia: { type: GraphQLInt },
        id_distrito: { type: GraphQLInt },
        id_sector_comercial: { type: GraphQLInt },
        id_manzana: { type: GraphQLInt },
        lote: { type: GraphQLInt },
        sublote: { type: GraphQLInt },
        estado_predio: { type: GraphQLString },
        id_ciclo: { type: GraphQLInt },
        localidad: { type: GraphQLString },
        descripcion_sector_agua: { type: GraphQLString },
        descripcion_sector_desague: { type: GraphQLString },
        id_ruta_lectura: { type: GraphQLInt },
        num_secuencia_lectura: { type: GraphQLInt },
        num_ruta_reparto: { type: GraphQLInt },
        num_secuencia_reparto: { type: GraphQLInt },
        tipo_via: { type: GraphQLString },
        descripcion_via: { type: GraphQLString },
        tipo_zona: { type: GraphQLString },
        descripcion_zona: { type: GraphQLString },
        manzana_predio: { type: GraphQLString },
        lote_predio: { type: GraphQLString },
        numero_municipal: { type: GraphQLString },
        nro_departamento: { type: GraphQLString },
        piso: { type: GraphQLInt },
        referencia: { type: GraphQLString },
        tipo_propiedad: { type: GraphQLString },
        situacion_predio: { type: GraphQLString },
        tipo_construccion: { type: GraphQLString },
        material_contruccion: { type: GraphQLString },
        tipo_reservorio: { type: GraphQLString },
        tipo_abastecimiento: { type: GraphQLString },
        tipo_alcantarillado: { type: GraphQLString },
        tipo_huerto_jardin: { type: GraphQLString },
        num_pisos: { type: GraphQLInt },
        num_habitantes: { type: GraphQLInt },
        flag_habitado: { type: GraphQLBoolean },
        posee_jardin: { type: GraphQLBoolean },
        tiene_medidor: { type: GraphQLBoolean },
        id_medidor: { type: GraphQLString },
        diametro_medidor: { type: GraphQLString },
        fecha_instalacion_medidor: { type: GraphQLString },
        estado_conservacion: { type: GraphQLString },
        marca_medidor: { type: GraphQLString },
        flag_precinto_seguridad: { type: GraphQLBoolean },
        flag_visor_imposibilidad_lectura: { type: GraphQLBoolean },
        ubicacion_medidor: { type: GraphQLString },
        llaves_paso: { type: GraphQLString },
        seguridad_medidor: { type: GraphQLString },
        posicion_medidor: { type: GraphQLString },
        flag_posee_trampa_grasa: { type: GraphQLBoolean },
        flag_punto_muestreo: { type: GraphQLBoolean },
        fecha_conexion_agua: { type: GraphQLString },
        situacion_agua: { type: GraphQLString },
        ubicacion_caja_agua: { type: GraphQLString },
        diametro_con_agua: { type: GraphQLString },
        marco_tapa_con_agua: { type: GraphQLString },
        material_caja_agua_agua: { type: GraphQLString },
        material_marco_tapa_agua: { type: GraphQLString },
        material_con_agua: { type: GraphQLString },
        estado_marco_tapa_agua: { type: GraphQLString },
        estado_caja_agua: { type: GraphQLString },
        fecha_conexion_desague: { type: GraphQLString },
        situacion_desague: { type: GraphQLString },
        ubicacion_caja_desague: { type: GraphQLString },
        diametro_con_desague: { type: GraphQLString },
        marco_tapa_con_desague: { type: GraphQLString },
        material_caja_desague: { type: GraphQLString },
        material_marco_tapa_desague: { type: GraphQLString },
        material_tapa_desague: { type: GraphQLString },
        estado_tapa_desague: { type: GraphQLString },
        estado_caja_desague: { type: GraphQLString },
        frontera_predio: { type: GraphQLFloat },
        area_lote: { type: GraphQLFloat },
        area_construida: { type: GraphQLFloat },
        si_tiene_pista: { type: GraphQLString },
        no_tiene_pista: { type: GraphQLString },
        material_pista: { type: GraphQLString },
        nivel_presion: { type: GraphQLString },
        si_tiene_vereda: { type: GraphQLString },
        no_tiene_vereda: { type: GraphQLString },
        si_conexion_agua_interior: { type: GraphQLString },
        no_conexion_agua_interior: { type: GraphQLString },
        si_conexion_desague_interior: { type: GraphQLString },
        no_conexion_desague_interior: { type: GraphQLString },
        si_casa_sirve_negocio: { type: GraphQLString },
        no_casa_sirve_negocio: { type: GraphQLString },
        si_area_negocio_punto_agua: { type: GraphQLString },
        no_area_negocio_punto_agua: { type: GraphQLString },
        tipo_piscina: { type: GraphQLString },
        ubicacion_limite_agua: { type: GraphQLFloat },
        ubicacion_frontera_agua: { type: GraphQLFloat },
        ubicacion_limite_desague: { type: GraphQLFloat },
        ubicacion_frontera_desague: { type: GraphQLFloat },
        unidades_uso: {
            type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(UnidadUso))),
            resolve: (parent) => {
                const query = "select * from public.sp_cat_ficha_catastral_cuenta_corriente_unidades_uso($1)";
                return db.manyOrNone(query, [parent.v_num_inscripcion])
                    .then(data => data)
                    .catch(error => error);
            }
        }
    }
});

const TransaccionCtaCorriente = new GraphQLObjectType({
    name: "TransaccionCtaCorriente",
    fields: {
        abono: { type: GraphQLFloat },
        cargo: { type: GraphQLFloat },
        concepto_cuenta: { type: GraphQLString },
        estadoProceso: { type: GraphQLString },
        estado_anexo: { type: GraphQLString },
        fecha: { type: GraphQLString },
        flagJudicial: { type: GraphQLBoolean },
        flagResponsabilidadPago: { type: GraphQLBoolean },
        flagSaneado: { type: GraphQLBoolean },
        idCorrAnexo: { type: GraphQLInt },
        idProceso: { type: GraphQLInt },
        id_anexo: { type: GraphQLString },
        id_corr: { type: GraphQLInt },
        saldo: { type: GraphQLFloat },
        tipoAnexo: { type: GraphQLInt }
    }
});

module.exports = {
    LecturaSuministro,
    FacturacionSuministro,
    ConsumoSuministro,
    InspeccionVMASuministro,
    Archivo,
    Reclamo,
    FichaCatastral,
    TransaccionCtaCorriente
};