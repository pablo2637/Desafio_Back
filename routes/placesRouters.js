const express = require ('express');
const router = express.Router();

const { check } = require('express-validator');
const { validateInputs } = require('../middlewares/validateInputs');

const { 
    getAllPlacesControl, 
    getPlaceByEmailControl, 
    createPlaceControl, 
    deletePlaceControl, 
    updatePlaceControl } = require('../controllers/placesControllers');



//*Routers
//Get All Places ++++++++++
router.get('/', getAllPlacesControl);

//Get Place by email
router.get('/:email', getPlaceByEmailControl);

//Create Place ++++++++++
router.post('/create',[

    check('place_name', 'Nombre de establecimiento obligatorio').trim().not().isEmpty(),
    check('address', 'Dirección de establecimiento obligatorio').trim().not().isEmpty(),
    check('coords', 'Necesitamos tus coordenadas para ubicarte').trim().not().isEmpty(),
    check('phone', 'Número de teléfono es requerido').trim().not().isEmpty(),
    check('email', 'El email es obligatorio, por favor, verifícalo.').trim().isEmail().normalizeEmail(),
    check('contact_name', 'Nombre de contacto obligatorio').trim().not().isEmpty(),
    validateInputs

], createPlaceControl);

//Update Place ++++++++++
router.put('/:id', updatePlaceControl);

//Delete Place ++++++++++
router.delete('/:email', deletePlaceControl);

module.exports = router;