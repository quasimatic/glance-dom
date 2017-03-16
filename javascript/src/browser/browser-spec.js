import browser from './index';

describe('browser', () => {
    it('glanceSelector should be global', () => {
        window.glanceSelector.should.not.be.null;
    })
})