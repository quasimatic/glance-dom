import Extensions from '../extensions';
import DefaultExtensions from '../extensions/default';
import DefaultOptions from '../default-options';
import log from '../utils/log';

class Settings {
	constructor() {
		this.config = {
			containerElements: [document.documentElement],
			extensions: new Extensions(DefaultExtensions),
			defaultOptions: DefaultOptions
		};
	}

	configure(config) {
		this.config = {...this.config, ...config};
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
		log.setLogLevel(level);
	}
}

export default Settings;