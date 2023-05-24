const { pool } = require('../configs/configPostgreSQL');

const {
    queriesRewards
} = require('./queries');



/**
 * Inserta en la base de datos un reward nuevo
 * @method modelCreateReward
 * @async
 * @param {String} user_id ID del usuario
 * @param {String} place_id ID del establecimiento
 * @param {Number} qty Reward obtenido
 * @returns {json} 
 * @throws {Error}
 */
const modelCreateReward = async ({ user_id, place_id, reward }) => {

    let client, result;
    try {

        client = await pool.connect();

        const data = await client.query(queriesRewards.createRewards, [user_id, place_id, reward])

        data.rowCount != 0 ? result = data.rows : result = false;

    } catch (e) {
        throw e;

    } finally {
        client.release();

    };

    return result;
};




/**
 * Hace la consulta a la base de datos para obtener todos los rewards.
 * @method modelGetRewards
 * @async
 * @returns {json} Con los rewards
 * @throws {Error}
 */
const modelGetRewards = async () => {

    let client, result;
    try {

        client = await pool.connect();

        const data = await client.query(queriesRewards.getRewards)

        data.rowCount != 0 ? result = data.rows : result = false;

    } catch (e) {
        throw e;

    } finally {
        client.release();

    };

    return result;
};




/**
 * Hace la consulta a la base de datos para traer los rewards de un usuario a través de su email.
 * @method modelGetUserRewards
 * @async
 * @param {String} email Correo electrónico del usuario
 * @returns {json} Los rewards
 * @throws {Error}
 */
const modelGetUserRewards = async (email) => {

    let client, result;
    try {
console.log('email',email);
        client = await pool.connect();

        const data = await client.query(queriesRewards.getUserRewardsByEmail, [email])
        
        data.rowCount != 0 ? result = data.rows : result = false;

    } catch (e) {
        throw e;

    } finally {
        client.release();

    };

    return result;
};



/**
 * Hace la consulta a la base de datos para traer los rewards de un establecimiento a través de su email.
 * @method modelGetPlaceRewards
 * @async
 * @param {String} email Correo electrónico del establecimiento
 * @returns {json} Los rewards
 * @throws {Error}
 */
const modelGetPlaceRewards = async (email) => {

    let client, result;
    try {

        client = await pool.connect();

        const data = await client.query(queriesRewards.getPlacesRewardsByEmail, [email])

        data.rowCount != 0 ? result = data.rows : result = false;

    } catch (e) {
        throw e;

    } finally {
        client.release();

    };

    return result;
};


module.exports = {
    modelGetRewards,
    modelCreateReward,
    modelGetUserRewards,
    modelGetPlaceRewards
}