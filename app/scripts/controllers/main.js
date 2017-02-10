'use strict';

function MainCtrl ($scope, dataService) {
  $scope.prop = 'time';
  $scope.search = $scope.query;
  $scope.form = true;
  $scope.reverse = true;

  $scope.sortBy = function(prop) {
    $scope.prop = prop;
    $scope.search = '';
  }

  $scope.getAllCalls = function() {
    dataService.getCalls(function(response) {
      var radioInput = document.getElementsByName("status");
      var calls = response.data.calls;
      // refresh calls
      $scope.calls = calls;
      $scope.search = '';
      // uncheck current status selection
      for(var i=0; i < radioInput.length; i++) {
        radioInput[i].checked = false;
      }
    });
  };

  $scope.getAllCalls();

  $scope.getCompleteCalls = function() {
    dataService.getCompleteCalls(function(response) {
      var calls = response.data.calls;
      $scope.calls = calls;
    });
  };

  $scope.getActiveCalls = function() {
    dataService.getActiveCalls(function(response) {
      var calls = response.data.calls;
      $scope.calls = calls;
    });
  };
   
  $scope.addCall = function(call) {
    $scope.call.time = new Date();
    $scope.calls.unshift({businessName: call.businessName,
              					  contactName: call.contactName,
                          tech: call.tech,
              					  phone: call.phone,
              					  description: call.description,
                          time: call.time,
                      	  completed: false});
    
    dataService.saveCalls($scope.calls);

    $scope.call = {businessName: "",
                   contactName: "",
                   tech: "",
                   phone: "",
                   description: "",
                   completed: ""};
                   
    $scope.getAllCalls()
  }; 
};


module.exports = MainCtrl;
