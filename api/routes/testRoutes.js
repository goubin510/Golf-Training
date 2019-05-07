'use strict';
module.exports = function(app) {
	var test = require('../controllers/testController');

  // test Routes
  app.route('/dl')
  	.get(test.download);
};