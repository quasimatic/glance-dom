import parse from 'glance-parser';
import LocatorCollector from './locator-preprocessor';
import FilterCollector from './filter-preprocessor';
import Extensions from '../extensions';
import reduce from '@arr/reduce';

export default class Preprocessor {
	constructor({extensions = new Extensions(), defaultOptions = []} = {
		extensions: new Extensions(),
		defaultOptions: []
	}) {
		this.extensions = extensions;
		this.defaultOptions = defaultOptions;
	}

	create(reference) {
		let scopes = parse(reference);
		let commands = [];

		commands.push({command: 'beforeall'});

		commands = commands.concat(reduce(scopes, (result, scope) => result.concat({command: 'containers'}, this.processIntersect(scope)), []));

		commands.push({command: 'afterall'});

		return commands;
	}

	processIntersect(intersects) {
		let located = reduce(intersects, (result, target) => {
			return result.concat(
				{command: 'beforelocating', ...target},
				this.locators(target),
				{command: 'afterlocating', ...target},
				{command: 'intersect'});
		}, []);

		let options = reduce(intersects, (r, t) => r.concat(t.options), []);

		return located.concat(
			{command: 'beforefiltering', options},
			this.filters(options),
			{command: 'afterfiltering', options});
	}

	locators(target) {
		let collector = new LocatorCollector(this);
		return collector.getLocatorCommands(target);
	}

	filters(options) {
		let collector = new FilterCollector(this);
		return collector.getFilterCommands(options);
	}
};
