const assert = require('chai').assert;
const app = require('../src/js/testSample');

//Results
sayHelloResult = app.sayHello();
addNumbersResult = app.addNumbers(5,5);

describe('App', function(){
	describe('sayHello()', function(){
		it('sayHello should return hello', function(){
			//let result = app.sayHello(); //made redundant by results block above! if uncommenting, sayHelloResult -> result
			assert.equal(sayHelloResult, 'hello');
		});

		it('sayHello should return type string', function(){
			//let result = app.sayHello();
			assert.typeOf(sayHelloResult, 'string');
		});
	});
	
	describe('addNumbers()', function(){
		it('addNumbers should be above 5', function(){
			//let result = app.addNumbers(5, 5);
			assert.isAbove(addNumbersResult, 5);
		});

		it('addNumbers should return type number', function(){
			//let result = app.addNumbers(5,5);
			assert.typeOf(addNumbersResult, 'number');
		});
	});
	
});