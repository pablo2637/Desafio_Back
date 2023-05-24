const { masterFetchData } = require('../helpers/fetch')

const {
    modelCreateRecycle,
    modelGetRecycles,
    modelGetUserRecycles,
    modelGetPlaceRecycles,
    modelGetSumRecycles
} = require('../models/modelRecycle');

const {
    modelUpdateRecommendations
} = require('../models/modelUsers')


//*Recycles CONTROLLERS

/**DOCS
 * Crea un nuevo evento de reciclaje.
 * @method createRecycle
 * @async
 * @param {Object} req Es el requerimiento de la ruta, en el body debe tener los campos: user_id,
 * place_id y qty.
 * @param {Object} res Es la respuesta de la ruta.
 * @returns {jon} Con los datos del evento creado.
 * @throws {Error}
 */
//Create new recycle ++++++++++
const createRecycle = async ({ body }, res) => {

    try {

        const data = await modelCreateRecycle(body);

        if (data) {

            let rec = [];
            if (body.qty == 0) {
                rec = await masterFetchData(body.rest_id);

                await modelUpdateRecommendations(body.user_id, rec);
            }

            return res.status(200).json({
                ok: true,
                data,
                recommended: rec
            });

        }

    } catch (e) {
        console.log('catchError en createRecycle:', e);

        return res.status(500).json({
            ok: false,
            msg: 'Error en createRecycle.',
            error: e.stack
        });

    };
};


/**DOCS
 * Devuelve todos los reciclajes.
 * @method getRecycles
 * @async
 * @param {Object} req Es el requerimiento de la ruta.
 * @param {Object} res Es la respuesta de la ruta.
 * @returns {jon} Con los reciclajes de la base de datos.
 * @throws {Error}
 */
//Get all recycle entries ++++++++++
const getRecycles = async (req, res) => {

    try {

        const data = await modelGetRecycles();

        if (data) return res.status(200).json({
            ok: true,
            data
        });
        else return res.status(400).json({
            ok: true,
            msg: 'No hay reciclajes en la base de datos.'
        });

    } catch (e) {
        console.log('catchError en getRecycles:', e);

        return res.status(500).json({
            ok: false,
            msg: 'Error en getRecycles.',
            error: e
        });

    };
};


/**DOCS
 * Devuelve todos los reciclajes de un usuario a través de su correo electrónico.
 * @method getUserRecycles
 * @async
 * @param {Object} req Es el requerimiento de la ruta, debe incluir en params: email con el correo
 * eléctronico del usuario.
 * @param {Object} res Es la respuesta de la ruta.
 * @returns {jon} Con los reciclajes
 * @throws {Error}
 */
//Get Recycles asociated to Users ++++++++++
const getUserRecycles = async ({ params }, res) => {

    try {

        const data = await modelGetUserRecycles(params.id);

        if (data) return res.status(200).json({
            ok: true,
            data
        });
        else {
            const err = `No se encontró ningún recycle con el ID: ${params.id}`
            return res.status(400).json({
                ok: true,
                errors: err
            });
        }

    } catch (e) {
        console.log('catchError en getUserRecycles:', e);

        return res.status(500).json({
            ok: false,
            msg: 'Error en getUserRecycles.',
            error: e.stack
        });

    };
};


/**DOCS
 * Devuelve todos los reciclajes de un establecimiento.
 * @method getPlacesRecycles
 * @async
 * @param {Object} req Es el requerimiento de la ruta, debe incluir en params: ID con el correo
 * eléctronico del establecimiento.
 * @param {Object} res Es la respuesta de la ruta.
 * @returns {jon} Con los reciclajes.
 * @throws {Error}
 */
//Get Recycles asociated to Places ++++++++++
const getPlacesRecycles = async ({ params }, res) => {

    try {

        const data = await modelGetPlaceRecycles(params.id);

        if (data) return res.status(200).json({
            ok: true,
            data
        });
        else {
            const err = `No se encontró ningún recycle con el ID: ${params.id}`
            return res.status(400).json({
                ok: true,
                errors: err
            });
        }

    } catch (e) {
        console.log('catchError en getUserRecycles:', e);

        return res.status(500).json({
            ok: false,
            msg: 'Error en getUserRecycles.',
            error: e.stack
        });

    };
};


/**DOCS
 * Petición que devuelve la sumatoria de los montos en reciclajes.
 * Recibe el user_id de los params.
 * @method getSumRecycles
 * @async
 * @param {Object} req Es el requerimiento de la ruta, debe incluir en params el ID del user.
 * @param {Object} res Es la respuesta de la ruta.
 * @returns {jon} Con la suma realizada.
 * @throws {Error}
 */
//Get Recycles summatory ++++++++++
const getSumRecycles = async ({ params }, res) => {

    try {

        const data = await modelGetSumRecycles(params.user_id);

        if (data) return res.status(200).json({
            ok: true,
            data
        });
        else {
            const err = `No se encontró ningún recycle con el id: ${params.user_id}`
            return res.status(400).json({
                ok: true,
                errors: err
            });
        }

    } catch (e) {
        console.log('catchError en getSumRecycles:', e);

        return res.status(500).json({
            ok: false,
            msg: 'Error en getSumRecycles.',
            error: e.stack
        });

    };
};


module.exports = {
    createRecycle,
    getRecycles,
    getUserRecycles,
    getPlacesRecycles,
    getSumRecycles
}