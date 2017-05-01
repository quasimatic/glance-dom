import glanceDOM from '../../src/glance-dom-browser';
import dom from '../dom';

describe('Extensions: Level Filters', () => {
	beforeEach(() => dom.render(
		<div id='container' className='item'>
			<div id='leaf' className='item'/>
		</div>
	));

	it('should locate both lowest and highest level nodes', () => {
		return glanceDOM('item #highest-level-matches #lowest-level-matches').should.deep.equal(dom.get('container', 'leaf'));
	});

	it('should locate lowest level matches by default', () => {
		return glanceDOM('item').should.deep.equal(dom.get('leaf'));
	});

	it('should locate highest level matches only', () => {
		return glanceDOM('item #highest-level-matches').should.deep.equal(dom.get('container'));
	})
});