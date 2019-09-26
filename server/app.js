require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
<<<<<<< HEAD
=======
const cors = require('cors');
>>>>>>> autenticacion_usuario

const port = process.env.PORT || 3001;
const database = process.env.DATABASE || 'mongodb://localhost:27017/seguimientotic';

const app = express();

mongoose.connect(database, { useNewUrlParser:true });
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
<<<<<<< HEAD
=======
app.use(cors());
>>>>>>> autenticacion_usuario

// Initial Configuration
require('./config/admin');

// Routers
const authRouter = require('./routes/auth');
app.use('/auth', authRouter);

app.listen(port);
console.log(`App listening on port ${port}`);