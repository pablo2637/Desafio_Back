const express = require('express');
const router = express.Router();

const { getAllComm,
    Insertcomm,
    UpdateComm,
    deleteComm } = require('../controllers/controllerComm')



router.get('/', getAllComm);

router.post ('/', Insertcomm)

router.delete('/:id', deleteComm);


router.put('/:id', UpdateComm);

module.exports = router

