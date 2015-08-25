'use strict';

describe('myApp.coord module', function() {

  describe('coord controller', function(){
    var scope, ctrl, $httpBackend;

    beforeEach(module('myApp.coord'));
    beforeEach(inject(function(_$httpBackend_, $rootScope, $controller) {
      $httpBackend = _$httpBackend_;
      scope = $rootScope.$new();
      ctrl = $controller('CoordController', {$scope: scope});
    }));

   afterEach(function() {
     $httpBackend.verifyNoOutstandingExpectation();
     $httpBackend.verifyNoOutstandingRequest();
   });

    it('should ....', function() {
      expect(ctrl).toBeDefined();
    });

    it('classify function should create objects according to type...', function() {
      var contact = { emailOrPhone: 'email@a.com', type: 'email' };
      ctrl.name = 'My event';
      ctrl.contacts.push(contact);
      $httpBackend.expectPOST('http://localhost:8080/events', {'name': ctrl.name, 'contacts': [ { email: contact.emailOrPhone }]}).respond(201, '', { Location: 'http://localhost:8080/events/1'});
      ctrl.submitEvent();
      $httpBackend.flush();
    });

  });
});
