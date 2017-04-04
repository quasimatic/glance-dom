import browser from './index';

describe('browser', () => {
    it('glanceDOM should be global', () => {
        window.glanceDOM.should.not.be.null;
    })
})