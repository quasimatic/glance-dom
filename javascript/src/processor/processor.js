import containers from './containers';
import log from '../utils/log';

function dispatch({command, extensions, glanceDOM, result, reference}) {
	switch (command.command) {
		case 'beforeall':
			extensions.getBeforeAllHooks().forEach(h => h({reference}));
			break;

		case 'containers':
			if (result.scopeElements) {
				result.containerElements = containers(result.scopeElements, result.subjectElements);
			}

			if (result.subjectElements.length > 0)
				result.scopeElements = result.subjectElements;

			result.locatedElements = [];
			result.targetElements = [];
			result.subjectElements = [];
			break;

		case 'intersect':
			if (result.targetElements.length > 0) {
				let targetLookup = new Set(result.targetElements);
				result.targetElements = result.locatedElements.filter(e => targetLookup.has(e));
				log.debug('Intersected elements:', result.targetElements.length);
			}
			else {
				result.targetElements = result.locatedElements;
			}

			if (result.targetElements.length === 0)
				result.elementsNotFound = true;

			result.locatedElements = [];

			break;

		case 'locate':
			let locator = extensions.getLocatorForOption(command.option, command.label);
			let located = locator({
				...command,
				extensions,
				glanceDOM,
				containerElements: result.containerElements
			});

			if (located.length > 0) log.debug('Located:', located.length);

			result.locatedElements = result.locatedElements.concat(located);

			result.locatedElements = [...new Set(result.locatedElements)];

			break;

		case 'afterlocating':
			log.debug(`Located ${result.locatedElements.length} elements for ${command.label}`);
			break;

		case 'filter':
			let filter = extensions.getFilterForOption(command.option);
			let remaining = filter({
				...command,
				extensions,
				elements: result.targetElements,
				scopeElements: result.scopeElements
			});

			if (result.targetElements.length !== remaining.length) {
				log.debug(`Filtered out ${result.targetElements.length - remaining.length}`);
				log.debug(`Remaining ${remaining.length}`);
			}

			result.targetElements = remaining;
			break;

		case 'afterfiltering':
			log.debug(`Elements remaining after filter: ${result.targetElements.length}`);
			result.subjectElements = result.targetElements;
			break;

		case 'afterall':
			result.containerElements = containers(result.scopeElements, result.subjectElements);
			extensions.getAfterAllHooks().forEach(h => h({reference, elements: result.subjectElements}));
			break;
	}

	return result;
}

export default function({commands, extensions, glanceDOM, reference, containerElements, advanced, state = {}}) {
	state.containerElements = state.containerElements || containerElements;
	state.subjectElements = state.subjectElements || [];
	state.locatedElements = state.locatedElements || [];
	state.targetElements = state.targetElements || [];

	let result = commands.reduce((result, command) => {
			if (result.elementsNotFound) return result;

			return dispatch({
				command,
				extensions,
				reference,
				glanceDOM,
				result
			});
		},
		state
	);

	log.debug(`Elements found: ${result.subjectElements.length}`);

	if (advanced)
		return {
			...result,
			reference: reference,
			elements: result.subjectElements,
			logs: log.logs
		};
	else
		return result.subjectElements.length === 1 ? result.subjectElements[0] : result.subjectElements;
};