import Extensions from '../extensions';

export default class FilterPreprocessor {
    constructor({extensions = new Extensions(), defaultOptions = []}) {
        this.extensions = extensions;
        this.defaultOptions = defaultOptions;
    }

    beforeFilters(elements, data) {
        return this.extensions.getExtensions().filter(e => e.beforeFilters).reduce((elements, e) => e.beforeFilters(Object.assign(data, {elements})), elements);
    }

    afterFilters(callback, data) {
        let extensions = this.extensions;
        return (err, filteredElements) => callback(err, extensions.getExtensions().filter(e => e.afterFilters).reduce((elements, e) => e.afterFilters(Object.assign(data, {elements})), filteredElements));
    }

    getFilterCommands(target) {
        let extensions = this.extensions;
        let locators = [];
        let labels = extensions.getLabels();

        if (labels[target.label] && labels[target.label].filter) {
            locators = [{command: 'filter', option: 'custom-label', label: target.label}];
        }

        return this.filtersFromOptions(target, locators, extensions);
    }

    filtersFromOptions(target, locators, extensions) {
        let options = extensions.getOptions();
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
        let possibleOptions = target.options || [];
        let validOptions = [];

        if (target.useDefaultOptions && defaultOptions.length > 0)
            possibleOptions = defaultOptions.concat(possibleOptions);

        possibleOptions.forEach(name => {
            if (options[name] && (typeof(options[name]) === 'function' || options[name].filter)) {
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
                    validOptions = validOptions.concat(catchAlls.map(e => (name)));
                }
            }
        });


        return target.useDefaultOptions ? {...target, options: validOptions} : target;
    }
};