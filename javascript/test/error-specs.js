import dom from './dom';
import glanceDOM from '../src/glance-dom-browser';

describe('Errors', () => {
    it('should find nothing with an empty selector', () => {
        try {
            glanceDOM();
            throw new Error('Didn\'t throw error');
        }
        catch (err) {
            err.message.should.equal('Selector required');
        }
    });
});