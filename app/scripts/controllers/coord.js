'use strict';

angular.module('coordApp')
	.controller('CoordCtrl2', function($scope) {
		var ctrl = this;

		ctrl.evt = { 
			name: '',
			contacts: []
		};

		ctrl.addContact = function(contact) {
			if ( ! contact || ! contact.email) {
				return;
			}
			var c = angular.copy(contact);
			ctrl.evt.contacts.push(c);
			contact.email = '';
		};

		ctrl.removeContact = function(contact) {
			var idx = ctrl.evt.contacts.indexOf(contact);
  		if(idx !== -1) {
  		  ctrl.evt.contacts.splice(idx,1);
  		}
		};

		$scope.editContact = function(contact) {
			contact.originalContact = angular.copy(contact);
			contact.edit = true;
		};

		$scope.saveContact = function(contact) {
			delete contact.originalContact;
			delete contact.edit;
		};

		$scope.revertChanges = function(contact) {
			contact.email = contact.originalContact.email;
			delete contact.originalContact;
			delete contact.edit;
		};

	});
