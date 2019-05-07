'use strict';  

exports.download = function(req, res) {
  res.download('./api/views/Home.pug')
};
