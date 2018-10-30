'use strict';


var mongoose = require('mongoose'),
  Info = mongoose.model('Info');
  

exports.list = function(req, res) {
  Info.find({}, function(err, info) {
    if (err)
      res.send(err);
    res.json(info);
  });
};


exports.create = function(req, res) {
  var new_info = new Info(req.body);
  new_info.save(function(err, info) {
    if (err)
      res.send(err);
    res.json(info);
  });
};


exports.read = function(req, res) {
  Info.findById(req.params.infoId, function(err, info) {
    if (err)
      res.send(err);
    res.json(info);
  });
};


exports.update = function(req, res) {
  Info.findOneAndUpdate({_id: req.params.infoId}, req.body, {new: true}, function(err, info) {
    if (err)
      res.send(err);
    res.json(info);
  });
};


exports.delete = function(req, res) {
  Info.remove({
    _id: req.params.infoId
  }, function(err, info) {
    if (err)
      res.send(err);
    res.json({ message: 'Info successfully deleted' });
  });
};







