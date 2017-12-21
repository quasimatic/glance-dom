import glanceDOM from '../src/glance-dom-browser';

describe('Errors', () => {
	it('should find nothing with an empty selector', () => {
		expect(() => glanceDOM()).to.throw('Selector required');
	});
});