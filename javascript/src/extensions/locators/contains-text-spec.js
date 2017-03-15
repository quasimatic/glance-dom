import dom from '../../../test/dom';
import containsText from './contains-text';

describe('Locator: Contains Match', () => {
    let findContainsText = containsText.options['contains-text'].locate;

    it('should find by exact text match', () => {
        dom.render(<div id="subject">contains text</div>);

        findContainsText({
            label: 'contains text',
            containerElements: [document.body]
        }).should.deep.equal([dom.get('subject')]);
    });

    it('should find containing match', () => {
        dom.render(<div id="subject">this contains text here</div>);

        findContainsText({
            label: 'contains text',
            containerElements: [document.body]
        }).should.deep.equal([dom.get('subject')]);
    });

    it('should find more than one', () => {
        dom.render(
            <div>
                <div id="subject-1">contains text</div>
                <div id="subject-2">this contains text here</div>
            </div>
        );

        findContainsText({
            label: 'contains text',
            containerElements: [document.body]
        }).should.deep.equal(dom.get('subject-1', 'subject-2'));
    });

    it('should not find missing text', () => {
        dom.render(<div>contains text</div>);

        findContainsText({label: 'missing text', containerElements: [document.body]}).should.deep.equal([]);
    });

    it('should find by case insensitive', () => {
        dom.render(<div id="subject">conTainS teXt</div>);

        findContainsText({
            label: 'Contains teXt',
            containerElements: [document.body]
        }).should.deep.equal([dom.get('subject')]);
    });

    it('should find inside a textnode', () => {
        dom.render(<div id="subject"><span>something</span>text node</div>);

        findContainsText({
            label: 'text node',
            containerElements: [document.body]
        }).should.deep.equal([dom.get('subject')]);
    });

    it('should find in text with html', () => {
        dom.render(<div id="subject">this contains <b>bold</b> and <i>italicized</i> text</div>);

        findContainsText({
            label: 'bold and italicized',
            containerElements: [document.body]
        }).should.deep.equal([dom.get('subject')]);
    });

    it('should find in text with new lines', () => {
        dom.render(<div id="subject">this contains
            some{'\n'}
            new{'\n'}
            lines{'\n'}
        </div>);

        findContainsText({
            label: 'some new',
            containerElements: [document.body]
        }).should.deep.equal([dom.get('subject')]);
    });

    it('should find in text with comments', () => {
        dom.render(<div id="subject"
                        dangerouslySetInnerHTML={{__html: 'this has something <!-- comment -->extra in the middle'}}/>);

        findContainsText({
            label: 'something extra',
            containerElements: [document.body]
        }).should.deep.equal([dom.get('subject')]);
    });

    it('should not search script tags', () => {
        dom.render(<script>console.log('stuff')</script>);

        findContainsText({label: 'stuff', containerElements: [document.body]}).should.deep.equal([]);
    });

    it('should not search noscript tags', () => {
        dom.render(<noscript>console.log('stuff')</noscript>);

        findContainsText({label: 'stuff', containerElements: [document.body]}).should.deep.equal([]);
    });

    it('should not search style tags', () => {
        dom.render(<style>{ 'color: red;' }</style>);

        findContainsText({label: 'red', containerElements: [document.body]}).should.deep.equal([]);
    });

    it('should only find inner item', () => {
        dom.render(<div>
            <div>
                <div id='scope'>scope</div>
                <div>subject</div>
            </div>

            <div>subject</div>
        </div>)
        findContainsText({label: 'scope', containerElements: [document.body]}).should.deep.equal([dom.get('scope')]);
    })
});