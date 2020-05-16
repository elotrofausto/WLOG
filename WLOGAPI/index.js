/*
 *    WLOG API
 *    API that allows CRUD operations for WLOG Posts
 * 
 *    Alberto Fausto
 */

const config = require('config');

const express = require('express');
const helmet = require('helmet');
const app = express();
const port = process.env.PORT || config.get('PORT');
const bodyParser = require('body-parser');
const https = require('https');
const SSL_PASSPHRASE = config.get("SSL_PASSPHRASE");
const rateLimit = require("express-rate-limit");
const postgres = require('./postgres');

//Limiter for number of requests by IP (default is 10 requests/ 15 min)
const limiter = rateLimit({
 windowMs: config.get("REQ_TIME_PERIOD") * 60 * 1000,
 max: config.get("MAX_REQ_PER_IP") 
});

app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(limiter);

var routes = require('./routes.js');
routes(express,app);

//Start the https server
//https.createServer(
//    {
//    key: fs.readFileSync('.certs/key.pem'),
//    cert: fs.readFileSync('.certs/cert.pem'),
//    passphrase: SSL_PASSPHRASE
//  },
//  app).listen(port, console.log('Chat Agent Availability API server started on: ' + port));

//Connect to postgres DB. We use pooling
postgres.connect();

try{
 app.listen(port,console.log("WlogAPI started on " + port));
}
catch(err){
 console.log(err);
}
