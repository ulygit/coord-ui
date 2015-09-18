'use strict';

/**
 * @ngdoc function
 * @name coordApp.controller:EventCtrl
 * @description
 * # EventCtrl
 * Controller of the coordApp
 */
angular.module('coordApp')
	.controller("EventCtrl", function ($resource, $routeParams, config) {
		this.config = config;

		var Evt = $resource(this.config.service.endpoint + '/:id');
		this.evt = Evt.get({id: $routeParams.id});
  });
