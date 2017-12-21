import dom from '../dom';
import glanceDOM from '../../src/glance-dom-browser';

describe('Amount: many', () => {
	it('should apply many by default', () => {
		dom.render(
			<div>
				<span id="target-1">One</span>
				<span id="target-2">Two</span>
				<span id="target-3">Three</span>
			</div>
		);
		return glanceDOM('span').should.deep.equal(dom.get('target-1', 'target-2', 'target-3'));
	});

	it('should apply many as an option', function() {
		dom.render(
			<div>
				<span id="target-1">One</span>
				<span id="target-2">Two</span>
				<span id="target-3">Three</span>
			</div>
		);

		return glanceDOM('span #many').should.deep.equal(dom.get('target-1', 'target-2', 'target-3'));
	});

	it('should apply many in a scope', function() {
		dom.render(
			<div>
				<div id='scope-1'>
					<span id="target-1">One</span>
				</div>
				<div id="scope-2">
					<span id="target-2">two</span>
				</div>
			</div>
		);

		return glanceDOM('div #many > span').should.deep.equal(dom.get('target-1', 'target-2'));
	});
});

describe('Amount: Single', () => {
	it('should return a single element', () => {
		dom.render(<div id="target"></div>);

		return glanceDOM('target #single').should.deep.equal(dom.get('target'));
	});

	it('should throw an error if more than one element found', function() {
		dom.render(<div>
			<div>item 1</div>
			<div>item 2</div>
		</div>);

		return (() => glanceDOM('item #single')).should.throw('More than one element found');
	});

	it('should work on scope and not apply to target', () => {
		dom.render(<div>
			<div id="scope">
				<div id='target-1'>item 1</div>d
				<div id='target-2'>item 2</div>
			</div>
		</div>);

		return glanceDOM('scope #single > item').should.deep.equal(dom.get('target-1', 'target-2'));
	});
});