var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');


var User = new Schema({
    username: String,
    password: String,
    currentBudget: Number,
    
    purchaseHistory : [{ type: Schema.Types.ObjectId, ref: 'purchTrac' }]
});

User.plugin(passportLocalMongoose);
var User = mongoose.model('users', User);
module.exports = mongoose.model('users', User);