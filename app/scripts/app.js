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
    'ngAnimate',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/coord', {
        templateUrl: 'views/coord.html',
        controller: 'CoordCtrl',
        controllerAs: 'coord'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
