let LogLevels = {
    error: 0,
    warn: 1,
    info: 2,
    debug: 3,
    trace: 4
};

export default {
    level: LogLevels['error'],

    setLogLevel(level) {
        this.level = LogLevels[level]
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

    _log(level, messages) {
        let l = LogLevels[level];

        if (l <= this.level) {
            console.log(messages.join(" "));
        }
    }
}