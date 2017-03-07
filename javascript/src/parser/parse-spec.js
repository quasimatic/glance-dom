import parser from './parser';

describe("Parsing", function () {
    it("should get label", function () {
        parser.parse("label").should.deep.equal([[{label: 'label', options: [], useDefaultOptions:true}]]);
    });

    it("should get index", function () {
        parser.parse("label#10").should.deep.equal([[{label: 'label', options: [10], useDefaultOptions:true}]]);
    });

    it("should support scopes", function () {
        parser.parse("scope>label").should.deep.equal([[{label: 'scope', options: [], useDefaultOptions:true}], [{label: 'label', options: [], useDefaultOptions:true}]]);
    });

    it("should support option", function () {
        parser.parse("label:text").should.deep.equal([[{label: 'label:text', options: [], useDefaultOptions:true}]]);
    });

    it("should escape option character", function () {
        parser.parse("label\\#10").should.deep.equal([[{label: 'label#10', options: [], useDefaultOptions:true}]]);
    });

    it("should escape scope character", function () {
        parser.parse("label\\>test").should.deep.equal([[{label: 'label>test', options: [], useDefaultOptions:true}]]);
    });

    it("should escape the escape character", function () {
        parser.parse("label\\\\test").should.deep.equal([[{label: 'label\\test', options: [], useDefaultOptions:true}]]);
    });

    it("should support spaces before and after a label", function () {
        parser.parse(" label ").should.deep.equal([[{label: 'label', options: [], useDefaultOptions:true}]]);
    });

    it("should support spaces before and after a label", function () {
        parser.parse(" label > label2 ").should.deep.equal([[{label: 'label', options: [], useDefaultOptions:true}],
            [{label: 'label2', options: [], useDefaultOptions:true}]]);
    });

    it("should support spaces before and after a label", function () {
        parser.parse(" label#1 ").should.deep.equal([[{label: 'label', options: [1], useDefaultOptions:true}]]);
    });

    it("should support spaces before and after a label", function () {
        parser.parse(" label:option ").should.deep.equal([[{label: 'label:option', options: [], useDefaultOptions:true}]]);
    });

    it("should support intersecting labels", function () {
        parser.parse(" label 1^label 2 ").should.deep.equal([[{label: 'label 1', options: [], useDefaultOptions:true},
            {label: 'label 2', options: [], useDefaultOptions:true}]]);
    });
});

describe("Glace Parser: Syntax Errors", () => {
    it("should not throw an error for an empty string", () => {
        parser.parse("").should.deep.equal([]);
    });

    it("should throw an error for >>", () => {
        expect(() => parser.parse("aaa >>")).to.throw('Expected "#" or "\\\\" but ">" found.');
    });
});