import glanceDOM from '../../src/glance-dom-browser';
import dom from '../dom';

describe('Label: Input', () => {
	it('should find input types', () => {
		dom.render(<input id='subject'/>);
		glanceDOM('input').should.equal(dom.get('subject'));
	});

	it('should find textareas', () => {
		dom.render(<textarea id='subject'/>);
		glanceDOM('input').should.equal(dom.get('subject'));
	})
});