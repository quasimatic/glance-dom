import Extensions from '../extensions';
import DefaultExtensions from '../extensions/default';
import DefaultOptions from './default-options';

class Settings {
	constructor() {
		this.config = {
			containerElements: [document.documentElement],
			extensions: new Extensions(DefaultExtensions),
			defaultOptions: DefaultOptions,
			advanced: false,
			logLevel: 'error'
		};
	}

	addExtension(extension) {
		this.config.extensions.add(extension);
	}

	addLabel(label, value) {
		let labels = {};
		labels[label] = value;
		this.config.extensions.add({labels});
	}

	addOption(option, value) {
		let options = {};
		options[option] = value;
		this.config.extensions.add({options});
	}

	setDefaultOptions(options) {
		this.config.defaultOptions = options;
	}

	setLogLevel(level) {
		this.config.logLevel = level;
	}
}

export default Settings;