const {
    modelCreateReward,
    modelGetPlaceRewards,
    modelGetRewards,
    modelGetUserRewards
} = require('../models/modelRewards');



/**
 * Crea un nuevo reward.
 * @method createReward
 * @async
 * @param {Object} req Es el requerimiento de la ruta, en el body debe tener los campos: user_id,
 * place_id y reward.
 * @param {Object} res Es la respuesta de la ruta.
 * @returns {jon} Con los datos del reward creado.
 * @throws {Error}
 */
const createReward = async ({ body }, res) => {

    try {

        const data = await modelCreateReward(body);

        if (data) return res.status(200).json({
            ok: true,
            data
        });

    } catch (e) {
        console.log('catchError en createReward:', e);

        return res.status(500).json({
            ok: false,
            msg: 'Error en createReward.',
            error: e.stack
        });

    };
};





/**
 * Devuelve todos los reciclajes.
 * @method getRewards
 * @async
 * @param {Object} req Es el requerimiento de la ruta.
 * @param {Object} res Es la respuesta de la ruta.
 * @returns {jon} Con los reciclajes de la base de datos.
 * @throws {Error}
 */
const getRewards = async (req, res) => {

    try {

        const data = await modelGetRewards();

        if (data) return res.status(200).json({
            ok: true,
            data
        });
        else return res.status(400).json({
            ok: true,
            msg: 'No hay rewards en la base de datos.'
        });

    } catch (e) {
        console.log('catchError en getRewards:', e);

        return res.status(500).json({
            ok: false,
            msg: 'Error en getRewards.',
            error: e
        });

    };
};




/**
 * Devuelve todos los rewards de un usuario a través de su correo electrónico.
 * @method getUserRewards
 * @async
 * @param {Object} req Es el requerimiento de la ruta, debe incluir en params: email con el correo
 * eléctronico del usuario.
 * @param {Object} res Es la respuesta de la ruta.
 * @returns {jon} Con los rewards
 * @throws {Error}
 */
const getUserRewards = async ({ params }, res) => {

    try {

        const data = await modelGetUserRewards(params.email);

        if (data) return res.status(200).json({
            ok: true,
            data
        });
        else {
            const err = `No se encontró ningún reward con el email: ${params.email}`
            return res.status(400).json({
                ok: true,
                errors: err
            });
        }

    } catch (e) {
        console.log('catchError en getUserRewards:', e);

        return res.status(500).json({
            ok: false,
            msg: 'Error en getUserRewards.',
            error: e.stack
        });

    };
};





/**
 * Devuelve todos los rewards de un establecimiento.
 * @method getPlacesRewards
 * @async
 * @param {Object} req Es el requerimiento de la ruta, debe incluir en params: email con el correo
 * eléctronico del establecimiento.
 * @param {Object} res Es la respuesta de la ruta.
 * @returns {jon} Con los rewards.
 * @throws {Error}
 */
const getPlacesRewards = async ({ params }, res) => {

    try {

        const data = await modelGetPlaceRewards(params.email);

        if (data) return res.status(200).json({
            ok: true,
            data
        });
        else {
            const err = `No se encontró ningún reward con el email: ${params.email}`
            return res.status(400).json({
                ok: true,
                errors: err
            });
        }

    } catch (e) {
        console.log('catchError en getPlacesRewards:', e);

        return res.status(500).json({
            ok: false,
            msg: 'Error en getPlacesRewards.',
            error: e.stack
        });

    };
};
module.exports = {
    createReward,
    getRewards,
    getUserRewards,
    getPlacesRewards
}