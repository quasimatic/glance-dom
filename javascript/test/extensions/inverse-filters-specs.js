import glanceSelector from '../../src/glance';
import dom from '../dom';

describe('Extensions: Inverse Filters', () => {
    beforeEach(() => dom.render(<div>
        <div id='visible'>item</div>
        <div id='hidden' style={{display: 'none'}}>item</div>
    </div>));

    it('should locate both visible and hidden', () => {
        return glanceSelector('item#hidden,visible').should.deep.equal(dom.get('visible', 'hidden'));
    });

    it('should locate visible by default', () => {
        return glanceSelector('item').should.deep.equal(dom.get('visible'));
    });

    it('should locate hidden only', () => {
        return glanceSelector('item#hidden').should.deep.equal(dom.get('hidden'));
    })
});