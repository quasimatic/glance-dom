import dom from '../../../test/dom';
import visibility from './visibility';

let visibleFilter = visibility.options['visible'].filter;
let hiddenFilter = visibility.options['hidden'].filter;

describe('Filter: Visible', () => {
    it('should visibleFilter out non visible items', () => {
        dom.render(
            <div>
                <div id="target">item</div>
                <div id="item-1" style={{display: 'none'}}>item</div>
            </div>
        );

        visibleFilter({elements: dom.get('target', 'item-1')}).should.deep.equal([dom.get('target')]);
    });

    it('should find fixed position items', () => {
        dom.render(
            <div>
                <div id="target" style={{position: 'fixed'}}>item</div>
                <div id="item-1" style={{display: 'none'}}>item</div>
            </div>
        );

        visibleFilter({elements: dom.get('target', 'item-1')}).should.deep.equal([dom.get('target')]);
    });

    it('should find for text nodes', () => {
        dom.render(
            <div>
                <div id="target" style={{position: 'fixed'}}>item</div>
                <div id="item-1" style={{display: 'none'}}>item</div>
            </div>
        );

        visibleFilter({elements: dom.get('target', 'item-1')}).should.deep.equal([dom.get('target')]);
    });
});

describe('Filter: Hidden', () => {
    it('should find hidden display none items', () => {
        dom.render(
            <div>
                <div id="item-1">item</div>
                <div id="subject" style={{display: 'none'}}>item</div>
            </div>
        );

        hiddenFilter({elements: dom.get('subject', 'item-1')}, true).should.deep.equal([dom.get('subject')]);
    });

    it('should find hidden visibility hidden items', () => {
        dom.render(
            <div>
                <div id="item-1">item</div>
                <div id="subject" style={{visibility: 'hidden'}}>item</div>
            </div>
        );

       hiddenFilter({elements: dom.get('subject', 'item-1')}, true).should.deep.equal([dom.get('subject')]);
    });
});