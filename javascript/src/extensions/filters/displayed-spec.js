import dom from '../../../test/dom';
import leafNodeTarget from './displayed';
let displayedFilter = leafNodeTarget.options['displayed'].filter;
let internalFilter = leafNodeTarget.options['internal'].filter;

describe('Filter: Displayed', () => {
	it('should filter out class matches', () => {
		dom.render(<div id='subject' className='subject'/>);

		displayedFilter({elements: dom.getArray('subject'), label: 'subject'}).should.deep.equal([]);
	});

	it('should filter out id matches', () => {
		dom.render(<div id='subject'/>);

		displayedFilter({elements: dom.getArray('subject'), label: 'subject'}).should.deep.equal([]);
	});

	it('should filter for contained text matches', () => {
		dom.render(<div id='subject'>subject</div>);

		displayedFilter({elements: dom.getArray('subject'), label: 'subject'}).should.deep.equal(dom.getArray('subject'));
	});

	it('should filter for dynamically set value', () => {
		dom.render(<input id="subject"/>);

		dom.get('subject').value = 'subject';

		displayedFilter({elements: dom.getArray('subject'), label: 'subject'}).should.deep.equal(dom.getArray('subject'));
	});

	it('should filter for images', () => {
		dom.render(<img id='subject'/>);

		displayedFilter({elements: dom.getArray('subject'), label: 'subject'}).should.deep.equal(dom.getArray('subject'));
	});
});

describe('Filter: Internal', () => {
	it('should filter for class matches', () => {
		dom.render(<div id='subject' className='subject'/>);

		internalFilter({elements: dom.getArray('subject'), label: 'subject'}, true).should.deep.equal(dom.getArray('subject'));
	});

	it('should filter for id matches', () => {
		dom.render(<div id='subject'/>);

		internalFilter({elements: dom.getArray('subject'), label: 'subject'}, true).should.deep.equal(dom.getArray('subject'));
	});

	it('should filter out contained text matches', () => {
		dom.render(<div id='subject'>subject</div>);

		internalFilter({elements: dom.getArray('subject'), label: 'subject'}, true).should.deep.equal([]);
	});

	it('should filter out dynamically set value', () => {
		dom.render(<input id="subject"/>);

		dom.get('subject').value = 'subject';

		internalFilter({elements: dom.getArray('subject'), label: 'subject'}, true).should.deep.equal([]);
	});

	it('should filter out images', () => {
		dom.render(<img id='subject'/>);

		internalFilter({elements: dom.getArray('subject'), label: 'subject'}, true).should.deep.equal([]);
	});
});