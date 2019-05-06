var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  Task = require('./api/models/infoModel'), //created model loading here
  bodyParser = require('body-parser');
  
// mongoose instance connection url connection
mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://localhost:27017/express', { useNewUrlParser: true }); 
mongoose.connect('mongodb+srv://Admin:AdminAccess@onlinedata-xzwiw.mongodb.net/test?retryWrites=true', { useNewUrlParser: true });


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var routes = require('./api/routes/infoRoutes'); //importing route
routes(app); //register the route


// Error management
app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
});


app.listen(port);


console.log('RESTful API server started on: ' + port);