'use strict';

function DataService ($http, $q) {

  this.getCalls = function(cb) {
    $http.get('/api/calls').then(cb);
  }

  this.getCompleteCalls = function(cb) {
    $http.get('/api/complete').then(cb)
  }

  this.getActiveCalls = function(cb) {
    $http.get('/api/active').then(cb)
  }

  this.deleteCall = function(call) {
    if (!call._id) {
      return $q.resolve();
    }
    return $http.delete('/api/calls/' + call._id).then(function() {
      console.log("I deleted the " + call.businessName + " call!");
    });
  }

  this.saveCalls = function(calls) {
    var queue = [];
    calls.forEach(function(call) {
      var request;
      if(!call._id) {
        request = $http.post('/api/calls', call);
      } else {
        request = $http.put('/api/calls/' + call._id, call).then(function(result) {
          call = result.data.call;
          return call;
        });
      }
      queue.push(request);
    });
    // $q is an angular service that helps you run functions asynchronously
    return $q.all(queue).then(function(results) {
      console.log("I saved " + calls.length + " call(s)!");
    });
  }; 
}

module.exports = DataService;
