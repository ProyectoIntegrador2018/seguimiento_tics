require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const port = process.env.PORT || 3001;
const database =
  process.env.DATABASE || "mongodb://localhost:27017/seguimientotic";

const app = express();

mongoose.connect(database, { useNewUrlParser: true });
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());
app.use(cors());

// Initial Configuration
app.use(express.static('./server/config/admin'))

// Routers
const authRouter = require('./server/routes/auth');
const apiRouter = require('./server/routes/adminapi');

app.use('/auth', authRouter);
app.use('/admin', apiRouter);

// Front-end production configuration
if(process.env.NODE_ENV === 'production'){
    // Static folder
    app.use(express.static('client/build'));
    app.get('*', function(req, res) {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}

app.listen(port);
console.log(`App listening on port ${port}`);
