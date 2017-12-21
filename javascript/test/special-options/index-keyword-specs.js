import glanceDOM from '../../src/glance-dom-browser';
import dom from '../dom';

describe('Option: first', () => {
	it('should find first item', () => {
		dom.render(<div>
			<span id='target'>one</span>
			<span>two</span>
			<span>three</span>
		</div>);

		glanceDOM('span #first').should.equal(dom.get('target'));
	});
});

describe('Option: last', () => {
	it('should find last item', () => {
		dom.render(<div>
			<span>one</span>
			<span>two</span>
			<span id='target'>three</span>
		</div>);

		glanceDOM('span #last').should.equal(dom.get('target'));
	});
});