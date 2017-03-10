import dom from './dom';
import glanceSelector from '../src/glance';

describe('Subjects', () => {
    it('should find subject', () => {
        dom.render(<div id="subject"></div>);
        glanceSelector('subject').should.deep.equal([dom.get('subject')]);
    });
});