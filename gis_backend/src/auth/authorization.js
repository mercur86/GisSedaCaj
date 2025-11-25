const db = require('../dbconexion');

const usuarioEstaLogueado = (req, res, next) => {
    if (!req.user) {
        res.status(401).send('Si ves esto es porque tu sesión ha expirado o el servidor ha sido reiniciado. Por favor, ingresa otra vez al sistema.');
    } else {
        next();
    }
}

const usuarioEstaAutorizado = next => (source, args, context, info) => {
    const query = "select gis.fn_usuario_esta_autorizado_para_operacion_graphql($1,$2,$3) as esta_autorizado",
        operacion = info.fieldName,
        modulo = info.path.prev.key;
        console.log(operacion+"-------"+modulo+"---------"+context.user.id);  // aqui se dan las operacions en base al id que tiene que esta registrado en la bd
    return db.one(query, [context.user.id, operacion, modulo])
        .then(res => {
            if (!res.esta_autorizado) throw new Error('¡Acción no autorizada!')
            return next(source, args, context, info);
        })
        .catch(error => error)
}

module.exports = { usuarioEstaAutorizado, usuarioEstaLogueado };