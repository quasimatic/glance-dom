import parser from 'glance-parser';
import LocatorCollector from './locator-preprocessor';
import FilterCollector from './filter-preprocessor';
import Extensions from '../extensions';

export default class Preprocessor {
	constructor({extensions = new Extensions(), defaultOptions = []} = {
		extensions: new Extensions(),
		defaultOptions: []
	}) {
		this.extensions = extensions;
		this.defaultOptions = defaultOptions;
	}

	create(reference) {
		let scopes = parser.parse(reference);
		let commands = [];

		commands.push({command: 'beforeall'});

		commands = commands.concat(scopes.reduce((result, scope) => result.concat({command: 'containers'}, this.processIntersect(scope)), []));

		commands.push({command: 'afterall'});

		return commands;
	}

	processIntersect(intersects) {
		return intersects.reduce((result, target) => {
			return result.concat(
				{command: 'beforelocating', ...target},
				this.locators(target),
				{command: 'afterlocating', ...target},
				{command: 'beforefiltering', ...target},
				this.filters(target),
				{command: 'afterfiltering', ...target},
				{command: 'intersect'});
		}, []);
	}

	locators(target) {
		let collector = new LocatorCollector(this);
		return collector.getLocatorCommands(target);
	}

	filters(target) {
		let collector = new FilterCollector(this);
		return collector.getFilterCommands(target);
	}
};
