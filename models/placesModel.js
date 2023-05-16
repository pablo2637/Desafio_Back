const { pool } = require('../configs/configPostgreSQL');
const {queriesPlaces} = require('./queries');

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
}

//Get Place by place Email ++++++++
const getPlaceByEmail = async (email) => { //*operative

    let client, result;

    try {
        
        client = await pool.connect();
        result = await client.query(queriesPlaces.placeByEmailQuery, [email]);
        

    } catch (error) {
        
        console.log('Model Failed getting single stablishment')
        throw error
    }

    finally {

        client.release();
    }
    return result;
}

//Create Place
const createPlace = async (data) => { //*operative

    let client, result;
    const {place_name, address, coords, phone, email, contact_name} = data;

    try {
        
        client = await pool.connect();
        result = await client.query(queriesPlaces.createPlaceQuery, [place_name, address, coords, phone, email, contact_name]);
        
    } catch (error) {
        
        console.log('Model Failed creating single stablishment')
        throw error
    }

    finally {

        client.release();
    }
    return result;
}

//Update Place
const updatePlace = async (body, place_id) => { //*operative

    let client, result;

    console.log(body)

    const {place_name, address, coords, phone, email, contact_name} = body;

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
}

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
}

module.exports={

    getAllPlaces,
    getPlaceByEmail,
    createPlace,
    updatePlace,
    deletePlace
}