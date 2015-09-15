'use strict';

describe('Controller: FooterCtrl', function () {

  // load the controller's module
  beforeEach(module('coordApp'));

  var FooterCtrl,
	    injectedPkgInfo;

  // Initialize the controller
  beforeEach(inject(function ($controller, $rootScope) {
		injectedPkgInfo = {
			app_version: ''
		};

    FooterCtrl = $controller('FooterCtrl', {
      $scope: $rootScope.$new(),
      // place here mocked dependencies
			pkginfo: injectedPkgInfo,
    });
  }));

  it('should store its injected package info', function () {
		injectedPkgInfo.app_version = '2.0.0';
		expect(FooterCtrl.pkginfo).toBeDefined();
		expect(FooterCtrl.pkginfo.app_version).toBe(injectedPkgInfo.app_version);
  });

});
