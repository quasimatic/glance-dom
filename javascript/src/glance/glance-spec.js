import glanceSelector from './index';
import log from '../utils/log';

describe('Glance Selector', () => {
    it('should set log level', () => {
        var logSpy = sinon.spy(log, 'setLogLevel');
        glanceSelector.setLogLevel('trace');
        logSpy.calledWith('trace').should.equal(true);
        log.setLogLevel.restore();
    });
});