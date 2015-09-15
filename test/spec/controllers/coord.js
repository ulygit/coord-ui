'use strict';

describe('Controller: CoordCtrl', function () {

  // load the controller's module
  beforeEach(module('coordApp'));

  var CoordCtrl,
		injectedConfig;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
		injectedConfig = {
			service: {
				endpoint: ''
			}
		};
    CoordCtrl = $controller('CoordCtrl', {
      $scope: $rootScope.$new(),
      // place here mocked dependencies
			config: injectedConfig
    });
  }));

  it('should store its injected configuration', function () {
		injectedConfig.service.endpoint = 'http://service.endpoint';
		expect(CoordCtrl.config).toBeDefined();
		expect(CoordCtrl.config.service.endpoint).toBe(injectedConfig.service.endpoint);
  });
});
