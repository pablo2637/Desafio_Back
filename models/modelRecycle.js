const { pool } = require('../configs/configPostgreSQL');

const {
    queriesRecycle
} = require('./queries');



/**
 * Inserta en la base de datos un reciclaje nuevo
 * @method modelCreateRecycle
 * @async
 * @param {String} user_id ID del usuario
 * @param {String} place_id ID del establecimiento
 * @param {Number} qty Cantidad a reciclar
 * @returns {json} 
 * @throws {Error}
 */
const modelCreateRecycle = async ({ user_id, place_id, qty, reward }) => {

    let client, result;
    try {

        client = await pool.connect();

        const data = await client.query(queriesRecycle.createRecycle, [user_id, place_id, qty, reward])

        data.rowCount != 0 ? result = data.rows : result = false;

    } catch (e) {
        throw e;

    } finally {
        client.release();

    };

    return result;
};




/**
 * Hace la consulta a la base de datos para obtener todos los reciclajes.
 * @method modelGetRecycles
 * @async
 * @returns {json} Con los reciclajes
 * @throws {Error}
 */
const modelGetRecycles = async () => {

    let client, result;
    try {

        client = await pool.connect();

        const data = await client.query(queriesRecycle.getRecycles)

        data.rowCount != 0 ? result = data.rows : result = false;

    } catch (e) {
        throw e;

    } finally {
        client.release();

    };

    return result;
};




/**
 * Hace la consulta a la base de datos para traer los reciclajes de un usuario a través de su id.
 * @method modelGetUserRecycles
 * @async
 * @param {String} id id del usuario
 * @returns {json} Los reciclajes
 * @throws {Error}
 */
const modelGetUserRecycles = async (id) => {

    let client, result;
    try {

        client = await pool.connect();

        const data = await client.query(queriesRecycle.getUserRecyclesByID, [id])

        data.rowCount != 0 ? result = data.rows : result = false;

    } catch (e) {
        throw e;

    } finally {
        client.release();

    };

    return result;
};



/**
 * Hace la consulta a la base de datos para traer los reciclajes de un establecimiento a través de su email.
 * @method modelGetPlaceRecycles
 * @async
 * @param {String} email Correo electrónico del establecimiento
 * @returns {json} Los reciclajes
 * @throws {Error}
 */
const modelGetPlaceRecycles = async (email) => {

    let client, result;
    try {

        client = await pool.connect();

        const data = await client.query(queriesRecycle.getPlacesRecyclesByEmail, [email])

        data.rowCount != 0 ? result = data.rows : result = false;

    } catch (e) {
        throw e;

    } finally {
        client.release();

    };

    return result;
};


/**
 * Hace la consulta a la base de datos para traer los reciclajes de un usuario a través de su email.
 * @method modelGetUserRecycles
 * @async
 * @param {String} email Correo electrónico del usuario
 * @returns {json} Los reciclajes
 * @throws {Error}
 */
const modelGetSumRecycles = async (user_id) => {

    let client, result;
    try {

        client = await pool.connect();

        const data = await client.query(queriesRecycle.sumRecycle, [user_id])

        data.rowCount != 0 ? result = data.rows : result = false;

    } catch (e) {
        throw e;

    } finally {
        client.release();

    };

    return result;
};

module.exports = {
    modelGetRecycles,
    modelCreateRecycle,
    modelGetUserRecycles,
    modelGetPlaceRecycles,
    modelGetSumRecycles
}