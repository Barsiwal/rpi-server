var express = require('express');
var router = express.Router();
var path = require('path');
var formidable = require('formidable');
var vibrant = require('node-vibrant');
var fs = require('fs');
var color = require('dominant-color');
var palette = require('image-palette');
var mongoose = require('mongoose');
var Color = require('color');
var main = mongoose.model('main');




var imgPath = './public/images/a.png';
var temp = [];
router.route('/count').get(function (req, res) {
        main.findOne({
            'name': 1
        }, function (err, data) {
            res.json(data);
        });

    })
    .post(function (req, res) {
        console.log(req.body.count);
        main.findOne({
            'name': 1
        }, function (err, data) {
            data.name = 1;
            data.count = req.body.count;
            data.save(function (err) {
                if (err)
                    console.log(err)
            });
        });
        res.send({
            state: "ok"
        });
    });

router.route('/posts')
    .post(function (req, res) {
        var form = new formidable.IncomingForm();
        form.multiples = false;
        form.uploadDir = './public/images';
        form.on('file', function (field, file) {
            console.log(file);
            fs.rename(file.path, path.join(form.uploadDir, file.name));
        });
        form.on('error', function (err) {
            console.log('An error has occured: \n' + err);
        });
        form.on('end', function () {
            res.end('success');
        });
        form.parse(req);
        res.end("upload complete");
    });
module.exports = router;
