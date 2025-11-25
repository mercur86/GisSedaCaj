const {
    GraphQLObjectType,
    // GraphQLList,
    GraphQLNonNull,
    GraphQLString,
    GraphQLInt,
    GraphQLFloat,
    GraphQLList,
    GraphQLBoolean
} = require('graphql');
const { GraphQLUpload } = require('graphql-upload');
const fs = require('fs');
const db = require('../../dbconexion');

const Comercial = new GraphQLObjectType({
    name: 'ComercialMutation',
    fields: {
        nuevoArchivoSubido: {
            type: GraphQLBoolean,
            args: {
                nombreArchivo: { type: new GraphQLNonNull(GraphQLString) },
                gid: { type: new GraphQLNonNull(GraphQLInt) },
                nombreCapa: { type: new GraphQLNonNull(GraphQLString) },
                extensionArchivo: { type: new GraphQLNonNull(GraphQLString) },
                rutaArchivo: { type: new GraphQLNonNull(GraphQLString) },
                descripcion: { type: new GraphQLNonNull(GraphQLString) }
                // usuarioDNI: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve: (_, args) => {
                const { nombreArchivo, gid, nombreCapa, extensionArchivo, rutaArchivo, descripcion } = args;
                const usuarioDNI = '74243367';
                const query = 'select * from gis.fn_nuevo_archivo_subido($1,$2,$3,$4,$5,$6,$7)';
                return db.one(query, [nombreArchivo, gid, nombreCapa, extensionArchivo, rutaArchivo, descripcion, usuarioDNI])
                    .then(data => data.fn_nuevo_archivo_subido)
                    .catch(error => error);
            }
        },
        uploadFile: {
            type: GraphQLBoolean,
            args: {
                file: { type: GraphQLUpload },
                gid: { type: new GraphQLNonNull(GraphQLInt) },
                idCapa: { type: new GraphQLNonNull(GraphQLInt) },
                ruta: { type: new GraphQLNonNull(GraphQLString) },
                tipo_archivo: { type: new GraphQLNonNull(GraphQLString) },
                descripcion: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve: async (_, { file, gid, idCapa, ruta, tipo_archivo, descripcion }) => { // nombreArchivo, gid, nombreCapa, extensionArchivo, rutaArchivo, descripcion
                const { createReadStream, filename, mimetype, encoding } = await file;
                const stream = createReadStream();
                // const path = `uploads/mispuntosreferencia/${filename}`; // ruta
                const promesa = new Promise((resolve, reject)=>
                    stream
                    .pipe(fs.createWriteStream(ruta))
                    .on("finish", ()=> resolve())
                    .on("error", reject)
                );
                console.log("file, gid, idCapa, descripcion: ",file, gid, idCapa, descripcion);
                const usuarioDNI = '74243367';
                const query = 'select * from gis.fn_nuevo_archivo_subido($1,$2,$3,$4,$5,$6,$7)';
                return db.one(query, [filename, gid, idCapa, tipo_archivo, ruta, descripcion, usuarioDNI])
                    .then(data => data.fn_nuevo_archivo_subido)
                    .catch(error => error);
                // return true;
            }
        },
        uploadFiles: {
            type: GraphQLBoolean,
            args: { files: { type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(GraphQLUpload))) } },
            resolve: async (_, args) => {
                const { files } = await args;
                files.forEach(async file => {
                    const { createReadStream, filename, mimetype, encoding } = await file;
                    const stream = createReadStream();
                    const path = `./src/imagenes/mispuntosreferencia/${filename}`;
                    const promesa = new Promise((resolve, reject)=>
                        stream
                        .pipe(fs.createWriteStream(path))
                        .on("finish", ()=> resolve())
                        .on("error", reject)
                    );
                });
                return true;
            }
        },
        eliminarArchivo: {
            type: GraphQLBoolean,
            args: {
                gidArchivo: { type: new GraphQLNonNull(GraphQLInt) },
                ruta: { type: new GraphQLNonNull(GraphQLString) },
                // usuarioDNI: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve: (_, args) => {
                const { gidArchivo, ruta } = args;
                const usuarioDNI = '74243367';
                const query = 'select * from gis.fn_eliminar_archivo($1,$2,$3)';
                if (fs.existsSync(ruta)) fs.unlinkSync(ruta);
                return db.one(query, [ gidArchivo, ruta, usuarioDNI])
                    .then(data => data.fn_eliminar_archivo)
                    .catch(error => error);
            }
        },
        actualizarArchivo: {
            type: GraphQLBoolean,
            args: {
                gidArchivo: { type: new GraphQLNonNull(GraphQLInt) },
                descripcion: { type: new GraphQLNonNull(GraphQLString) },
                // usuarioDNI: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve: (_, args) => {
                const { gidArchivo, descripcion } = args;
                const usuarioDNI = '74243367';
                const query = 'select * from gis.fn_actualizar_archivo($1,$2,$3)';
                return db.one(query, [ gidArchivo, descripcion, usuarioDNI])
                    .then(data => data.fn_actualizar_archivo)
                    .catch(error => error);
            }
        }
    }
});

module.exports = Comercial;