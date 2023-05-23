const {
    modelCreateRecycle,
    modelGetRecycles,
    modelGetUserRecycles,
    modelGetPlaceRecycles,
    modelGetSumRecycles
} = require('../models/modelRecycle');



/**
 * Crea un nuevo evento de reciclaje.
 * @method createRecycle
 * @async
 * @param {Object} req Es el requerimiento de la ruta, en el body debe tener los campos: user_id,
 * place_id y qty.
 * @param {Object} res Es la respuesta de la ruta.
 * @returns {jon} Con los datos del evento creado.
 * @throws {Error}
 */
const createRecycle = async ({ body }, res) => {

    try {

        const data = await modelCreateRecycle(body);

        if (data) return res.status(200).json({
            ok: true,
            data
        });

    } catch (e) {
        console.log('catchError en createRecycle:', e);

        return res.status(500).json({
            ok: false,
            msg: 'Error en createRecycle.',
            error: e.stack
        });

    };
};





/**
 * Devuelve todos los reciclajes.
 * @method getRecycles
 * @async
 * @param {Object} req Es el requerimiento de la ruta.
 * @param {Object} res Es la respuesta de la ruta.
 * @returns {jon} Con los reciclajes de la base de datos.
 * @throws {Error}
 */
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




/**
 * Devuelve todos los reciclajes de un usuario a través de su correo electrónico.
 * @method getUserRecycles
 * @async
 * @param {Object} req Es el requerimiento de la ruta, debe incluir en params: email con el correo
 * eléctronico del usuario.
 * @param {Object} res Es la respuesta de la ruta.
 * @returns {jon} Con los reciclajes
 * @throws {Error}
 */
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





/**
 * Devuelve todos los reciclajes de un establecimiento.
 * @method getPlacesRecycles
 * @async
 * @param {Object} req Es el requerimiento de la ruta, debe incluir en params: ID con el correo
 * eléctronico del establecimiento.
 * @param {Object} res Es la respuesta de la ruta.
 * @returns {jon} Con los reciclajes.
 * @throws {Error}
 */
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