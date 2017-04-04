import glanceDOM from './index';
import log from '../utils/log';

describe('Glance Selector', () => {
    it('should set log level', () => {
        var logSpy = sinon.spy(log, 'setLogLevel');
        glanceDOM.setLogLevel('info');
        logSpy.calledWith('info').should.equal(true);
        log.setLogLevel.restore();
    });
});