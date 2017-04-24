import log from '../../utils/log';
import containsElement from '../../utils/contains-element';

export default {
	options: {
		'contained-near-scope': {
			filter: function closestdom({elements, containerElements = [document.documentElement], scopeElements = []}) {
				log.debug('Filtering for subjects contained near scope');

				let containerLookup = new Set(containerElements);

				if (scopeElements.length === 0) return elements;

				let foundElements = scopeElements.reduce((result, scope) => {
					let p = scope;

					do {
						let found = elements.filter(element => p === element || containsElement(p, element));

						if (found.length > 0 || containerLookup.has(p)) {
							result = result.concat(found);
							break;
						}
					}
					while ((p = p.parentNode) && p.outerHTML !== null);

					return result;
				}, []);

				return [...new Set(foundElements)];
			}
		}
	}
};