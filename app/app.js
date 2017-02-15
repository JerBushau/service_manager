'use strict';

var angular = require('angular');

angular.module('serviceManager', ['angular-loading-bar'])
.config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
    cfpLoadingBarProvider.latencyThreshold = 1;
  }]);

require('./scripts/services');
require('./scripts/directives');
require('./scripts/controllers');
