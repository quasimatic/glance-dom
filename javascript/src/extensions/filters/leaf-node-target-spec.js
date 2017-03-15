import dom from '../../../test/dom';
import leafNodeTarget from './leaf-node-target';
let filter = leafNodeTarget.options['leaf-node-target'].filter;

describe('Filter: Target is leaf node', () => {
    it('should filter out non leaf nodes', () => {
        dom.render(
            <div>
                <div>
                    <div id="target">item</div>
                </div>
                <div id='item-2' className="item">
                    <div>something else</div>
                </div>
            </div>
        );

        filter({elements: dom.get('target', 'item-2')}).should.deep.equal([dom.get('target')]);
    });

    it('should return container nodes if no leaf nodes in set', () => {
        dom.render(
            <div>
                <div id="target" className="item">
                    <div>something else</div>
                </div>
            </div>
        );

        filter({elements: [dom.get('target')]}).should.deep.equal([dom.get('target')]);
    });

    it('should only filter leaf nodes for last target', () => {
        dom.render(
            <div>
                <div id='scope'>
                    <div id='target'></div>
                </div>
                <div id='fake-scope'></div>
            </div>
        );

        filter({elements: [dom.get('target')], targetIndex: 0, totalTargets: 2}).should.deep.equal([dom.get('target')]);
        // filter({elements: dom.get('scope', 'fake-scope'), targetsIndex: 1, totalTargets: 2}).should.deep.equal(dom.get('scope', 'fake-scope'));
    });
});