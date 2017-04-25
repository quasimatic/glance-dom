import glanceDOM from './glance-dom-browser';
const version = require('../../package.json').version;

describe('Glance Selector', () => {
	afterEach(() => glanceDOM.reset());

	it('should set log level', () => {
		glanceDOM.setLogLevel('info');
		glanceDOM.getConfig().logLevel.should.deep.equal('info');
	});

	it('should provide a way to add an extension', () => {
		let extensionsSpy = sinon.spy(glanceDOM.getConfig().extensions, 'add');
		glanceDOM.addExtension({labels: {'custom': 'label'}});
		extensionsSpy.calledWith({labels: {'custom': 'label'}}).should.equal(true);
	});

	it('should provide a way to add a label', () => {
		let extensionsSpy = sinon.spy(glanceDOM.getConfig().extensions, 'add');
		glanceDOM.addLabel('custom', 'label');
		extensionsSpy.calledWith({labels: {'custom': 'label'}}).should.equal(true);
	});

	it('should provide a way to add an option', () => {
		let extensionsSpy = sinon.spy(glanceDOM.getConfig().extensions, 'add');
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

	it('should get version', () => {
		glanceDOM.version.should.equal(version);
	});
});