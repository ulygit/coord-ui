'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('Coord App', function() {

	beforeEach(function() {
		browser.get('/');
	});

	it('Coord app should be on the main page', function() {
		expect(element(by.css('h2')).getText()).toEqual('Coord');
	});

	it('Coord app version should be on the main page', function() {
		expect(element(by.css('.app-version')).getText()).toEqual('0.0.1');
	});

	xit('should redirect index.html to index.html#/phones', function() {
		browser.get('app/index.html');
		browser.getLocationAbsUrl().then(function(url) {
			expect(url).toEqual('/phones');
		});
	});


	xdescribe('Phone list view', function() {

		beforeEach(function() {
			browser.get('app/index.html#/phones');
		});


		it('should filter the phone list as a user types into the search box', function() {

			var phoneList = element.all(by.repeater('phone in phones'));
			var query = element(by.model('query'));

			expect(phoneList.count()).toBe(20);

			query.sendKeys('nexus');
			expect(phoneList.count()).toBe(1);

			query.clear();
			query.sendKeys('motorola');
			expect(phoneList.count()).toBe(8);
		});


		it('should be possible to control phone order via the drop down select box', function() {

			var phoneNameColumn = element.all(by.repeater('phone in phones').column('phone.name'));
			var query = element(by.model('query'));

			function getNames() {
				return phoneNameColumn.map(function(elm) {
					return elm.getText();
				});
			}

			query.sendKeys('tablet'); //let's narrow the dataset to make the test assertions shorter

			expect(getNames()).toEqual([
				"Motorola XOOM\u2122 with Wi-Fi",
				"MOTOROLA XOOM\u2122"
			]);

			element(by.model('orderProp')).element(by.css('option[value="name"]')).click();

			expect(getNames()).toEqual([
				"MOTOROLA XOOM\u2122",
				"Motorola XOOM\u2122 with Wi-Fi"
			]);
		});


		it('should render phone specific links', function() {
			var query = element(by.model('query'));
			query.sendKeys('nexus');
			element.all(by.css('.phones li a')).first().click();
			browser.getLocationAbsUrl().then(function(url) {
				expect(url).toEqual('/phones/nexus-s');
			});
		});
	});


	xdescribe('Phone detail view', function() {

		beforeEach(function() {
			browser.get('app/index.html#/phones/nexus-s');
		});


		it('should display nexus-s page', function() {
			expect(element(by.binding('phone.name')).getText()).toBe('Nexus S');
		});

		it('should display four thumbnail images for Nexus S', function() {
			expect(element.all(by.repeater('img in phone.images')).count()).toBe(4);
		});
	});

});

