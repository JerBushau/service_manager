'use strict';

function MainCtrl ($scope, dataService) {
  $scope.prop = 'time';
  $scope.form = true;
  $scope.reverse = true;

  // get calls from db
  $scope.getAllCalls = function() {
    dataService.getCalls(function(response) {
      var calls = response.data.calls;
      // refresh calls
      $scope.calls = calls;
      $scope.search = '';
    });
  };

  $scope.getAllCalls();

  // add new call
  $scope.addCall = function(call) {
    $scope.calls.unshift({
      businessName: call.businessName,
  	  contactName: call.contactName,
      tech: call.tech,
  	  phone: call.phone,
  	  description: call.description,
  	  completed: false
    });

    dataService.saveCalls($scope.calls);

    // reset form
    $scope.call = {
      businessName: "",
      contactName: "",
      tech: "",
      phone: "",
      description: "",
      completed: ""
    };

    $scope.getAllCalls()
  };
};


module.exports = MainCtrl;
