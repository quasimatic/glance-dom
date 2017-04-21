import dom from './dom';
import glanceDOM from '../src/glance-dom';

describe('Index', () => {
    it('should support a parent indexer', () => {
        dom.render(
            <div>
                <h2>
                    <div>Shared Title</div>
                </h2>
                <h2>
                    <div id="target">Shared Title</div>
                </h2>
            </div>
        );
        return glanceDOM('h2#2 > Shared Title').should.deep.equal(dom.get('target'));
    });

    it('should apply default filters before an index filter if index filter is first', () => {
        dom.render(
            <div>
                <div style={{display: 'none'}}>item 1</div>
                <div>item 2</div>
                <div id="target">item 3</div>
            </div>
        );

        return glanceDOM('item#2').should.deep.equal(dom.get('target'));
    });

    it('should get the nth item', () => {
        dom.render(
            <div className="box1">
                <div className="item-1">Item A</div>
                <div id="target" className="item-2">Item A</div>
                <div className="item-3">Item A</div>
            </div>
        );

        return glanceDOM('box1 > Item A#2').should.deep.equal(dom.get('target'));
    });

    it('should get the nth scope for an item', () => {
        dom.render(
            <div className="box2">
                <div className="inner-box">
                    <div className="item-1">Item A</div>
                </div>
                <div className="inner-box">
                    <div id="target" className="item-2">Item A</div>
                </div>
                <div className="inner-box">
                    <div className="item-3">Item A</div>
                </div>
            </div>
        );

        return glanceDOM('box2>inner-box#2>Item A').should.deep.equal(dom.get('target'));
    });

    it('should get the nth item with multiple scopes', () => {
        dom.render(
            <div>
                <div>Item A</div>
                <div id="target">Item B</div>
                <div>Item B</div>
                <div>Item A</div>
            </div>
        );

        return glanceDOM('Item A > Item B#1').should.deep.equal(dom.get('target'));
    });
});