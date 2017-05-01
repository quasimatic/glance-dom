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

		let commands = preprocessor.getFilterCommands([]);

		commands.should.deep.equal([{command: 'filter', option: 'default-filter-1'}]);
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

		let commands = preprocessor.getFilterCommands(['custom-label']);

		commands.should.deep.equal([{command: 'filter', option: 'default-filter-1'}]);
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

		let commands = preprocessor.getFilterCommands(['custom-filter']);

		commands.should.deep.equal([
			{command: 'filter', option: 'default-filter-1'},
			{command: 'filter', option: 'custom-filter'}
		]);
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

		let commands = preprocessor.getFilterCommands(['dynamic']);

		commands.should.deep.equal([
			{command: 'filter', option: 'default-filter-1'},
			{command: 'filter', option: 'dynamic'}
		]);
	});

	it('should apply filter if inverse is not provided', () => {
		let preprocessor = new Preprocessor({extensions, defaultOptions});
		let commands = preprocessor.getFilterCommands(['in-filter']);

		commands.should.deep.equal([
			{command: 'filter', option: 'default-filter-1'},
			{command: 'filter', option: 'in-filter'}
		]);
	});

	it('should apply filter if inverse is not provided with defaults', () => {
		let preprocessor = new Preprocessor({extensions, defaultOptions: defaultOptions.concat('in-filter')});
		let commands = preprocessor.getFilterCommands([]);

		commands.should.deep.equal([
			{command: 'filter', option: 'default-filter-1'},
			{command: 'filter', option: 'in-filter'}]);
	});

	it('should apply filter if default explicity specified', () => {
		let preprocessor = new Preprocessor({extensions, defaultOptions: ['in-filter'].concat(defaultOptions)});
		let commands = preprocessor.getFilterCommands(['in-filter']);

		commands.should.deep.equal([
			{command: 'filter', option: 'default-filter-1'},
			{command: 'filter', option: 'in-filter'}]);
	});

	it('should remove option if filter and inverse declared', () => {
		let preprocessor = new Preprocessor({extensions, defaultOptions});
		let commands = preprocessor.getFilterCommands(['in-filter', 'out-filter']);

		commands.should.deep.equal([{command: 'filter', option: 'default-filter-1'}]);
	});

	it('should remove option if filter and inverse declared with defaults', () => {
		let preprocessor = new Preprocessor({extensions, defaultOptions});
		let commands = preprocessor.getFilterCommands(['in-filter', 'out-filter']);

		commands.should.deep.equal([{command: 'filter', option: 'default-filter-1'}]);
	});

	it('should override default option if inverse is specified', () => {
		let preprocessor = new Preprocessor({extensions, defaultOptions: defaultOptions.concat('in-filter')});
		let commands = preprocessor.getFilterCommands(['out-filter']);

		commands.should.deep.equal([
			{command: 'filter', option: 'default-filter-1'},
			{command: 'filter', option: 'out-filter'}
		]);
	});
});