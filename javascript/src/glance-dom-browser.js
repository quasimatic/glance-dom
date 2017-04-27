import Preprocessor from './command-queue/preprocessor';
import processCommands from './processor/processor';
import requiredParameter from './utils/required-parameter';
import Parser from 'glance-parser';
import log from './utils/log';
import DefaultExtensions from './extensions/default';
import DefaultOptions from './processor/default-options';
import Settings from './processor/settings';
import version from'./version';

function CreateGlanceDOM() {
	this.selector = (reference = requiredParameter('Selector required'), config = {}) => {
		return this.execute(() => {
			log.reset(config.logLevel || this.settings.config.logLevel);

			let commands = (new Preprocessor({...this.settings.config, ...config})).create(reference);

			return processCommands({
				...this.settings.config,
				...config,
				commands,
				glanceDOM: this.selector,
				reference
			});
		});
	};

	this.selector.addExtension = (extension) => {
		this.settings.addExtension(extension);
	};

	this.selector.addLabel = (label, value) => {
		this.settings.addLabel(label, value);
	};

	this.selector.addOption = (option, value) => {
		this.settings.addOption(option, value);
	};

	this.selector.setDefaultOptions = (options) => {
		this.settings.setDefaultOptions(options);
	};

	this.selector.reset = () => {
		this.execute = (func, ...args) => {
			return func.apply(func, args);
		};

		this.settings = new Settings();
	};

	this.selector.getConfig = () => {
		return this.settings.config;
	};

	this.selector.setLogLevel = (level) => {
		this.settings.setLogLevel(level);
	};

	this.selector.setExecute = (execute) => {
		this.execute = execute;
	};

	this.selector.preprocess = (reference, config = {}) => {
		log.reset(config.logLevel || this.settings.config.logLevel);
		return (new Preprocessor({...this.settings.config, ...config})).create(reference);
	};

	this.selector.process = (commands, config = {}) => {
		log.reset(config.logLevel || this.settings.config.logLevel);

		commands = [].concat(commands);

		return processCommands({
			...this.settings.config,
			...config,
			commands,
			glanceDOM: this.selector
		});
	};

	this.selector.parser = Parser;
	this.selector.defaultOptions = DefaultOptions;

	Object.defineProperty(this.selector, 'version', {
		get: () => {
			return version;
		}
	});

	this.selector.reset();

	return this.selector;
}

export default new CreateGlanceDOM();
export {Parser, DefaultExtensions, DefaultOptions};