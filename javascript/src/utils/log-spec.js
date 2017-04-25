import log from './log';

describe('Log', () => {
	beforeEach(() => {
		sinon.spy(console, 'log');
		log.reset();
	});

	afterEach(() => {
		console.log.restore();
		log.reset();
	});

	it('should support level error', () => {
		log.setLogLevel('error');
		log.error('error');
		console.log.calledWith('error').should.equal(true);
	});

	it('should support level warn', () => {
		log.setLogLevel('warn');
		log.warn('warn');
		console.log.calledWith('warn').should.equal(true);
	});

	it('should support level info', () => {
		log.setLogLevel('info');
		log.info('info');
		console.log.calledWith('info').should.equal(true);
	});

	it('should support level debug', () => {
		log.setLogLevel('debug');
		log.debug('debug');
		console.log.calledWith('debug').should.equal(true);
	});

	it('should support level trace', () => {
		log.setLogLevel('trace');
		log.trace('trace');
		console.log.calledWith('trace').should.equal(true);
	});

	it('should support level error', () => {
		log.setLogLevel('error');
		log.error('error');
		console.log.calledWith('error').should.equal(true);
	});

	it('should have array of logs', () => {
		log.error('some error');
		log.logs.should.deep.equal(['some error']);
	});

	it('should return current log level', () => {
		log.level.should.equal('error');
	});

	it('should support reset with log level', () => {
		log.reset('info');
		log.level.should.equal('info');
	});
});

