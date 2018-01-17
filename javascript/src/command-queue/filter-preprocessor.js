import Extensions from '../extensions';
import filter from '@arr/filter';

export default class FilterPreprocessor {
	constructor({extensions = new Extensions(), defaultOptions = []} = {
		extensions: new Extensions(),
		defaultOptions: []
	}) {
		this.extensions = extensions;
		this.defaultOptions = defaultOptions;
	}

	getFilterCommands(options) {
		let filters = [];
		return this.filtersFromOptions(options, filters);
	}

	filtersFromOptions(options, filters) {
		let updatedOptions = this.configureOptionsWithFilters(options);

		updatedOptions.forEach(name => filters.push({
			command: 'filter',
			option: name
		}));

		return filters;
	}

	configureOptionsWithFilters(providedOptions) {
		let extensions = this.extensions;
		let defaultOptions = this.defaultOptions;
		let options = extensions.getOptions();
		let possibleOptions = providedOptions;
		let validOptions = [];

		if (!providedOptions.includes('no-default-filters')) {
			let defaultOptionsNotSpecified = filter(defaultOptions, d => possibleOptions.indexOf(d) === -1);

			if (defaultOptionsNotSpecified.length > 0)
				possibleOptions = defaultOptionsNotSpecified.concat(possibleOptions);
		}
		else {
			possibleOptions = filter(providedOptions, o => o !== 'no-default-filters');
		}

		possibleOptions.forEach(name => {
			let possibleOption = options[name];
			if (typeof(possibleOption) === 'string') {
				name = possibleOption;
			}

			if (possibleOption && (typeof(possibleOption) === 'function' || possibleOption.filter)) {
				if (possibleOption.check && !possibleOption.check({option: name, options: providedOptions})) {
					return false;
				}
				validOptions = validOptions.concat(name);
			}
			else {
				let catchAlls = filter(extensions.getExtensions(), e => {
					if (e.filter) {
						return e.filter.check({option: name});
					}

					return false;
				});

				if (catchAlls.length > 0) {
					validOptions = validOptions.concat(name);
				}
			}
		});

		return validOptions;
	}
};