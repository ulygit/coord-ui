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
        controller: 'CoordCtrl2',
        controllerAs: 'coord'
      })
      .when('/alt', {
        templateUrl: 'views/coord2.html',
        controller: 'CoordCtrl',
        controllerAs: 'coord2'
      })
      .when('/event/:id', {
        templateUrl: 'views/event.html',
        controller: 'EventCtrl',
        controllerAs: 'event'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
