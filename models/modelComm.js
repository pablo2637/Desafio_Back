const { pool } = require('../configs/configPostgreSQL');

const {
  queriesComments
} = require('./queries');


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