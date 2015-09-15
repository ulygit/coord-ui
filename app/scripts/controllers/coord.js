'use strict';

var coord = angular.module('coordApp');

coord.controller('CoordCtrl', function($http, $scope, config) {
	this.config = config;
	$scope.classify = function(contact) {
		contact.type = 'email';
		var modcontact = {};
		if (contact.type === 'email') {
			modcontact.email = contact.emailOrPhone;
		} else if (contact.type === 'phone') {
			modcontact.phone = contact.emailOrPhone;
		}
		return modcontact;
	};

	var event = this;
	event.name = '';
	event.contacts = [{}];

	event.submitEvent = function() {
		var hasEmailOrPhone = function(contact) {
			return 'emailOrPhone' in contact && contact.emailOrPhone.trim().length !== 0;
		};
		var dataObj = {
			'name' : event.name,
			'contacts' : event.contacts.filter(hasEmailOrPhone).map($scope.classify)
		};
		var res = $http.post(config.service.location, dataObj);
		console.log(res);
	};

	event.addElement = function() {
		event.contacts.push({});
	};

});

