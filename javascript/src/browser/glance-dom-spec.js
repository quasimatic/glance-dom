import browser from './glance-dom';

describe('Glance Dom Browser', () => {
	it('glanceDOM should be global', () => {
		window.glanceDOM.should.not.be.null;
	});
});