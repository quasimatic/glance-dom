import dom from './dom';
import glanceDOM from '../src/glance';

describe('Scope', () => {
	it('should narrow down to scope', () => {
		dom.render(<div>
			<div>
				<div>scope</div>
				<div id="subject">subject</div>
			</div>

			<div>subject</div>
		</div>);

		glanceDOM('scope > subject').should.deep.equal(dom.get('subject'));
	});

	it('should limit container', () => {
		dom.render(<div>
			<div>
				<div>scope-1</div>
				<div>scope-2</div>
				<div id="subject">subject</div>
			</div>
			<div>
				<div>scope-2</div>
				<div>subject</div>
			</div>
		</div>);

		glanceDOM('scope-1 > scope-2 > subject').should.deep.equal(dom.get('subject'));
	});

	it('should not find any items if no scopes are found', () => {
		dom.render(<div>
			<div>subject</div>
		</div>);

		glanceDOM('scope > subject').should.deep.equal([]);
	});
});