'use strict';

describe('Controller: FooterCtrl', function () {

  // load the controller's module
  beforeEach(module('coordApp'));

  var FooterCtrl,
	    injectedConfig;

  // Initialize the controller
  beforeEach(inject(function ($controller, $rootScope) {
		injectedConfig = {
			app_version: ''
		};
    FooterCtrl = $controller('FooterCtrl', {
      $scope: $rootScope.$new(),
      // place here mocked dependencies
			config: injectedConfig
    });
  }));

  it('should store its injected configuration', function () {
		injectedConfig.app_version = '2.0.0';
		expect(FooterCtrl.config).toBeDefined();
		expect(FooterCtrl.config.app_version).toBe(injectedConfig.app_version);
  });
});
