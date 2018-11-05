var express         = require('express');
var bodyParser      = require('body-parser');
var mysql           = require('mysql');
const MongoClient   = require('mongodb').MongoClient;
var send            = require('./send')

const app       = express();
config          = require('config');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

const port = process.env.PORT || config.get('PORT')

app.get('/bulk_send', send.sendPush);

connection = mysql.createConnection(config.get('database_settings'));
    
    connection.connect(function(err) {              // The server is either down
        if(err) {                                     // or restarting (takes a while sometimes).
            console.log('error when connecting to db:', err);
            // setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
        }else{
            console.log('database connected at...', config.get('database_settings.mysqlPORT'));
        }                                     // to avoid a hot loop, and to allow our node script to
    });                                     // process asynchronous requests in the meantime.
    // connection.query(`create database if not exists mydb`);
    // connection.query(`use mydb`);

const server = app.listen(port, function () {
    console.log(`Server running at ${port} `);
});