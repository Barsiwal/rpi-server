var express = require('express');
var mongoose = require('mongoose');
var app = express();
var logger = require('morgan');
var path = require('path');
var http = require('http').Server(app);
var formidable = require('formidable');
var bodyParser = require('body-parser');
app.use(bodyParser.json());
mongoose.connect('mongodb://barsiwal:hirdesh1@ds031257.mlab.com:31257/rpi');
require('./models/model.js');


app.use(bodyParser.urlencoded({
    extended: true,
    upload: '/public/images'
}));
app.use(express.static(path.join(__dirname, 'public')));
//-----------------------routes
app.use(logger('dev'));
var api = require('./routes/api.js');
app.use('/', api);
//-----------------------socket

//-----------------------port
var port = process.env.PORT || '3001';
http.listen(port, function () {
    console.log('listening on port ' + port);
});