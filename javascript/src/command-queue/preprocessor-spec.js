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
			{
				command: 'locate',
				option: 'custom-label',
				label: 'subject',
				targetIndex: 0,
				totalTargets: 1
			},
			{
				command: 'locate',
				option: 'contains-text',
				label: 'subject',
				targetIndex: 0,
				totalTargets: 1
			},
			{
				command: 'locate',
				option: 'value',
				label: 'subject',
				targetIndex: 0,
				totalTargets: 1
			},
			{
				command: 'locate',
				option: 'attribute-placeholder',
				label: 'subject',
				targetIndex: 0,
				totalTargets: 1
			},
			{
				command: 'locate',
				option: 'attribute-name',
				label: 'subject',
				targetIndex: 0,
				totalTargets: 1
			},
			{
				command: 'locate',
				option: 'attribute-id',
				label: 'subject',
				targetIndex: 0,
				totalTargets: 1
			},
			{
				command: 'locate',
				option: 'class',
				label: 'subject',
				targetIndex: 0,
				totalTargets: 1
			},
			{
				command: 'locate',
				option: 'attribute-alt',
				label: 'subject',
				targetIndex: 0,
				totalTargets: 1
			},
			{
				command: 'locate',
				option: 'attribute-type',
				label: 'subject',
				targetIndex: 0,
				totalTargets: 1
			},
			{
				command: 'locate',
				option: 'node-type',
				label: 'subject',
				targetIndex: 0,
				totalTargets: 1
			},
			{command: 'afterlocating', label: 'subject', options: []},
			{command: 'beforefiltering', label: 'subject', options: []},
			{
				command: 'filter',
				option: 'visible',
				label: 'subject',
				targetIndex: 0,
				totalTargets: 1
			},
			{
				command: 'filter',
				option: 'leaf-node-target',
				label: 'subject',
				targetIndex: 0,
				totalTargets: 1
			},
			{
				command: 'filter',
				option: 'input-after',
				label: 'subject',
				targetIndex: 0,
				totalTargets: 1
			},
			{
				command: 'filter',
				option: 'contained-near-scope',
				label: 'subject',
				targetIndex: 0,
				totalTargets: 1
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
			{
				command: 'locate',
				option: 'custom-label',
				label: 'scope',
				targetIndex: 0,
				totalTargets: 2
			},
			{
				command: 'locate',
				option: 'contains-text',
				label: 'scope',
				targetIndex: 0,
				totalTargets: 2
			},
			{
				command: 'locate',
				option: 'value',
				label: 'scope',
				targetIndex: 0,
				totalTargets: 2
			},
			{
				command: 'locate',
				option: 'attribute-placeholder',
				label: 'scope',
				targetIndex: 0,
				totalTargets: 2
			},
			{
				command: 'locate',
				option: 'attribute-name',
				label: 'scope',
				targetIndex: 0,
				totalTargets: 2
			},
			{
				command: 'locate',
				option: 'attribute-id',
				label: 'scope',
				targetIndex: 0,
				totalTargets: 2
			},
			{
				command: 'locate',
				option: 'class',
				label: 'scope',
				targetIndex: 0,
				totalTargets: 2
			},
			{
				command: 'locate',
				option: 'attribute-alt',
				label: 'scope',
				targetIndex: 0,
				totalTargets: 2
			},
			{
				command: 'locate',
				option: 'attribute-type',
				label: 'scope',
				targetIndex: 0,
				totalTargets: 2
			},
			{
				command: 'locate',
				option: 'node-type',
				label: 'scope',
				targetIndex: 0,
				totalTargets: 2
			},
			{command: 'afterlocating', label: 'scope', options: []},
			{command: 'beforefiltering', label: 'scope', options: []},
			{
				command: 'filter',
				option: 'visible',
				label: 'scope',
				targetIndex: 0,
				totalTargets: 2
			},
			{
				command: 'filter',
				option: 'leaf-node-target',
				label: 'scope',
				targetIndex: 0,
				totalTargets: 2
			},
			{
				command: 'filter',
				option: 'input-after',
				label: 'scope',
				targetIndex: 0,
				totalTargets: 2
			},
			{
				command: 'filter',
				option: 'contained-near-scope',
				label: 'scope',
				targetIndex: 0,
				totalTargets: 2
			},
			{command: 'afterfiltering', label: 'scope', options: []},
			{command: 'intersect'},
			{command: 'containers'},
			{command: 'beforelocating', label: 'subject', options: []},
			{
				command: 'locate',
				option: 'custom-label',
				label: 'subject',
				targetIndex: 1,
				totalTargets: 2
			},
			{
				command: 'locate',
				option: 'contains-text',
				label: 'subject',
				targetIndex: 1,
				totalTargets: 2
			},
			{
				command: 'locate',
				option: 'value',
				label: 'subject',
				targetIndex: 1,
				totalTargets: 2
			},
			{
				command: 'locate',
				option: 'attribute-placeholder',
				label: 'subject',
				targetIndex: 1,
				totalTargets: 2
			},
			{
				command: 'locate',
				option: 'attribute-name',
				label: 'subject',
				targetIndex: 1,
				totalTargets: 2
			},
			{
				command: 'locate',
				option: 'attribute-id',
				label: 'subject',
				targetIndex: 1,
				totalTargets: 2
			},
			{
				command: 'locate',
				option: 'class',
				label: 'subject',
				targetIndex: 1,
				totalTargets: 2
			},
			{
				command: 'locate',
				option: 'attribute-alt',
				label: 'subject',
				targetIndex: 1,
				totalTargets: 2
			},
			{
				command: 'locate',
				option: 'attribute-type',
				label: 'subject',
				targetIndex: 1,
				totalTargets: 2
			},
			{
				command: 'locate',
				option: 'node-type',
				label: 'subject',
				targetIndex: 1,
				totalTargets: 2
			},
			{command: 'afterlocating', label: 'subject', options: []},
			{command: 'beforefiltering', label: 'subject', options: []},
			{
				command: 'filter',
				option: 'visible',
				label: 'subject',
				targetIndex: 1,
				totalTargets: 2
			},
			{
				command: 'filter',
				option: 'leaf-node-target',
				label: 'subject',
				targetIndex: 1,
				totalTargets: 2
			},
			{
				command: 'filter',
				option: 'input-after',
				label: 'subject',
				targetIndex: 1,
				totalTargets: 2
			},
			{
				command: 'filter',
				option: 'contained-near-scope',
				label: 'subject',
				targetIndex: 1,
				totalTargets: 2
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
			{
				command: 'locate',
				option: 'custom-label',
				label: 'subject',
				targetIndex: 0,
				totalTargets: 2
			},
			{
				command: 'locate',
				option: 'contains-text',
				label: 'subject',
				targetIndex: 0,
				totalTargets: 2
			},
			{
				command: 'locate',
				option: 'value',
				label: 'subject',
				targetIndex: 0,
				totalTargets: 2
			},
			{
				command: 'locate',
				option: 'attribute-placeholder',
				label: 'subject',
				targetIndex: 0,
				totalTargets: 2
			},
			{
				command: 'locate',
				option: 'attribute-name',
				label: 'subject',
				targetIndex: 0,
				totalTargets: 2
			},
			{
				command: 'locate',
				option: 'attribute-id',
				label: 'subject',
				targetIndex: 0,
				totalTargets: 2
			},
			{
				command: 'locate',
				option: 'class',
				label: 'subject',
				targetIndex: 0,
				totalTargets: 2
			},
			{
				command: 'locate',
				option: 'attribute-alt',
				label: 'subject',
				targetIndex: 0,
				totalTargets: 2
			},
			{
				command: 'locate',
				option: 'attribute-type',
				label: 'subject',
				targetIndex: 0,
				totalTargets: 2
			},
			{
				command: 'locate',
				option: 'node-type',
				label: 'subject',
				targetIndex: 0,
				totalTargets: 2
			},
			{command: 'afterlocating', label: 'subject', options: []},
			{command: 'beforefiltering', label: 'subject', options: []},
			{
				command: 'filter',
				option: 'visible',
				label: 'subject',
				targetIndex: 0,
				totalTargets: 2
			},
			{
				command: 'filter',
				option: 'leaf-node-target',
				label: 'subject',
				targetIndex: 0,
				totalTargets: 2
			},
			{
				command: 'filter',
				option: 'input-after',
				label: 'subject',
				targetIndex: 0,
				totalTargets: 2
			},
			{
				command: 'filter',
				option: 'contained-near-scope',
				label: 'subject',
				targetIndex: 0,
				totalTargets: 2
			},
			{command: 'afterfiltering', label: 'subject', options: []},
			{command: 'intersect'},
			{command: 'beforelocating', label: 'intersect', options: []},
			{
				command: 'locate',
				option: 'custom-label',
				label: 'intersect',
				targetIndex: 1,
				totalTargets: 2
			},
			{
				command: 'locate',
				option: 'contains-text',
				label: 'intersect',
				targetIndex: 1,
				totalTargets: 2
			},
			{
				command: 'locate',
				option: 'value',
				label: 'intersect',
				targetIndex: 1,
				totalTargets: 2
			},
			{
				command: 'locate',
				option: 'attribute-placeholder',
				label: 'intersect',
				targetIndex: 1,
				totalTargets: 2
			},
			{
				command: 'locate',
				option: 'attribute-name',
				label: 'intersect',
				targetIndex: 1,
				totalTargets: 2
			},
			{
				command: 'locate',
				option: 'attribute-id',
				label: 'intersect',
				targetIndex: 1,
				totalTargets: 2
			},
			{
				command: 'locate',
				option: 'class',
				label: 'intersect',
				targetIndex: 1,
				totalTargets: 2
			},
			{
				command: 'locate',
				option: 'attribute-alt',
				label: 'intersect',
				targetIndex: 1,
				totalTargets: 2
			},
			{
				command: 'locate',
				option: 'attribute-type',
				label: 'intersect',
				targetIndex: 1,
				totalTargets: 2
			},
			{
				command: 'locate',
				option: 'node-type',
				label: 'intersect',
				targetIndex: 1,
				totalTargets: 2
			},
			{command: 'afterlocating', label: 'intersect', options: []},
			{command: 'beforefiltering', label: 'intersect', options: []},
			{
				command: 'filter',
				option: 'visible',
				label: 'intersect',
				targetIndex: 1,
				totalTargets: 2
			},
			{
				command: 'filter',
				option: 'leaf-node-target',
				label: 'intersect',
				targetIndex: 1,
				totalTargets: 2
			},
			{
				command: 'filter',
				option: 'input-after',
				label: 'intersect',
				targetIndex: 1,
				totalTargets: 2
			},
			{
				command: 'filter',
				option: 'contained-near-scope',
				label: 'intersect',
				targetIndex: 1,
				totalTargets: 2
			},
			{command: 'afterfiltering', label: 'intersect', options: []},
			{command: 'intersect'},
			{command: 'afterall'}]);
	});
});