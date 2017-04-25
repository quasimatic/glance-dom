import dom from './dom';
import glanceDOM from '../src/glance-dom-browser';

describe('Advanced', () => {
	beforeEach(() => {
		sinon.spy(console, 'log');
	});

	afterEach(() => {
		console.log.restore();
	});

	it('should return elements as a property', () => {
		dom.render(<div id='subject'/>);

		glanceDOM('subject', {advanced: true}).should.have.property('elements').and.deep.equal(dom.getArray('subject'));
	});

	it('should return logs', () => {
		dom.render(<div id='subject'/>);

		glanceDOM('subject', {
			logLevel: 'debug',
			advanced: true
		}).should.have.property('logs').and.deep.equal([].concat.apply([], console.log.args));
	});

	it('should clear log buffer for each call', () => {
		dom.render(<div id='subject'/>);

		glanceDOM('subject', {
			logLevel: 'debug',
			advanced: true
		});

		let expected = [].concat.apply([], console.log.args);

		glanceDOM('subject', {
			logLevel: 'debug',
			advanced: true
		}).should.have.property('logs').and.deep.equal(expected);
	});
});