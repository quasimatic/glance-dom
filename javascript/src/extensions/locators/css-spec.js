import dom from '../../../test/dom';
import css from './css';

describe('Locator: CSS', () => {
    let findByCSS = css.options['css'].locate;

    it('should find by css selector', () => {
        dom.render(<div className="class-name" id="subject">text</div>);

        findByCSS({
            label: '.class-name',
            containerElements: [document.documentElement]
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

        findByCSS({label: '.missing-class', containerElements: [document.documentElement]}).should.deep.equal([]);
    });

    it('should catch dom exceptions and return no elements', () => {
        findByCSS({label: '.1', containerElements: [document.documentElement]}).should.deep.equal([]);
    });

    it('should rethrow non domexception exception', () => {
        let containerStub = sinon.stub().throws(new Error("Custom Exception"));
        expect(() => findByCSS({
            label: '1',
            containerElements: [containerStub]
        })).to.throw('Type error');
    });
});
