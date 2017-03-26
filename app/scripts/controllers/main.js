'use strict';

function MainCtrl ($scope, dataService) {
  $scope.prop = 'time';
  $scope.form = true;
  $scope.reverse = true;

  $scope.getAllCalls = function() {
    dataService.getCalls(function(response) {
      var calls = response.data.calls;
      // refresh calls
      $scope.calls = calls;
      $scope.search = '';
    });
  };

  $scope.getAllCalls();
   
  $scope.addCall = function(call) {
    $scope.call.time = new Date();
    $scope.calls.unshift({
      businessName: call.businessName,
  	  contactName: call.contactName,
      tech: call.tech,
  	  phone: call.phone,
  	  description: call.description,
      time: call.time,
  	  completed: false
    });
    
    dataService.saveCalls($scope.calls);

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
