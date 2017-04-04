import dom from '../../../test/dom';
import shortestPath from './shortest-path';
let filter = shortestPath.options['shortest-path'].filter;

describe('Shortest scope and container path', () => {
	it('should get all items if the sibilng offset distances are the same to the container', () => {
		dom.render(
			<div>
				<div>
					<div id="scope-1">scope</div>
					<div id="subject-1">item</div>
				</div>

				<div>
					<div id="scope-2">scope</div>
					<div>
						<div>
							<div id="subject-2">item</div>
						</div>
					</div>
				</div>
			</div>
		);

		return filter({
			elements: dom.get('subject-1', 'subject-2'),
			scopeElements: dom.get('scope-1', 'scope-2')
		}).should.deep.equal(dom.get('subject-1', 'subject-2'));
	});

	it('should get the items with the shorter sibling offset to the container', () => {
		dom.render(
			<div>
				<div>
					<div>
						<div id="scope-1">scope</div>
					</div>
					<div></div>
					<div>
						<div>
							<div id="item-1">item</div>
						</div>
					</div>
				</div>
				<div>
					<div id="scope-2">scope</div>
					<div id="subject">item</div>
				</div>
			</div>
		);

		return filter({
			elements: dom.get('item-1', 'subject'),
			scopeElements: dom.get('scope-1', 'scope-2')
		}).should.deep.equal([dom.get('subject')]);
	});

	it('should get multiple elements of the same shortest distant', () => {
		dom.render(
			<div>
				<div>
					<div id="scope-1">scope</div>
					<div id="subject-1">item A</div>
				</div>

				<div>
					<div id="scope-2">scope</div>
					<div id="subject-2">item A</div>
				</div>
			</div>
		);

		return filter({
			elements: dom.get('subject-1', 'subject-2'),
			scopeElements: dom.get('scope-1', 'scope-2')
		}).should.deep.equal(dom.get('subject-1', 'subject-2'));
	});

	it('should get all children', () => {
		dom.render(
			<div id="scope-1" className="item-class">
				<div id="subject-1">item</div>
				<div>
					<div>
						<div id="subject-2">item</div>
					</div>
				</div>
			</div>
		);

		return filter({
			elements: dom.get('subject-1', 'subject-2'),
			scopeElements: [dom.get('scope-1')]
		}).should.deep.equal(dom.get('subject-1', 'subject-2'));
	});

	it('should get child items and cousins if the cousin sibling offset starts from teh scope', () => {
		dom.render(
			<div>
				<div id="scope" className="item-class">
					<div>
						<div>
							<div id="subject">item</div>
						</div>
					</div>
				</div>
				<div id="rejected-subject">item</div>
			</div>
		);

		return filter({
			elements: dom.get('subject', 'rejected-subject'),
			scopeElements: dom.getArray('scope')
		}).should.deep.equal(dom.getArray('subject'));
	});

	it('should take the length from scope to container to subject', () => {
		dom.render(
			<div>
				<div>
					<div id='scope-1'/>
					<div>
						<div id='subject'/>
						<div>
							<div id='scope-2'/>
						</div>
					</div>
				</div>
				<div>
					<div/>
					<div/>
					<div>
						<div id='bad-subject'/>
					</div>
				</div>
			</div>
		);

		return filter({
			elements: dom.get('subject', 'bad-subject'),
			scopeElements: dom.get('scope-1', 'scope-2')
		}).should.deep.equal([dom.get('subject')]);
	});

	it('should contstrain to scope closest to container', () => {
		dom.render(
			<div>
				<div>
					<div id='scope'>scope</div>
					<div id='subject'>subject</div>
				</div>

				<div id='rejected-subject'>subject</div>
			</div>);

		return filter({
			elements: dom.get('subject', 'rejected-subject'),
			scopeElements: [dom.get('scope')]
		}).should.deep.equal([dom.get('subject')]);
	});

	it('should be limited to containers', () => {
		dom.render(
			<div>
				<div id='container'>
					<div id='scope'/>
					<div id='subject'/>
				</div>

				<div>
					<div id='rejected-subject'/>
				</div>
			</div>);

		return filter({
			elements: dom.getArray('subject', 'rejected-subject'),
			scopeElements: dom.getArray('scope'),
			containerElements: dom.getArray('container')
		}).should.deep.equal(dom.getArray('subject'));
	});
})
;