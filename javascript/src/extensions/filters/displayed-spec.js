import dom from '../../../test/dom';
import leafNodeTarget from './displayed';
let filter = leafNodeTarget.options['displayed'].filter;

describe('Filter: Displayed', () => {
	it('should filter out class matches', () => {
		dom.render(<div id='subject' className='subject'/>);

		filter({elements: dom.getArray('subject'), label: 'subject'}).should.deep.equal([]);
	});

	it('should filter out id matches', () => {
		dom.render(<div id='subject'/>);

		filter({elements: dom.getArray('subject'), label: 'subject'}).should.deep.equal([]);
	});

	it('should filter for contained text matches', () => {
		dom.render(<div id='subject'>subject</div>);

		filter({elements: dom.getArray('subject'), label: 'subject'}).should.deep.equal(dom.getArray('subject'));
	});

	it('should filter for dynamically set value', () => {
		dom.render(<input id="subject"/>);

		dom.get('subject').value = 'subject';

		filter({elements: dom.getArray('subject'), label: 'subject'}).should.deep.equal(dom.getArray('subject'));
	});

	it('should filter for images', () => {
		dom.render(<img id='subject'/>);

		filter({elements: dom.getArray('subject'), label: 'subject'}).should.deep.equal(dom.getArray('subject'));
	});
});

describe('Filter: Internal', () => {
	it('should filter for class matches', () => {
		dom.render(<div id='subject' className='subject'/>);

		filter({elements: dom.getArray('subject'), label: 'subject'}, true).should.deep.equal(dom.getArray('subject'));
	});

	it('should filter for id matches', () => {
		dom.render(<div id='subject'/>);

		filter({elements: dom.getArray('subject'), label: 'subject'}, true).should.deep.equal(dom.getArray('subject'));
	});

	it('should filter out contained text matches', () => {
		dom.render(<div id='subject'>subject</div>);

		filter({elements: dom.getArray('subject'), label: 'subject'}, true).should.deep.equal([]);
	});

	it('should filter out dynamically set value', () => {
		dom.render(<input id="subject"/>);

		dom.get('subject').value = 'subject';

		filter({elements: dom.getArray('subject'), label: 'subject'}, true).should.deep.equal([]);
	});

	it('should filter out images', () => {
		dom.render(<img id='subject'/>);

		filter({elements: dom.getArray('subject'), label: 'subject'}, true).should.deep.equal([]);
	});
});