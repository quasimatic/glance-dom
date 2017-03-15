import dom from './dom';
import glanceSelector from '../src/glance';

describe('Errors', () => {
    it('should find nothing with an empty selector', () => {
        try {
            glanceSelector();
            throw new Error('Didn\'t throw error');
        }
        catch (err) {
            err.message.should.equal('Selector required');
        }
    });
});