const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLNonNull,
    GraphQLString,
    GraphQLList,
    GraphQLUnionType,
    GraphQLInt,
    GraphQLBoolean,
    GraphQLFloat
} = require('graphql');

const db = require('../../dbconexion');

const SolicitudUsuarioSistema = new GraphQLObjectType({
    name: 'SolicitudUsuarioSistema',
    fields: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        dni: { type: new GraphQLNonNull(GraphQLString) },
        estado_solicitud: { type: new GraphQLNonNull(GraphQLString) },
        nombre_completo: { type: new GraphQLNonNull(GraphQLString) },
        correo: { type: new GraphQLNonNull(GraphQLString) },
        cargo: { type: new GraphQLNonNull(GraphQLString) },
        dependencia: { type: new GraphQLNonNull(GraphQLString) },
        zonal: { type: new GraphQLNonNull(GraphQLString) },
        fecha_solicitud: { type: new GraphQLNonNull(GraphQLString) }
    }
});

const OpcionSidebar = new GraphQLObjectType({
    name: 'OpcionSidebar',
    fields: {
        nombre: { type: new GraphQLNonNull(GraphQLString) },
        icono: { type: new GraphQLNonNull(GraphQLString) },
        titulo: { type: new GraphQLNonNull(GraphQLString) }
    }
});

const GqlOperacion = new GraphQLObjectType({
    name: 'GqlOperacion',
    fields: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        nombre: { type: new GraphQLNonNull(GraphQLString) }
    }
});

const Capa = new GraphQLObjectType({
    name: 'Capa',
    fields: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        nombre: { type: new GraphQLNonNull(GraphQLString) },
        nombre_geoserver: { type: new GraphQLNonNull(GraphQLString) },
        id_grupo: { type: new GraphQLNonNull(GraphQLInt) },
        orden_presentacion: { type: new GraphQLNonNull(GraphQLString) },
        orden_superposicion: { type: new GraphQLNonNull(GraphQLString) },
        ruta: { type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(GraphQLString))) },
        operacionesGql: {
            type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(GqlOperacion))),
            args: {
                todos: { type: new GraphQLNonNull(GraphQLBoolean) }
            },
            resolve: (source, args, req) => {
                let params = [source.id, req.user.id]
                const query = 'select * from gis.fn_obtener_operaciones_gql_capa($1,$2)';
                if (args.todos) params = [source.id, null];
                return db.any(query, params)
                    .then(data => data)
                    .catch(error => error);

            }
        }
    }
});

const GrupoCapa = new GraphQLObjectType({
    name: 'GrupoCapa',
    fields: () => ({
        id: { type: new GraphQLNonNull(GraphQLID) },
        nombre: { type: new GraphQLNonNull(GraphQLString) },
        id_grupo_pertenece: { type: GraphQLInt },
        elementos: {
            type: new GraphQLList(NodoArbolCapa),
            resolve: (source, __, req, info) => {

                const { todos } = info.variableValues;
                let params = [source.id, req.user.id];
                const query = 'select * from gis.fn_obtener_grupos_de_capas_de_grupo($1,$2)',
                    queryCapas = 'select * from gis.fn_obtener_capas_de_grupo($1,$2)';

                if (todos) params = [source.id, null];

                return db.manyOrNone(query, params)
                    .then(grupos => db.manyOrNone(queryCapas, params)
                        .then(capas => grupos.concat(capas))
                    )
                    .then(data => data)
                    .catch(error => error);
            }
        }
    })
});

const NodoArbolCapa = new GraphQLUnionType({
    name: 'NodoArbolCapa',
    types: [Capa, GrupoCapa],
    resolveType: (data) => {
        if (data.hasOwnProperty('id_grupo_pertenece')) return GrupoCapa;
        return Capa;
    }
});

