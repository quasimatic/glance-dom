import browser from './glance-jquery';

describe('browser', () => {
    it('glance jquery should be global', () => {
        window.$glance.should.not.be.null;
    })
})