const jwt = require('jsonwebtoken');

/**
 * Helper que genera un token con caducidad de 1 hora, a partir de un payload, que
 * es un json con datos de usuario. 
 * @method generateJwt
 * @param {User} payload El payload para generar el token
 * @returns {Promise} Devuelve el token generado en un String
 * @throws {Object} Devuelve los errores en un Object
 */
const generateJwt = (payload) => {
    return new Promise((resolve, reject) => {

        jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '1h' },
            (error, token) => {

                if (error)
                    reject({
                        ok: false,
                        msg: 'generateJwt: Error al generar el token.'
                    });

                resolve(token);
            }
        );

    });
};




/**
 * Cumple 2 funciones: verificar y renovar el token, si es que es válido.  
 * @method renewToken
 * @async
 * @param {Object} payload Es el payload para generar el token
 * @returns {Object} Devuelve un Object con la confirmación de que el token 
 * se ha creado correctamente
 * @throws {Object} Devuelve un Object con un mensaje de error al renovar el token.
 */
const renewToken = async (payload) => {

    try {

        const token = await generateJwt(payload);

        if (!token)
            return {
                ok: false,
                msg: 'renewToken: renovación del token incorrecta.'
            };

        return {
            ok: true,
            msg: 'renewToken: renovación del token correcta.',
            token
        };


    } catch (e) {
        return {
            ok: false,
            msg: 'renewToken: renovación del token incorrecta.'
        };

    }
};



module.exports = {
    generateJwt,
    renewToken
}