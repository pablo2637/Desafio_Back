const { pool } = require('../configs/configPostgreSQL');

const bcrypt = require('bcryptjs');

const { queriesPlaces, 
        queriesRoles, 
        queriesRestaurants } = require('./queries');

//*Places/restaurants models

/**DOCS
 * Petición a la BBDD para obtener todos los places. (un establecimiento afiliado)
 * @method getAllPlaces
 * @async
 * @returns {json} Con los places
 * @throws {Error}
 */
//Get All Places
const getAllPlaces = async () => { //*operative

    let client, result;

    try {

        client = await pool.connect();
        result = await client.query(queriesPlaces.allPlacesQuery);


    } catch (error) {

        console.log('Model Failed getting all stablishments')
        throw error
    }

    finally {

        client.release();
    }
    return result;
};


/**DOCS
 * Petición a la BBDD en AWS mediante DATA endpoint para obtener todos los "restaurants".
 * @method getAllRestaurants
 * @async
 * @returns {json} Con los restaurants
 * @throws {Error}
 */
//Get All Restaurants ++++++++++
const getAllRestaurants = async () => { //*operative

    let client, result;

    try {

        client = await pool.connect();
        result = await client.query(queriesRestaurants.getRestaurants);


    } catch (error) {

        console.log('Model Failed getting all restaurants')
        throw error
    }

    finally {

        client.release();
    }
    return result;
};


/**DOCS
 * Petición a la BBDD para obtener un single place, por número de teléfono.
 * @method getPlaceByPhone
 * @async
 * @returns {json} Con el restaurante coincidente
 * @throws {Error}
 */
//Get Place by place Phone ++++++++
const getPlaceByPhone = async (phone) => {

    let client, result;

    try {

        client = await pool.connect();
        result = await client.query(queriesPlaces.placeByPhoneQuery, [phone]);


    } catch (error) {

        console.log('Model Failed getting single stablishment')
        throw error
    }

    finally {

        client.release();
    }
    return result;
};


/** DOCS
 * Inserta en la base de datos un place nuevo (un establecimiento afiliado)
 * @method createPlace
 * @async
 * @param {String} place_name ID del place
 * @param {String} address dirección del establecimiento
 * @param {String} coords Coordenadas del establecimiento
 * @param {String} phone teléfono del place
 * @param {String} email correp del establecimiento
 * @param {String} contact_name nombre de contacto del establecimiento
 * @param {String} password correp del establecimiento
 * @returns {json} 
 * @throws {Error}
 */
//Create Place
const createPlace = async (data) => {

    let client, result;
    const { place_name, address, coords, phone, email, contact_name, password: newPassword } = data;

    const salt = bcrypt.genSaltSync(10);
    const password = bcrypt.hashSync(newPassword, salt);

    try {

        client = await pool.connect();
        result = await client.query(queriesPlaces.createPlaceQuery, [place_name, address, coords, phone, email, contact_name, password]);

        await client.query(queriesRoles.insertRolPlaces, [result.rows[0].place_id, 'place']);

    } catch (error) {

        console.log('Model Failed creating single stablishment')
        throw error
    }

    finally {

        client.release();
    }
    return result;
};


/** DOCS
 * Petición a la base de datos para modificar un place existente (un establecimiento afiliado)
 * @method updatePlace
 * @async
 * @param {String} place_name ID del place
 * @param {String} address dirección del establecimiento
 * @param {String} coords Coordenadas del establecimiento
 * @param {String} phone teléfono del place
 * @param {String} email correo del establecimiento
 * @param {String} contact_name nombre de contacto del establecimiento
 * @returns {json} 
 * @throws {Error}
 */
//Update Place
const updatePlace = async (body, place_id) => {

    let client, result;

    console.log(body)

    const { place_name, address, coords, phone, email, contact_name } = body;

    try {

        client = await pool.connect();
        result = await client.query(queriesPlaces.updatePlaceQuery, [place_name, address, coords, phone, email, contact_name, place_id])

    } catch (error) {

        console.log('Model FAILED updating place. Please, contact administrator.')
    }

    finally {

        client.release();
    }
    return result;
};


/** DOCS
 * Petición a la base de datos para eliminar un place existente a través
 * a través del email (un establecimiento afiliado)
 * @method deletePlace
 * @async
 * @param {String} email correo del establecimiento
 * @returns {json} 
 * @throws {Error}
 */
//Delete Place
const deletePlace = async (email) => {

    let client, result;

    try {

        client = await pool.connect();
        result = await client.query(queriesPlaces.deletePlaceQuery, [email])

    } catch (error) {

        console.log('Model FAILED deleting place. Please, contact administrator.')
    }

    finally {

        client.release();
    }
    return result;
};


/**DOCS
 * Hace la consulta a la base de datos para traer el password del establecimiento a través de su id.
 * @method modelGetPasswordByID
 * @async
 * @param {String} id ID del establecimiento
 * @returns {json} El password
 * @throws {Error}
 */
const modelGetPasswordByID = async (id) => {

    let client, result;
    try {
        
        client = await pool.connect();

        const data = await client.query(queriesPlaces.getPlacePass, [id])
        
        data.rowCount != 0 ? result = data.rows : result = false;

    } catch (e) {
        throw e;

    } finally {
        client.release();

    };

    return result;
};


module.exports = {
    getAllRestaurants,
    getAllPlaces,
    getPlaceByPhone,
    createPlace,
    updatePlace,
    deletePlace,
    modelGetPasswordByID
}