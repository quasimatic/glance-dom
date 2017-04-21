import glanceDOMBrowser from './glance-dom';
import sinon from 'sinon';
import Parser from 'glance-parser';
import DefaultOptions from '../src/processor/default-options';

let glanceDOMInjector = require('inject-loader!./glance-dom-node');
let readFileSyncSpy = sinon.spy((file) => {
	return () => window.glanceDOM = glanceDOMBrowser;
});

let glanceDOM = glanceDOMInjector({
	'fs': {'readFileSync': readFileSyncSpy}
}).default;

describe('Glance DOM for node', () => {
	beforeEach(() => {
		window.glanceDOM = null;
		glanceDOM.setExecute(null);
		readFileSyncSpy.reset();
	});

	it('should throw an error if an execute function is not provided', () => {
		expect(() => glanceDOM('subject')).to.throw('Please provide an execute function using setExecute');
	});

	it('should override execute', () => {
		let executeSpy = sinon.spy((func, ...args) => {
			return func.apply(func, args);
		});
		glanceDOM.setExecute(executeSpy);

		glanceDOM('subject');

		executeSpy.called.should.be.true;
	});

	it('should support an execute function that returns a promise', () => {
		let executeSpy = sinon.spy((func, ...args) => {
			return new Promise(function(resolve, reject) {
				return resolve(func.apply(func, args));
			});
		});
		glanceDOM.setExecute(executeSpy);

		return glanceDOM('subject').then(() => executeSpy.called);
	});

	it('should not load glanceDOM if already loaded', () => {
		let executeSpy = sinon.spy((func, ...args) => {
			return func.apply(func, args);
		});

		glanceDOM.setExecute(executeSpy);

		glanceDOM('subject');
		glanceDOM('subject');

		readFileSyncSpy.callCount.should.equal(1);
	});

	it('should not load glanceDOM if already loaded when using promises', () => {
		let executeSpy = sinon.spy((func, ...args) => {
			return new Promise(function(resolve, reject) {
				return resolve(func.apply(func, args));
			});
		});

		glanceDOM.setExecute(executeSpy);

		return glanceDOM('subject')
			.then(() => glanceDOM('subject'))
			.then(() => readFileSyncSpy.callCount.should.equal(1));
	});

	it('should provide the parser', () => {
		glanceDOM.parser.should.deep.equal(Parser);
	});

	it('should provide default options', () => {
		glanceDOM.defaultOptions.should.deep.equal(DefaultOptions);
	});

	it('should provide a way to set the default options', () => {
		let executeSpy = sinon.spy((func, ...args) => {
			return func.apply(func, args);
		});

		glanceDOM.setExecute(executeSpy);

		glanceDOM.setDefaultOptions(['abc', '123']);

		glanceDOM.getConfig().defaultOptions.should.deep.equal(['abc', '123']);
	});
})
;