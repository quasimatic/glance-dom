import dom from '../../../test/dom';
import {single, many} from './amount';

describe('Filter: single', () => {
	let filter = single.options.single.filter;

	beforeEach(function() {
		dom.render(<div>
			<div id="target-1">item</div>
			<div id="target-2">item</div>
			<div id="target-3">item</div>
		</div>);
	});

	it('should return a single item', () => {
		filter({
			elements: [dom.get('target-1')],
			option: 'single'
		}).should.deep.equal(dom.get('target-1'));
	});

	it('should throw if more than one item found', () => {
		(() => filter({
			elements: dom.get('target-1', 'target-2', 'target-3'),
			option: "single"
		})).should.throw('More than one element found');
	});

	it('should throw if no items found', () => {
		(() => filter({
			elements: [],
			option: "single"
		})).should.throw('No element found');
	});
});

describe('Filter: many', () => {
	let filter = many.options.many.filter;

	beforeEach(function() {
		dom.render(<div>
			<div id="target-1">item</div>
			<div id="target-2">item</div>
			<div id="target-3">item</div>
		</div>);
	});

	it('should return all items', () => {
		filter({
			elements: dom.get('target-1', 'target-2', 'target-3'),
			option: "many"
		}).should.deep.equal(dom.get('target-1', 'target-2', 'target-3'));
	});

	it('should return an array for a single item', () => {
		filter({
			elements: [dom.get('target-1')],
			option: 'many'
		}).should.deep.equal([dom.get('target-1')]);
	});
});
