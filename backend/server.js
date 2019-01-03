const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const mainController = require('./controllers/mainController');

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.options('/*', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.sendStatus(200);
});

// run controller
mainController(app);

// listen to port
let port = process.env.PORT;
if (port == null || port === '')
  port = 3001;

app.listen(port, () => {
  console.log('Now listening on port ' + port + '.');
});
