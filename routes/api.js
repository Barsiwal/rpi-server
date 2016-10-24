var express = require('express');
var router = express.Router();
var path = require('path');
var formidable = require('formidable');
var vibrant = require('node-vibrant');
var fs = require('fs');
var color = require('dominant-color');
var palette = require('image-palette');
var Color = require('color');
var imgPath = './public/images/a.png';
var temp=[];
router.route('/count').get( function (req, res) {
    var colors = palette(imgPath, function (colors) {
        temp=colors[0][1]+colors[0][0]+colors[0][2];
        temp=colors;
        console.log(temp);
    });
    res.send({
        state:"ok",
        count: temp
    });
})
    .post(function(req,res){
    temp=req.body.count;
    console.log(temp);
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