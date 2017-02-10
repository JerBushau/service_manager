'use strict';

function CallDirective () {
  return {
    templateUrl: 'templates/call.html',
    replace: true,
    controller: 'callCtrl'
  }
 }

module.exports = CallDirective;
