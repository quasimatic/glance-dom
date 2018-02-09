import containers from './containers';
import log from '../utils/log';
import reduce from '@arr/reduce';
import filter from '@arr/filter';

function dispatch({command, extensions, glanceDOM, result, reference}) {
	switch (command.command) {
		case 'beforeall':
			extensions.getBeforeAllHooks().forEach(h => h({reference}));
			break;

		case 'containers':
			if (result.scopes) {
				result.containers = containers(result.scopes, result.subjects);
			}

			if (result.subjects.length > 0)
				result.scopes = result.subjects;

			result.locatedElements = [];
			result.targets = [];
			result.subjects = [];
			break;

		case 'intersect':
			if (result.targets.length > 0) {
				let targetLookup = new Set(result.targets);
				result.targets = filter(result.locatedElements, e => targetLookup.has(e));
				log.debug('Intersected elements:', result.targets.length);
			}
			else {
				result.targets = result.locatedElements;
			}

			if (result.targets.length === 0)
				result.elementsNotFound = true;

			result.locatedElements = [];

			break;

		case 'locate':
			let locator = extensions.getLocatorForOption(command.option, command.label);
			let located = locator({
				...command,
				extensions,
				glanceDOM,
				containerElements: result.containers
			});

			if (located.length > 0) log.debug('Located:', located.length);

			result.locatedElements = result.locatedElements.concat(located);

			result.locatedElements = [...new Set(result.locatedElements)];

			break;

		case 'afterlocating':
			log.debug(`Located ${result.locatedElements.length} elements for ${command.label}`);
			break;

		case 'filter':
			let filterOption = extensions.getFilterForOption(command.option);
			let remaining = filterOption({
				...command,
				extensions,
				elements: result.targets,
				scopeElements: result.scopes
			});

			if (result.targets.length !== remaining.length) {
				log.debug(`Filtered out ${result.targets.length - remaining.length}`);
				log.debug(`Remaining ${remaining.length}`);
			}

			result.targets = remaining;
			break;

		case 'afterfiltering':
			log.debug(`Elements remaining after filter: ${result.targets.length}`);
			result.subjects = result.targets;
			break;

		case 'afterall':
			result.containers = containers(result.scopes, result.subjects);
			extensions.getAfterAllHooks().forEach(h => h({reference, elements: result.subjects}));
			break;
	}

	return result;
}

export default function({commands, extensions, glanceDOM, reference, containerElements, advanced, survey = {}}) {
	survey.containers = survey.containers || containerElements;
	survey.subjects = survey.subjects || [];
	survey.locatedElements = survey.locatedElements || [];
	survey.targets = survey.targets || [];

	let result = reduce(commands, (result, command) => {
			if (result.elementsNotFound) return result;

			return dispatch({
				command,
				extensions,
				reference,
				glanceDOM,
				result
			});
		},
		survey
	);

	log.debug(`Elements found: ${result.subjects.length}`);

	if (advanced)
		return {
			...result,
			reference: reference,
			elements: result.subjects,
			logs: log.logs
		};
	else
		return result.subjects.length === 1 ? result.subjects[0] : result.subjects;
};