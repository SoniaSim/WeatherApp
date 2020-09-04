var mongoose = require('mongoose');

require('dotenv').config()

var options = {
    connectTimeoutMS: 5000,
    useNewUrlParser: true,
    useUnifiedTopology : true
   }
   mongoose.connect(process.env.DB_CONNECTION,
    options,    
    function(err) {
     console.log(err);
    }
   );