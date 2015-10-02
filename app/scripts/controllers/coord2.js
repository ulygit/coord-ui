'use strict';

angular.module('coordApp')
	.controller('CoordCtrl2', function($http, $scope, $location, config) {
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
	
		var coord = this;
		coord.config = config;
		coord.name = '';
		coord.contacts = [{}];
	
		coord.submitEvent = function() {
			var hasEmailOrPhone = function(contact) {
				return 'emailOrPhone' in contact && contact.emailOrPhone.trim().length !== 0;
			};
			var dataObj = {
				'name' : coord.name,
				'contacts' : coord.contacts.filter(hasEmailOrPhone).map($scope.classify)
			};
			$http.post(config.service.endpoint, dataObj)
				.then(function(response) {
					var id = response.headers('Location').split('/').pop();
					$location.path('event/' + id);
				});
		};
	
		coord.addElement = function() {
			coord.contacts.push({});
		};
	
	});
	
