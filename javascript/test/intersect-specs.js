import dom from './dom';
import glanceSelector from '../src/glance';

describe('Intersect', () => {
    it('should limit to intersecting elements', () => {
        dom.render(<div>
            <div id='subject'></div>
            <span>subject</span>
            <div></div>
        </div>);

        glanceSelector('subject ^ div').should.deep.equal(dom.get('subject'));
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

        glanceSelector('subject ^ div').should.deep.equal(dom.get('subject-1', 'subject-2'));
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

        glanceSelector('scope ^ div > subject').should.deep.equal(dom.get('subject'));
    });

    it('should interesect on class even if one is a leaf node', () => {
        dom.render(<div id="target" className="blue circle">
            <svg>
                <circle></circle>
            </svg>
        </div>);

        // glanceSelector('blue ^ circle').should.deep.equal(dom.get('target'));
        glanceSelector('circle ^ blue').should.deep.equal(dom.get('target'));
    });
});
