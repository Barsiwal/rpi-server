var express = require('express');
var router = express.Router();
var path = require('path');
var formidable = require('formidable');
var fs = require('fs');
router.route('/posts')
    .post(function (req, res) {
        var form = new formidable.IncomingForm();
        form.multiples = false;
        form.uploadDir = './public/images';
        form.on('file', function (field, file) {
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
router.route('/').post(function (req, res) {
    console.log(req.body.check);
    res.send();
});
module.exports = router;