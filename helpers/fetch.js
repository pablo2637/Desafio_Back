const FormData = require('form-data');
const axios = require('axios');

/** DOCS
 * 
 * @param {String} url Url que vamos a enviar a través del método por el que entre al Back para hacer la solicitud.
 * @param {String} method Recibimos el método por el cual vamos a ejecutar la URL anterior, y debe recibirlo siempre en mayúsculas por haberlo declarado así en la función
 * @param {Object} [body] En caso de recibir un BODY, lo recibimos en formato objeto. De no recibir BODY, declaramos un OBJ vacío para que no interrumpa la petición.
 * @returns respuesta: sería la respuesta a la solicitud que estamos haciendo, y vendrá en formato Object.
 */
const masterFetchData = async (place_id) => {

    const urlBase = process.env.DATA_URL;

    const formData = new FormData();
    formData.append('a', place_id);

    try {

        const options = {
            method: 'POST',
            body: formData
        };
        // let respuesta = await fetch(urlBase, options);
        let respuesta = await axios.post(urlBase, formData, {
            headers: formData.getHeaders()
        })

        /**
         * consulta realizada a través de parámetro URL y las OPTIONS (method,body)
         */
        let resp = await respuesta;

        // console.log('esto es RESP_DATA en Fetch', resp.data)

        return resp.data;

    } catch (error) {

        console.log('FAILED while fetching', error)
    }
}

module.exports = { masterFetchData }