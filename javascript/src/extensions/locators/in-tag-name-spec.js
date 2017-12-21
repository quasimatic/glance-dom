import dom from '../../../test/dom';
import extension from './in-tag-name';

describe('Locator: Exact Match', () => {
    let findByNodeType = extension.options['in-tag-name'].locate;

    it('should find by node type', () => {
        dom.render(<p id="subject"></p>);

        findByNodeType({
            label: 'p',
            containerElements: [document.documentElement]
        }).should.deep.equal([dom.get('subject')]);
    });

    it('should not find by node type', () => {
        dom.render(<span></span>);

        findByNodeType({label: 'p', containerElements: [document.documentElement]}).should.deep.equal([]);
    });
});