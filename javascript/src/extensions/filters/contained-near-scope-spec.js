import dom from '../../../test/dom';
import shortestPath from './contained-near-scope';
let filter = shortestPath.options['contained-near-scope'].filter;

describe('Shortest scope and container path', () => {
	it('should get all children', () => {
		dom.render(
			<div id="scope-1">
				<div id="subject-1"/>
				<div>
					<div>
						<div id="subject-2"/>
					</div>
				</div>
			</div>
		);

		return filter({
			elements: dom.getArray('subject-1', 'subject-2'),
			scopeElements: dom.getArray('scope-1')
		}).should.deep.equal(dom.getArray('subject-1', 'subject-2'));
	});

	it('should get child items of scope and not siblings', () => {
		dom.render(
			<div>
				<div id="scope">
					<div>
						<div>
							<div id="subject"/>
						</div>
					</div>
				</div>
				<div id="rejected-subject"/>
			</div>
		);

		return filter({
			elements: dom.getArray('subject', 'rejected-subject'),
			scopeElements: dom.getArray('scope')
		}).should.deep.equal(dom.getArray('subject'));
	});

	it('should constrain to scope closest to container', () => {
		dom.render(
			<div>
				<div>
					<div id='scope'/>
					<div id='subject'/>
				</div>

				<div id='rejected-subject'/>
			</div>);

		return filter({
			elements: dom.getArray('subject', 'rejected-subject'),
			scopeElements: dom.getArray('scope')
		}).should.deep.equal(dom.getArray('subject'));
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
});