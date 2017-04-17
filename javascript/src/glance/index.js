import Preprocessor from '../command-queue/preprocessor';
import processCommands from './processor';
import requiredParameter from '../utils/required-parameter';
import Parser from 'glance-parser';
import log from '../utils/log';
import DefaultExtensions from '../extensions/default';
import DefaultOptions from '../default-options';
import Settings from './settings';

function createGlanceDOM() {
	this.preprocessor;

	this.settings = new Settings();

	this.selector = (reference = requiredParameter('Selector required'), config = {}) => {
		this.settings.configure(config);

		let commands = this.preprocessor.create(reference);

		return processCommands({
			...this.settings.config,
			commands,
			glanceDOM: this.selector,
			reference
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
		this.settings = new Settings();
		this.preprocessor = new Preprocessor(this.settings.config);
	};

	this.selector.getConfig = () => {
		return this.settings.config;
	};

	this.selector.setLogLevel = (level) => {
		this.settings.setLogLevel(level);
	};

	this.selector.reset();

	return this.selector;
}

export default new createGlanceDOM();
export {Parser, DefaultExtensions, DefaultOptions};