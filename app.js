const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();


port = process.env.PORT;

app.use(cors());                                    //Cors
app.use(express.static(__dirname + '/public'));     //Carpeta static

app.use(express.urlencoded({ extended: false }));   // Parse application/x-www-form-urlencoded
app.use(express.json());                             // Parse application/json


//Rutas
app.use('/api/users', require('./routes/routerUsers'));         //Users
app.use('/api/recycle', require('./routes/routerRecycle'));     //Recycle
app.use('/api/rewards', require('./routes/routerRewards'));     //Rewards
app.use('/api/comments', require('./routes/routerComm'));       //Comments
app.use('/api/places', require('./routes/placesRouters'));      //Places

//404
app.use((req, res) => { res.status(404).send({ msg: `Ruta no encontrada: ${req.url}` }); });


//Listener
app.listen(port, () => console.log(`Server listenning on port ${port}...`));