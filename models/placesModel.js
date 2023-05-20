const { pool } = require('../configs/configPostgreSQL');
const { queriesPlaces, queriesRoles, queriesRestaurants } = require('./queries');

const bcrypt = require('bcryptjs');

//*APPOINTMENTS CONTROLLERS



//Get All Places ++++++++++
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



//Get Place by place Phone ++++++++
const getPlaceByPhone = async (phone) => { //*operative

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



//Create Place
const createPlace = async (data) => { //*operative

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



//Update Place
const updatePlace = async (body, place_id) => { //*operative

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



//Delete Place
const deletePlace = async (email) => { //*operative

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



/**
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