import dom from '../../../test/dom';
import closest from './closest';
let filter = closest.options['closest'].filter;

describe('Proximity: closest', () => {
	beforeEach(() => document.body.innerHTML = '');

	it('should get closest one', () => {
		dom.render(
			<div>
				<div id='scope'
					 style={{position: 'absolute', left: '0px', top: '0px', width: '100px', height: '100px'}}/>
				<div id='subject-1'
					 style={{position: 'absolute', left: '250px', top: '250px', width: '50px', height: '50px'}}/>
				<div id='subject-2'
					 style={{position: 'absolute', left: '150px', top: '150px', width: '50px', height: '50px'}}/>
			</div>
		);

		return filter({
			elements: dom.getArray('subject-1', 'subject-2'),
			scopeElements: dom.getArray('scope')
		}).should.deep.equal(dom.getArray('subject-2'));
	});

	it('should exclude itself', () => {
		dom.render(
			<div>
				<div id='scope'/>
				<div id='subject'/>
			</div>
		);

		return filter({
			elements: dom.getArray('scope', 'subject'),
			scopeElements: dom.getArray('scope')
		}).should.deep.equal(dom.getArray('subject'));
	});

	it('should get closest if subject is on top left of scope', () => {
		dom.render(
			<div>
				<div id='scope'
					 style={{position: 'absolute', left: '200px', top: '200px', width: '100px', height: '100px'}}/>
				<div id='subject-1'
					 style={{position: 'absolute', left: '450px', top: '450px', width: '50px', height: '50px'}}/>
				<div id='subject-2'
					 style={{position: 'absolute', left: '100px', top: '100px', width: '50px', height: '50px'}}/>
			</div>
		);

		return filter({
			elements: dom.getArray('subject-1', 'subject-2'),
			scopeElements: dom.getArray('scope')
		}).should.deep.equal(dom.getArray('subject-2'));
	});

	it('should get the subject inside a scope', () => {
		dom.render(
			<div>
				<div id='scope'
					 style={{position: 'absolute', left: '200px', top: '200px', width: '100px', height: '100px'}}/>
				<div id='subject-1'
					 style={{position: 'absolute', left: '450px', top: '450px', width: '50px', height: '50px'}}/>
				<div id='subject-2'
					 style={{position: 'absolute', left: '220px', top: '220px', width: '50px', height: '50px'}}/>
			</div>
		);

		return filter({
			elements: dom.getArray('subject-1', 'subject-2'),
			scopeElements: dom.getArray('scope')
		}).should.deep.equal(dom.getArray('subject-2'));
	});

	it('should get the subject with a scope inside', () => {
		dom.render(
			<div>
				<div id='scope'
					 style={{position: 'absolute', left: '220px', top: '220px', width: '50px', height: '50px'}}/>
				<div id='subject-1'
					 style={{position: 'absolute', left: '450px', top: '450px', width: '50px', height: '50px'}}/>
				<div id='subject-2'
					 style={{position: 'absolute', left: '200px', top: '200px', width: '100px', height: '100px'}}/>
			</div>
		);

		return filter({
			elements: dom.getArray('subject-1', 'subject-2'),
			scopeElements: dom.getArray('scope')
		}).should.deep.equal(dom.getArray('subject-2'));
	});
});