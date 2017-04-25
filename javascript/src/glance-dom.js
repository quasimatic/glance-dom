import fs from 'fs';
import Parser from 'glance-parser';
import DefaultOptions from './processor/default-options';
import version from './version';

function CreateGlanceDOM() {
	this.addedExtensions = [];

	this.loadGlanceDOM = () => {
		let glanceDOMScript = fs.readFileSync(`${__dirname}/../../dist/glance-dom.js`, 'utf-8');
		return this.execute(function(script, extensions) {
			window.localStorage.setItem('glanceDOM', script);
			eval(script);

			extensions.forEach(glanceDOM.addExtension);

		}, glanceDOMScript, this.addedExtensions);
	};

	this.ensureGlanceDOMLoadedAndExecute = (...args) => {
		if (!this.execute) throw Error('Please provide an execute function using setExecute');

		let glanceLoaded = this.execute(function(extensions) {
			if (typeof(glanceDOM) === 'function') return true;
			if (!!eval(window.localStorage.getItem('glanceDOM'))) {
				extensions.forEach(glanceDOM.addExtension);
				return true;
			}

			return false;
		}, this.addedExtensions);

		if (glanceLoaded.then) {
			return glanceLoaded.then(loaded => {
				let promise = loaded ? Promise.resolve() : this.loadGlanceDOM();
				return promise.then(() => this.execute.apply(this.execute, args));
			});
		}
		else {
			if (!glanceLoaded) {
				this.loadGlanceDOM();
			}

			return this.execute.apply(this.execute, args);
		}
	};

	this.selector = (reference, config = {}) => {
		return this.ensureGlanceDOMLoadedAndExecute(function(reference, config) {
			return glanceDOM(reference, config);
		}, reference, config);
	};

	this.selector.parser = Parser;
	this.selector.defaultOptions = DefaultOptions;

	this.selector.setDefaultOptions = (options) => {
		return this.ensureGlanceDOMLoadedAndExecute(function(options) {
			return glanceDOM.setDefaultOptions(options);
		}, options);
	};

	this.selector.getConfig = () => {
		return this.ensureGlanceDOMLoadedAndExecute(function() {
			return glanceDOM.getConfig();
		});
	};

	this.selector.setExecute = (execute) => {
		this.execute = execute;
	};

	this.selector.addExtension = (extension) => {
		this.addedExtensions.push(extension);
	};

	Object.defineProperty(this.selector, 'version', {
		get: () => {
			return version;
		}
	});

	return this.selector;
}

export default new CreateGlanceDOM();
