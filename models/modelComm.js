const { pool } = require('../configs/configPostgreSQL');

const {
  queriesComments
} = require('./queries');


/**
 * Obtiene todos los comentarios de la base de datos.
 *
 * @returns {Promise<Array|boolean>} Un array de objetos con los comentarios o false si no se encontraron comentarios.
 * @throws {Error} Si ocurre algún error durante la ejecución de la consulta.
 */

const modelGetAllComm = async () => {

    let client, result;

    try {
        
        client = await pool.connect();
       
        const data = await client.query(queriesComments.getAllComm)

        console.log(data)
        if (data.rowCount !== 0) {
            result = data.rows;
          } else {
            result = false;
          }

    } catch (e) {
        throw e;

    } finally {
        client.release();

    };

    return result;
};


/**
 * Inserta un nuevo comentario en la base de datos.
 *
 * @param {Object} comment - Los datos del comentario a insertar.
 * @param {string} comment.comm - El contenido del comentario.
 * @param {number} comment.user_id - El ID del usuario asociado al comentario.
 * @param {number} comment.place_id - El ID del lugar asociado al comentario.
 * @returns {Promise<Array|boolean>} Un array de objetos con los comentarios insertados o false si no se pudo realizar.
 * @throws {Error} Si ocurre algún error durante la ejecución de la consulta.
 */

const modelInsertComm = async ({ comm, user_id, place_id }) => {

    let client, result;
    try {

        client = await pool.connect();

        const data = await client.query(queriesComments.PostComm, [comm, user_id, place_id]);

        if (data.rowCount !== 0) {
            result = data.rows;
          } else {
            result = false;
          }

    } catch (e) {
        throw e;

    } finally {
        client.release();

    };

    return result;
};

/**
 * Actualiza un comentario existente en la base de datos.
 *
 * @param {Object} comment - Los datos del comentario a actualizar.
 * @param {string} comment.comm - El nuevo contenido del comentario.
 * @param {number} comment.user_id - El ID del usuario asociado al comentario.
 * @param {number} comment.place_id - El ID del lugar asociado al comentario.
 * @returns {Promise<Array|boolean>} Un array de objetos con los comentarios actualizados o false si no se pudo realizar la actualización.
 * @throws {Error} Si ocurre algún error durante la ejecución de la consulta.
 */

const modelUpdateComm = async ({ comm, user_id, place_id }) => {

  let client, result;
  try {

      client = await pool.connect();

      const data = await client.query(queriesComments.UpdateComm, [comm, user_id, place_id]);

      if (data.rowCount !== 0) {
          result = data.rows;
        } else {
          result = false;
        }

  } catch (e) {
      throw e;

  } finally {
      client.release();

  };

  return result;
};


/**
 * Elimina un comentario de la base de datos.
 *
 * @param {number} comm_id - El ID del comentario a eliminar.
 * @returns {Promise<boolean>} Indicador de éxito de la eliminación del comentario.
 * @throws {Error} Si ocurre algún error durante la ejecución de la consulta.
 */


const modelDeleteComm = async (comm_id) => {
    let client, result;
  
    try {
      client = await pool.connect();
  
      const data = await client.query(queriesComments.deleteComm, [comm_id]);


      if (data.rowCount !== 0) {
        result = true;
      } else {
        result = false;
      }
    } catch (e) {
      throw e;
    } finally {
      client.release();
    }
  
    return result;
  };
  


module.exports = {
    modelGetAllComm,
    modelInsertComm,
    modelUpdateComm,
    modelDeleteComm
}