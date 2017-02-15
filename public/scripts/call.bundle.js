webpackJsonp([0],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var angular = __webpack_require__(1);

	angular.module('serviceManager', ['angular-loading-bar'])
	.config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
	    cfpLoadingBarProvider.latencyThreshold = 1;
	  }]);

	__webpack_require__(3);
	__webpack_require__(5);
	__webpack_require__(7);


/***/ },
/* 1 */,
/* 2 */,
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var angular = __webpack_require__(1);

	angular.module('serviceManager').service('dataService', __webpack_require__(4));


/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';

	function DataService ($http, $q) {

	  this.getCalls = function(cb) {
	    $http.get('/api/calls').then(cb);
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


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var angular = __webpack_require__(1);

	angular.module('serviceManager').directive('call', __webpack_require__(6));


/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';

	function CallDirective () {
	  return {
	    templateUrl: 'templates/call.html',
	    replace: true,
	    controller: 'callCtrl'
	  }
	 }

	module.exports = CallDirective;


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var angular = __webpack_require__(1);

	angular.module('serviceManager').controller('mainCtrl', __webpack_require__(8));
	angular.module('serviceManager').controller('callCtrl', __webpack_require__(9));


/***/ },
/* 8 */
/***/ function(module, exports) {

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


/***/ },
/* 9 */
/***/ function(module, exports) {

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


/***/ }
]);