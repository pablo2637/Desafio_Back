const { getAllPlaces, getPlaceByEmail, createPlace, deletePlace, updatePlace } = require('../models/placesModel')

//*PLACES CONTROLLERS

//Get All Places ++++++++++
const getAllPlacesControl = async (req,res) => {//*operative

    let data;

    try {
        
        const petition = await getAllPlaces();
        data = petition.rows

        if(data) {

            return res.status(200).json({

                ok:true,
                msg: 'All places successfully found',
                data
            })
        }

    } catch (error) {
        
        return res.status(500).json({

            ok:false,
            msg: 'Model FAILED getting all places. Please, contact administrator.'
        })
    }
}

//Get place by email +++++++
const getPlaceByEmailControl = async (req,res) => { //*operative

    let data, email;
    email = req.params.email;
    
    try {

        const petition = await getPlaceByEmail(email)

        data = petition.rows

        if(email) {

            return res.status(200).json({

                ok:true,
                msg: 'Single place gotten correctly',
                data
            })
        }

    } catch (error) {
        
        return res.status(500).json({

            ok:false,
            msg: 'Controller Failed getting single place. Please, contact administrator'
        })
    }
}

//Create place +++++++++
const createPlaceControl = async ({body},res) => { //*operative
    
    try {

        const petition = await createPlace(body)

        const placeCreated = petition.rows

        if(placeCreated) {

            return res.status(200).json({

                ok:true,
                msg: 'Single place created correctly',
                data
            })
        }

    } catch (error) {

        console.log('esto es el error:', error.toString())
        if (error.toString().includes('duplicate key value')) {

            let err = { email: {} };
            err.email.msg = 'Este correo ya pertenece a un usuario registrado.'

            return res.status(500).json({
                ok: false,
                errors: err
            });
        }
        
        return res.status(500).json({

            ok:false,
            msg: 'Controller Failed creating place. Please, contact administrator'
        })
    }
}

//Update place +++++++++
const updatePlaceControl = async (req,res) =>{ //*operative

    let data, place_id, body;
    place_id = req.params.id;
    body = req.body;

    try {
        
        if(place_id) {

            const petition = await updatePlace(body, place_id)

            data = petition.rowCount

            return res.status(200).json({

                ok:true,
                msg: `Places updated: ${data}.`,
                data
            })
        }

    } catch (error) {
        
        return res.status(500).json({

            ok:false,
            msg: 'Control FAILED updating place. Please, contact administrator.'
        })
    }
}

//Delete place +++++++++
const deletePlaceControl = async (req,res) => { //*operative

    let data, email;
    email = req.params.email

    try {

        if(email) {

            const petition = await deletePlace(email)
            data = petition.rowCount

            return res.status(200).json({

                ok:true,
                msg: `Number of Places deleted: ${data}.`,
                data
            })
        }

    } catch (error) {

        return res.status(500).json({

            ok:true,
            msg: 'Controller FAILED deleting place. Please, contact administrator.'
        })
    }
}

module.exports = {

    getAllPlacesControl,
    getPlaceByEmailControl,
    createPlaceControl,
    updatePlaceControl,
    deletePlaceControl
}