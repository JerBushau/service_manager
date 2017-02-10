'use strict';

function CallCtrl ($scope, dataService) {
  
  $scope.deleteCall = function(call, index) {
    dataService.deleteCall(call).then(function() {
      $scope.calls.splice(index, 1);
      dataService.getCalls(function(response){
        var calls = response.data.calls;
        $scope.calls =  calls.reverse();
      });
    });
  };
 
  $scope.saveCalls = function() {
    var filteredCalls = $scope.calls.filter(function(call) {
        return call
    })
    dataService.saveCalls(filteredCalls)
      .finally($scope.resetCallState());
  };

  $scope.resetCallState = function() {
      $scope.calls.forEach(function(call) {
        call.edited = false;
      });
  }

   $scope.saveCall = function(call) {
    var singleCall = [];

    call.edited = false;
    singleCall.push(call);
    dataService.saveCalls(singleCall);

  }

}

module.exports = CallCtrl;
