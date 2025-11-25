const {
    RespuestaMensaje
} = require('./types');

const {
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLString,
    GraphQLInt,
    GraphQLFloat,
    GraphQLList,
    GraphQLBoolean
} = require('graphql');

const db = require('../../dbconexion');
const { usuarioEstaAutorizado } = require('../../auth/authorization');

const Catastro = new GraphQLObjectType({
    name: 'CatastroMutation',
    fields: {
        georeferenciarUsuario: {
            type: RespuestaMensaje,
            args: {
                numInscripcion: { type: new GraphQLNonNull(GraphQLInt) },
                numSecuenciaLectura: { type: GraphQLInt },
                coordenadas: { type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(GraphQLFloat))) }
            },
            resolve: usuarioEstaAutorizado((async(_, args) => {
                const { coordenadas, numSecuenciaLectura, numInscripcion } = args;
                try {
                    const query = 'select * from gis.fn_georeferenciar_usuario($1,$2,$3,$4)';
                    return await db.one(query, [numInscripcion, numSecuenciaLectura, coordenadas[0], coordenadas[1]])
                } catch (error) {
                    return error;
                }
                // const query = 'select * from gis.fn_georeferenciar_usuario($1,$2,$3,$4)';
                // return db.one(query, [numInscripcion, numSecuenciaLectura, coordenadas[0], coordenadas[1]])
                //     .then(data => data)
                //     .catch(error => error);
            }))
        },
        actualizarCajaAguaUsuario: {
            type: RespuestaMensaje,
            args: {
                gid: { type: new GraphQLNonNull(GraphQLInt) },
                numInscripcion: { type: new GraphQLNonNull(GraphQLInt) },
                nroFicha: { type: GraphQLInt },
                distanciaCajaExteriorPredio: { type: GraphQLInt },// { type: new GraphQLNonNull(GraphQLInt) },
                distanciaExteriorIzquierdaDerecha: { type: GraphQLInt },// { type: new GraphQLNonNull(GraphQLInt) },
                distanciaCajaInteriorDentroFuera: { type: GraphQLInt },// { type: new GraphQLNonNull(GraphQLInt) },
                coordenadas: { type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(GraphQLFloat))) }
            },
            resolve: usuarioEstaAutorizado(((_, args, context) => {
                const { coordenadas, nroFicha, distanciaCajaExteriorPredio, distanciaExteriorIzquierdaDerecha, distanciaCajaInteriorDentroFuera, numInscripcion, gid } = args;
                const query = 'select * from gis.fn_actualizar_caja_agua($1,$2,$3,$4,$5,$6,$7,$8,$9)';
                return db.one(query, [gid, numInscripcion, nroFicha, distanciaCajaExteriorPredio, distanciaExteriorIzquierdaDerecha, distanciaCajaInteriorDentroFuera, coordenadas[0], coordenadas[1], context.user.id])
                    .then(data => data)
                    .catch(error => error);
            }))
        },
        actualizarUsuarioFactiblePotencial: {
            type: RespuestaMensaje,
            args: {
                gid: { type: new GraphQLNonNull(GraphQLInt) },
                nroFicha: { type: GraphQLInt },
                idProv: { type: new GraphQLNonNull(GraphQLInt) },
                idDist: { type: new GraphQLNonNull(GraphQLInt) },
                lote: { type: new GraphQLNonNull(GraphQLString) },
                numMunicipal: { type: new GraphQLNonNull(GraphQLString) },
                sector: { type: new GraphQLNonNull(GraphQLInt) },
                idManzana: { type: new GraphQLNonNull(GraphQLInt) },
                nombreZona: { type: new GraphQLNonNull(GraphQLString) },
                manzanaMunicipal: { type: new GraphQLNonNull(GraphQLString) },
                loteMunicipal: { type: new GraphQLNonNull(GraphQLString) },
                direccionPredio: { type: new GraphQLNonNull(GraphQLString) },
                direccion: { type: new GraphQLNonNull(GraphQLString) },
                habilitacionUrbana: { type: new GraphQLNonNull(GraphQLString) },
                tipoUsuario: { type: new GraphQLNonNull(GraphQLString) },
                tipoConstruccion: { type: new GraphQLNonNull(GraphQLString) },
                predioHabitado: { type: new GraphQLNonNull(GraphQLBoolean) },
                coordenadas: { type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(GraphQLFloat))) }
            },
            resolve: usuarioEstaAutorizado(((_, args, context) => {
                const { gid, nroFicha, idProv, idDist, lote, numMunicipal, sector, idManzana, nombreZona, manzanaMunicipal, loteMunicipal, direccionPredio,
                    direccion, habilitacionUrbana, tipoUsuario, tipoConstruccion, predioHabitado, coordenadas } = args;
                const query = 'select * from gis.fn_actualizar_usuario_factpotencial($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20)';
                return db.one(query, [gid, nroFicha, idProv, idDist, lote, numMunicipal, sector, idManzana, nombreZona, manzanaMunicipal, loteMunicipal,
                    direccionPredio, direccion, habilitacionUrbana, tipoUsuario, tipoConstruccion, predioHabitado, coordenadas[0], coordenadas[1], context.user.id])
                    .then(data => data)
                    .catch(error => error);
            }))
        },
        georeferenciarCajaAguaUsuario: {
            type: RespuestaMensaje,
            args: {
                numInscripcion: { type: new GraphQLNonNull(GraphQLInt) },
                nroFicha: { type: GraphQLInt },
                distanciaCajaExteriorPredio: { type: GraphQLInt },
                distanciaExteriorIzquierdaDerecha: { type: GraphQLInt },
                distanciaCajaInteriorDentroFuera: { type: GraphQLInt },
                coordenadas: { type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(GraphQLFloat))) }
            },
            resolve: usuarioEstaAutorizado(((_, args, context) => {
                const { coordenadas, nroFicha, distanciaCajaExteriorPredio, distanciaExteriorIzquierdaDerecha, distanciaCajaInteriorDentroFuera, numInscripcion } = args;
                const query = 'select * from gis.fn_georeferenciar_caja_agua2($1,$2,$3,$4,$5,$6,$7,$8)';
                return db.one(query, [numInscripcion, nroFicha, distanciaCajaExteriorPredio, distanciaExteriorIzquierdaDerecha, distanciaCajaInteriorDentroFuera, coordenadas[0], coordenadas[1], context.user.id])
                    .then(data => data)
                    .catch(error => error);
            }))
        },
        georeferenciarCajaDesague: {
            type: RespuestaMensaje,
            args: {
                numInscripcion: { type: new GraphQLNonNull(GraphQLInt) },
                nroFicha: { type: GraphQLInt },
                distanciaCajaExteriorPredio: { type: GraphQLInt },
                distanciaExteriorIzquierdaDerecha: { type: GraphQLInt },
                distanciaCajaInteriorDentroFuera: { type: GraphQLInt },
                coordenadas: { type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(GraphQLFloat))) }
            },
            resolve: usuarioEstaAutorizado(((_, args, context) => {
                const { coordenadas, nroFicha, distanciaCajaExteriorPredio, distanciaExteriorIzquierdaDerecha, distanciaCajaInteriorDentroFuera, numInscripcion } = args;
                const query = 'select * from gis.fn_georeferenciar_caja_desague2($1,$2,$3,$4,$5,$6,$7,$8)';
                return db.one(query, [numInscripcion, nroFicha, distanciaCajaExteriorPredio, distanciaExteriorIzquierdaDerecha, distanciaCajaInteriorDentroFuera, coordenadas[0], coordenadas[1], context.user.id])
                    .then(data => data)
                    .catch(error => error);
            }))
        },
        actualizarCajaDesagueUsuario: {
            type: RespuestaMensaje,
            args: {
                gid: { type: new GraphQLNonNull(GraphQLInt) },
                numInscripcion: { type: new GraphQLNonNull(GraphQLInt) },
                nroFicha: { type: GraphQLInt },
                distanciaCajaExteriorPredio: { type: GraphQLInt },// { type: new GraphQLNonNull(GraphQLInt) },
                distanciaExteriorIzquierdaDerecha: { type: GraphQLInt },// { type: new GraphQLNonNull(GraphQLInt) },
                distanciaCajaInteriorDentroFuera: { type: GraphQLInt },// { type: new GraphQLNonNull(GraphQLInt) },
                coordenadas: { type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(GraphQLFloat))) }
            },
            resolve: usuarioEstaAutorizado(((_, args, context) => {
                const { coordenadas, nroFicha, distanciaCajaExteriorPredio, distanciaExteriorIzquierdaDerecha, distanciaCajaInteriorDentroFuera, numInscripcion, gid } = args;
                const query = 'select * from gis.fn_actualizar_caja_desague($1,$2,$3,$4,$5,$6,$7,$8,$9)';
                return db.one(query, [gid, numInscripcion, nroFicha, distanciaCajaExteriorPredio, distanciaExteriorIzquierdaDerecha, distanciaCajaInteriorDentroFuera, coordenadas[0], coordenadas[1], context.user.id])
                    .then(data => data)
                    .catch(error => error);
            }))
        },
        moverUsuario: {
            type: GraphQLBoolean,
            args: {
                numInscripcion: { type: new GraphQLNonNull(GraphQLInt) },
                numSecuenciaLectura: { type: GraphQLInt },
                coordenadas: { type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(GraphQLFloat))) }
            },
            resolve: usuarioEstaAutorizado((_, args) => {
                const { coordenadas, numSecuenciaLectura, numInscripcion } = args;
                const query = 'select * from gis.fn_mover_usuario($1,$2,$3,$4)';
                return db.one(query, [numInscripcion, numSecuenciaLectura, coordenadas[0], coordenadas[1]])
                    .then(data => data.fn_mover_usuario)
                    .catch(error => error);
            })
        },
        moverCajaAgua: {
            type: GraphQLBoolean,
            args: {
                numInscripcion: { type: new GraphQLNonNull(GraphQLInt) },
                nroFicha: { type: GraphQLInt },
                distanciaCajaExteriorPredio: { type: GraphQLInt },// { type: new GraphQLNonNull(GraphQLInt) },
                distanciaExteriorIzquierdaDerecha: { type: GraphQLInt },// { type: new GraphQLNonNull(GraphQLInt) },
                distanciaCajaInteriorDentroFuera: { type: GraphQLInt },// { type: new GraphQLNonNull(GraphQLInt) },
                coordenadas: { type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(GraphQLFloat))) }
            },
            resolve: usuarioEstaAutorizado((_, args, context) => {
                const { coordenadas, nroFicha, distanciaCajaExteriorPredio, distanciaExteriorIzquierdaDerecha, distanciaCajaInteriorDentroFuera, numInscripcion } = args;
                const query = 'select * from gis.fn_mover_caja_agua2($1,$2,$3,$4,$5,$6,$7,$8)';
                return db.one(query, [numInscripcion, nroFicha, distanciaCajaExteriorPredio, distanciaExteriorIzquierdaDerecha, distanciaCajaInteriorDentroFuera, coordenadas[0], coordenadas[1], context.user.id])
                    .then(data => data.fn_mover_usuario)
                    .catch(error => error);
            })
        },
        moverCajaDesague: {
            type: GraphQLBoolean,
            args: {
                numInscripcion: { type: new GraphQLNonNull(GraphQLInt) },
                nroFicha: { type: GraphQLInt },
                distanciaCajaExteriorPredio: { type: GraphQLInt },// { type: new GraphQLNonNull(GraphQLInt) },
                distanciaExteriorIzquierdaDerecha: { type: GraphQLInt },// { type: new GraphQLNonNull(GraphQLInt) },
                distanciaCajaInteriorDentroFuera: { type: GraphQLInt },// { type: new GraphQLNonNull(GraphQLInt) },
                coordenadas: { type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(GraphQLFloat))) }
            },
            resolve: usuarioEstaAutorizado((_, args, context) => {
                const { coordenadas, nroFicha, distanciaCajaExteriorPredio, distanciaExteriorIzquierdaDerecha, distanciaCajaInteriorDentroFuera, numInscripcion } = args;
                const query = 'select * from gis.fn_mover_caja_desague($1,$2,$3,$4,$5,$6,$7,$8)';
                return db.one(query, [numInscripcion, nroFicha, distanciaCajaExteriorPredio, distanciaExteriorIzquierdaDerecha, distanciaCajaInteriorDentroFuera, coordenadas[0], coordenadas[1], context.user.id])
                    .then(data => data.fn_mover_usuario)
                    .catch(error => error);
            })
        },
        dividirPredio: {
            type: RespuestaMensaje,
            args: {
                predioGid: { type: new GraphQLNonNull(GraphQLInt) },
                wktLinea: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve: usuarioEstaAutorizado((_, args) => {
                const { predioGid, wktLinea } = args;
                const usuarioDNI = '74243367';
                const query = 'select * from gis.fn_dividir_predio($1,$2,$3)';
                return db.one(query, [predioGid, wktLinea, usuarioDNI])
                    .then(data => data)
                    .catch(error => error);
            })
        },
        unirPredio: {
            type: RespuestaMensaje,
            args: {
                wktLinea: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve: usuarioEstaAutorizado((_, args) => {
                const { wktLinea } = args;
                const usuarioDNI = '74243367';
                const query = 'select * from gis.fn_unir_predios($1,$2)';
                return db.one(query, [wktLinea, usuarioDNI])
                    .then(data => data)
                    .catch(error => error);
            })
        },
        crearMarcador: {
            type: GraphQLBoolean,
            args: {
                coordenadas: { type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(GraphQLFloat))) },
                texto: { type: new GraphQLNonNull(GraphQLString) },
                publico: { type: new GraphQLNonNull(GraphQLBoolean) }
            },
            resolve: usuarioEstaAutorizado((_, args, req) => {
                const { coordenadas, texto, publico } = args;
                const query = 'select * from gis.fn_crear_marcador($1,$2,$3,$4,$5)';
                return db.one(query, [coordenadas[0], coordenadas[1], texto, publico, req.user.id])
                    .then(data => data.fn_crear_marcador)
                    .catch(error => error);
            })
        },
        eliminarMarcador: {
            type: GraphQLBoolean,
            args: {
                gid: { type: new GraphQLNonNull(GraphQLInt) }
            },
            resolve: usuarioEstaAutorizado((_, args) => {
                const { gid } = args;
                const usuarioDNI = '70335254';
                const query = 'select * from gis.fn_eliminar_marcador($1,$2)';
                return db.one(query, [gid, usuarioDNI])
                    .then(data => data.fn_eliminar_marcador)
                    .catch(error => error);
            })
        },
        eliminarUsuarioFactiblePotencial: {
            type: GraphQLBoolean,
            args: {
                gid: { type: new GraphQLNonNull(GraphQLInt) }
            },
            resolve: usuarioEstaAutorizado((_, args) => {
                const { gid } = args;
                const usuarioDNI = '70335254';
                const query = 'select * from gis.fn_eliminar_usuario_factpot($1,$2)';
                return db.one(query, [gid, usuarioDNI])
                    .then(data => data.fn_eliminar_usuario_factpot)
                    .catch(error => error);
            })
        },
        cambiarAccesoMarcador: {
            type: GraphQLBoolean,
            args: {
                gid: { type: new GraphQLNonNull(GraphQLInt) },
                publico: { type: new GraphQLNonNull(GraphQLBoolean) }
            },
            resolve: usuarioEstaAutorizado((_, args) => {
                const { gid, publico } = args;
                const usuarioDNI = '70335254';
                const query = 'select * from gis.fn_cambiar_acceso_marcador($1,$2,$3)';
                return db.one(query, [gid, publico, usuarioDNI])
                    .then(data => data.fn_cambiar_acceso_marcador)
                    .catch(error => error);
            })
        }
    }
});

module.exports = Catastro;