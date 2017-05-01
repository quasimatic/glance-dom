import dom from '../../../test/dom';
import extension from './level-matches';
let lowestLevelFilter = extension.options['lowest-level-matches'].filter;
let highestLevelFilter = extension.options['highest-level-matches'].filter;

describe('Filter: Lowest level matches', () => {
	it('should filter out matches that contain other matches', () => {
		dom.render(
			<div id='container-subject'>
				<div id="subject"/>
			</div>
		);

		lowestLevelFilter({elements: dom.getArray('container-subject', 'subject')}).should.deep.equal([dom.get('subject')]);
	});

	it('should not filter out containers that do not contain matches', () => {
		dom.render(
			<div>
				<div id="container">
					<div/>
				</div>
				<div id='subject'>
					<div/>
				</div>
			</div>
		);

		lowestLevelFilter({elements: dom.getArray('container', 'subject')}).should.deep.equal(dom.getArray('container', 'subject'));
	});
});

describe('Filter: Highest level matches', () => {
	it('should filter out matches that are inner matches to others', () => {
		dom.render(
			<div id='subject'>
				<div id="inner-subject"/>
			</div>
		);

		highestLevelFilter({elements: dom.getArray('subject', 'inner-subject')}).should.deep.equal([dom.get('subject')]);
	});

	it('should not filter out inner matches that are not contained in a match', () => {
		dom.render(
			<div>
				<div id="container">
					<div/>
				</div>
				<div id='subject'/>
			</div>
		);

		highestLevelFilter({elements: dom.getArray('container', 'subject')}).should.deep.equal(dom.getArray('container', 'subject'));
	});
})
;