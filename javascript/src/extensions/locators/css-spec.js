import dom from '../../../test/dom';
import css from './css';

describe('Locator: Exact Match', () => {
    let findByCSS = css.options['css'].locate;
    beforeEach(() => {
        document.body.innerHTML = '';
    });

    it('should find by css selector', () => {
        dom.render(<div className="class-name" id="subject">text</div>);

        findByCSS({
            label: '.class-name',
            containerElements: [document.body]
        }).should.deep.equal([dom.get('subject')]);
    });

    it('should find within a scope css selector', () => {
        dom.render(<div id="scope">
            <div className="class-name" id="subject">text</div>
        </div>);

        findByCSS({
            label: '.class-name',
            containerElements: [dom.get('scope')]
        }).should.deep.equal([dom.get('subject')]);
    });

    it('should find scope with css selector', () => {
        dom.render(<div id="scope">
            <div className="class-name" id="subject">text</div>
        </div>);

        findByCSS({
            label: '.class-name',
            containerElements: [dom.get('subject')]
        }).should.deep.equal([dom.get('subject')]);
    });

    it('should not find by css selector', () => {
        dom.render(<div className="class-name">text</div>);

        findByCSS({label: '.missing-class', containerElements: [document.body]}).should.deep.equal([]);
    });
});