var express = require('express');
var router = express.Router();

var userModel = require("../models/users")

/* GET sign-up page. */
router.post('/sign-up', async function(req, res, next) {
  // console.log(req.body);

  var user = await userModel.find({email: req.body.email});
  // console.log(user);

  if(user.length==0){
    var newUser = new userModel({
      username : req.body.username,
      email: req.body.email,
      password: req.body.password
    });
  
    newUser.save();

    req.session.newUser={
      name: newUser.username,
      id: newUser.id
    }

    // console.log(req.session.newUser, "$******")
    res.redirect('/weather');
  }
  res.render('login')
});


/* GET sign-in page. */
router.post('/sign-in', async function(req, res, next) {
  var user = await userModel.find(
    { email: req.body.email,
      password: req.body.password
    }
 );
// console.log(user);

if(user.length>0){
  req.session.newUser={
    name: user.username,
    id: user.id
  };
  res.redirect('/weather');
} else {
  res.redirect('/');
}


// console.log(req.session.newUser, "hsdjhfskdhfkhf")

});

/* GET logout page. */
router.get('/logout', function(req, res, next) {
  req.session.newUser = null;
  res.redirect('/');
});

module.exports = router;
