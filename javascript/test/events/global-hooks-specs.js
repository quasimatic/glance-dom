import dom from '../dom';
import glanceDOM from '../../src/glance';

describe('Events: beforeAll', () => {
    it('should fire before everything', () => {
        dom.render(<div>subject</div>);

        let beforeAll = sinon.spy();

        glanceDOM.addExtension({'beforeAll': beforeAll});
        glanceDOM('subject');

        beforeAll.args[0][0].should.deep.equal({reference: "subject"})
    });
});

describe('Events: afterAll', () => {
    it('should fire after everything finishes', () => {
        dom.render(<div id='subject'></div>);

        let afterAll = sinon.spy();

        glanceDOM.addExtension({'afterAll': afterAll});
        glanceDOM('subject');

        afterAll.args[0][0].should.deep.equal({elements:[dom.get('subject')], reference: "subject"})
    });
});