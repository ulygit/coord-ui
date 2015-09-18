'use strict';

angular.module('coordApp')
	.directive('umEscKey', function () {

	  return function (scope, element, attrs) {
	    element.bind('keydown keypress', function (event) {
	      if (event.which === 27) {
	        scope.$apply(function () {
	          scope.$eval(attrs.umEscKey, { $event: event });
	        });
	        event.preventDefault();
	      }
	    });
	  };
	});
