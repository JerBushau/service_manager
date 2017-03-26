'use strict';

const express = require('express');
const Call = require('../models/call');
const router = express.Router();

// GET all
router.get('/calls', function(req, res) {
  Call.find({}, function(err, calls) {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    res.json({ calls: calls });
  });
});

// POST
router.post('/calls', function(req, res) {
  var call = req.body;
  Call.create(call, function(err, call) {
    if (err) {
      return res.status(500).json({ err: err.message });
    }
    res.json({ 'call': call, message: 'Call Created' });
  });
});

// PUT
router.put('/calls/:id', function(req, res) {
  var id = req.params.id;
  var call = req.body;
  if (call && call._id !== id) {
    return res.status(500).json({ err: "Ids don't match!" });
  }
  Call.findByIdAndUpdate(id, call, {new: true}, function(err, call) {
    if (err) {
      return res.status(500).json({ err: err.message });
    }
    res.json({ 'call': call, message: 'Call Updated' });
  });
});

// DELETE
router.delete('/calls/:id', function(req, res) {
  var id = req.params.id;
  Call.findByIdAndRemove(id, function(err, result) {
    if (err) {
      return res.status(500).json({ err: err.message });
    }
    res.json({ message: 'Call Deleted' });
  });
});

module.exports = router;
