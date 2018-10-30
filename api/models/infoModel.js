'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var InfoSchema = new Schema({
  name: {
    type: String,
    required: 'Kindly enter the name of the intel',
    unique: true
  }
});

module.exports = mongoose.model('Info', InfoSchema);