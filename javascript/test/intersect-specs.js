import dom from './dom';
import glanceDOM from '../src/glance';

describe('Intersect', () => {
    it('should limit to intersecting elements', () => {
        dom.render(<div>
            <div id='subject'></div>
            <span>subject</span>
            <div></div>
        </div>);

        glanceDOM('subject ^ div').should.deep.equal(dom.get('subject'));
    });

    it('should limit multiple sets of intersecting elements', () => {
        dom.render(<div>
            <div>
                <div id='subject-1'>subject</div>
                <span>subject</span>
            </div>
            <div>
                <div id='subject-2'>subject</div>
                <span>subject</span>
            </div>
        </div>);

        glanceDOM('subject ^ div').should.deep.equal(dom.get('subject-1', 'subject-2'));
    });

    it('should limit multiple sets of intersecting elements', () => {
        dom.render(<div>
            <div>
                <div id='scope'></div>
                <div id='subject'></div>
            </div>
            <div>
                <span>scope</span>
                <div>subject</div>
            </div>
        </div>);

        glanceDOM('scope ^ div > subject').should.deep.equal(dom.get('subject'));
    });

    it('should interesect on class even if one is a leaf node', () => {
        dom.render(<div id="target" className="blue circle">
            <svg>
                <circle></circle>
            </svg>
        </div>);

        // TODO glanceDOM('blue ^ circle').should.deep.equal(dom.get('target'));
        glanceDOM('circle ^ blue').should.deep.equal(dom.get('target'));
    });

    it('should narrow down element with inner selectors', () => {
        dom.render(<div>
            <span className="block">other</span>
            <span id="target" className="block">item</span>
            <span>item</span>
        </div>);

        return glanceDOM('item ^ block').should.deep.equal(dom.get('target'));
    });

    it('should narrow down elements with inner selectors', () => {
        dom.render(<div>
            <span id="target-1" className="block">item</span>
            <span>item</span>
            <span id="target-2" className="block">item</span>
        </div>);

        return glanceDOM('item ^ block').should.deep.equal(dom.get('target-1', 'target-2'));
    });
});
