import containsElement from './contains-element';
import dom from '../../test/dom';

describe('containsElement', () => {
	it('should contain element', () => {
		dom.render(<div id='container'>
			<div id="subject"></div>
		</div>);

		containsElement(dom.get('container'), dom.get('subject')).should.be.true;
	});

	it('should not contain an element', () => {
		dom.render(<div>
			<div id='container'/>
			<div id="subject"/>
		</div>);

		containsElement(dom.get('container'), dom.get('subject')).should.be.false;
	});

	it('should contain grand child element', () => {
		dom.render(<div id='container'>
			<div>
				<div id="subject"></div>
			</div>
		</div>);

		containsElement(dom.get('container'), dom.get('subject')).should.be.true;
	});
});
