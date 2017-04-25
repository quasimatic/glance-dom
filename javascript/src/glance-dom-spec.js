import glanceDOMBrowser from './glance-dom-browser';
import sinon from 'sinon';
import Parser from 'glance-parser';
import DefaultOptions from '../src/processor/default-options';
import dom from '../test/dom';

const version = require('../../package.json').version;

let glanceDOMInjector = require('inject-loader!./glance-dom');

let readFileSyncSpy = sinon.spy(() => {
	return 'window.glanceDOM = window.glanceDOMBrowser;';
});

let glanceDOM = glanceDOMInjector({
	'fs': {'readFileSync': readFileSyncSpy}
}).default;

describe('Glance DOM for node', () => {
	beforeEach(() => {
		window.localStorage.clear();
		window.glanceDOM = null;
		window.glanceDOMBrowser = glanceDOMBrowser;

		let executeSpy = sinon.spy((func, ...args) => {
			return func.apply(func, args);
		});
		glanceDOM.setExecute(executeSpy);
		readFileSyncSpy.reset();
	});

	it('should throw an error if an execute function is not provided', () => {
		glanceDOM.setExecute(null);
		expect(() => glanceDOM('subject')).to.throw('Please provide an execute function using setExecute');
	});

	it('should override execute', () => {
		let executeSpy = sinon.spy((func, ...args) => {
			return func.apply(func, args);
		});
		glanceDOM.setExecute(executeSpy);

		glanceDOM('subject');

		executeSpy.called.should.equal(true);
	});

	it('should support an execute function that returns a promise', () => {
		let executeSpy = sinon.spy((func, ...args) => {
			return new Promise(function(resolve) {
				return resolve(func.apply(func, args));
			});
		});
		glanceDOM.setExecute(executeSpy);

		return glanceDOM('subject').then(() => executeSpy.called);
	});

	it('should not load glanceDOM if already loaded', () => {
		glanceDOM('subject');
		glanceDOM('subject');

		readFileSyncSpy.callCount.should.equal(1);
	});

	it('should not load glanceDOM if already loaded when using promises', () => {
		let executeSpy = sinon.spy((func, ...args) => {
			return new Promise(function(resolve) {
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
		glanceDOM.setDefaultOptions(['abc', '123']);
		glanceDOM.getConfig().defaultOptions.should.deep.equal(['abc', '123']);
	});

	it('should load from local storage', () => {
		glanceDOM('subject');
		window.glanceDOM = null;
		glanceDOM('subject');

		readFileSyncSpy.callCount.should.equal(1);
	});

	it('should get version', () => {
		glanceDOM.version.should.equal(version);
	});

	it('should prevent changing version', () => {
		glanceDOM.version = '13333';
		glanceDOM.version.should.equal(version);
	});

	it('should add extensions', () => {
		dom.render(<div id='subject'/>);

		glanceDOM.addExtension({
			labels: {
				'custom': 'subject'
			}
		});

		glanceDOM('custom').should.deep.equal(dom.get('subject'));
	});

	it('should persist added extensions', () => {
		dom.render(<div id='subject'/>);

		glanceDOM.addExtension({
			labels: {
				'custom': 'subject'
			}
		});

		glanceDOM('custom');

		glanceDOMBrowser.reset();
		window.glanceDOM = null;

		glanceDOM('custom').should.deep.equal(dom.get('subject'))
	});

});
