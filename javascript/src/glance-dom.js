import fs from 'fs';
import Parser from 'glance-parser';
import DefaultOptions from './processor/default-options';

function createGlanceDOM() {
	this.ensureGlanceDOMLoadedAndExecute = (...args) => {
		if (!this.execute) throw Error('Please provide an execute function using setExecute');

		let glanceLoaded = this.execute(function() {
			return typeof(glanceDOM) === 'function';
		});

		if (glanceLoaded.then) {
			return glanceLoaded.then(loaded => {
				if (!loaded) {
					let glanceDOMScript = fs.readFileSync(`${__dirname}/../../dist/glance-dom.js`, 'utf-8');
					return this.execute(glanceDOMScript).then(() => this.execute.apply(this.execute, args));
				}
				else {
					return this.execute.apply(this.execute, args);
				}
			});
		}
		else {
			if (!glanceLoaded) {
				let glanceDOMScript = fs.readFileSync(`${__dirname}/../../dist/glance-dom.js`, 'utf-8');
				this.execute(glanceDOMScript);
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

	return this.selector;
}

export default new createGlanceDOM();
