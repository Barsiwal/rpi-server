var mongoose = require('mongoose');
var schema =mongoose.Schema;
var main = new schema({
    name:{ type: Number, default: 1 },
    count:Number
});
module.exports=mongoose.model('main',main);
