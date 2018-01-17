import parentElements from '../utils/parent-elements';
import map from '@arr/map';
import find from '@arr/find';

export default function(scopeElements = [], subjectElements = [], containerElements) {
	if (scopeElements.length === 0 || subjectElements.length === 0) return [];

	let containerLookup = new Set([].concat.apply([], parentElements(scopeElements, containerElements)));
	return map(parentElements(subjectElements, containerElements), se => find(se, e => containerLookup.has(e)));
};
