require('./jquery');

describe('Glance Dom Browser Jquery', () => {
	it('glance jquery should be global', () => {
		window.$glance.should.not.be.null;
		window.$glance("subject");
	});
});