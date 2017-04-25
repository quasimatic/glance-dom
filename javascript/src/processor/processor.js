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

			if (result.subjectElements) {
				if (result.subjectElements.length === 0)
					result.elementsNotFound = true;

				result.scopeElements = result.subjectElements;
			}

			result.targetElements = [];
			result.subjectElements = [];
			break;

		case 'intersect':
			if (result.subjectElements.length > 0) {
				let subjectLookup = new Set(result.subjectElements);
				result.subjectElements = result.targetElements.filter(e => subjectLookup.has(e));
			}
			else {
				result.subjectElements = result.targetElements;
			}

			result.targetElements = [];
			break;

		case 'locate':
			let locator = extensions.getLocatorForOption(command.option, command.label);

			result.targetElements = result.targetElements.concat(locator({
				...command,
				extensions,
				glanceDOM,
				containerElements: result.containerElements
			}));

			result.targetElements = [...new Set(result.targetElements)];

			break;

		case 'filter':
			let filter = extensions.getFilterForOption(command.option);
			result.targetElements = filter({
				...command,
				extensions,
				elements: result.targetElements,
				scopeElements: result.scopeElements
			});
			break;

		case 'afterall':
			extensions.getAfterAllHooks().forEach(h => h({reference, elements: result.subjectElements}));
			break;
	}

	return result;
}

export default function({commands, extensions, glanceDOM, reference, containerElements, advanced = false}) {
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
		{containerElements}
	);

	if (advanced)
		return {
			elements: result.subjectElements,
			logs: log.logs
		};
	else
		return result.subjectElements.length === 1 ? result.subjectElements[0] : result.subjectElements;
};