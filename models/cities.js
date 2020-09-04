var mongoose = require('mongoose');
  

var citiesSchema = mongoose.Schema({
    name: String,
    image: String,
    description: String,
    tempMin: Number,
    tempMax: Number,
    longitude: Number,
    latitude : Number
   });

var cityModel = mongoose.model('cities', citiesSchema);
   
module.exports = cityModel;
   