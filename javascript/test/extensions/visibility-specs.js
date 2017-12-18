import glanceDOM from '../../src/glance-dom-browser';
import dom from '../dom';

describe('Extensions: Visibility Filters', () => {
	beforeEach(() => dom.render(<div>
		<div id='visible'>item</div>
		<div id='hidden' style={{display: 'none'}}>item</div>
	</div>));

	it('should locate both visible and hidden', () => {
		return glanceDOM('item #hidden #visible').should.deep.equal(dom.get('visible', 'hidden'));
	});

	it('should locate visible by default', () => {
		return glanceDOM('item').should.deep.equal(dom.get('visible'));
	});

	it('should locate hidden only', () => {
		return glanceDOM('item#hidden').should.deep.equal(dom.get('hidden'));
	});
});