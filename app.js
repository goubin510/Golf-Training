//Instanciation
var express = require('express'),
	app = express(),

	port = process.env.PORT || 3000,
	bodyParser = require('body-parser'),

	mongoose = require('mongoose'),
	Task = require('./api/models/infoModel'), //created model loading here

	pug = require('pug'),
	path = require('path');

//body parser set up
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// mongoose connection set up
mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://Admin:AdminAccess@onlinedata-xzwiw.mongodb.net/test?retryWrites=true', { useNewUrlParser: true });

//Pug set up
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'api/views'));

//home set up
app.get('/', function (req, res) {
	res.render('Home', { title: 'Hey', message: 'Hello there!' })
})

//api routes Add
var routes = require('./api/routes/infoRoutes'); //importing route
routes(app); //register the route


// Error management
app.use(function(req, res) {
	res.status(404).send({url: req.originalUrl + ' not found'})
});

//Go
app.listen(port);

//validation log
console.log('RESTful API server started on: ' + port);