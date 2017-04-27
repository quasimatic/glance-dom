import parentElements from '../utils/parent-elements';

export default function(scopeElements = [], subjectElements = [], containerElements) {
	if (scopeElements.length === 0 || subjectElements.length === 0) return [];

	let containerLookup = new Set([].concat.apply([], parentElements(scopeElements, containerElements)));
	return parentElements(subjectElements, containerElements).map(se => se.find(e => containerLookup.has(e)));
};
