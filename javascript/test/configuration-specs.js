import dom from './dom';
import glanceSelector from '../src/glance';

describe('Configuation: containerElements', () => {
    it('should support configuring a different base container Element', () => {
        dom.render(
            <div>
                <div id='container'>
                    <div id='subject'>item</div>
                </div>
                <div>item</div>
            </div>
        );
        return glanceSelector('item', {containerElements: [dom.get('container')]}).should.deep.equal(dom.get('subject'));
    });

    it('should support configuring a multiple base container Elements', () => {
        dom.render(
            <div>
                <div id='container-1'>
                    <div id='subject-1'>item</div>
                </div>
                <div id='container-2'>
                    <div id='subject-2'>item</div>
                </div>
                <div>item</div>
            </div>
        );
        return glanceSelector('item', {containerElements: [dom.get('container-1'), dom.get('container-2')]}).should.deep.equal(dom.get('subject-1', 'subject-2'));
    });
});