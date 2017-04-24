import glanceDOM from './glance-dom-browser';
import log from './utils/log';

describe('Glance Selector', () => {
	afterEach(() => glanceDOM.reset());

	it('should set log level', () => {
		var logSpy = sinon.spy(log, 'setLogLevel');
		glanceDOM.setLogLevel('info');
		logSpy.calledWith('info').should.equal(true);
		log.setLogLevel.restore();
	});

	it('should provide a way to add an extension', () => {
		var extensionsSpy = sinon.spy(glanceDOM.getConfig().extensions, 'add');
		glanceDOM.addExtension({labels: {'custom': 'label'}});
		extensionsSpy.calledWith({labels: {'custom': 'label'}}).should.equal(true);
	});

	it('should provide a way to add a label', () => {
		var extensionsSpy = sinon.spy(glanceDOM.getConfig().extensions, 'add');
		glanceDOM.addLabel('custom', 'label');
		extensionsSpy.calledWith({labels: {'custom': 'label'}}).should.equal(true);
	});

	it('should provide a way to add an option', () => {
		var extensionsSpy = sinon.spy(glanceDOM.getConfig().extensions, 'add');
		glanceDOM.addOption('custom', 'option');
		extensionsSpy.calledWith({options: {'custom': 'option'}}).should.equal(true);
	});

	it('should set default options', () => {
		glanceDOM.setDefaultOptions(['abc']);
		glanceDOM.getConfig().defaultOptions.should.deep.equal(['abc']);
	});

	it('should set custom execute', () => {
		let customExecute = sinon.spy();
		glanceDOM.setExecute(customExecute);
		glanceDOM('subject');
		customExecute.callCount.should.equal(1);
	});
});