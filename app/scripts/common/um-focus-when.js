"use strict";

angular.module('coordApp')
	.directive('umFocusWhen', function umFocusWhen($timeout) {

		return function (scope, elem, attrs) {
			scope.$watch(attrs.umFocusWhen, function (newVal) {
				if (newVal) {
					$timeout(function () {
						elem[0].focus();
					}, 0, false);
				}
			});
		};
	});
