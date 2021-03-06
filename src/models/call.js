'use strict';

var mongoose = require('mongoose');

var callSchema = new mongoose.Schema({
	businessName: String,
	contactName: String,
	tech: String,
	phone: String,
	description: String,
	note: String,
	time: { type: Date, default: Date.now },
	completed: Boolean,
	noted:Boolean
});

var model = mongoose.model('Call', callSchema);

module.exports = model;
