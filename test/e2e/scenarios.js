'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('App', function() {

	var TAB = protractor.Key.TAB;
	var ENTER = protractor.Key.ENTER;
	var ESC = protractor.Key.ESCAPE;
	
	var contactField = element(by.id('evtContact'));
	var contactList = element.all(by.repeater('contact in coord.evt.contacts'));

	var email = 'abe@isp.co';
	var email2 = 'rob@isp.co';

	beforeEach(function() {
		browser.get('/');
		browser.waitForAngular();
	});

	it('version should be on the main page', function() {
			expect(element(by.css('.app-version')).getText()).toMatch(/[0-9]+\.[0-9]+\.[0-9]+/);
		});

	it('should begin with title field focused', function() {
		expectActiveId('evtName');
	});

	it('should tab from title field to contact field', function() {
		activeElement().sendKeys(TAB);
		expectActiveId('evtContact');
	});

	it('should keep contact entry form focused for additional contact entries', function() {
		// initially we have no contacts listed
		expect(contactList.count()).toBe(0);

		activeElement().sendKeys(TAB);
		activeElement().sendKeys(email);
		activeElement().sendKeys(ENTER);
		activeElement().sendKeys(email2);
		activeElement().sendKeys(ENTER);

		// now we have three
		expect(contactList.count()).toBe(2);
	});
	
	it('should show an editable contact field on double-click', function() {
		contactField.sendKeys(email);
		contactField.sendKeys(ENTER);

		var contactLabel = contactList.all(by.css('label')).first();
		var contactEditField = contactList.all(by.css('input')).first();

		expect(hasClass(contactLabel, 'ng-hide')).toBe(false);
		expect(hasClass(contactEditField, 'ng-hide')).toBe(true);

		browser.actions().doubleClick(contactLabel).perform()

		expect(hasClass(contactLabel, 'ng-hide')).toBe(true);
		expect(hasClass(contactEditField, 'ng-hide')).toBe(false);
	});
	
	it('should allow editing of contacts after initial submission', function() {
		contactField.sendKeys(email);
		contactField.sendKeys(ENTER);

		var contactLabel = contactList.all(by.css('label')).first();
		expect(contactLabel.getText()).toBe(email);

		browser.actions().doubleClick(contactLabel).perform()
		var contactEditField = contactList.all(by.css('input')).first();
		contactEditField.clear();
		contactEditField.sendKeys(email2);
		contactEditField.sendKeys(ENTER);

		expect(contactLabel.getText()).toBe(email2);
	});
	
	it('should keep contact entry form focused for easy addition of multiple contacts', function() {
		// initially we have no contacts listed
		expect(contactList.count()).toBe(0);

		var emails = [ email, email2 ];
		for (var i = 0; i < emails.length; i++) {
			contactField.sendKeys(emails[i]);
			contactField.sendKeys(ENTER);
		}

		expect(contactList.count()).toBe(emails.length);
	});
	
	it('should allow deleting of contacts', function() {
		contactField.sendKeys(email);
		contactField.sendKeys(ENTER);

		expect(contactList.count()).toBe(1);

		var contactDeleteButton = contactList.all(by.css('button')).first();
		contactDeleteButton.click();

		expect(contactList.count()).toBe(0);
	});

	it('should undo changes if ESC is pressed while editing an existing item', function() {
		contactField.sendKeys(email);
		contactField.sendKeys(ENTER);

		var contactLabel = contactList.all(by.css('label')).first();
		browser.actions().doubleClick(contactLabel).perform()
		// delete the previously entere email, but then escape out of the field.
		var contactEditField = contactList.all(by.css('input')).first();
		contactEditField.clear();
		contactEditField.sendKeys(ESC);

		expect(contactLabel.getText()).toBe(email);
	});

	it('should disallow saving invalid email addresses', function() {
		var invalidEmails = [ 'no_at_symbol', 'no_host@', 'no_tld@localhost' ]

		for (var i = 0; i < invalidEmails.length; i++) {
			var invalidEmail = invalidEmails[i];
			contactField.clear();
			contactField.sendKeys(invalidEmail);
			contactField.sendKeys(ENTER);

			var contactLabels = contactList.all(by.css('label')).map(function(elem, index) {
				return elem.getText();
			});
			expect(contactLabels).not.toContain(invalidEmail);
		}
	});

	it('should disallow editing to an invalid email addresses', function() {
		contactField.sendKeys(email);
		contactField.sendKeys(ENTER);

		var contactLabel = contactList.all(by.css('label')).first();
		var contactEditField = contactList.all(by.css('input')).first();

		var invalidEmails = [ 'no_at_symbol', 'no_host@', 'no_tld@localhost' ]

		for (var i = 0; i < invalidEmails.length; i++) {
			var invalidEmail = invalidEmails[i];
			browser.actions().doubleClick(contactLabel).perform()
			contactEditField.clear();
			contactEditField.sendKeys(invalidEmail);
			contactEditField.sendKeys(ENTER);

			//expect(contactLabel.getText()).toBe(email);
			expect(contactField.isDisplayed()).toBeTruthy();
			expect(contactLabel.isDisplayed()).toBeFalsy();
		}
	});

	var sliceText = function (list, css) {
		var texts = [];

		var elements = list.all(by.css(css));
		for (var i = 0; i < list.count(); i++) {
			console.log('text=' + elements.get(i).getText());
			texts.push(elements.get(i).getText());
		}

		return texts;
	};

	var hasClass = function (element, cls) {
		return element.getAttribute('class').then(function (classes) {
			return classes.split(' ').indexOf(cls) !== -1;
		});
	};

	var expectActiveId = function(id) {
		expect(element(by.id(id)).getAttribute('id'))
			.toEqual(activeElement().getAttribute('id'));
	};
	
	var activeElement = function() {
		return browser.switchTo().activeElement();
	};

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

