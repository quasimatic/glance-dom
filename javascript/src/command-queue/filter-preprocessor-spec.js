import Preprocessor from './filter-preprocessor';
import Extensions from '../extensions';

let extensions = new Extensions([{
	options: {
		'default-filter-1': () => {
		},

		'in-filter': {
			check: ({options}) => {
				return !options.includes('out-filter');
			},
			filter: () => {

			}
		},
		'out-filter': {
			check: ({options}) => {
				return !options.includes('in-filter');
			},
			filter: () => {

			}
		}
	}
}]);

let defaultOptions = ['default-filter-1'];

describe('Preprocessor: filters', () => {
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

	it('should apply default filters', () => {
		let preprocessor = new Preprocessor({extensions, defaultOptions});

		let commands = preprocessor.getFilterCommands({
			label: 'subject',
			options: []
		});

		commands.should.deep.equal([{command: 'filter', label: 'subject', option: 'default-filter-1'}]);
	});

	it('should not apply option without filter', () => {
		let customExtension = {
			options: {
				'custom-label': {
					locate: 'custom'
				}
			}
		};

		extensions.add(customExtension);

		let preprocessor = new Preprocessor({extensions, defaultOptions});

		let commands = preprocessor.getFilterCommands({label: 'subject', options: ['custom-label']});

		commands.should.deep.equal([{command: 'filter', label: 'subject', option: 'default-filter-1'}]);
	});

	it('should apply additional filter by option', () => {
		let customExtension = {
			options: {
				'custom-filter': () => {
				}
			}
		};

		extensions.add(customExtension);

		let preprocessor = new Preprocessor({extensions, defaultOptions});

		let commands = preprocessor.getFilterCommands({label: 'subject', options: ['custom-filter']});

		commands.should.deep.equal([
			{command: 'filter', label: 'subject', option: 'default-filter-1'},
			{command: 'filter', label: 'subject', option: 'custom-filter'}
		]);
	});

	it('should apply custom label filter with defaults', () => {
		extensions.add({
			labels: {
				'custom-label': {
					filter: () => {
					}
				}
			}
		});

		let preprocessor = new Preprocessor({extensions, defaultOptions});

		let commands = preprocessor.getFilterCommands({label: 'custom-label', options: []});

		commands.should.deep.equal([
			{command: 'filter', label: 'custom-label', option: 'custom-label'},
			{command: 'filter', label: 'custom-label', option: 'default-filter-1'}
		]);
	});

	it('should not apply to custom label locator as an array', () => {
		extensions.add({
			labels: {
				'custom-label': ['item-1', 'item-2']
			}
		});

		let preprocessor = new Preprocessor({extensions, defaultOptions});

		let commands = preprocessor.getFilterCommands({label: 'custom-label', options: []});

		commands.should.deep.equal([{command: 'filter', label: 'custom-label', option: 'default-filter-1'}]);
	});

	it('should apply dynamic filter with defaults', () => {
		extensions.add({
			filter: {
				check: () => true,
				filter: () => {
				}
			}
		});

		let preprocessor = new Preprocessor({extensions, defaultOptions});

		let commands = preprocessor.getFilterCommands({label: 'subject', options: ['dynamic']});

		commands.should.deep.equal([
			{command: 'filter', label: 'subject', option: 'default-filter-1'},
			{command: 'filter', label: 'subject', option: 'dynamic'}
		]);
	});

	it('should apply filter if inverse is not provided', () => {
		let preprocessor = new Preprocessor({extensions, defaultOptions});
		let commands = preprocessor.getFilterCommands({label: 'subject', options: ['in-filter']});

		commands.should.deep.equal([
			{command: 'filter', label: 'subject', option: 'default-filter-1'},
			{command: 'filter', label: 'subject', option: 'in-filter'}
		]);
	});

	it('should apply filter if inverse is not provided with defaults', () => {
		let preprocessor = new Preprocessor({extensions, defaultOptions: defaultOptions.concat('in-filter')});
		let commands = preprocessor.getFilterCommands({label: 'subject', options: []});

		commands.should.deep.equal([
			{command: 'filter', label: 'subject', option: 'default-filter-1'},
			{command: 'filter', label: 'subject', option: 'in-filter'}]);
	});

	it('should apply filter if default explicity specified', () => {
		let preprocessor = new Preprocessor({extensions, defaultOptions: ['in-filter'].concat(defaultOptions)});
		let commands = preprocessor.getFilterCommands({label: 'subject', options: ['in-filter']});

		commands.should.deep.equal([
			{command: 'filter', label: 'subject', option: 'default-filter-1'},
			{command: 'filter', label: 'subject', option: 'in-filter'}]);
	});

	it('should remove option if filter and inverse declared', () => {
		let preprocessor = new Preprocessor({extensions, defaultOptions});
		let commands = preprocessor.getFilterCommands({label: 'subject', options: ['in-filter', 'out-filter']});

		commands.should.deep.equal([{command: 'filter', label: 'subject', option: 'default-filter-1'}]);
	});

	it('should remove option if filter and inverse declared with defaults', () => {
		let preprocessor = new Preprocessor({extensions, defaultOptions});
		let commands = preprocessor.getFilterCommands({label: 'subject', options: ['in-filter', 'out-filter']});

		commands.should.deep.equal([{command: 'filter', label: 'subject', option: 'default-filter-1'}]);
	});

	it('should override default option if inverse is specified', () => {
		let preprocessor = new Preprocessor({extensions, defaultOptions: defaultOptions.concat('in-filter')});
		let commands = preprocessor.getFilterCommands({label: 'subject', options: ['out-filter']});

		commands.should.deep.equal([
			{command: 'filter', label: 'subject', option: 'default-filter-1'},
			{command: 'filter', label: 'subject', option: 'out-filter'}
		]);
	});
});