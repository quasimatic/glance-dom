let LogLevels = {
	error: 0,
	warn: 1,
	info: 2,
	debug: 3,
	trace: 4
};

export default {
	level: 'error',
	logs: [],

	setLogLevel(level) {
		if(isNaN(LogLevels[level])) throw new Error('Invalid log level. Valid options are error, warn, info, debug, trace');
		this.level = level;
	},

	error(...messages) {
		this._log('error', messages);
	},

	warn(...messages) {
		this._log('warn', messages);
	},

	info(...messages) {
		this._log('info', messages);
	},

	debug(...messages) {
		this._log('debug', messages);
	},

	trace(...messages) {
		this._log('trace', messages);
	},

	reset(level = 'error'){
		this.logs = [];
		this.level = level;
	},

	_log(level, messages) {
		let l = LogLevels[level];

		if (l <= LogLevels[this.level]) {
			this.logs.push(messages.join(' '));
			console.log(messages.join(' '));
		}
	}
};