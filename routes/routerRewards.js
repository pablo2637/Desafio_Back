const express = require('express');
const router = express.Router();

const {
    createReward,
    getPlacesRewards,
    getRewards,
    getUserRewards
} = require('../controllers/controllerRewards');


router.get('/', getRewards);


router.get('/user/:email', getUserRewards);


router.get('/place/:email', getPlacesRewards);


router.post('/', createReward);


module.exports = router;