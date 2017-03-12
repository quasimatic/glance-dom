import dom from './dom';
import glanceSelector from '../src/glance';

beforeEach(() => document.body.innerHTML = '');

describe('Subjects', () => {
    it('should find subject', () => {
        dom.render(<div id="subject"></div>);
        glanceSelector('subject').should.deep.equal(dom.get('subject'));
    });

    it('should find multiple subject', () => {
        dom.render(<div>
            <div id="subject-1">subject 1</div>
            <div id="subject-2">subject 2</div>
        </div>);
        glanceSelector('subject').should.deep.equal(dom.get('subject-1', 'subject-2'));
    });
});

describe('Subject: default locators', () => {
    it('should look by exact text match', () => {
        dom.render(<div id="subject">Content Item</div>);
        glanceSelector('Content Item').should.deep.equal(dom.get('subject'));
    });

    it('should look by content as contains', () => {
        dom.render(<div id="subject">Item Contains stuff</div>);
        return glanceSelector('Item Contains').should.deep.equal(dom.get('subject'));
    });

    it('will look by id', () => {
        dom.render(<div id="label-id"></div>);
        return glanceSelector('label-id').should.deep.equal(dom.get('label-id'));
    });

    it('should look by class', () => {
        dom.render(<div id="subject" className="div-class"></div>);
        return glanceSelector('div-class').should.deep.equal(dom.get('subject'));
    });

    it('should look by node type', () => {
        dom.render(<button id="subject"></button>);
        return glanceSelector('button').should.deep.equal(dom.get('subject'));
    });
});

describe('Subject: default filters', () => {
    it('should support an indexer', () => {
        dom.render(<div>
            <div>foo</div>
            <div id="subject">foo</div>
        </div>);

        return glanceSelector('foo#2').should.deep.equal(dom.get('subject'));
    });

    it('should filter for visible elements', () => {
        dom.render(
            <div>
                <div id="subject-1">Duplicate</div>
                <div style={{display: 'none'}}>Duplicate</div>
            </div>
        );

        return glanceSelector('Duplicate').should.deep.equal(dom.get('subject-1'));
    });

    it('should get duplicates for visible items only', () => {
        dom.render(
            <div>
                <div id="subject-1">item</div>
                <div id="subject-2" className="item"></div>
                <div className="item" style={{display: 'none'}}></div>
                <div style={{display: 'none'}}>this is an item</div>
            </div>
        );

        return glanceSelector('item').should.deep.equal(dom.get('subject-1', 'subject-2'));
    });
});