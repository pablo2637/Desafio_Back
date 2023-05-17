const express = require('express');
const router = express.Router();

const { check } = require('express-validator');
const { validateInputs } = require('../middlewares/validateInputs');


const {
    createUser,
    getUsers,
    updateUser,
    getUserByEmail
} = require('../controllers/controllerUsers');



router.get('/', getUsers);



router.get('/:email', getUserByEmail);



router.post('/', [
    check('name', 'El nombre es obligatorio.').trim().not().isEmpty(),
    check('last_name', 'El apellido es obligatorio.').trim().not().isEmpty(),
    check('password', 'La contraseña es obligatoria y debe tener entre 5 y 10 caracteres.').trim().isLength({ min: 5, max: 10 }).not().isEmpty(),
    check('email', 'El email es obligatorio, por favor, verifícalo.').trim().isEmail().normalizeEmail(),
    validateInputs
], createUser);



router.put('/:id', [
    check('name', 'El nombre es obligatorio.').trim().not().isEmpty(),
    check('last_name', 'El apellido es obligatorio.').trim().not().isEmpty(),
    check('password', 'La contraseña es obligatoria y debe tener entre 5 y 10 caracteres.').trim().isLength({ min: 5, max: 10 }).not().isEmpty(),
    check('email', 'El email es obligatorio, por favor, verifícalo.').trim().isEmail().normalizeEmail(),
    validateInputs
], updateUser);



module.exports = router;