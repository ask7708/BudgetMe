var express = require('express');
var router = express.Router();
var passport = require('passport');

var User = require('../models/user.js');
var purchaseTracker = require('../models/purchases.js');

router.post('/register', function(req,res){
    User.register(new User({ username: req.body.username, currentBudget: req.body.currentBudget}),
        req.body.password,  function(err, account) {
            if(err){
                return res.status(500).json({
                    err:err
                });
            }
            passport.authenticate('local')(req, res, function() {
                
                
                return res.status(200).json({
                    status: 'Registration succesful!'
                });
            });
        });
});

router.post('/login', function(req, res, next){
    passport.authenticate('local', function(err, user, info){
        if(err){
            return next(err);
        }
        if(!user){
            return res.status(401).json({
                err: info
            });
        }
        req.logIn(user, function(err){
            if(err) {
                return res.status(500).json({
                    err: 'Could not log in user'
                });
            }
            /*
             var purchTrac = new purchaseTracker({
      
      _creator : req.user._id,
      title: "test",
      amountSpent: 99,
      dateMade: Date.now()    
      });
      
      req.user.purchaseHistory.push(purchTrac);
      req.user.save();

  
    purchTrac.save(function(err){
      if(err) return err;
       purchaseTracker.find({ _creator: req.user._id })
      .exec(function (err, purchTracs) {
      if (err) return (err);
          
        });
      });*/
            res.status(200).json({
                status: 'Login Succesful!'
            });
        });
    })(req, res, next);
});


router.get('/profile', function(req,res){
    res.status(200).json({
        user: req.user,
        name : req.user.username,    
        budget: req.user.currentBudget
    });
});

router.get('/logout', function(req, res){
    req.logout();
    res.status(200).json({
        status: 'Bye!'
    });
});

router.get("/purchaseHistory", function(req,res){
    
   purchaseTracker.find({
       
       _creator: req.user._id
       
   }).exec(function(err, purchases){
       if(err) return (err);
            res.json(purchases) 
   });
    
});

router.post("/deletePurchase",function(req,res){
   
   
   
    
});

router.post("/purchaseHistory", function(req, res){
    
    var anothaPurch = new purchaseTracker({
       
       _creator : req.user._id,
       title : req.body.title,
       amountSpent : req.body.amountSpent,
       dateMade : req.body.dateMade
      
    });
    
    req.user.purchaseHistory.push(anothaPurch);
    req.user.save();
    
    anothaPurch.save(function(err){
        if (err) return err;
        purchaseTracker.find({ _creator : req.user._id })
        .exec(function(err, purchs){
            if(err) return err;
                return res.json(purchs);
        });
    });
    
    
});


router.get('/status', function(req, res){
    if(!req.isAuthenticated()) {
        return res.status(200).json({
            status: false
        });
    }
    res.status(200).json({
        status: true
    });
});

module.exports = router;