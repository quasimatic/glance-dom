import Extensions from '../extensions';

export default class FilterPreprocessor {
	constructor({extensions = new Extensions(), defaultOptions = []} = {
		extensions: new Extensions(),
		defaultOptions: []
	}) {
		this.extensions = extensions;
		this.defaultOptions = defaultOptions;
	}

	getFilterCommands(target) {
		let extensions = this.extensions;
		let locators = [];
		let labels = extensions.getLabels();

		if (labels[target.label] && Object.prototype.toString.call(labels[target.label]) !== '[object Array]' && labels[target.label].filter) {
			locators = [{command: 'filter', option: 'custom-label', label: target.label}];
		}

		return this.filtersFromOptions(target, locators, extensions);
	}

	filtersFromOptions(target, locators, extensions) {
		let updatedOptionTarget = this.configureOptionsWithFilters(target);

		updatedOptionTarget.options.forEach(name => locators.push({
			command: 'filter',
			option: name,
			label: target.label
		}));

		return locators;
	}

	configureOptionsWithFilters(target) {
		let extensions = this.extensions;
		let defaultOptions = this.defaultOptions;
		let options = extensions.getOptions();
		let possibleOptions = target.options;
		let validOptions = [];

		let defaultOptionsNotSpecified = defaultOptions.filter(d => possibleOptions.indexOf(d) === -1);

		if (defaultOptionsNotSpecified.length > 0)
			possibleOptions = defaultOptionsNotSpecified.concat(possibleOptions);

		possibleOptions.forEach(name => {
			let possibleOption = options[name];
			if (possibleOption && (typeof(possibleOption) === 'function' || possibleOption.filter)) {
				if (possibleOption.check && !possibleOption.check({label: target.label, option: name, options: target.options})) {
					return false;
				}
				validOptions = validOptions.concat(name);
			}
			else {
				let catchAlls = extensions.getExtensions().filter(e => {
					if (e.filter) {
						return e.filter.check({label: target.label, option: name});
					}

					return false;
				});

				if (catchAlls.length > 0) {
					validOptions = validOptions.concat(name);
				}
			}
		});

		return {...target, options: validOptions};
	}
};