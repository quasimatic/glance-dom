import Preprocessor from './preprocessor';
import defaultExtensions from '../extensions/default.js';
import defaultOptions from '../processor/default-options';
import Extension from '../extensions';

let extensions = new Extension(defaultExtensions);

describe('Preprocessor', () => {
	it('should support no options', () => {
		let preprocessor = new Preprocessor();
		preprocessor.extensions.extensions.length.should.equal(0);
		preprocessor.defaultOptions.length.should.equal(0);
	});

	it('should have no default extensions or options', () => {
		let preprocessor = new Preprocessor({});
		preprocessor.extensions.extensions.length.should.equal(0);
		preprocessor.defaultOptions.length.should.equal(0);
	});

	it('should support a beforeAll hook', () => {
		let preprocessor = new Preprocessor({
			extensions: new Extension([{
				beforeAll: () => {
				}
			}]),
			defaultOptions: []
		});

		let commands = preprocessor.create('scope');

		commands.should.deep.equal([
			{command: 'beforeall'},
			{command: 'containers'},
			{command: 'beforelocating', label: 'scope', options: []},
			{command: 'afterlocating', label: 'scope', options: []},
			{command: 'beforefiltering', label: 'scope', options: []},
			{command: 'afterfiltering', label: 'scope', options: []},
			{command: 'intersect'},
			{command: 'afterall'}]);
	});

	it('should support a afterAll hook', () => {
		let preprocessor = new Preprocessor({
			extensions: new Extension([{
				afterAll: () => {
				}
			}]),
			defaultOptions: []
		});

		let commands = preprocessor.create('scope');

		commands.should.deep.equal([
			{command: 'beforeall'},
			{command: 'containers'},
			{command: 'beforelocating', label: 'scope', options: []},
			{command: 'afterlocating', label: 'scope', options: []},
			{command: 'beforefiltering', label: 'scope', options: []},
			{command: 'afterfiltering', label: 'scope', options: []},
			{command: 'intersect'},
			{command: 'afterall'}]);
	});

	it('should queue up for subject', () => {
		let preprocessor = new Preprocessor({extensions, defaultOptions});
		let commands = preprocessor.create('subject');

		commands.should.deep.equal([
			{command: 'beforeall'},
			{command: 'containers'},
			{command: 'beforelocating', label: 'subject', options: []},
			{command: 'locate', option: 'custom-label', label: 'subject'},
			{command: 'locate', option: 'contains-text', label: 'subject'},
			{command: 'locate', option: 'value', label: 'subject'},
			{
				command: 'locate',
				option: 'attribute-placeholder',
				label: 'subject'
			},
			{command: 'locate', option: 'attribute-name', label: 'subject'},
			{command: 'locate', option: 'attribute-id', label: 'subject'},
			{command: 'locate', option: 'class', label: 'subject'},
			{command: 'locate', option: 'attribute-alt', label: 'subject'},
			{command: 'locate', option: 'attribute-type', label: 'subject'},
			{command: 'locate', option: 'node-type', label: 'subject'},
			{command: 'afterlocating', label: 'subject', options: []},
			{command: 'beforefiltering', label: 'subject', options: []},
			{command: 'filter', option: 'visible', label: 'subject'},
			{command: 'filter', option: 'input-after', label: 'subject'},
			{
				command: 'filter',
				option: 'contained-near-scope',
				label: 'subject'
			},
			{command: 'afterfiltering', label: 'subject', options: []},
			{command: 'intersect'},
			{command: 'afterall'}]);
	});

	it('should queue up for scope and subject', () => {
		let preprocessor = new Preprocessor({extensions, defaultOptions});
		let commands = preprocessor.create('scope > subject');

		commands.should.deep.equal([
			{command: 'beforeall'},
			{command: 'containers'},
			{command: 'beforelocating', label: 'scope', options: []},
			{command: 'locate', option: 'custom-label', label: 'scope'},
			{command: 'locate', option: 'contains-text', label: 'scope'},
			{command: 'locate', option: 'value', label: 'scope'},
			{
				command: 'locate',
				option: 'attribute-placeholder',
				label: 'scope'
			},
			{command: 'locate', option: 'attribute-name', label: 'scope'},
			{command: 'locate', option: 'attribute-id', label: 'scope'},
			{command: 'locate', option: 'class', label: 'scope'},
			{command: 'locate', option: 'attribute-alt', label: 'scope'},
			{command: 'locate', option: 'attribute-type', label: 'scope'},
			{command: 'locate', option: 'node-type', label: 'scope'},
			{command: 'afterlocating', label: 'scope', options: []},
			{command: 'beforefiltering', label: 'scope', options: []},
			{command: 'filter', option: 'visible', label: 'scope'},
			{command: 'filter', option: 'input-after', label: 'scope'},
			{
				command: 'filter',
				option: 'contained-near-scope',
				label: 'scope'
			},
			{command: 'afterfiltering', label: 'scope', options: []},
			{command: 'intersect'},
			{command: 'containers'},
			{command: 'beforelocating', label: 'subject', options: []},
			{command: 'locate', option: 'custom-label', label: 'subject'},
			{command: 'locate', option: 'contains-text', label: 'subject'},
			{command: 'locate', option: 'value', label: 'subject'},
			{
				command: 'locate',
				option: 'attribute-placeholder',
				label: 'subject'
			},
			{command: 'locate', option: 'attribute-name', label: 'subject'},
			{command: 'locate', option: 'attribute-id', label: 'subject'},
			{command: 'locate', option: 'class', label: 'subject'},
			{command: 'locate', option: 'attribute-alt', label: 'subject'},
			{command: 'locate', option: 'attribute-type', label: 'subject'},
			{command: 'locate', option: 'node-type', label: 'subject'},
			{command: 'afterlocating', label: 'subject', options: []},
			{command: 'beforefiltering', label: 'subject', options: []},
			{command: 'filter', option: 'visible', label: 'subject'},
			{command: 'filter', option: 'input-after', label: 'subject'},
			{
				command: 'filter',
				option: 'contained-near-scope',
				label: 'subject'
			},
			{command: 'afterfiltering', label: 'subject', options: []},
			{command: 'intersect'},
			{command: 'afterall'}]);
	});

	it('should queue up for intersects', () => {
		let preprocessor = new Preprocessor({extensions, defaultOptions});
		let commands = preprocessor.create('subject ^ intersect');

		commands.should.deep.equal([
			{command: 'beforeall'},
			{command: 'containers'},
			{command: 'beforelocating', label: 'subject', options: []},
			{command: 'locate', option: 'custom-label', label: 'subject'},
			{command: 'locate', option: 'contains-text', label: 'subject'},
			{command: 'locate', option: 'value', label: 'subject'},
			{
				command: 'locate',
				option: 'attribute-placeholder',
				label: 'subject'
			},
			{command: 'locate', option: 'attribute-name', label: 'subject'},
			{command: 'locate', option: 'attribute-id', label: 'subject'},
			{command: 'locate', option: 'class', label: 'subject'},
			{command: 'locate', option: 'attribute-alt', label: 'subject'},
			{command: 'locate', option: 'attribute-type', label: 'subject'},
			{command: 'locate', option: 'node-type', label: 'subject'},
			{command: 'afterlocating', label: 'subject', options: []},
			{command: 'beforefiltering', label: 'subject', options: []},
			{command: 'filter', option: 'visible', label: 'subject'},
			{command: 'filter', option: 'input-after', label: 'subject'},
			{
				command: 'filter',
				option: 'contained-near-scope',
				label: 'subject'
			},
			{command: 'afterfiltering', label: 'subject', options: []},
			{command: 'intersect'},
			{command: 'beforelocating', label: 'intersect', options: []},
			{command: 'locate', option: 'custom-label', label: 'intersect'},
			{
				command: 'locate',
				option: 'contains-text',
				label: 'intersect'
			},
			{command: 'locate', option: 'value', label: 'intersect'},
			{
				command: 'locate',
				option: 'attribute-placeholder',
				label: 'intersect'
			},
			{
				command: 'locate',
				option: 'attribute-name',
				label: 'intersect'
			},
			{command: 'locate', option: 'attribute-id', label: 'intersect'},
			{command: 'locate', option: 'class', label: 'intersect'},
			{
				command: 'locate',
				option: 'attribute-alt',
				label: 'intersect'
			},
			{
				command: 'locate',
				option: 'attribute-type',
				label: 'intersect'
			},
			{command: 'locate', option: 'node-type', label: 'intersect'},
			{command: 'afterlocating', label: 'intersect', options: []},
			{command: 'beforefiltering', label: 'intersect', options: []},
			{command: 'filter', option: 'visible', label: 'intersect'},
			{command: 'filter', option: 'input-after', label: 'intersect'},
			{
				command: 'filter',
				option: 'contained-near-scope',
				label: 'intersect'
			},
			{command: 'afterfiltering', label: 'intersect', options: []},
			{command: 'intersect'},
			{command: 'afterall'}]);
	});
});