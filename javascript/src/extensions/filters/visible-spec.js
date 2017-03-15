import dom from '../../../test/dom';
import visible from './visible';

let filter = visible.options['visible'].filter;

describe('Filter: Visible', () => {
    it('should filter out non visible items', () => {
        dom.render(
            <div>
                <div id="target">item</div>
                <div id="item-1" style={{display: 'none'}}>item</div>
            </div>
        );

        filter({elements: dom.get('target', 'item-1')}).should.deep.equal([dom.get('target')]);
    });

    it('should find fixed position items', () => {
        dom.render(
            <div>
                <div id="target" style={{position: 'fixed'}}>item</div>
                <div id="item-1" style={{display: 'none'}}>item</div>
            </div>
        );

        filter({elements: dom.get('target', 'item-1')}).should.deep.equal([dom.get('target')]);
    });

    it('should find for text nodes', () => {
        dom.render(
            <div>
                <div id="target" style={{position: 'fixed'}}>item</div>
                <div id="item-1" style={{display: 'none'}}>item</div>
            </div>
        );

        filter({elements: dom.get('target', 'item-1')}).should.deep.equal([dom.get('target')]);
    });
});