const DefinicionPropiedadCapa = new GraphQLObjectType({
    name: 'DefinicionPropiedadCapa',
    fields: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        id_capa: { type: new GraphQLNonNull(GraphQLInt) },
        propiedad: { type: new GraphQLNonNull(GraphQLString) },
        nombre_presentacion: { type: new GraphQLNonNull(GraphQLString) },
        definicion: { type: new GraphQLNonNull(GraphQLString) },
        icono: { type: new GraphQLNonNull(GraphQLString) }
    }
})

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
        acciones: { type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(AccionMantenimientoTuberia))) },
        codigo: { type: new GraphQLNonNull(GraphQLString) },
        costo_proyectado: { type: new GraphQLNonNull(GraphQLFloat) },
        costo_real: { type: new GraphQLNonNull(GraphQLFloat) },
        direccion: { type: new GraphQLNonNull(GraphQLString) },
        empresa: { type: new GraphQLNonNull(GraphQLString) },
        estado: { type: new GraphQLNonNull(GraphQLString) },
        fecha_fin: { type: new GraphQLNonNull(GraphQLString) },
        fecha_inicio: { type: new GraphQLNonNull(GraphQLString) },
        numero: { type: new GraphQLNonNull(GraphQLString) },
        serie: { type: new GraphQLNonNull(GraphQLString) },
        tipo_comprobante: { type: new GraphQLNonNull(GraphQLString) }
    }
});

const OpcionMenu = new GraphQLObjectType({
    name: 'OpcionMenu',
    fields: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        componente_id: { type: GraphQLString },
        titulo: { type: new GraphQLNonNull(GraphQLString) },
        va_en_menu: { type: new GraphQLNonNull(GraphQLBoolean) }
    }
});

const Menu = new GraphQLObjectType({
    name: 'Menu',
    fields: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        titulo: { type: new GraphQLNonNull(GraphQLString) },
        opciones: {
            type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(OpcionMenu))),
            args: {
                vanEnMenu: { type: GraphQLBoolean }
            },
            resolve: (source, args, req, info) => {

                const { todos } = info.variableValues;
                let params = [source.id, req.user.id, args.vanEnMenu];
                const query = 'select * from gis.fn_obtener_opciones_menu($1,$2,$3)';

                if (todos) params = [source.id, null, args.vanEnMenu];

                return db.manyOrNone(query, params)
                    .then(data => data)
                    .catch(error => error);
            }
        },
    }
});

const UsuarioSistema = new GraphQLObjectType({
    name: 'UsuarioSistema',
    fields: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        nombre_completo: { type: new GraphQLNonNull(GraphQLString) },
        correo: { type: new GraphQLNonNull(GraphQLString) },
        dependencia: { type: new GraphQLNonNull(GraphQLString) }
    }
});

const InformeCapa = new GraphQLObjectType({
    name: 'InformeCapa',
    fields: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        nombre: { type: new GraphQLNonNull(GraphQLString) },
        nombre_corto: { type: new GraphQLNonNull(GraphQLString) }
    }
})

const OpcionGenerica = new GraphQLObjectType({
    name: 'OpcionGenerica',
    fields: {
        name: { type: GraphQLString },
        value: { type: GraphQLString }
    }
});

const MapLayout = new GraphQLObjectType({
    name: 'MapLayout',
    fields: {
        width: { type: new GraphQLNonNull(GraphQLInt) },
        height: { type: new GraphQLNonNull(GraphQLInt) }
    }
})

const Layout = new GraphQLObjectType({
    name: 'Layout',
    fields: {
        name: { type: GraphQLString },
        map: { type: MapLayout }
    }
});

const PrintInfo = new GraphQLObjectType({
    name: "PrintInfo",
    fields: {
        scales: { type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(OpcionGenerica))) },
        dpis: { type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(OpcionGenerica))) },
        outputFormats: { type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(OpcionGenerica))) },
        layouts: { type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(Layout))) },
        printURL: { type: new GraphQLNonNull(GraphQLString) },
        createURL: { type: new GraphQLNonNull(GraphQLString) }
    }
})

const ResultadoImportacionType = new GraphQLObjectType({
    name: 'ResultadoImportacion',
    fields: {
        ok: { type: GraphQLBoolean },
        mensaje: { type: GraphQLString }
    }
});

module.exports = {
    OpcionSidebar, NodoArbolCapa, Capa,
    DefinicionPropiedadCapa, MantenimientoTuberia, Menu,
    SolicitudUsuarioSistema, UsuarioSistema, InformeCapa,
    PrintInfo,ResultadoImportacionType
};