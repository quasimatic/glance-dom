import parser from './index';

describe('Parsing', () => {
	it('should get label', () => {
		parser.parse('label').should.deep.equal([[{label: 'label', options: [], useDefaultOptions: true}]]);
	});

	it('should get index', () => {
		parser.parse('label#10').should.deep.equal([[{label: 'label', options: ['10'], useDefaultOptions: true}]]);
	});

	it('should support scopes', () => {
		parser.parse('scope>label').should.deep.equal([[{
			label: 'scope',
			options: [],
			useDefaultOptions: true
		}], [{label: 'label', options: [], useDefaultOptions: true}]]);
	});

	it('should support option', () => {
		parser.parse('label#text').should.deep.equal([[{label: 'label', options: ['text'], useDefaultOptions: true}]]);
	});

	it('should escape option character', () => {
		parser.parse('label\\#10').should.deep.equal([[{label: 'label#10', options: [], useDefaultOptions: true}]]);
	});

	it('should support multiple options with comma', () => {
		parser.parse('label#text,visible').should.deep.equal([[{
			label: 'label',
			options: ['text', 'visible'],
			useDefaultOptions: true
		}]]);
	});

	it('should support multiple options with pound', () => {
		parser.parse('label #text #visible').should.deep.equal([[{
			label: 'label',
			options: ['text', 'visible'],
			useDefaultOptions: true
		}]]);
	})

	it('should escape scope character', () => {
		parser.parse('label\\>test').should.deep.equal([[{label: 'label>test', options: [], useDefaultOptions: true}]]);
	});

	it('should escape the escape character', () => {
		parser.parse('label\\\\test').should.deep.equal([[{
			label: 'label\\test',
			options: [],
			useDefaultOptions: true
		}]]);
	});

	it('should support spaces before and after a label', () => {
		parser.parse(' label ').should.deep.equal([[{label: 'label', options: [], useDefaultOptions: true}]]);
	});

	it('should support spaces before and after a label', () => {
		parser.parse(' label > label2 ').should.deep.equal([[{label: 'label', options: [], useDefaultOptions: true}],
			[{label: 'label2', options: [], useDefaultOptions: true}]]);
	});

	it('should support spaces before and after a label', () => {
		parser.parse(' label#1 ').should.deep.equal([[{label: 'label', options: ['1'], useDefaultOptions: true}]]);
	});

	it('should support spaces before and after a label', () => {
		parser.parse(' label:option ').should.deep.equal([[{
			label: 'label:option',
			options: [],
			useDefaultOptions: true
		}]]);
	});

	it('should support intersecting labels', () => {
		parser.parse(' label 1^label 2 ').should.deep.equal([[{label: 'label 1', options: [], useDefaultOptions: true},
			{label: 'label 2', options: [], useDefaultOptions: true}]]);
	});
	
	it('should support an empty subject', () => {
		parser.parse('label >').should.deep.equal([[{label: 'label', options: [], useDefaultOptions: true}]]);
	})
});

describe('Glace Parser: Syntax Errors', () => {
	it('should not throw an error for an empty string', () => {
		parser.parse('').should.deep.equal([]);
	});

	it('should throw an error for >>', () => {
		expect(() => parser.parse('aaa >>')).to.throw('Expected "#", "\\\\", or end of input but ">" found.');
	});
});