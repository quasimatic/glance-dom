import Extensions from '../extensions';
import filter from '@arr/filter';
import map from '@arr/map';

export default class LocatorPreprocessor {
	constructor({extensions = new Extensions(), defaultOptions = []} = {
		extensions: new Extensions(),
		defaultOptions: []
	}) {
		this.extensions = extensions;
		this.defaultOptions = defaultOptions;
	}

	getLocatorCommands(target) {
		let extensions = this.extensions;
		let locators = [];
		let labels = extensions.getLabels();

		let delcaredOptions = this.optionsWithLocators(target.options, target.label);

		if (delcaredOptions.length === 0 && ((typeof(labels[target.label]) === 'object' && labels[target.label].locate) || labels[target.label])) {
			locators = [{command: 'locate', option: 'custom-label', label: target.label}];
		}

		return this.locatorsFromOptions(target, locators, extensions);
	}

	locatorsFromOptions(target, locators, extensions) {
		let updatedOptionTarget = this.configureOptionsWithLocators(target);

		updatedOptionTarget.options.forEach(name => locators.push({
			command: 'locate',
			option: name,
			label: target.label
		}));

		return locators;
	}

	configureOptionsWithLocators(target) {
		let defaultOptions = this.defaultOptions;
		let possibleOptions = target.options;

		let validOptions = this.optionsWithLocators(possibleOptions, target.label);

		if (validOptions.length === 0 && defaultOptions.length > 0)
			validOptions = this.optionsWithLocators(defaultOptions, target.label);

		return {...target, options: validOptions};
	}

	optionsWithLocators(possibleOptions, label) {
		let validOptions = [];
		let options = this.extensions.getOptions();
		let extensions = this.extensions;

		possibleOptions.forEach(name => {
			if (options[name] && options[name].locate) {
				validOptions = validOptions.concat(name);
			}
			else {
				let catchAlls = filter(extensions.getExtensions(), e => {
					if (e.locator) {
						return e.locator.check({label, option: name});
					}

					return false;
				});

				if (catchAlls.length > 0) {
					validOptions = validOptions.concat(map(catchAlls, e => (name)));
				}
			}
		});

		return validOptions;
	}
};