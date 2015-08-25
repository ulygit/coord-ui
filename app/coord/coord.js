'use strict';

var coord = angular.module('myApp.coord', ['ngRoute']);

coord.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/coord', {
    templateUrl: 'coord/coord.html',
    controller: 'CoordController'
  });
}])

coord.controller('CoordController', [ '$http', '$scope', function($http, $scope) {
    $scope.classify = function(contact) {
        contact.type = 'email';
        var modcontact = {};
        if (contact.type === 'email') {
            modcontact.email = contact.emailOrPhone;
        } else if (contact.type === 'phone') {
            modcontact.phone = contact.emailOrPhone;
        }
        return modcontact;
    }

    var event = this;
    event.name = '';
    event.contacts = [{}];

    event.submitEvent = function() {
        var hasEmailOrPhone = function(contact) {
            return 'emailOrPhone' in contact && contact.emailOrPhone.trim().length !== 0
        }
        var dataObj = {
                    'name' : event.name,
                    'contacts' : event.contacts.filter(hasEmailOrPhone).map($scope.classify)
            };
        var res = $http.post('http://localhost:8080/events', dataObj);
    };

    event.addElement = function() {
        event.contacts.push({});
    }

  }]);
