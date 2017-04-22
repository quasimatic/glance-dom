import dom from '../dom';
import glanceDOM from '../../src/glance-dom-browser';

describe('Configuation: extensions', () => {
	afterEach(() => glanceDOM.reset());

	it('should add a custom extension', () => {
		dom.render(
			<div id='subject'>random</div>
		);
		glanceDOM.addExtension({
			labels: {custom: 'random'}
		});
		return glanceDOM('custom').should.deep.equal(dom.get('subject'));
	});

	it('should add a custom label', () => {
		dom.render(
			<div id='subject'>random</div>
		);
		glanceDOM.addLabel('custom', 'random');
		return glanceDOM('custom').should.deep.equal(dom.get('subject'));
	});

	it('should add a custom option', () => {
		dom.render(
			<div>
				<div id='subject'>subject</div>
				<div>subject</div>
			</div>
		);

		glanceDOM.addOption('first', ({elements}) => elements[0]);
		return glanceDOM('subject #first').should.deep.equal(dom.get('subject'));
	});
});