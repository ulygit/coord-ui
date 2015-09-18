'use strict';

angular.module('coordApp')
	.directive('umEnterKey', function () {

	  return function (scope, element, attrs) {
	    element.bind('keydown keypress', function (event) {
	      if (event.which === 13) {
	        scope.$apply(function () {
	          scope.$eval(attrs.umEnterKey || attrs.ngClick, { $event: event });
	        });
	        event.preventDefault();
	      }
	    });
	  };
	});
