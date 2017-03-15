import dom from '../../../test/dom';
import extension from './value';

describe('Locator: Value Match', () => {
    let findByValue = extension.options['value'].locate;

    it('should find in value', () => {
        dom.render(<input value="enter name" id="subject"/>);

        findByValue({
            label: 'enter name',
            containerElements: [document.body]
        }).should.deep.equal([dom.get('subject')]);
    });

    it('should find in value case insensitive', () => {
        dom.render(<input value="eNter namE" id="subject"/>);

        findByValue({
            label: 'enteR naMe',
            containerElements: [document.body]
        }).should.deep.equal([dom.get('subject')]);
    });

    it('should find by contains', () => {
        dom.render(<input id="subject" value="this name is unique"/>);

        findByValue({
            label: 'name',
            containerElements: [document.body]
        }).should.deep.equal([dom.get('subject')]);
    });

    it('should find dynamically set value', () => {
        dom.render(<input id="subject"/>);

        dom.get('subject').value = 'name';
        findByValue({
            label: 'name',
            containerElements: [document.body]
        }).should.deep.equal([dom.get('subject')]);
    });

    it('should find for button', () => {
        dom.render(<button value="name" id="subject"></button>);

        findByValue({
            label: 'name',
            containerElements: [document.body]
        }).should.deep.equal([dom.get('subject')]);
    });

    it('should find for option', () => {
        dom.render(<option value="name" id="subject"></option>);

        findByValue({
            label: 'name',
            containerElements: [document.body]
        }).should.deep.equal([dom.get('subject')]);
    });

    it('should find for param', () => {
        dom.render(<param value="name" id="subject"/>);

        findByValue({
            label: 'name',
            containerElements: [document.body]
        }).should.deep.equal([dom.get('subject')]);
    });
});


