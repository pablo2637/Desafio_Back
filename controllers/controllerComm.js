const {
    modelGetAllComm,
    modelInsertComm,
    modelUpdateComm,
    modelDeleteComm
} = require ('../models/modelComm')

//*Comments CONTROLLERS (comming in v.2)

/**DOCS
 * Obtiene todos los comentarios del foro.
 * @function
 * @async
 * @param {Object} req - El objeto de solicitud.
 * @param {Object} res - El objeto de respuesta.
 * @throws {Object} Error en caso de que algo salga mal en la ejecución.
 */
//Get all comments entries ++++++++++
const getAllComm = async (req, res) => {

    try {

        console.log("Hola")        

        const data = await modelGetAllComm();
        
        if (data) return res.status(200).json({
            ok: true,
            data
        });
        else return res.status(400).json({
            ok: true,
            msg: 'No hay ningun tipo de comentario'
        });

       

    } catch (e) {
        return res.status(500).json({
            ok: false,
            msg: 'Error en getAll.',
            error: e
        });

    };
};


/**DOCS
 * Inserta un comentario en el foro.
 * @function
 * @async
 * @param {Object} req - El objeto de solicitud con el cuerpo del comentario.
 * @param {Object} res - El objeto de respuesta.
 * @throws {Object} Error en caso de que algo salga mal en la ejecución.
 */
//Creates a new comment entry ++++++++++
const Insertcomm = async ({ body }, res) => {

    try {
        const data = await modelInsertComm(body);

        if (data) return res.status(200).json({
            ok: true,
            data
        });

    } catch (e) {
        return res.status(500).json({
            ok: false,
            msg: 'Error en Insertcomm.',
            error: e
        });

    };
};


/**DOCS
 * actualiza un comentario en el foro.
 * @function
 * @async
 * @param {Object} req - El objeto de solicitud con el cuerpo del comentario.
 * @param {Object} res - El objeto de respuesta.
 * @throws {Object} Error en caso de que algo salga mal en la ejecución.
 */
//Updates a comments entry ++++++++++
const UpdateComm = async ({ body }, res) => {

    try {
        const data = await modelUpdateComm(body);

        if (data) return res.status(200).json({
            ok: true,
            data
        });

    } catch (e) {
        return res.status(500).json({
            ok: false,
            msg: 'Error en updatecomm.',
            error: e
        });

    };
};


/**DOCS
 * Elimina un comentario del foro.
 * @function
 * @async
 * @param {Object} req - El objeto de solicitud con el id del comentario a eliminar.
 * @param {Object} res - El objeto de respuesta.
 * @throws {Object} Error en caso de que algo salga mal en la ejecución.
 */
//Deletes a comment entry ++++++++++
const deleteComm = async (req, res) => {
    try {
      const comm_id = req.params.id;
      const deletedRows = await modelDeleteComm(comm_id);
  
      if (deletedRows) {
        return res.status(200).json({
          ok: true,
          msg: `Se eliminó el comentario con ID ${comm_id}`
        });
      } else {
        return res.status(404).json({
          ok: false,
          msg: `No se encontró el comentario con ID ${comm_id}`
        });
      }
    } catch (e) {
      return res.status(500).json({
        ok: false,
        msg: 'Error en deleteComm.',
        error: e
      });
    }
  };
  
  
module.exports = {
    getAllComm,
    Insertcomm,
    UpdateComm,
    deleteComm
}