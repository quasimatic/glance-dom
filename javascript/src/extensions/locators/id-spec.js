import dom from '../../../test/dom';
import extension from './id';

describe('Locator: ID', () => {
	let findById = extension.options['id'].locate;

	it('should find by id', () => {
		dom.render(<div id="subject"/>);

		findById({
			label: 'subject'
		}).should.deep.equal(dom.getArray('subject'));
	});

	it('should not find by class name', () => {
		dom.render(<div>subject</div>);

		findById({label: 'missing-id'}).should.deep.equal([]);
	});
});