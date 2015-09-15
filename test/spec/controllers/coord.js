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
				location: ''
			}
		};
    CoordCtrl = $controller('CoordCtrl', {
      $scope: $rootScope.$new(),
      // place here mocked dependencies
			config: injectedConfig
    });
  }));

  it('should store its injected configuration', function () {
		injectedConfig.service.location = 'http://service.location';
		expect(CoordCtrl.config).toBeDefined();
		expect(CoordCtrl.config.service.location).toBe(injectedConfig.service.location);
  });
});
