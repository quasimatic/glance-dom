import glanceDOM from '../../src/glance-dom-browser';
import dom from '../dom';

describe('Subjects', () => {
	it('should find subject', () => {
		dom.render(<img id='subject' src='picture.jpg'/>);
		glanceDOM('picture').should.deep.equal(dom.get('subject'));
	});
});