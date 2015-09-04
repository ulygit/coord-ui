'use strict';

describe('Controller: CoordCtrl', function () {

  // load the controller's module
  beforeEach(module('coordApp'));

  var CoordCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CoordCtrl = $controller('CoordCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    //expect(CoordCtrl.awesomeThings.length).toBe(3);
  });
});
