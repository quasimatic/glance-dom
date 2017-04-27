import dom from './dom';
import glanceDOM from '../src/glance-dom-browser';

describe('Subjects', () => {
	it('should continue processing from provided state', () => {
		dom.render(<div>
			<div id='scope'>
				<div id="subject"/>
			</div>
			<div>subject</div>
		</div>);

		let commands = glanceDOM.preprocess('scope > subject');

		let result = commands.reduce((state, c) => glanceDOM.process(c, {advanced: true, state}), {});
		result.should.have.property('elements').deep.equal(dom.getArray('subject'));
	});
});
