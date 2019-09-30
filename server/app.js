require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const port = process.env.PORT || 3001;
const database = process.env.DATABASE || 'mongodb://localhost:27017/seguimientotic';

const app = express();

mongoose.connect(database, { useNewUrlParser:true });
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(cors());

// Initial Configuration
require('./config/admin');

// Routers
const authRouter = require('./routes/auth');
app.use('/auth', authRouter);

app.listen(port);
console.log(`App listening on port ${port}`);