import reduce from '@arr/reduce';
import filter from '@arr/filter';
import map from '@arr/map';

export default class Extensions {
	constructor(extensions = []) {
		this.extensions = extensions;
	}

	add(extension) {
		this.extensions = this.extensions.concat(extension);
	}

	getLocatorForLabel(text) {
		let labels = Extensions.labels(this.extensions);
		let label = labels[text];
		return label ? this.getLocator(label.locate || label) : () => [];
	}

	getLocatorForOption(name, label) {
		let options = Extensions.options(this.extensions);
		let option = options[name];

		return option ? this.getLocator(option.locate) : this.getDynamicLocator(name, label);
	}

	getDynamicLocator(option, label) {
		let catchAlls = map(filter(this.extensions, e => e.locator ? e.locator.check({
			label,
			option
		}) : false), e => e.locator.locate);

		if (catchAlls.length > 0) {
			return (data) => reduce(catchAlls, (result, locate) => result.concat(locate(data)), []);
		}
	}

	getLocator(locator) {
		if (Object.prototype.toString.call(locator) === '[object Array]') {
			return ({glanceDOM}) => reduce(locator, (result, label) => result.concat(glanceDOM(label), []), []);
		}
		else if (typeof(locator) === 'string') {
			return ({glanceDOM}) => glanceDOM(locator);
		}
		else if (typeof(locator) === 'function') {
			return locator;
		}

		return () => [];
	}

	getFilterForOption(name, label) {
		let options = Extensions.options(this.extensions);
		let option = options[name];

		if (option)
			return typeof(option) === 'function' ? option : option.filter;
		else
			return this.getDynamicFilter(name, label);
	}

	getDynamicFilter(option, label) {
		let catchAlls = map(filter(this.extensions, e => e.filter ? e.filter.check({
			label,
			option
		}) : false), e => e.filter.filter);

		if (catchAlls.length > 0) {
			return (data) => reduce(catchAlls, (result, filter) => result.concat(filter(data)), []);
		}
	}

	getExtensions() {
		return this.extensions;
	}

	getLabels() {
		return Extensions.labels(this.extensions);
	}

	getOptions() {
		return Extensions.options(this.extensions);
	}

	static labels(extensions) {
		return reduce(filter(extensions, e => e.labels), (l, e) => Object.assign(l, e.labels), {});
	}

	static options(extensions) {
		return reduce(filter(extensions, e => e.options), (l, e) => {
			return {...l, ...e.options};
		}, {});
	}

	getBeforeAllHooks() {
		return map(filter(this.extensions, e => e.beforeAll), e => e.beforeAll);
	}

	getAfterAllHooks() {
		return map(filter(this.extensions, e => e.afterAll), e => e.afterAll);
	}

};