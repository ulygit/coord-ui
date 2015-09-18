'use strict';

/**
 * @ngdoc function
 * @name coordApp.controller:FooterCtrl
 * @description
 * # FooterCtrl
 * Controller of the coordApp
 */
angular.module('coordApp')
	.controller("FooterCtrl", function (pkginfo) {
		this.pkginfo = pkginfo;
  });
