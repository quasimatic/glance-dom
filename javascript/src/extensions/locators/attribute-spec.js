import dom from '../../../test/dom';
import findInAttribute from './attribute';

describe('Locator: Search in attributes', () => {
    let locate = findInAttribute.locator.locate;

    it('should find exact match', () => {
        dom.render(<img alt="image-name" id="subject"/>);
        locate({
            label: 'image-name',
            option: 'attribute-alt',
            containerElements: [document.body]
        }).should.deep.equal([dom.get('subject')]);
    });

    it('should find case insensitive', () => {
        dom.render(<img id="subject"/>);
        locate({
            label: 'suBJect',
            option: 'attribute-id',
            containerElements: [document.body]
        }).should.deep.equal([dom.get('subject')]);
    });

    it('should find as contains', () => {
        dom.render(<img id="subject" placeholder="enter first name"/>);
        locate({
            label: 'first',
            option: 'attribute-placeholder',
            containerElements: [document.body]
        }).should.deep.equal([dom.get('subject')]);
    });

    it('should not find if missing', () => {
        dom.render(<div id="unique-id"></div>);
        locate({
            label: 'missing-id',
            option: 'attribute-id',
            containerElements: [document.body]
        }).should.deep.equal([]);
    });
});