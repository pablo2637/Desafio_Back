const bcrypt = require('bcryptjs');

const {
    modelCreateUser,
    modelGetUsers,
    modelUpdateUser,
    modelGetUserByEmail,
    modelGetPasswordByID
} = require('../models/modelUsers');


/**
 * Hace la consulta a la base de datos y devuelve todos los usuarios.
 * @method getUsers
 * @async
 * @param {Object} req Es el requerimiento de la ruta.
 * @param {Object} res Es la respuesta de la ruta.
 * @returns {jon} Con los usuarios de la base de datos.
 * @throws {Error}
 */
const getUsers = async (req, res) => {

    try {

        const data = await modelGetUsers();

        if (data) return res.status(200).json({
            ok: true,
            data
        });
        else return res.status(400).json({
            ok: true,
            msg: 'No hay usuarios en la base de datos.'
        });

    } catch (e) {
        console.log('catchError en getUsers:', e);

        return res.status(500).json({
            ok: false,
            msg: 'Error en getUsers.',
            error: e
        });

    };
};



/**
 * Hace la petición a la base de datos para crear un usuario nuevo.
 * @method createUser
 * @async
 * @param {Object} req Es el requerimiento de la ruta, en el body debe tener los campos: name, last_name
 * password, avatar y email.
 * @param {Object} res Es la respuesta de la ruta.
 * @returns {jon} Con los datos del usuario creado.
 * @throws {Error}
 */
const createUser = async ({ body }, res) => {

    try {

        const data = await modelCreateUser(body);

        if (data) return res.status(200).json({
            ok: true,
            data
        });

    } catch (e) {

        if (e.toString().includes('duplicate key value')) {

            let err = { email: {} };
            err.email.msg = 'Este correo ya pertenece a un usuario registrado.'

            return res.status(500).json({
                ok: false,
                errors: err
            });
        }

        console.log('catchError en createUser:', e);

        return res.status(500).json({
            ok: false,
            msg: 'Error en createUser.',
            error: e.stack
        });

    };
};



/**
 * Hace la petición a la base de datos para editar un usuario.
 * @method updateUser
 * @async
 * @param {Object} req Es el requerimiento de la ruta, en el body debe tener los campos: name, last_name
 * password, avatar y email, y en params.id debe ir el ID del usuario a modificar.
 * @param {Object} res Es la respuesta de la ruta.
 * @returns {jon} Con los usuarios de la base de datos.
 * @throws {Error}
 */
const updateUser = async ({ body, params }, res) => {

    try {

        const response = await modelUpdateUser(body, params.id);

        if (!response.ok)
            res.status(500).json(response);

        else
            res.status(200).json(response);

    } catch (e) {

        res.status(500).json({
            ok: false,
            msg: 'Error updateUser',
            body,
            params,
            error: e
        });

    };
};




/**
 * Devuelve todos los usuarios.
 * @method getUsers
 * @async
 * @param {Object} req Es el requerimiento de la ruta, debe incluir en params: email con el correo
 * eléctronico del usuario.
 * @param {Object} res Es la respuesta de la ruta.
 * @returns {jon} Con el usuario de la base de datos.
 * @throws {Error}
 */
const getUserByEmail = async ({ params }, res) => {

    try {

        const data = await modelGetUserByEmail(params.email);

        if (data) return res.status(200).json({
            ok: true,
            data
        });
        else {
            const err = {};
            err.email = `No se encontró ningún usuario con el email: ${params.email}`
            return res.status(400).json({
                ok: true,
                errors: err
            });
        }

    } catch (e) {
        console.log('catchError en getUserByEmail:', e);

        return res.status(500).json({
            ok: false,
            msg: 'Error en getUserByEmail.',
            error: e.stack
        });

    };
};





/**
 * Devuelve todos los usuarios.
 * @method loginUser
 * @async
 * @param {Object} req Es el requerimiento de la ruta, debe incluir en body: email con el correo
 * eléctronico del usuario y password: con la contraseña.
 * @param {Object} res Es la respuesta de la ruta.
 * @returns {jon} Con el usuario de la base de datos.
 * @throws {Error}
 */
const loginUser = async ({ body }, res) => {

    try {

        const data = await modelGetUserByEmail(body.email);

        if (!data)
            return res.status(401).json({
                ok: false,
                msg: 'El usuario/contraseña no corresponden a los datos almacenados.',
            });

        const userPass = await modelGetPasswordByID(data[0].user_id);

        const passwordOk = bcrypt.compareSync(body.password, userPass[0].password);

        if (!passwordOk)
            return res.status(401).json({
                ok: false,
                msg: 'El usuario/contraseña no corresponden a los datos almacenados.',
            });

        return res.status(200).json({
            ok: true,
            msg: 'Login correcto.',
            data
        });


    } catch (e) {
        console.log('catchError en loginUser:', e);

        return res.status(500).json({
            ok: false,
            msg: 'Error en loginUser.',
            error: e.stack
        });

    };
};



module.exports = {
    createUser,
    getUsers,
    updateUser,
    getUserByEmail,
    loginUser
}