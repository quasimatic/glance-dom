import glanceDOM from '../../src/glance-dom-browser';
import dom from '../dom';

describe('Extensions: locators', () => {
	beforeEach(() => {
		dom.render(<div>
			<div className='item' id='target-1'/>
			<div className='item'/>
			<div className='item' id='target-2'/>
			<div className='item'/>
			<input className='custom-input' id='target-3'/>
		</div>);
	});

	it('should locate elements with a option', () => {
		glanceDOM.addExtension({
			options: {
				'custom-option': {
					locate: function({glanceDOM}) {
						return glanceDOM('custom-input');
					}
				}
			}
		});

		return glanceDOM('ignored#custom-option').should.deep.equal(dom.get('target-3'));
	});

	it('should locate elements for a custom option as a glance selector', () => {
		glanceDOM.addExtension({
			options: {
				'custom-option': {
					locate: 'custom-input'
				}
			}
		});

		return glanceDOM('ignored#custom-option').should.deep.equal(dom.get('target-3'));
	});

	it('should only locate with the specified option', () => {
		dom.render(<div>
			<div name='thing'/>
			<input id='subject' value='thing'/>
		</div>);

		return glanceDOM('thing #attribute-value').should.deep.equal(dom.get('subject'));
	});

	it('should only locate with the specified option with a custom label', () => {
		glanceDOM.addExtension({
			labels: {
				thing: ['div']
			}
		});

		dom.render(<div>
			<div name='thing'/>
			<input id='subject' value='thing'/>
		</div>);

		return glanceDOM('thing #attribute-value').should.deep.equal(dom.get('subject'));
	});

	it('should locate custom label custom label if options are only filters', () => {
		glanceDOM.addExtension({
			labels: {
				thing: ['div']
			}
		});

		dom.render(<div>
			<div id='subject-1' name='thing'/>
			<input id='subject-2' value='thing'/>
		</div>);

		return glanceDOM('thing #visible').should.deep.equal(dom.getArray('subject-1', 'subject-2'));
	})
});