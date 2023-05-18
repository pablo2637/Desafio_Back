const jwt = require('jsonwebtoken');


/**
 * Helper que genera un token con caducidad de 1 hora, a partir de un payload, que
 * es un Object :User.
 * @memberof jwt
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



module.exports = {
    generateJwt
}