const express = require('express');
const router = express.Router();

const {
    createRecycle,
    getRecycles,
    getUserRecycles,
    getPlacesRecycles,
    getSumRecycles
} = require('../controllers/controllerRecycle');


router.get('/:user_id', getSumRecycles)


router.get('/', getRecycles);


router.get('/user/:id', getUserRecycles);


router.get('/place/:id', getPlacesRecycles);


router.post('/', createRecycle);


module.exports = router;