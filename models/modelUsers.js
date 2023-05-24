const { pool } = require('../configs/configPostgreSQL');

const bcrypt = require('bcryptjs');

const {
    queriesUser,
    queriesRoles
} = require('./queries');

//*Users models

/**DOCS
 * Crea un usuario nuevo.
 * @method modelCreateUser
 * @async
 * @param {String} name Nombre del usuario
 * @param {String} last_name Apellido del usuario
 * @param {String} email Correo electrónico
 * @param {String} avatar URL de la imagen del usuario  
 * @param {String} password Contraseña
 * @returns {json}
 * @throws {Error}
 */
const modelCreateUser = async ({ name, last_name, email, avatar, password }) => {

    let client, result;
    try {

        client = await pool.connect();

        const salt = bcrypt.genSaltSync(10);
        password = bcrypt.hashSync(password, salt);

        const data = await client.query(queriesUser.createUser, [name, last_name, email, avatar, password])

        await client.query(queriesRoles.insertRol, [data.rows[0].user_id, 'user']);

        data.rowCount != 0 ? result = data.rows : result = false;

    } catch (e) {
        throw e;

    } finally {
        client.release();

    };

    return result;
};


/**DOCS
 * Hace la consulta a la base de datos para obtener todos los usuarios.
 * @method modelGetUsers
 * @async
 * @returns {json} Con los usuarios
 * @throws {Error}
 */
const modelGetUsers = async () => {

    let client, result;
    try {

        client = await pool.connect();

        const data = await client.query(queriesUser.getUsers)

        data.rowCount != 0 ? result = data.rows : result = false;

    } catch (e) {
        throw e;

    } finally {
        client.release();

    };

    return result;
};


/**DOCS
 * La petición a la base de datos para modificar un usuario.
 * @method modelUpdateUser
 * @async
 * @param {String} name Nombre del usuario
 * @param {String} last_name Apellido del usuario
 * @param {String} email Correo electrónico
 * @param {String} avatar URL de la imagen del usuario  
 * @param {String} password Contraseña
 * @param {String} id ID del usuario a modificar
 * @returns {json}
 * @throws {Error}
 */
const modelUpdateUser = async ({ name, last_name, email, avatar, password }, id) => {

    let client, rslt, isPassOK;

    try {

        client = await pool.connect();

        const data = await client.query(queriesUser.getUserPass, [id]);

        isPassOK = bcrypt.compareSync(password, data.rows[0].password);

        if (isPassOK) {

            const salt = bcrypt.genSaltSync(10);
            password = bcrypt.hashSync(password, salt);

            rslt = await client.query(queriesUser.updateUser, [name, last_name, email, avatar, password, id]);
        }

    } catch (e) {
        throw e;

    } finally {
        client.release();

    };


    if (!isPassOK)
        return {
            ok: false,
            msg: 'El password proporcionado no coincide con el de la base de datos'
        }


    if (rslt.rowCount == 0)
        return {
            ok: false,
            response: {
                msg: 'Fallo al intentar modificar el usuario.',
                id,
                rslt
            }
        };

    return {
        ok: true,
        response: rslt.rows[0]
    };

};


/**DOCS
 * Hace la consulta a la base de datos para traer el usuario a través de su email.
 * @method modelGetUsers
 * @async
 * @param {String} email Correo electrónico del usuario
 * @returns {json} Con los usuarios
 * @throws {Error}
 */
const modelGetUserByEmail = async (email) => {

    let client, result;
    try {

        client = await pool.connect();

        const data = await client.query(queriesUser.getUserByEmail, [email])

        data.rowCount != 0 ? result = data.rows : result = false;

    } catch (e) {
        throw e;

    } finally {
        client.release();

    };

    return result;
};


/**DOCS
 * Hace la consulta a la base de datos para traer el password del usuario a través de su id.
 * @method modelGetPasswordByID
 * @async
 * @param {String} id ID del usuario
 * @returns {json} El password
 * @throws {Error}
 */
const modelGetPasswordByID = async (id) => {

    let client, result;
    try {
        
        client = await pool.connect();

        const data = await client.query(queriesUser.getUserPass, [id])
        
        data.rowCount != 0 ? result = data.rows : result = false;

    } catch (e) {
        throw e;

    } finally {
        client.release();

    };

    return result;
};


module.exports = {
    modelGetPasswordByID,
    modelCreateUser,
    modelGetUsers,
    modelUpdateUser,
    modelGetUserByEmail
}