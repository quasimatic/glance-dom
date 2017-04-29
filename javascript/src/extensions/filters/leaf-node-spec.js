import dom from '../../../test/dom';
import leafNodeTarget from './leaf-node';
let filter = leafNodeTarget.options['leaf-node'].filter;

describe('Filter: Target is leaf node', () => {
	it('should filter out non leaf nodes', () => {
		dom.render(
			<div>
				<div>
					<div id="target">item</div>
				</div>
				<div id='item-2' className="item">
					<div>something else</div>
				</div>
			</div>
		);

		filter({elements: dom.get('target', 'item-2')}).should.deep.equal([dom.get('target')]);
	});

	it('should return no elements if all are containers', () => {
		dom.render(
			<div>
				<div id="subject-1">
					<div>something else</div>
				</div>
				<div id='subject-2'>
					<div>text</div>
				</div>
			</div>
		);

		filter({elements: dom.getArray('subject-1', 'subject-2')}).should.deep.equal([]);
	});
});