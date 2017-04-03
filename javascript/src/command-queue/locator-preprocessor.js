import Extensions from '../extensions';

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

        if ((typeof(labels[target.label]) === 'object' && labels[target.label].locate) || labels[target.label]) {
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
        let extensions = this.extensions;
        let defaultOptions = this.defaultOptions;
        let options = extensions.getOptions();
        let possibleOptions = target.options;
        let validOptions = [];

        if (defaultOptions.length > 0)
            possibleOptions = defaultOptions.concat(possibleOptions);

        possibleOptions.forEach(name => {
            if (options[name] && options[name].locate) {
                validOptions = validOptions.concat(name);
            }
            else {
                let catchAlls = extensions.getExtensions().filter(e => {
                    if (e.locator) {
                        return e.locator.check({label: target.label, option: name});
                    }

                    return false;
                });

                if (catchAlls.length > 0) {
                    validOptions = validOptions.concat(catchAlls.map(e => (name)));
                }
            }
        });

        return {...target, options: validOptions};
    }
};