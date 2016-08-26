var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var purchTracker = new Schema({
  
      _creator : { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
      title: String ,
      amountSpent: Number,
      dateMade: Date
  
});


var purchTracker = mongoose.model('PurchTrac', purchTracker);
module.exports = mongoose.model('PurchTrac', purchTracker);