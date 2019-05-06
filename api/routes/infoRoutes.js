'use strict';
module.exports = function(app) {
  var info = require('../controllers/infoController');

  // info Routes
  app.route('/info')
    .get(info.list)
    .post(info.create);


  app.route('/info/:infoId')
    .get(info.read)
    .put(info.update)
    .delete(info.delete);
};





// Download request
// app.get('/dl', function (req, res) {
// 	res.download('./api/views/Home.pug ')
// })