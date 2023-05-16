const express = require ('express');
const router = express.Router();

const { getAllPlacesControl, getPlaceByEmailControl, createPlaceControl, deletePlaceControl, updatePlaceControl } = require('../controllers/placesControllers');
// const {validateInputs} = require('../middlewares/inputValidator');

//*Routers
//Get All Places ++++++++++
router.get('/', getAllPlacesControl);

//Get Place by email
router.get('/:email', getPlaceByEmailControl);

//Create Place ++++++++++
router.post('/create', createPlaceControl);

//Update Place ++++++++++
router.put('/:id', updatePlaceControl);

//Delete Place ++++++++++
router.delete('/:email', deletePlaceControl);

module.exports = router;