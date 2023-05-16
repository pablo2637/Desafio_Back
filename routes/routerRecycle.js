const express = require('express');
const router = express.Router();

const {
    createRecycle,
    getRecycles,
    getUserRecycles,
    getPlacesRecycles
} = require('../controllers/controllerRecycle');



router.get('/', getRecycles);



router.get('/user/:email', getUserRecycles);



router.get('/place/:email', getPlacesRecycles);



router.post('/', createRecycle);



module.exports = router;