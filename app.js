//Instanciation
var express = require('express'),
	app = express(),

	port = process.env.PORT || 3000,
	bodyParser = require('body-parser'),

	limdu = require('limdu'),
	mongoose = require('mongoose'),
	Task = require('./api/models/infoModel'), //created model loading here

	pug = require('pug'),
	path = require('path');

//body parser set up
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// mongoose connection set up
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://Admin:adminAccess1@ds261136.mlab.com:61136/heroku_wmnk4067', { useNewUrlParser: true });

//ML preparation
var MyWinnow = limdu.classifiers.Winnow.bind(0, {retrain_count: 10});
var intentClassifier = new limdu.classifiers.multilabel.BinaryRelevance({
	binaryClassifierType: MyWinnow
});

intentClassifier.trainBatch([
  { input: {d:7, D:10, l:0}, output: "Exercie 1"},
  { input: {d:15, D:20, l:0}, output: "Exercie 2"},
  { input: {d:4, D:15, l:0}, output: "Exercie 3"},
  { input: {d:10, D:15, l:0}, output: "Exercie 4"},
  { input: {d:15, D:30, l:0}, output: "Exercie 5"},
  { input: {d:15, D:50, l:0}, output: "Exercie 6"},
  { input: {d:10, D:15, l:1}, output: "Exercie 7"},
  { input: {d:3, D:10, l:2}, output: "Exercie 8"},
  { input: {d:10, D:25, l:2}, output: "Exercie 9"}
]);

//Pug set up
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'api/views'));
app.use("/scripts", express.static(__dirname + "/api/views/scripts"));
app.use("/styles", express.static(__dirname + "/api/views/styles"));

//home set up
app.get('/', function (req, res) {
	res.render('Home', { title: 'Hey', message: 'Hello there!' })
})

//for testing purpose
app.post('/test',function (req, res) {
	console.log(req.body.d, req.body.D, req.body.l);

	res.send({text: "Sorry, I can't tell", exo: 0})
})

//api routes Add
var routes = require('./api/routes/infoRoutes'); //importing route
var routesBis = require('./api/routes/testRoutes'); //importing route
routes(app); //register the route
routesBis(app);


// Error management
app.use(function(req, res) {
	res.status(404).send({url: req.originalUrl + ' not found'})
});

//Go
app.listen(port);

//validation log
console.log('RESTful API server started on: ' + port);