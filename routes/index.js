var express = require('express');
var router = express.Router();
var request = require('sync-request');

var cityModel = require("../models/cities");

var cityList = [];

/* GET login page. */
router.get('/', function(req, res, next) {
  res.render('login', {});
});



/* GET weather page. */
router.get('/weather', async function(req, res, next) {

  if(req.session.newUser==null){
    res.redirect('/')
  } else {
    var cities = await cityModel.find();
    // console.log(cities)

    res.render('weather', {cities});
  }
});



/* GET add-city page. */
router.post('/add-city', async function(req, res, next) {

  /* API */
var result = request("GET", `http://api.openweathermap.org/data/2.5/weather?q=${req.body.city}&units=metric&lang=fr&appid=b11f3c2895d5311c6c8077ef73490db2`);
var resultJson = JSON.parse(result.body);

// console.log(resultJson, "********************");

/* cityList */
  // console.log(req.body)
  var double = false; 
  var cities = await cityModel.find();

  if(cities.length==0){
    var newCity = new cityModel({
      name: req.body.city,
      image: "http://openweathermap.org/img/wn/"+resultJson.weather[0].icon+".png",
      description: resultJson.weather[0].description,
      tempMin: resultJson.main.temp_min,
      tempMax: resultJson.main.temp_max,
      longitude: resultJson.coord.lon,
      latitude : resultJson.coord.lat
    });
    
  await newCity.save();
  };

  for(var i = 0; i<cities.length; i++){
    if(cities[i].name.toLowerCase() === req.body.city.toLowerCase()){
      var double = true;
    }
  };

  if(double== false && resultJson.name){
    var newCity = new cityModel({
      name: req.body.city,
      image: "http://openweathermap.org/img/wn/"+resultJson.weather[0].icon+".png",
      description: resultJson.weather[0].description,
      tempMin: resultJson.main.temp_min,
      tempMax: resultJson.main.temp_max,
      longitude: resultJson.coord.lon,
      latitude : resultJson.coord.lat
  })
  
  await newCity.save();
};


    
var cities = await cityModel.find();
// console.log(cities)


  res.render('weather', {cityList, resultJson, cities});
});


/* GET delete-city page. */
router.get('/delete-city', async function(req, res, next) {
  // console.log(req.query)
  await cityModel.deleteOne({
    _id: req.query.id
  })


  var cities = await cityModel.find();

  res.render('weather', {cities});
})

/* GET update-data page. */
router.get('/update-data', async function(req, res, next) {
  var cities = await cityModel.find();

  for(var i = 0; i< cities.length; i++){
    var result = request("GET", `http://api.openweathermap.org/data/2.5/weather?q=${cities[i].name}&units=metric&lang=fr&appid=b11f3c2895d5311c6c8077ef73490db2`);
    var resultJson = JSON.parse(result.body);

    await cityModel.updateOne({
      _id: cities[i].id
    }, {
      name: cities[i].name,
      image: "http://openweathermap.org/img/wn/"+resultJson.weather[0].icon+".png",
      description: resultJson.weather[0].description,
      tempMin: resultJson.main.temp_min,
      tempMax: resultJson.main.temp_max,
      longitude: resultJson.coord.lon,
      latitude : resultJson.coord.lat
    })
  }

  var cities = await cityModel.find();

  res.render('weather', {cities});
});

module.exports = router;
