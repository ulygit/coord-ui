'use strict';

/**
 * @ngdoc overview
 * @name coordApp
 * @description
 * # coordApp
 *
 * Main module of the application.
 */
angular
  .module('coordApp', [
    'config',
    'ngMessages',
    'ngResource',
    'ngRoute'
  ])
  .config(function ($routeProvider, $locationProvider) {
		$locationProvider
			.html5Mode(true);

    $routeProvider
      .when('/', {
        templateUrl: 'views/coord.html',
        controller: 'CoordCtrl',
        controllerAs: 'coord'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
